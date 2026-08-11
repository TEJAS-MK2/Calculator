const CACHE_NAME = 'modern-calculator-v48';
const APP_SHELL = [
  './', './index.html', './styles.css?v=17', './phase2.css?v=1', './script.js?v=15',
  './sidebar-fix.js?v=15', './animation-enhancements.js?v=5', './sidebar-hardening.js?v=3',
  './calculator-core-ui.js?v=3', './packages/calculator-core/index.js', './manifest.json'
];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { if(event.request.method !== 'GET')return; const url=new URL(event.request.url); if(url.origin!==self.location.origin)return; event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{});}return response;}).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):Response.error()))); });
