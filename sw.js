const CACHE_NAME = "card-v2";
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

// 1. Жёсткое кэширование при установке
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
  );
  self.skipWaiting(); // Немедленная активация
});

// 2. Агрессивный перехват запросов
self.addEventListener('fetch', event => {
  // Для всех HTML-запросов
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/pwa-test/offline.html'))
    );
    return;
  }

  // Для остальных ресурсов
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});

// 3. Очистка старых кэшей
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => 
        key !== CACHE_NAME && caches.delete(key)
      ))
    )
  );
  self.clients.claim(); // Контроль всех вкладок
});
