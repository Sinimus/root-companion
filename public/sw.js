// Self-destroying service worker.
// The PWA (next-pwa) was removed. Browsers that still have the old worker
// installed fetch this file on their next update check; it replaces the old
// worker, deletes every cache it left behind, unregisters itself and reloads
// open tabs so they are served from the network again.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: 'window' });
      await Promise.all(windows.map((client) => client.navigate(client.url)));
    })(),
  );
});
