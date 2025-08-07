const CACHE_NAME = 'madebyalviyan-v3';
const CRITICAL_CACHE = 'critical-v3';

// Dynamic cache strategy - cache resources as they're requested
const urlsToCache = [
  '/',
  '/writing/',
  '/favicon.svg',
  '/manifest.json'
];

// Critical resources that should be cached immediately
const criticalResources = [
  '/',
  '/favicon.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.all([
      // Cache critical resources first
      caches.open(CRITICAL_CACHE).then(cache => cache.addAll(criticalResources)),
      // Then cache all resources
      caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    ])
  );
  // Force activation of new service worker
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  const request = event.request;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(CRITICAL_CACHE).then(criticalCache => {
      return criticalCache.match(request).then(criticalResponse => {
        if (criticalResponse) {
          return criticalResponse;
        }
        
        return caches.open(CACHE_NAME).then(cache => {
          return cache.match(request).then(response => {
            if (response) {
              return response;
            }
            
            return fetch(request).then(fetchResponse => {
              // Don't cache if not successful
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                return fetchResponse;
              }
              
              // Clone the response
              const responseToCache = fetchResponse.clone();
              
              // Cache static assets with longer TTL strategy
              if (request.url.includes('/_astro/') || 
                  request.url.includes('.woff2') ||
                  request.url.includes('.avif') ||
                  request.url.includes('.webp') ||
                  request.url.includes('.jpg') ||
                  request.url.includes('.png') ||
                  request.url.includes('.svg') ||
                  request.url.includes('.css') ||
                  request.url.includes('.js')) {
                cache.put(request, responseToCache);
              }
              // Cache HTML pages with shorter TTL
              else if (request.url.includes('.html') || 
                       request.url === self.location.origin + '/' ||
                       request.url.includes('/writing/')) {
                cache.put(request, responseToCache);
              }
              
              return fetchResponse;
            });
          });
        });
      });
    })
  );
});

// Clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName !== CRITICAL_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all pages
  return self.clients.claim();
});

// Background sync for offline capabilities
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    );
  }
});

// Push notifications (if needed)
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/favicon.svg',
        badge: '/favicon.svg'
      })
    );
  }
});
