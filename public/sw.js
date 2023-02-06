self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.warn(`delete ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener("install", (event) => {
  self.skipWaiting();
});