const CACHE_NAME = `my-cache-${new Date().toISOString()}`;

// Install event - cache files
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/favicon.ico",
        "/whiteLogo.png",
        // add more assets to cache if needed
      ]);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - fetch or fallback to cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// // Install event - cache files
// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open("my-cache").then(function (cache) {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/manifest.json",
//         "/favicon.ico",
//         "/whiteLogo.png",
//         // add more assets to cache if needed
//       ]);
//     })
//   );
// });

// // Fetch event - fetch or fallback to cache
// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       return response || fetch(event.request);
//     })
//   );
// });
