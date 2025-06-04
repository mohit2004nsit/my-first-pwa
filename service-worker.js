const CACHE_NAME = 'attendance-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/students.csv',
  '/papaparse.min.js',
  '/idb.js', // ← Corrected: previously was '/index-min.js', but the correct file is 'idb.js'
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      try {
        await cache.addAll(urlsToCache);
        console.log('Files cached successfully');
      } catch (err) {
        console.error('Cache add failed', err);
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
