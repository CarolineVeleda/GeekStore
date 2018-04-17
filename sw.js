//This is the "Offline page" service worker

//Add this below content to your HTML page, or add the js file to your page at the very top to register sercie worker



//This is the "Offline page" service worker

//Install stage sets up the offline page in the cahche and opens a new cache
self.addEventListener('install', function (event) {
    var indexPage = new Request('index.html');
    event.waitUntil(
        fetch(indexPage).then(function (response) {
            caches.open('pwabuilder-offline').then(function (cache) {
                console.log('[PWA Builder] Cached index page during Install' + response.url);
                return cache.addAll(['/GeekStore/', '/GeekStore/index.html', '/GeekStore/cadastro.html',
                  '/GeekStore/sw.js','/GeekStore/sw.js', '/GeekStore/catalogo.html','/GeekStore/catalogo2.html','/GeekStore/formulario1.html',
                  '/GeekStore/formulario2.html','/GeekStore/formulario3.html','/GeekStore/informacoes.html','/GeekStore/informacoes2.html',
                  '/GeekStore/login.html','/GeekStore/master.css'
                ]);
            });
        })
    );
});


//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
        console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
        return caches.open('pwabuilder-offline').then(function(cache) {
          return cache.match('offline.html');
      });
    }));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline').then(function(cache) {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
    return cache.put(offlinePage, response);
  });
});
