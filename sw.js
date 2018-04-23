self.addEventListener('install', function (event) {
  var indexPage = new Request('index.html');
  event.waitUntil(
    fetch(indexPage).then(function (response) {
      caches.open('pwabuilder-offline').then(function (cache) {
        console.log('[PWA Builder] Cached index page during Install' + response.url);
        return cache.addAll([
                    '/GeekStore/',
          '/GeekStore/cadastro.html',
          '/GeekStore/catalogo.html',
          '/GeekStore/catalogo2.html',
          '/GeekStore/formulario1.html',
          '/GeekStore/formulario2.html',
          '/GeekStore/formulario3.html',
          '/GeekStore/informacoes.html',
          '/GeekStore/informacoes2.html',
          '/GeekStore/login.html',
          '/GeekStore/index.html',
          '/GeekStore/manifest.json',

          '/GeekStore/a6.png',
          '/GeekStore/logo3.png',

         /* '/GeekStore/images/icons/icon-72x72.png',
          '/GeekStore/images/icons/icon-96x96.png',
          '/GeekStore/images/icons/icon-128x128.png',
          '/GeekStore/images/icons/icon-144x144.png',
          '/GeekStore/images/icons/icon-152x152.png',
          '/GeekStore/images/icons/icon-192x192.png',
          '/GeekStore/images/icons/icon-384x384.png',
          '/GeekStore/images/icons/icon-384x384.png',
          '/GeekStore/images/icons/icon-512x512.png',*/

          '/GeekStore/css/master.css',

          '/GeekStore/css/bootstrap-grid.css',
          '/GeekStore/css/bootstrap-grid.css.map',
          '/GeekStore/css/bootstrap-grid.min.css',
          '/GeekStore/css/bootstrap-grid.min.css.map',
          '/GeekStore/css/bootstrap-reboot.css',
          '/GeekStore/css/bootstrap-reboot.css.map',
          '/GeekStore/css/bootstrap-reboot.min.css',
          '/GeekStore/css/bootstrap-reboot.min.css.map',
          '/GeekStore/css/bootstrap.css.map',
          '/GeekStore/css/bootstrap.css',
          '/GeekStore/css/bootstrap.min.css.map',
          '/GeekStore/css/bootstrap.min.css',

          
          '/GeekStore/js/bootstrap.bundle.js',
          '/GeekStore/js/bootstrap.bundle.js.map',
          '/GeekStore/js/bootstrap.bundle.min.js',
          '/GeekStore/js/bootstrap.bundle.min.js.map',
          '/GeekStore/js/bootstrap.js',
          '/GeekStore/js/bootstrap.js.map',
          '/GeekStore/js/bootstrap.min.js',
          '/GeekStore/js/bootstrap.min.js.map'
          

        ]);
      });
    })
  );
});


//If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function (event) {
  var updateCache = function (request) {
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[PWA Builder] add page to offline' + response.url)
        return cache.put(request, response);
      });
    });
  };

  event.waitUntil(updateCache(event.request));

  event.respondWith(
    fetch(event.request).catch(function (error) {
      console.log('[PWA Builder] Network request Failed. Serving content from cache: ' + error);

      //Check to see if you have it in the cache
      //Return response
      //If not in the cache, then return error page
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report = !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
          return report
        });
      });
    })
  );
})






