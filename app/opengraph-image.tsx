import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Simple Tracker - Track your time, locally";
export const size = {
	width: 1200,
	height: 630,
};

export default async function Image() {
	const fontPath = join(
		process.cwd(),
		"node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
	);
	const fontData = await readFile(fontPath);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#0f172a",
				fontFamily: "Geist",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "24px",
					padding: "48px 64px",
					backgroundColor: "#1e293b",
					borderRadius: "24px",
					border: "1px solid #334155",
				}}
			>
				<svg
					width="120"
					height="120"
					viewBox="0 0 512 512"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Simple Tracker app icon"
				>
					<rect width="512" height="512" rx="96" fill="#0d9488" />
					<circle
						cx="256"
						cy="256"
						r="160"
						fill="none"
						stroke="white"
						stroke-width="32"
					/>
					<line
						x1="256"
						y1="256"
						x2="256"
						y2="136"
						stroke="white"
						stroke-width="32"
						stroke-linecap="round"
					/>
					<line
						x1="256"
						y1="256"
						x2="336"
						y2="256"
						stroke="white"
						stroke-width="32"
						stroke-linecap="round"
					/>
				</svg>
				<div
					style={{
						fontSize: "72px",
						fontWeight: "700",
						color: "#ffffff",
					}}
				>
					Simple Tracker
				</div>
				<div
					style={{
						fontSize: "32px",
						color: "#94a3b8",
					}}
				>
					Track your time locally. No account required.
				</div>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{
					name: "Geist",
					data: fontData,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
