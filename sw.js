/* Service Worker: macht die App-Oberfläche offline nutzbar (Kartenkacheln brauchen weiterhin Internet).
   Strategie: erst Netzwerk (damit Updates sofort ankommen), bei Offline-Betrieb aus dem Cache. */
const CACHE = "schulbus-fahrer-v3"; // Version 1.1
const DATEIEN = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // Kartenkacheln und Adresssuche nie anfassen
  if (url.hostname.includes("openstreetmap.org")) return;
  e.respondWith(
    fetch(e.request).then(antwort => {
      if (antwort.ok && (url.origin === location.origin || url.hostname === "unpkg.com")){
        const kopie = antwort.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopie));
      }
      return antwort;
    }).catch(() => caches.match(e.request, { ignoreSearch: url.origin === location.origin }))
  );
});
