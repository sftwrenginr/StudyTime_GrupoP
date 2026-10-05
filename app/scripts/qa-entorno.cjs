// Pruebas automatizadas con asistencia de IA. Los datos controlados se identifican en cada resultado.
const { chromium: playwright } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
(async()=>{
 const repo=require('path').resolve(__dirname,'../..');
 const server=spawn('npm',['start','--','--host','127.0.0.1','--port','8123'],{cwd:repo+'/app',stdio:'ignore'});
 let browser;
 try {
  for(let i=0;i<40;i++){try{await fetch('http://127.0.0.1:8123');break;}catch{await new Promise(r=>setTimeout(r,500));}}
  browser=await playwright.launch({executablePath:process.env.STUDYTIME_CHROMIUM_PATH || undefined,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote'],headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},permissions:['geolocation'],geolocation:{latitude:19.45,longitude:-70.69,accuracy:15}}); const page=await context.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8123');
  await page.getByText('Organiza tu tiempo',{exact:true}).waitFor();
  const results=[];
  await page.locator('ion-tab-button').filter({hasText:'Entorno'}).click();
  await page.locator('app-entorno').getByText('Online',{exact:true}).waitFor();
  await context.setOffline(true);await page.locator('app-entorno').getByText('Offline',{exact:true}).waitFor();
  await page.screenshot({path:repo+'/documentacion/capturas/m3/01-offline.png'});
  await context.setOffline(false);await page.locator('app-entorno').getByText('Online',{exact:true}).waitFor();
  results.push({test:'Cambios online/offline del navegador',result:'passed'});
  await page.getByText('Mi ubicación',{exact:true}).click();await page.getByText('19.45000, -70.69000',{exact:false}).waitFor();
  if(await page.locator('.leaflet-interactive').count()!==1)throw Error('Falta marcador de ubicación');
  const box=await page.locator('#study-map').boundingBox();await page.mouse.click(box.x+box.width*.7,box.y+box.height*.7);
  await page.waitForFunction(()=>document.querySelectorAll('.leaflet-interactive').length===2);
  await page.locator('.leaflet-control-zoom-in').click();
  await page.screenshot({path:repo+'/documentacion/capturas/m3/02-mapa-gps-emulado.png'});
  await page.getByText('Limpiar lugares',{exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('.leaflet-interactive').length===1);
  results.push({test:'GPS emulado, marcador, marcar lugar, zoom y limpiar',result:'passed',gps:'coordenadas proporcionadas por automatización; no sensor real'});
  await context.clearPermissions();await page.getByText('Mi ubicación',{exact:true}).click();
  await page.getByText('No se pudo obtener tu ubicación.',{exact:false}).waitFor();
  results.push({test:'Ubicación denegada: error controlado',result:'passed'});
  await page.getByText('Buscar dispositivos',{exact:true}).click();
  await page.waitForFunction(()=>document.body.textContent.includes('Bluetooth no está disponible') || document.body.textContent.includes('No se pudo buscar'));
  results.push({test:'BLE sin soporte/adapter: mensaje visible',result:'passed',realBLEScan:'pendiente de hardware'});
  const data={browser:await browser.version(),results,pageErrors:errors,tiles:'no se valida acceso real a teselas OpenStreetMap'};
  fs.writeFileSync(repo+'/documentacion/evidencias/m3/pruebas.json',JSON.stringify(data,null,2));console.log(JSON.stringify(data));if(errors.length)throw Error('Errores de ejecución');
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
