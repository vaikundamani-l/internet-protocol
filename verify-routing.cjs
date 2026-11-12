// Run only on a disposable Linux VM with the chapter's documented prerequisites.
const fs=require('node:fs'),vm=require('node:vm'),os=require('node:os'),path=require('node:path'),{spawnSync}=require('node:child_process');
const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('masterclasses.js','utf8')+';this.lesson=MASTERCLASSES.find(l=>l.id===65)',c);
const source=c.lesson.lab.commands.match(/sudo python3 - <<'PY'\n([\s\S]*?)\nPY/)[1],dir=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-routing-')),file=path.join(dir,'routing.py');fs.writeFileSync(file,source);
try{const r=spawnSync('python3',[file],{encoding:'utf8',timeout:240000,maxBuffer:4*1024*1024});fs.writeFileSync('routing-results.txt',r.stdout+'\n'+r.stderr);console.log(r.stdout,r.stderr);process.exitCode=r.status===0?0:1;}finally{fs.rmSync(dir,{recursive:true,force:true});}
