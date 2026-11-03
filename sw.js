const C='velifushi-v8';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','favicon-32.png','favicon.ico','img/aerial.jpg','img/logo.png','img/map.webp','img/spax-logo.webp','img/spax-scallop.webp','fonts/CormorantGaramond-normal.woff2','fonts/CormorantGaramond-italic.woff2','fonts/Montserrat-var.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.concat(['ic-island','ic-menus','ic-sustain','ic-comp','ic-act','ic-map','ic-sig','ic-flower'].map(n=>'img/'+n+'.png')))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put('index.html',cp));return n}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n})))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
