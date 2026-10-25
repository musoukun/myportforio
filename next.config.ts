import type { NextConfig } from "next";

// 書き出しだけの静的サイト (output: "export") だと POST を受ける API (app/api/openspire/bug-report) が置けないので、
// Vercel の Next.js としてそのまま動かす (Open Spire の不具合報告の受け口。openslaythe の issue #1180)
const nextConfig: NextConfig = {
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	// public/ に置いた 1 枚の HTML のページ (書き出しのときは静的なホストが index.html を返していた)
	async rewrites() {
		return [{ source: "/form-dev-game/", destination: "/form-dev-game/index.html" }];
	},
};

export default nextConfig;
