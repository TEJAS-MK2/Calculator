const CACHE_NAME = 'modern-calculator-v58';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './calculator-core-ui.js',
  './packages/calculator-core/index.js',
  './manifest.json',
];
const EXTERNAL_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js',
];

async function cacheExternalAssets(cache) {
  await Promise.allSettled(EXTERNAL_ASSETS.map(async url => {
    try {
      const response = await fetch(url, { mode: 'no-cors', cache: 'no-store' });
      await cache.put(url, response);
    } catch (error) {
      console.warn('[Calculator] External asset cache failed:', url, error);
    }
  }));
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await cacheExternalAssets(cache);
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
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
        if (response.type === 'opaque' || response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(error => {
            console.warn('[Calculator] CDN cache write failed:', error);
          });
        }
        return response;
      }))
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(error => {
          console.warn('[Calculator] Cache write failed:', error);
        });
      }
      return response;
    }).catch(error => {
      console.warn('[Calculator] Network request failed:', event.request.url, error);
      return event.request.mode === 'navigate' ? caches.match('./index.html') : Response.error();
    }))
  );
});
