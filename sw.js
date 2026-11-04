const C='velifushi-v20';
const CORE=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','favicon-32.png','favicon.ico','img/aerial.jpg','img/logo.png','img/map.webp','img/spax-logo.webp','img/spax-scallop.webp','img/chv-logo.webp','img/chv-1.jpg','img/chv-2.jpg','img/chv-3.jpg','img/chv-leaf.webp','img/chv-leaf2.webp','img/chv-mandara.png','fonts/CormorantGaramond-normal.woff2','fonts/CormorantGaramond-italic.woff2','fonts/Montserrat-var.woff2','fonts/Jost-var.woff2','fonts/KaushanScript.woff2','fonts/Fredoka-var.woff2','img/th-cin-white.webp','img/th-cin-purple.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.concat(['ic-island','ic-menus','ic-sustain','ic-comp','ic-act','ic-map','ic-sig','ic-flower'].map(n=>'img/'+n+'.png')))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put('index.html',cp));return n}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n})))});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(_){d={body:e.data?e.data.text():''}}
 const jobs=[self.registration.showNotification(d.title||'Cinnamon Velifushi',{body:d.body||'',icon:'icon-192.png',badge:'icon-192.png',tag:d.id?'ann-'+d.id:'milo',renotify:true,data:{url:d.url||'',id:d.id||''}})];
 if(typeof d.badge==='number'){try{const n=self.navigator;if(d.badge>0&&n.setAppBadge)jobs.push(n.setAppBadge(d.badge).catch(()=>{}));else if(n.clearAppBadge)jobs.push(n.clearAppBadge().catch(()=>{}))}catch(_){}}
 jobs.push(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.forEach(c=>c.postMessage({type:'ann'}))));
 e.waitUntil(Promise.all(jobs))});
self.addEventListener('notificationclick',e=>{e.notification.close();const nd=e.notification.data||{},h=nd.url||'#/notifications';
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{const c=l.find(x=>x.url.startsWith(self.registration.scope));if(c){c.postMessage({type:'go',hash:h,id:nd.id||''});return c.focus()}return self.clients.openWindow(self.registration.scope+h)}))});
