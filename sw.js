const CACHE = 'exercise-pwa-v1';
self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['.','index.html','main.js','manifest.json'])))
);
self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))
);
