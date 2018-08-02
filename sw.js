var cacheName = 'issue-tracker';
var filesToCache = [
  '/',
  '/index.html',
  '/issues.html',
  '/addissue.html',
  '/detail.html',
  '/editissue.html',
  '/login.html',
  '/signup.html',
  '/images/delete_icon.svg',
  '/images/edit_icon.png',
  '/images/favicon.png',
  '/images/delete_icon.svg',
  '/images/delete_icon.svg'  
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
