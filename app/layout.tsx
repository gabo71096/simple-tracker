import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ServiceWorkerRegister } from "./components/ServiceWorkerRegister";

export const metadata: Metadata = {
	metadataBase: new URL("https://simple-tracker.app"),
	title: {
		template: "%s | Simple Tracker",
		default: "Simple Tracker",
	},
	description:
		"Simple Tracker is a free, privacy-first time tracking app. All data stays on your device.",
	keywords: [
		"time tracker",
		"local time tracking",
		"privacy",
		"simple tracker",
		"free time tracking",
		"pwa",
	],
	authors: [{ name: "GL Labs" }],
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "Simple Tracker",
	},
	twitter: {
		card: "summary_large_image",
	},
	icons: {
		icon: "/icon.svg",
		shortcut: "/favicon.ico",
		apple: "/icon-192.png",
	},
	manifest: "/manifest.json",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#0f172a",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				{children}
				<Analytics />
			</body>
			<ServiceWorkerRegister />
		</html>
	);
}
