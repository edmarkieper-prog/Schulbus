/* Service Worker: macht die App-Oberfläche offline nutzbar (Kartenkacheln brauchen weiterhin Internet).
   Strategie: erst Netzwerk (damit Updates sofort ankommen), bei Offline-Betrieb aus dem Cache. */
const CACHE = "schulbus-fahrer-v8"; // Version 2.1: Tour-Editor, Anwesenheit, Excel
const DATEIEN = [
  "./",
  "./index.html",
  "./app.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./lib/firebase-app-compat.js",
  "./lib/firebase-auth-compat.js",
  "./lib/firebase-firestore-compat.js",
  "./lib/xlsx.full.min.js",
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
  // Kartenkacheln, Adresssuche und Google-Server (Anmeldung/Datenbank) nie anfassen
  if (url.hostname.includes("openstreetmap.org") || url.hostname.endsWith("googleapis.com")) return;
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
