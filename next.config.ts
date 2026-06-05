import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
	reactStrictMode: true,
};

export default withNextVideo(nextConfig);
