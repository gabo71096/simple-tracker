self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
self.addEventListener("fetch", () => {
	// No-op — satisfies Chrome's PWA install requirement without intercepting requests
});
