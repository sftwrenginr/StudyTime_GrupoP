// Pruebas automatizadas con asistencia de IA. Los datos controlados se identifican en cada resultado.
const { chromium: playwright } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
(async()=>{
 const repo=require('path').resolve(__dirname,'../..');
 const server=spawn('npm',['start','--','--host','127.0.0.1','--port','8124'],{cwd:repo+'/app',stdio:'ignore'});
 let browser;
 try {
  for(let i=0;i<40;i++){try{await fetch('http://127.0.0.1:8124');break;}catch{await new Promise(r=>setTimeout(r,500));}}
  browser=await playwright.launch({executablePath:process.env.STUDYTIME_CHROMIUM_PATH || undefined,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote'],headless:true});
  const page=await browser.newPage({viewport:{width:390,height:844}}); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8124');
  await page.getByText('Organiza tu tiempo',{exact:true}).waitFor();
  const results=[];
  await page.route('https://jsonplaceholder.typicode.com/posts**',r=>r.fulfill({status:200,contentType:'application/json',body:'[]'}));
  await page.locator('ion-tab-button').filter({hasText:'Recursos'}).click();
  await page.waitForFunction(()=>document.querySelector('audio')?.readyState>=4);
  await page.getByText('Reproducir audio',{exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('audio').currentTime>0.3 && !document.querySelector('audio').paused);
  await page.getByText('Pausar audio',{exact:true}).click();await page.waitForFunction(()=>document.querySelector('audio').paused);
  await page.getByText('Detener audio',{exact:true}).click();await page.waitForFunction(()=>document.querySelector('audio').currentTime===0);
  const slider=page.getByRole('slider',{name:'Progreso del audio'});await slider.focus();await slider.press('ArrowRight');
  await page.waitForFunction(()=>document.querySelector('audio').currentTime>=0.5);
  results.push({test:'Audio WAV real: reproducir, pausar, detener y mover progreso con teclado',result:'passed'});
  await page.getByText('Detener audio',{exact:true}).click();
  await page.getByText('Reproducir audio',{exact:true}).click();
  await page.locator('ion-tab-button').filter({hasText:'Plan'}).click();await page.waitForFunction(()=>document.querySelector('audio').paused);
  await page.locator('ion-tab-button').filter({hasText:'Recursos'}).click();
  results.push({test:'Pausar al cambiar de pantalla',result:'passed'});
  await page.context().setOffline(true);await page.getByText('Reproducir audio',{exact:true}).click();
  await page.waitForFunction(()=>!document.querySelector('audio').paused);await page.getByText('Pausar audio',{exact:true}).click();await page.context().setOffline(false);
  results.push({test:'Audio local offline en aplicación abierta',result:'passed'});
  await page.screenshot({path:repo+'/documentacion/capturas/m4/01-audio.png'});
  const chooserPromise=page.waitForEvent('filechooser');await page.getByText('Capturar foto',{exact:true}).click();
  const chooser=await chooserPromise;await chooser.setFiles(repo+'/documentacion/capturas/m1/01-inicio.png');
  await page.getByAltText('Vista previa del apunte',{exact:true}).waitFor();
  await page.waitForFunction(()=>document.querySelector('app-multimedia img')?.naturalWidth>0);
  await page.screenshot({path:repo+'/documentacion/capturas/m4/02-imagen-prueba.png'});
  await page.getByText('Quitar foto',{exact:true}).click();await page.getByAltText('Vista previa del apunte',{exact:true}).waitFor({state:'hidden'});
  results.push({test:'Plugin Camera web: selección y vista previa de archivo PNG de prueba y quitar',result:'passed',physicalCamera:'no probada'});
  const data={browser:await browser.version(),results,pageErrors:errors};
  fs.writeFileSync(repo+'/documentacion/evidencias/m4/pruebas.json',JSON.stringify(data,null,2));console.log(JSON.stringify(data));if(errors.length)throw Error('Errores de ejecución');
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
