import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const isDev = process.env.NODE_ENV === "development";

const csp = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline' ${isDev ? "unsafe-eval" : ""} https://storage.ko-fi.com https://www.gstatic.com`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: https://image.mux.com",
	"media-src 'self' blob: https://*.mux.com",
	"connect-src 'self' https://*.mux.com https://storage.ko-fi.com https://inferred.litix.io",
	"font-src 'self' data:",
	"manifest-src 'self'",
	"worker-src 'self' blob:",
	"frame-src 'self' https://ko-fi.com",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: "/sw.js",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=0, must-revalidate",
					},
				],
			},
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: csp,
					},
				],
			},
		];
	},
};

export default withNextVideo(nextConfig);
