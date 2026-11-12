const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),{webcrypto}=require('node:crypto');
const c={TextEncoder,Uint8Array,crypto:webcrypto,pair:(en,ta)=>({en,ta}),document:{addEventListener(){}}};vm.createContext(c);vm.runInContext(fs.readFileSync('crypto-lab.js','utf8')+';this.run=runCryptoLab',c);
c.run(webcrypto).then(r=>{assert(r.secretEqual&&r.messageEqual&&r.tamperRejected);assert.equal(r.ivHex.length,24);console.log('PASS real ECDH, HKDF, AES-GCM roundtrip and tamper rejection');}).catch(e=>{console.error(e);process.exitCode=1});
