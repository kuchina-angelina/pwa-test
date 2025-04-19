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

// Установка сервис-воркера
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(FILES))
  );
  self.skipWaiting(); // Сразу активировать новый воркер
});

// Активация (очистка старого кэша)
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Обработка запросов от страницы
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request) // Пытаемся найти файл в кэше
      .then(r => r || fetch(e.request)) // Если нет — пробуем загрузить из интернета
      .catch(() => caches.match("/offline.html")) // Если совсем не удалось — показать offline.html
  );
}); 
