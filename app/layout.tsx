import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "./components/ServiceWorkerRegister";

export const metadata: Metadata = {
	metadataBase: new URL("https://simple-tracker.app"),
	title: {
		template: "%s | Simple Tracker",
		default: "Simple Tracker",
	},
	description:
		"Simple Tracker is a free, offline, privacy-first time tracking app.",
	keywords: [
		"time tracker",
		"offline time tracking",
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
		images: [
			{
				url: "/icon-512.png",
				width: 512,
				height: 512,
				alt: "Simple Tracker",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		images: ["/icon-512.png"],
	},
	icons: {
		icon: "/icon.svg",
		apple: "/icon-192.png",
	},
	manifest: "/manifest.json",
};

export const viewport: Viewport = {
	themeColor: "#0f172a",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
			<ServiceWorkerRegister />
		</html>
	);
}
