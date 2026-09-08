const CACHE_NAME = 'modern-calculator-v63';
const APP_SHELL = [
  './', './index.html', './styles.css', './desktop.css', './script.js', './calculator-core-ui.js', './anime-fallback.js',
  './packages/calculator-core/index.js', './packages/calculator-core/advanced.js', './packages/calculator-core/exact.js', './manifest.json', './icon.svg'
];
const EXTERNAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js'
];
async function cacheUrls(cache, urls) {
  await Promise.allSettled(urls.map(async url => {
    try { const response = await fetch(url, { cache: 'no-store' }); if (response.ok || response.type === 'opaque') await cache.put(url, response); }
    catch (error) { console.warn('[Calculator] Cache failed:', url, error); }
  }));
}
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cacheUrls(cache, APP_SHELL);
    await cacheUrls(cache, EXTERNAL_ASSETS);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isExternalAsset = EXTERNAL_ASSETS.includes(url.href);
  if (isExternalAsset) {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok || response.type === 'opaque') { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {}); }
      return response;
    }).catch(() => Response.error())));
    return;
  }
  if (url.origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {}); }
    return response;
  }).catch(() => event.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
