/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-643d88b';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./ostrov_pokladu_001.html","./ostrov_pokladu_002.html","./ostrov_pokladu_003.html","./ostrov_pokladu_004.html","./ostrov_pokladu_005.html","./ostrov_pokladu_006.html","./ostrov_pokladu_007.html","./ostrov_pokladu_008.html","./ostrov_pokladu_009.html","./ostrov_pokladu_010.html","./ostrov_pokladu_011.html","./ostrov_pokladu_012.html","./ostrov_pokladu_013.html","./ostrov_pokladu_014.html","./ostrov_pokladu_015.html","./ostrov_pokladu_016.html","./ostrov_pokladu_018.html","./ostrov_pokladu_017.html","./ostrov_pokladu_019.html","./ostrov_pokladu_020.html","./ostrov_pokladu_021.html","./ostrov_pokladu_022.html","./ostrov_pokladu_023.html","./ostrov_pokladu_024.html","./ostrov_pokladu_025.html","./ostrov_pokladu_026.html","./ostrov_pokladu_027.html","./ostrov_pokladu_028.html","./ostrov_pokladu_029.html","./ostrov_pokladu_030.html","./ostrov_pokladu_031.html","./ostrov_pokladu_032.html","./ostrov_pokladu_033.html","./ostrov_pokladu_034.html","./ostrov_pokladu_035.html","./ostrov_pokladu_036.html","./ostrov_pokladu_037.html","./ostrov_pokladu_038.html","./ostrov_pokladu_039.html","./ostrov_pokladu_040.html","./ostrov_pokladu_041.html","./ostrov_pokladu_042.html","./ostrov_pokladu_043.html","./ostrov_pokladu_044.html","./ostrov_pokladu_045.html","./ostrov_pokladu_046.html","./ostrov_pokladu_047.html","./ostrov_pokladu_048.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png","./resources/image001.jpg","./resources/image002.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
