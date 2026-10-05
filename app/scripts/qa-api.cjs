// Pruebas automatizadas con asistencia de IA. Los datos controlados se identifican en cada resultado.
const { chromium: playwright } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
(async()=>{
 const repo=require('path').resolve(__dirname,'../..');
 const server=spawn('npm',['start','--','--host','127.0.0.1','--port','8121'],{cwd:repo+'/app',stdio:'ignore'});
 let browser;
 try {
  for(let i=0;i<40;i++){try{await fetch('http://127.0.0.1:8121');break;}catch{await new Promise(r=>setTimeout(r,500));}}
  browser=await playwright.launch({executablePath:process.env.STUDYTIME_CHROMIUM_PATH || undefined,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote'],headless:true});
  const page=await browser.newPage({viewport:{width:390,height:844}}); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8121');
  await page.getByText('Organiza tu tiempo',{exact:true}).waitFor();
  const results=[]; const requests=[];
  await page.locator('ion-tab-button').filter({hasText:'Recursos'}).click();
  await page.locator('ion-spinner').waitFor({state:'hidden',timeout:20000});
  results.push({test:'API pública sin interceptar',result:await page.locator('ion-card-title').filter({hasText:'Enviar una sesión'}).count() && await page.locator('ion-button').filter({hasText:'Ver recurso'}).count() ? 'GET respondió' : 'GET no disponible; error visible',error:await page.locator('[role=alert]').allTextContents()});
  const fixture={id:1,userId:1,title:'Técnicas de estudio — prueba controlada',body:'Contenido de prueba para verificar lectura y navegación.'};
  await page.route('https://jsonplaceholder.typicode.com/posts**',async route=>{
    const request=route.request(); requests.push({method:request.method(),url:request.url(),body:request.postData()});
    await new Promise(r=>setTimeout(r,200));
    await route.fulfill({status:request.method()==='POST'?201:200,contentType:'application/json',body:JSON.stringify(request.method()==='POST'?{...JSON.parse(request.postData()),id:101}:request.url().includes('/posts/1')?fixture:[fixture])});
  });
  await page.getByText('Actualizar recursos',{exact:true}).click();
  await page.getByText(fixture.title,{exact:true}).waitFor();
  await page.screenshot({path:repo+'/documentacion/capturas/m1/02-get-controlado.png'});
  await page.getByText('Ver recurso',{exact:true}).click(); await page.waitForURL('**/recursos/1');
  await page.getByText(fixture.body,{exact:true}).waitFor();
  await page.locator('ion-back-button').click(); await page.waitForURL('**/tabs/recursos');
  results.push({test:'GET, detalle y regreso con API controlada',result:'passed'});
  await page.getByText('Enviar prueba',{exact:true}).click(); await page.getByText('Completa el título y la descripción.',{exact:true}).waitFor();
  await page.locator('ion-input input').fill('Estudio de Angular'); await page.locator('ion-textarea textarea').fill('Repasar rutas por 25 minutos');
  await page.getByText('Enviar prueba',{exact:true}).click(); await page.getByText('Envío de prueba aceptado:',{exact:false}).waitFor();
  results.push({test:'POST y validación de formulario con API controlada',result:'passed'});
  await page.screenshot({path:repo+'/documentacion/capturas/m1/03-post-controlado.png'});
  await page.unroute('https://jsonplaceholder.typicode.com/posts**');
  await page.route('https://jsonplaceholder.typicode.com/posts**',r=>r.abort('failed'));
  await page.getByText('Actualizar recursos',{exact:true}).click(); await page.getByText('No se pudieron cargar los recursos.',{exact:false}).waitFor();
  await page.getByText('Enviar prueba',{exact:true}).click(); await page.getByText('No se pudo enviar.',{exact:false}).waitFor();
  results.push({test:'GET y POST fallidos controlados: errores visibles',result:'passed'});
  const data={browser:await browser.version(),results,requests,pageErrors:errors,apiSuccessTests:'interceptados; no demuestran acceso real a la API pública'};
  fs.writeFileSync(repo+'/documentacion/evidencias/m1/api.json',JSON.stringify(data,null,2)); console.log(JSON.stringify(data));
  if(errors.length)throw Error('Errores de ejecución');
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
