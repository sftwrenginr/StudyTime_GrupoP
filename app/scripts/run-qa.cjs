const {spawnSync}=require('child_process');
const path=require('path');
for(const suite of ['navegacion','api','plan','entorno','multimedia']) {
 const result=spawnSync(process.execPath,[path.join(__dirname,'qa-'+suite+'.cjs')],{stdio:'inherit',env:process.env});
 if(result.status!==0)process.exit(result.status || 1);
}
