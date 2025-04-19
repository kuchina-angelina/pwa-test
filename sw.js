const CACHE_NAME = "card-v1";
const FILES = [
  "/pwa-test/",                 // Главная страница (автоматически загрузит index.html)
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

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES))
      .catch(err => console.error("Cache addAll error:", err)) // Логирование ошибок
  );
  self.skipWaiting();
});

// Установка сервис-воркера
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
      .catch(() => caches.match("/pwa-test/offline.html"))
  );
});
