import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "App",
	description: "Track your time with Simple Tracker.",
	robots: {
		index: false,
		follow: false,
	},
};

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
