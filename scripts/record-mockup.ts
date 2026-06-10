import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const DEV_SERVER_URL = "http://localhost:3000/track";
const VIDEO_OUTPUT = "videos/mobile-mockup.mp4";
const RECORDINGS_DIR = "/tmp/st-mockup-recordings";

async function waitForServer(url: string, retries = 30): Promise<void> {
	for (let i = 0; i < retries; i++) {
		try {
			const res = await fetch(url);
			if (res.ok) return;
		} catch {
			// not ready yet
		}
		await new Promise((r) => setTimeout(r, 1000));
	}
	throw new Error(`Dev server at ${url} did not become ready in time`);
}

async function main() {
	console.log("Waiting for dev server...");
	await waitForServer(DEV_SERVER_URL);
	console.log("Dev server is ready.");

	const browser = await chromium.launch({ headless: false });
	const context = await browser.newContext({
		viewport: { width: 390, height: 844 },
		deviceScaleFactor: 2,
		userAgent:
			"Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
		recordVideo: {
			dir: RECORDINGS_DIR,
			size: { width: 390, height: 844 },
		},
		geolocation: { latitude: 40.7128, longitude: -74.006 },
		permissions: ["geolocation"],
	});

	const page = await context.newPage();

	console.log("Navigating to app...");
	await page.goto(DEV_SERVER_URL);
	await page.waitForLoadState("networkidle");

	// Wait a moment to show initial state
	await page.waitForTimeout(1500);

	// Click Check In
	console.log("Clicking Check In...");
	await page.getByRole("button", { name: /check in/i }).click();
	await page.waitForTimeout(3000);

	// Click Take Break
	console.log("Clicking Take Break...");
	await page.getByRole("button", { name: /take break/i }).click();
	await page.waitForTimeout(2000);

	// Click Resume Work
	console.log("Clicking Resume Work...");
	await page.getByRole("button", { name: /resume work/i }).click();
	await page.waitForTimeout(2000);

	// Click Check Out
	console.log("Clicking Check Out...");
	await page.getByRole("button", { name: /check out/i }).click();
	await page.waitForTimeout(3000);

	// Show final state briefly
	await page.waitForTimeout(1500);

	console.log("Closing browser...");
	await context.close();
	await browser.close();

	// Find the recorded webm file
	const files = readdirSync(RECORDINGS_DIR);
	const webmFile = files.find((f) => f.endsWith(".webm"));
	if (!webmFile) {
		throw new Error("No webm recording found");
	}

	const webmPath = join(RECORDINGS_DIR, webmFile);
	console.log(`Found recording: ${webmPath}`);

	// Convert to mp4 with ffmpeg
	console.log("Converting to MP4...");
	execSync(
		`ffmpeg -y -i "${webmPath}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -an "${VIDEO_OUTPUT}"`,
		{ stdio: "inherit" },
	);
	console.log(`Video saved to ${VIDEO_OUTPUT}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
