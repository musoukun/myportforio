"use client";

import React from "react";
import Link from "next/link";
import ResponsiveFluidBlobs from "../components/ResponsiveFluidBlobs";

export default function TestResponsivePage() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
			{/* Navigation */}
			<nav className="mb-8">
				<Link
					href="/"
					className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center"
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
			</nav>

			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
					レスポンシブFluidBlobsテスト
				</h1>

				{/* 様々なサイズでのテスト */}
				<div className="space-y-8">
					{/* 大きなコンテナ */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
							大きなコンテナ (1000x600px)
						</h2>
						<div
							style={{
								width: "1000px",
								height: "600px",
								maxWidth: "100%",
							}}
						>
							<ResponsiveFluidBlobs />
						</div>
					</div>

					{/* 中程度のコンテナ */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
							中程度のコンテナ (700x400px)
						</h2>
						<div
							style={{
								width: "700px",
								height: "400px",
								maxWidth: "100%",
							}}
						>
							<ResponsiveFluidBlobs />
						</div>
					</div>

					{/* 小さなコンテナ */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
							小さなコンテナ (400x300px)
						</h2>
						<div
							style={{
								width: "400px",
								height: "300px",
								maxWidth: "100%",
							}}
						>
							<ResponsiveFluidBlobs />
						</div>
					</div>

					{/* モバイルサイズのコンテナ */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
							モバイルサイズ (320x240px)
						</h2>
						<div
							style={{
								width: "320px",
								height: "240px",
								maxWidth: "100%",
							}}
						>
							<ResponsiveFluidBlobs />
						</div>
					</div>

					{/* フルワイドコンテナ */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
							フルワイド (500px高さ)
						</h2>
						<div style={{ width: "100%", height: "500px" }}>
							<ResponsiveFluidBlobs />
						</div>
					</div>

					{/* カスタムスタイルの例 */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
							カスタムスタイル
						</h2>
						<div
							style={{
								width: "600px",
								height: "350px",
								maxWidth: "100%",
							}}
						>
							<ResponsiveFluidBlobs
								className="border-4 border-purple-500"
								style={{
									borderRadius: "24px",
									background:
										"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
								}}
							/>
						</div>
					</div>
				</div>

				{/* 説明 */}
				<div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
					<h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
						レスポンシブ機能
					</h3>
					<ul className="space-y-2 text-blue-800 dark:text-blue-200">
						<li>
							• コンテナサイズに応じて子脈の数が自動調整されます
						</li>
						<li>
							•
							デバイスサイズに応じてカメラ位置とFOVが最適化されます
						</li>
						<li>
							•
							ResizeObserverを使用してリアルタイムでサイズ変更に対応します
						</li>
						<li>• 最小高さ300pxが設定されています</li>
						<li>
							•
							境界半径や背景色などのスタイルはpropsで調整可能です
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
