"use client";

import React from "react";
import Link from "next/link";
import ResponsiveFluidBlobs from "../components/ResponsiveFluidBlobs";

export default function KomyakuPage() {
	return (
		<div className="min-h-screen bg-black">
			{/* Navigation Header */}
			<nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<Link
							href="/"
							className="text-white hover:text-blue-400 transition-colors flex items-center"
						>
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							ポートフォリオに戻る
						</Link>
						<h1 className="text-xl font-bold text-white">
							Komyaku - Metaball Simulation
						</h1>
					</div>
				</div>
			</nav>

			{/* Main Content - レスポンシブ対応 */}
			<div className="pt-16 px-4 pb-4 h-screen">
				<div className="h-full max-w-7xl mx-auto">
					<ResponsiveFluidBlobs
						style={{
							borderRadius: "12px",
							height: "100%",
						}}
					/>
				</div>
			</div>

			{/* Info Panel - モバイル対応 */}
			<div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg z-40">
				<h3 className="font-bold mb-2">Komyaku Metaball</h3>
				<p className="text-sm text-gray-300 mb-2">
					Three.jsを使用したインタラクティブなmetaballシミュレーション
				</p>
				<div className="flex flex-wrap gap-1">
					{["Three.js", "React", "TypeScript", "WebGL"].map(
						(tech) => (
							<span
								key={tech}
								className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs"
							>
								{tech}
							</span>
						)
					)}
				</div>
			</div>
		</div>
	);
}
