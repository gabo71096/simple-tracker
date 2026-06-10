const CACHE_NAME = "simple-tracker-v2";
const STATIC_ASSETS = [
	"/",
	"/track",
	"/manifest.json",
	"/icon.svg",
	"/icon-192.png",
	"/icon-512.png",
	"/favicon.ico",
];

const RUNTIME_CACHE = "simple-tracker-runtime-v2";

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
	);
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames
						.filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
						.map((name) => caches.delete(name)),
				),
			),
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== "GET") return;

	// Next.js static chunks: cache-first, long-lived
	if (url.pathname.startsWith("/_next/static/")) {
		event.respondWith(
			caches.match(request).then((cached) => {
				if (cached) return cached;
				return fetch(request).then((response) => {
					if (response.ok) {
						const clone = response.clone();
						caches
							.open(RUNTIME_CACHE)
							.then((cache) => cache.put(request, clone));
					}
					return response;
				});
			}),
		);
		return;
	}

	// Navigation requests: network-first, fallback to cache then /track
	if (request.mode === "navigate") {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const clone = response.clone();
					caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
					return response;
				})
				.catch(() =>
					caches.match(request).then((cached) => {
						if (cached) return cached;
						return caches.match("/track");
					}),
				),
		);
		return;
	}

	// Static assets: cache-first, fallback to network
	event.respondWith(
		caches.match(request).then((cached) => {
			if (cached) return cached;
			return fetch(request).then((response) => {
				if (response.ok) {
					const clone = response.clone();
					caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
				}
				return response;
			});
		}),
	);
});
