self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log(`delete ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    })
  );
});