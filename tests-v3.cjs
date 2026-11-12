'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const elements=new Map(),listeners={},storage=new Map();
const el=k=>{if(!elements.has(k))elements.set(k,{innerHTML:'',textContent:'',value:'',hidden:false,dataset:{},setAttribute(){},addEventListener(){},classList:{toggle(){},remove(){},contains(){return false}}});return elements.get(k)};
const c={console,TextEncoder,Uint8Array,DataView,Date,Math,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},matchMedia:()=>({matches:true}),document:{querySelector:el,querySelectorAll:()=>[],documentElement:{},body:{classList:{toggle(){},remove(){},contains(){return false}}},addEventListener(k,f){(listeners[k]??=[]).push(f)}},window:{addEventListener(){},scrollTo(){}},location:{hash:'',protocol:'file:'},navigator:{},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},fetch:async()=>({ok:true,json:async()=>({checks:[]})})};vm.createContext(c);
for(const f of ['i18n','core-a','core-b','advanced','projects','services','masterclasses','models','engineering-models','precision-models','traces','academy','app'])vm.runInContext(fs.readFileSync(f+'.js','utf8'),c,{filename:f});
const run=s=>vm.runInContext(s,c),{MODEL,Learning,APPLIED,pairedBootstrap,benchmarkStats}=run('({MODEL,Learning,APPLIED,pairedBootstrap,benchmarkStats})');
assert.equal(pairedBootstrap([2,3,4,5,6],[1,2,3,4,5]).low,1);assert.equal(pairedBootstrap([2,3,4,5,6],[1,2,3,4,5]).high,1);assert.throws(()=>pairedBootstrap([1],[2]));
assert.equal(benchmarkStats([1,9],1000000).aggregateMbps,1.6);
for(const loss of [true,false])for(const quic of [true,false]){const r=MODEL.quic.compute({loss,quic});assert.equal(r.events.some(e=>e.title.en==='Recovery completes'),loss);assert.equal(r.events[2].state.B,loss&&!quic?'BLOCKED':'DELIVERED');if(!loss)assert(!r.events.at(-1).detail.en.includes('retransmitted'));}
for(const lost of ['0','1','2','3'])for(const window of [500,1000,1500]){const r=MODEL['tcp-loss'].compute({lost,window});assert.equal(r.events.at(-1).state.ack,2500);const i=r.events.findIndex(e=>e.title.en.includes('lost before arrival'));if(i>=0)assert(!r.events[i+1].title.en.startsWith('ACK'));}
assert(Math.abs(MODEL.cubic.compute({wmax:100,seconds:1}).events[0].state.target-70)<1e-9);
assert.equal(MODEL.bbr.compute({bandwidth:100,rtt:40,gain:125}).events[0].state.estimatedBDPBytes,500000);
assert.equal(MODEL['flow-control'].compute({cwnd:8000,rwnd:6000,flight:4500}).events.at(-1).state.newDataBudget,1500);
assert.equal(MODEL['flow-control'].compute({cwnd:8000,rwnd:0,flight:0}).events.at(-1).state.newDataBudget,0);
for(const a of APPLIED){assert(!Learning.grade(a.id,'wrong'));assert(Learning.grade(a.id,a.answer));}assert.equal(Object.keys(Learning.export().applied).length,12);
assert.throws(()=>Learning.validate({...Learning.export(),reviews:{999:{due:0,interval:1}}}));
const before=JSON.stringify(Learning.export());assert.throws(()=>run('validateBackup({version:2,completed:[],bookmarks:[],notes:{},scores:{},training:{version:999}})'));assert.equal(JSON.stringify(Learning.export()),before);
Learning.recordQuiz(1,{right:3,total:3,date:new Date().toISOString()});assert(Learning.export().reviews[1]);assert.equal(Learning.export().quizHistory[1].length,1);
for(const lang of ['en','ta'])for(const route of ['academy','challenges','review','research','validation']){c.location.hash='#'+route;run(`lang='${lang}';renderRoute()`);assert(!el('#content').innerHTML.includes('undefined'));if(lang==='ta')assert(/[\u0b80-\u0bff]/.test(el('#content').innerHTML));}
Learning.start();assert.equal((el('#content').innerHTML.match(/name="exam-\d+"/g)||[]).length,90);Learning.submit();assert.equal(Learning.export().attempts.length,0);
for(let i=0;i<30;i++)for(const f of listeners.change)f({target:{dataset:{exam:String(i)},value:'0'}});
Learning.submit();assert.equal(Learning.export().attempts.length,1);assert.equal(Learning.export().attempts[0].total,30);Learning.submit();assert.equal(Learning.export().attempts.length,1);
const m=run('MASTERCLASSES');for(const l of m){assert(l.sections.length>=7);assert(l.sections.map(s=>s.body.en).join(' ').split(/\s+/).length>=1000);assert.equal(l.questions.length,8);assert(l.investigations.length>=3);for(const inv of l.investigations)for(const k of ['title','prediction','procedure','evidence','rubric'])assert(inv[k].en&&/[\u0b80-\u0bff]/.test(inv[k].ta));}
console.log('PASS: assessment persistence, validation and grading; bilingual practice routes; bootstrap and congestion math; TCP/QUIC causality; masterclass depth.');
