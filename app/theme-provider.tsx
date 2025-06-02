"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// システムのテーマ設定を検出して適用
		const applyTheme = () => {
			const isDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;

			if (isDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		};

		// 初回実行
		applyTheme();

		// システム設定変更を監視
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => applyTheme();

		mediaQuery.addEventListener("change", handleChange);

		// クリーンアップ
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return <>{children}</>;
}
