import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorkerRegister } from "./components/ServiceWorkerRegister";

export const metadata: Metadata = {
	title: "Simple Tracker",
	description: "Simple offline time tracking app",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				{children}
				<ServiceWorkerRegister />
			</body>
		</html>
	);
}
