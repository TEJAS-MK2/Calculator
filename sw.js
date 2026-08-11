const CACHE_NAME = 'modern-calculator-v52';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './calculator-core-ui.js',
  './packages/calculator-core/index.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
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
      return event.request.mode === 'navigate'
        ? caches.match('./index.html')
        : Response.error();
    }))
  );
});
