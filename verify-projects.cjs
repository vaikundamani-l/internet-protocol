'use strict';
// Extract educational source assets into a fresh temporary directory and test
// only those processes. Namespace/firewall exercises are deliberately excluded.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{spawn,spawnSync}=require('node:child_process');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('projects.js','utf8')+';globalThis.projects=PROJECTS',ctx);
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'protocol-atlas-projects-'));
for(const p of ctx.projects)for(const f of p.files||[])fs.writeFileSync(path.join(dir,f.name),f.content);
const env={...process.env,SHARE_TOKEN:'test-only-fixture-token-9051'};
function run(bin,args,extraEnv={}){const r=spawnSync(bin,args,{cwd:dir,env:{...env,...extraEnv},encoding:'utf8',timeout:20000});assert.equal(r.status,0,`${bin} ${args.join(' ')}\n${r.stderr}\n${r.stdout}`);return r.stdout;}
function runFail(bin,args,extraEnv={}){const r=spawnSync(bin,args,{cwd:dir,env:{...env,...extraEnv},encoding:'utf8',timeout:20000});assert.notEqual(r.status,0,`${bin} ${args.join(' ')} unexpectedly succeeded`);return r.stdout+r.stderr;}
function server(bin,args){const child=spawn(bin,args,{cwd:dir,env,stdio:['ignore','pipe','pipe']});let output='';return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{child.kill();reject(Error('Server not ready: '+output));},12000);child.stdout.on('data',b=>{output+=b;if(/Ready|தயார்/.test(output)){clearTimeout(timer);resolve(child);}});child.stderr.on('data',b=>output+=b);child.on('exit',code=>{clearTimeout(timer);if(code!==null)reject(Error('Server exited '+code+': '+output));});});}
(async()=>{
 const chat=run('python3',['chat.py','test']);assert(chat.includes('PASS'),chat);
 run('python3',['-m','py_compile','chat.py','share.py','diagnose.py','topology.py','benchmark.py']);
 let diagnostic;
 try{
  const localHTTP=`import http.server\nclass Quiet(http.server.SimpleHTTPRequestHandler):\n def log_message(self, *args): pass\nserver=http.server.ThreadingHTTPServer(('127.0.0.1',8052),Quiet)\nprint('Ready',flush=True)\nserver.serve_forever()`;
  diagnostic=await server('python3',['-u','-c',localHTTP]);
  const success=run('python3',['diagnose.py','127.0.0.1','8052','--http']).trim().split('\n').map(JSON.parse);
  assert.equal(success[0].stage,'resolve');assert.equal(success[0].ok,true);
  assert(success.some(x=>x.stage==='connect'&&x.ok===true&&x.address[0]==='127.0.0.1'&&x.address[1]===8052));
  assert(success.some(x=>x.stage==='http'&&x.ok===true&&/^HTTP\/1\.[01] 200 /.test(x.status)&&x.status_code===200));
 }finally{
  if(diagnostic){const exited=new Promise(resolve=>diagnostic.once('exit',resolve));diagnostic.kill();await exited;}
 }
 const refused=runFail('python3',['diagnose.py','127.0.0.1','8052','--http']).trim().split('\n').map(JSON.parse);
 assert.equal(refused[0].stage,'resolve');assert.equal(refused[0].ok,true);
 assert(refused.some(x=>x.stage==='connect'&&x.ok===false&&x.error==='ConnectionRefusedError'));
 assert(!refused.some(x=>x.stage==='http'));
 const badHTTP=`import socket\nresponses=[b'HTTP/banana 200 OK\\r\\n',b'HTTP/1.1 999 Out-of-range\\r\\n']\ns=socket.socket();s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1);s.bind(('127.0.0.1',8052));s.listen(2)\nprint('Ready',flush=True)\nfor response in responses:\n c,_=s.accept();c.recv(4096);c.sendall(response);c.close()\ns.close()`;
 const malformed=await server('python3',['-u','-c',badHTTP]),malformedExit=new Promise(resolve=>malformed.once('exit',resolve));
 for(const expected of ['HTTP/banana 200 OK','HTTP/1.1 999 Out-of-range']){
  const evidence=runFail('python3',['diagnose.py','127.0.0.1','8052','--http']).trim().split('\n').map(JSON.parse),failure=evidence.find(x=>x.stage==='http'&&x.ok===false);
  assert(failure&&failure.error==='ValueError'&&failure.detail==='invalid HTTP status line',expected);
 }
 await malformedExit;
 const benchmark=run('python3',['benchmark.py','--seed','54']).trim().split('\n').map(JSON.parse);assert.equal(benchmark.filter(r=>r.kind==='trial').length,20);
 run('python3',['share.py','fixture']);let process;
 try{process=await server('python3',['-u','share.py','server','source.bin']);
  assert.match(runFail('python3',['share.py','get','unauthorized.bin'],{SHARE_TOKEN:'different-test-token-9051'}),/HTTP Error 401/);
  assert(!fs.existsSync(path.join(dir,'unauthorized.bin.part'))&&!fs.existsSync(path.join(dir,'unauthorized.bin.meta')));
  assert(run('python3',['share.py','get','corrupt.bin','--pause','1']).includes('65536'));
  const corruptPath=path.join(dir,'corrupt.bin.part'),corrupt=fs.readFileSync(corruptPath);corrupt[0]^=255;fs.writeFileSync(corruptPath,corrupt);const corruptDigest=crypto.createHash('sha256').update(corrupt).digest('hex');
  assert.match(runFail('python3',['share.py','get','corrupt.bin']),/HTTP Error 409/);assert.equal(fs.statSync(corruptPath).size,65536);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(corruptPath)).digest('hex'),corruptDigest);
  assert(run('python3',['share.py','get','identity.bin','--pause','1']).includes('65536'));
  const identityPart=path.join(dir,'identity.bin.part'),identitySize=fs.statSync(identityPart).size,identityMeta=path.join(dir,'identity.bin.meta'),changed=JSON.parse(fs.readFileSync(identityMeta,'utf8'));changed.sha256='0'.repeat(64);fs.writeFileSync(identityMeta,JSON.stringify(changed));
  assert.match(runFail('python3',['share.py','get','identity.bin']),/source changed/);assert.equal(fs.statSync(identityPart).size,identitySize);
  assert(run('python3',['share.py','get','received.bin','--pause','1']).includes('Paused'));assert(run('python3',['share.py','get','received.bin']).includes('VERIFIED'));assert.equal(run('python3',['share.py','verify','source.bin','received.bin']).trim(),'True');
 }finally{process?.kill();}
 // The Java source launcher uses jdk.compiler even when javac is not on PATH.
 run('java',['Framed.java','fixture']);
 // share.py already used received.bin; Java intentionally refuses overwrite.
 fs.renameSync(path.join(dir,'received.bin'),path.join(dir,'share-received.bin'));
 try{process=await server('java',['Framed.java','server']);
  const reject=`import socket,sys\ns=socket.create_connection(('127.0.0.1',9050),5)\ns.sendall(bytes.fromhex(sys.argv[1]));s.shutdown(socket.SHUT_WR)\nassert s.recv(1)==b''\ns.close()`;
  run('python3',['-c',reject,'02 00 10 00 01']);
  run('python3',['-c',reject,'02 00 00 00 08 48 45 4c']);
  const drip=`import socket,time\ns=socket.create_connection(('127.0.0.1',9050),5);start=time.monotonic()\nfor b in bytes.fromhex('02 00 00 00 08 48'):\n try:s.sendall(bytes([b]))\n except OSError:break\n time.sleep(1.1)\ntry:s.shutdown(socket.SHUT_WR)\nexcept OSError:pass\nassert s.recv(1)==b''\nelapsed=time.monotonic()-start\nassert 4.5<=elapsed<7.5,elapsed\ns.close()`;
  run('python3',['-c',drip]);
  assert(run('java',['Framed.java','echo','வணக்கம் TCP']).trim().endsWith('true'));
  assert(run('java',['Framed.java','file','fixture.bin']).trim().endsWith('true'));
  assert.equal(run('java',['Framed.java','verify']).trim(),'true');
  const stored=crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,'received.bin'))).digest('hex');
  assert.match(runFail('java',['Framed.java','file','fixture.bin']),/EOFException/);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,'received.bin'))).digest('hex'),stored);
 }finally{process?.kill();}
 console.log('PASS: Python framing self-test, Python syntax, diagnostic resolve/connect/HTTP success, stopped-listener refusal and malformed-version/out-of-range-status rejection, twenty benchmark trials, challenged bearer rejection, corrupt-prefix and changed-identity preservation, authenticated resumed checksum transfer, Java source compilation, adversarial length/EOF/deadline rejection, Tamil echo, no-overwrite storage, file digest and byte equality.');
 console.log('Temporary test evidence: '+dir);
})().catch(e=>{console.error(e);process.exitCode=1;});
