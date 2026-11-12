const fs=require('node:fs'),vm=require('node:vm'),os=require('node:os'),path=require('node:path'),{spawnSync}=require('node:child_process'),assert=require('node:assert/strict');
const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('masterclasses.js','utf8')+';this.lessons=MASTERCLASSES',c);
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-master-'));
try{for(const id of [63,64]){const l=c.lessons.find(l=>l.id===id),source=l.lab.commands.match(/^python3 - <<'PY'\n([\s\S]*?)\nPY/)[1],file=path.join(dir,id+'.py');fs.writeFileSync(file,source);const r=spawnSync('python3',[file],{encoding:'utf8',timeout:20000});assert.equal(r.status,0,r.stdout+r.stderr);console.log('Chapter '+id+': '+r.stdout.trim());}}
finally{fs.rmSync(dir,{recursive:true,force:true});}
