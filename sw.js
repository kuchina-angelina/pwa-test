const CACHE_NAME = "card-v1";
const FILES = [
  "/pwa-test/",                   
  "/pwa-test/index.html",
  "/pwa-test/style.css",
  "/pwa-test/app.js",
  "/pwa-test/manifest.json",
  "/pwa-test/offline.html",
  "/pwa-test/images/image.jpg",
  "/pwa-test/images/mobile.png",
  "/pwa-test/images/telegram.png",
  "/pwa-test/images/vk.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .catch(err => console.error('Ошибка кэширования:', err))
  );
  self.skipWaiting();  // Важно для немедленной активации
});

self.addEventListener('fetch', event => {
  // Особый обработчик для навигационных запросов
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/pwa-test/offline.html'))
    );
  } else {
    // Для остальных ресурсов
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => {
          if (event.request.url.endsWith('.html')) {
            return caches.match('/pwa-test/offline.html');
          }
        })
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();  // Важно для немедленного контроля страниц
});
