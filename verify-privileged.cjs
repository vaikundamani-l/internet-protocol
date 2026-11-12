'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm'),{spawnSync,spawn}=require('node:child_process'),assert=require('node:assert/strict');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-privileged-')),c={};vm.createContext(c);vm.runInContext(fs.readFileSync('projects.js','utf8')+';globalThis.source=PROJECTS.find(p=>p.id===53).files[0].content',c);fs.writeFileSync(path.join(dir,'topology.py'),c.source);
function run(bin,args,ok=true){const r=spawnSync(bin,args,{cwd:dir,encoding:'utf8',timeout:12000});if(ok)assert.equal(r.status,0,`${bin} ${args.join(' ')}: ${r.stderr}`);return r;}
const report={scope:'Only test-owned p53 namespaces; not host firewall',checks:[]};let owned=false,server;
(async()=>{try{
 const probe=run('python3',['topology.py','setup'],false);if(probe.status!==0){report.checks.push({name:'namespace setup',status:'BLOCKED',details:probe.stderr.slice(-1500)});process.exitCode=2;return;}owned=true;
 server=spawn('ip',['netns','exec','p53b','python3','-u','-m','http.server','8053','--bind','10.253.3.2'],{cwd:dir,stdio:['ignore','pipe','pipe']});await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('HTTP startup timeout')),7000);server.stdout.on('data',b=>{if(String(b).includes('Serving HTTP')){clearTimeout(timer);resolve();}});server.on('exit',()=>reject(Error('HTTP server exited')));});
 const request=()=>run('ip',['netns','exec','p53a','curl','--noproxy','*','--max-time','3','--fail','http://10.253.3.2:8053/'],false);
 assert.equal(request().status,0);report.checks.push({name:'multi-router HTTP',status:'PASS'});
 run('python3',['topology.py','policy']);assert.equal(request().status,0);assert.notEqual(run('ip',['netns','exec','p53a','ping','-c','1','-W','1','10.253.3.2'],false).status,0);report.checks.push({name:'firewall permits HTTP and denies new ICMP',status:'PASS'});
 run('python3',['topology.py','break']);assert.notEqual(request().status,0);run('python3',['topology.py','repair']);assert.equal(request().status,0);report.checks.push({name:'return-route failure and recovery',status:'PASS'});
 }catch(e){report.checks.push({name:'privileged lab',status:'FAIL',details:e.message});process.exitCode=1;}finally{
 if(server&&server.exitCode===null){const exited=new Promise(resolve=>server.once('exit',resolve));server.kill();await exited;}
 if(owned){const cleanup=run('python3',['topology.py','cleanup'],false);report.checks.push({name:'owned namespace cleanup',status:cleanup.status===0?'PASS':'FAIL'});if(cleanup.status!==0)process.exitCode=1;}
 fs.writeFileSync(path.join(process.cwd(),'privileged-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }})();
