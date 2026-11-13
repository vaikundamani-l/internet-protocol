'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={document:{addEventListener(){}}};vm.createContext(c);
const assets=fs.readdirSync('.').filter(n=>/^depth-[a-g]\.js$/.test(n)).sort();
for(const f of assets)vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});vm.runInContext(fs.readFileSync('depth-reader.js','utf8'),c);
const records=vm.runInContext('depthRecords()',c),ids=new Set(),report=[];
function pairs(value,path){if(Array.isArray(value))return value.flatMap((v,i)=>pairs(v,path+'.'+i));if(!value||typeof value!=='object')return[];if('en'in value){assert.equal(typeof value.en,'string',path);assert.equal(typeof value.ta,'string',path);assert(value.en.trim().length&&value.ta.trim().length,path);assert(/[\u0b80-\u0bff]/.test(value.ta)||value.ta===value.en&&value.ta.length<70,path+' Tamil missing');return[value];}return Object.entries(value).flatMap(([k,v])=>pairs(v,path+'.'+k));}
for(const d of records){assert(Number.isInteger(d.id)&&d.id>=1&&d.id<=65&&!ids.has(d.id));ids.add(d.id);assert(d.sections.length>=3);assert(d.worked.length>=2);assert(d.troubleshooting.length>=2);assert(d.exercises.length>=3);for(const w of d.worked)assert(w.steps.length>=4);for(const x of d.troubleshooting)assert(x.checks.length>=3);const all=pairs(d,String(d.id)),words=all.reduce((n,p)=>n+p.en.split(/\s+/).filter(Boolean).length,0);assert(words>=650,`chapter ${d.id}: only ${words} added English words`);report.push({id:d.id,words});}
// When all batches are installed, require all chapters; no count can hide a gap.
if(assets.length===7){assert.equal(records.length,65);for(let id=1;id<=65;id++)assert(ids.has(id));}
const html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');for(const f of assets){assert(html.includes(`src="${f}"`),f+' not loaded');assert(sw.includes(`'${f}'`),f+' not cached');}
console.log('PASS lesson-depth structure, bilingual content, worked steps, diagnostic cases and solutions:',JSON.stringify(report));
