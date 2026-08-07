const CACHE_NAME = "daretales-v1";

const FILES = [
  "/DareTales/",
  "/DareTales/index.html",
  "/DareTales/version.json",

  "/DareTales/daily.json",
  "/DareTales/ghost.json",
  "/DareTales/crime.json",
  "/DareTales/haunted.json",
  "/DareTales/mystery.json",
  "/DareTales/demon.json",

  "/DareTales/ghost.webp",
  "/DareTales/crime.webp",
  "/DareTales/haunted.webp",
  "/DareTales/mystery.webp",
  "/DareTales/demon_&_devil.webp"
];

// Install
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
    );
    self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request).then(cacheResponse => {

            if(cacheResponse){
                return cacheResponse;
            }

            return fetch(event.request).then(networkResponse => {

                if(event.request.method === "GET"){

                    const copy = networkResponse.clone();

                    caches.open(CACHE_NAME).then(cache=>{
                        cache.put(event.request, copy);
                    });

                }

                return networkResponse;

            }).catch(()=>cacheResponse);

        })

    );

});
