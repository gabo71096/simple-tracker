"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker
					.register("/sw.js")
					.then((registration) => {
						console.log("SW registered");

						// Force the browser to check for a new SW immediately
						registration.update();

						// When a new SW takes control, reload the page
						navigator.serviceWorker.addEventListener(
							"controllerchange",
							() => {
								console.log("New SW controller, reloading...");
								window.location.reload();
							},
						);

						// Listen for new SW installation
						registration.addEventListener("updatefound", () => {
							const newWorker = registration.installing;
							if (!newWorker) return;

							newWorker.addEventListener("statechange", () => {
								if (
									newWorker.state === "installed" &&
									navigator.serviceWorker.controller
								) {
									// New SW is waiting, tell it to skip waiting
									console.log("New SW waiting, skipping...");
									newWorker.postMessage({ type: "SKIP_WAITING" });
								}
							});
						});
					})
					.catch((err) => {
						console.error("Service Worker registration failed:", err);
					});
			});
		}
	}, []);

	return null;
}
