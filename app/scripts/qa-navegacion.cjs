// Pruebas automatizadas con asistencia de IA. Los datos controlados se identifican en cada resultado.
const { chromium: playwright } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
(async()=>{
 const repo=require('path').resolve(__dirname,'../..');
 const server=spawn('npm',['start','--','--host','127.0.0.1','--port','8120'],{cwd:repo+'/app',stdio:'ignore'});
 let browser;
 try {
  for(let i=0;i<40;i++){try{await fetch('http://127.0.0.1:8120');break;}catch{await new Promise(r=>setTimeout(r,500));}}
  browser=await playwright.launch({executablePath:process.env.STUDYTIME_CHROMIUM_PATH || undefined,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote'],headless:true});
  const page=await browser.newPage({viewport:{width:390,height:844}}); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8120');
  await page.getByText('Organiza tu tiempo',{exact:true}).waitFor();
  const results=[];
  for(const [label,path] of [['Plan','plan'],['Entorno','entorno'],['Recursos','recursos'],['Inicio','inicio']]){
   await page.locator('ion-tab-button').filter({hasText:label}).click();
   await page.waitForURL('**/tabs/'+path); results.push({tab:label,url:page.url(),result:'passed'});
  }
  await page.screenshot({path:repo+'/documentacion/capturas/m1/01-inicio.png'});
  const data={browser:await browser.version(),results,pageErrors:errors};
  fs.writeFileSync(repo+'/documentacion/evidencias/m1/navegacion.json',JSON.stringify(data,null,2));
  console.log(JSON.stringify(data)); if(errors.length)throw Error('Errores de ejecución');
 }finally{if(browser)await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
