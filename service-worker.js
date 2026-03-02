const CACHE_NAME = 'escalas-cache-v2';

const urlsToCache = [
  '/gerador-de-escalas-pwa/',
  '/gerador-de-escalas-pwa/index.html',
  '/gerador-de-escalas-pwa/manifest.json',
  '/gerador-de-escalas-pwa/icons/icon-192.png',
  '/gerador-de-escalas-pwa/icons/icon-512.png'
];

// Instalação
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Cache First
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});