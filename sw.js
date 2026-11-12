const CACHE='protocol-atlas-v2.0.2';
const FILES=['./','index.html','style.css','i18n.js','core-a.js','core-b.js','advanced.js','projects.js','services.js','models.js','engineering-models.js','traces.js','app.js','icon.svg','manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('protocol-atlas-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
