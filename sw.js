const CACHE_NAME = "card-v1";
const FILES = [
  "/",                          // Главная страница (автоматически загрузит index.html)
  "/pwa-test/index.html",       // Явное указание index.html
  "/pwa-test/style.css",        // Стили
  "/pwa-test/app.js",           // Скрипт
  "/pwa-test/manifest.json",    // Конфиг PWA
  "/pwa-test/offline.html",     // Страница для оффлайн-режима
  "/pwa-test/images/image.jpg", // Изображения
  "/pwa-test/images/mobile.png",
  "/pwa-test/images/telegram.png",
  "/pwa-test/images/vk.png"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => caches.match('/pwa-test/offline.html')) // Fallback
    );
  });

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
