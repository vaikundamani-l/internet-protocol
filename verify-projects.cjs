'use strict';
// Extract educational source assets into a fresh temporary directory and test
// only those processes. Namespace/firewall exercises are deliberately excluded.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{spawn,spawnSync}=require('node:child_process');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('projects.js','utf8')+';globalThis.projects=PROJECTS',ctx);
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'protocol-atlas-projects-'));
for(const p of ctx.projects)for(const f of p.files||[])fs.writeFileSync(path.join(dir,f.name),f.content);
const env={...process.env,SHARE_TOKEN:'test-only-fixture-token-9051'};
function run(bin,args){const r=spawnSync(bin,args,{cwd:dir,env,encoding:'utf8',timeout:20000});assert.equal(r.status,0,`${bin} ${args.join(' ')}\n${r.stderr}\n${r.stdout}`);return r.stdout;}
function server(bin,args){const child=spawn(bin,args,{cwd:dir,env,stdio:['ignore','pipe','pipe']});let output='';return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{child.kill();reject(Error('Server not ready: '+output));},12000);child.stdout.on('data',b=>{output+=b;if(/Ready|தயார்/.test(output)){clearTimeout(timer);resolve(child);}});child.stderr.on('data',b=>output+=b);child.on('exit',code=>{clearTimeout(timer);if(code!==null)reject(Error('Server exited '+code+': '+output));});});}
(async()=>{
 const chat=run('python3',['chat.py','test']);assert(chat.includes('PASS'),chat);
 run('python3',['-m','py_compile','chat.py','share.py','diagnose.py','topology.py','benchmark.py']);
 const benchmark=run('python3',['benchmark.py','--seed','54']).trim().split('\n').map(JSON.parse);assert.equal(benchmark.filter(r=>r.kind==='trial').length,20);
 run('python3',['share.py','fixture']);let process;
 try{process=await server('python3',['-u','share.py','server','source.bin']);assert(run('python3',['share.py','get','received.bin','--pause','1']).includes('Paused'));assert(run('python3',['share.py','get','received.bin']).includes('VERIFIED'));assert.equal(run('python3',['share.py','verify','source.bin','received.bin']).trim(),'True');}finally{process?.kill();}
 // The Java source launcher uses jdk.compiler even when javac is not on PATH.
 run('java',['Framed.java','fixture']);
 // share.py already used received.bin; Java intentionally refuses overwrite.
 fs.renameSync(path.join(dir,'received.bin'),path.join(dir,'share-received.bin'));
 try{process=await server('java',['Framed.java','server']);assert(run('java',['Framed.java','echo','வணக்கம் TCP']).trim().endsWith('true'));assert(run('java',['Framed.java','file','fixture.bin']).trim().endsWith('true'));assert.equal(run('java',['Framed.java','verify']).trim(),'true');}finally{process?.kill();}
 console.log('PASS: Python framing self-test, Python syntax, twenty benchmark trials, authenticated partial/resumed checksum transfer, Java source compilation, Tamil echo, file digest and byte equality.');
 console.log('Temporary test evidence: '+dir);
})().catch(e=>{console.error(e);process.exitCode=1;});
