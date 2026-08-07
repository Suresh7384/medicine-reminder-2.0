const CACHE_VERSION = "v2";

self.addEventListener("install", () => {
  // Activate this new service worker as soon as it finishes installing,
  // instead of waiting for all tabs to close.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of any already-open tabs immediately.
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body || data.message,
      icon: "/logo192.png",
      badge: "/logo192.png",
      vibrate: [200, 100, 200],
      requireInteraction: true,
      data: {
        reminderId: data.reminderId,
        url: data.reminderId ? `/reminder/${data.reminderId}` : "/dashboard",
      },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const reminderId = event.notification.data && event.notification.data.reminderId;
  const targetUrl = reminderId ? `/reminder/${reminderId}` : "/dashboard";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});