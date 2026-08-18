const cacheName = "messe-app-v1";

const filesToCache = [
  "./",
  "./index.html",
  "./manifest.json",

  "./bilder/logo.png",
  "./bilder/home.jpg",
  "./bilder/geraet.png",
  "./bilder/foto1.jpg",
  "./bilder/foto2.jpg",
  "./bilder/foto3.jpg",
  "./bilder/icon-192.png",
  "./bilder/icon-512.png",

  "./videos/produktvideo.mp4",

  "./pdf/katalog.pdf",
  "./pdf/datenblatt.pdf",
  "./pdf/broschuere.pdf"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (name) {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedFile) {
      return cachedFile || fetch(event.request);
    })
  );
});