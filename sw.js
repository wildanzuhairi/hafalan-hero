const CACHE_NAME="hafalanhero-v1";

const FILES=[

"./",
"./index.php",
"./style.css",
"./game.js",
"./hero.png",
"./offline.html"

];

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(FILES))

);

});

self.addEventListener("fetch",event=>{

event.respondWith(

fetch(event.request)

.catch(()=>{

return caches.match(event.request)

.then(res=>{

return res ||

caches.match("./offline.html");

});

})

);

});