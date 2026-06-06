"use client";

import Script from "next/script";

export function KoFiWidget() {
	return (
		<Script
			src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
			strategy="afterInteractive"
			onLoad={() => {
				if (
					typeof window !== "undefined" &&
					(window as any).kofiWidgetOverlay
				) {
					(window as any).kofiWidgetOverlay.draw("gabo_71096", {
						type: "floating-chat",
						"floating-chat.donateButton.text": "Support me",
						"floating-chat.donateButton.background-color": "#00b9fe",
						"floating-chat.donateButton.text-color": "#fff",
					});
				}
			}}
		/>
	);
}
