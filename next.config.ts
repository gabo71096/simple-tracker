import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const isDev = process.env.NODE_ENV === "development";

const csp = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline' ${isDev ? "unsafe-eval" : ""} https://storage.ko-fi.com https://www.gstatic.com`,
	"style-src 'self' 'unsafe-inline' https://storage.ko-fi.com https://fonts.googleapis.com",
	"img-src 'self' data: https://image.mux.com https://storage.ko-fi.com",
	"media-src 'self' blob: https://*.mux.com",
	"connect-src 'self' https://*.mux.com https://storage.ko-fi.com https://inferred.litix.io",
	"font-src 'self' data: https://fonts.gstatic.com",
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
