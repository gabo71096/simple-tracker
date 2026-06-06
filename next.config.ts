import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const isDev = process.env.NODE_ENV === "development";

const csp = [
	"default-src 'self'",
	`script-src 'self' 'unsafe-inline' ${isDev ? "unsafe-eval" : ""} https://storage.ko-fi.com https://www.gstatic.com`,
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: https://image.mux.com",
	"media-src 'self' blob: https://stream.mux.com",
	"connect-src 'self' https://stream.mux.com https://image.mux.com",
	"font-src 'self'",
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
