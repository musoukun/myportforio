import type { Metadata, Viewport } from "next";
import { Cinzel, M_PLUS_Rounded_1c } from "next/font/google";
import styles from "./world.module.css";

// Open Spire の区画 (/openspire/ 以下)。ゲームのタイトル画面と同じ字 (ロゴは Cinzel、文は M PLUS Rounded 1c) と色にする
const cinzel = Cinzel({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-cinzel" });
// 日本語の字は数が多いので先読みしない (使う字の分だけブラウザが読む)
const rounded = M_PLUS_Rounded_1c({ weight: ["400", "700", "800"], preload: false, variable: "--font-rounded" });

export const metadata: Metadata = {
	metadataBase: new URL("https://musoukun-site.vercel.app"),
	title: { default: "Open Spire", template: "%s | Open Spire" },
	description: "精霊の心臓を王冠に閉じこめた王と、森に着いた旅人たちのデッキ構築ローグライク。",
	openGraph: {
		siteName: "Open Spire",
		images: [{ url: "/openspire/og.jpg", width: 1200, height: 630 }],
		locale: "ja_JP",
		type: "website",
	},
};

export const viewport: Viewport = { themeColor: "#0f0d0a" };

export default function OpenSpireLayout({ children }: { children: React.ReactNode }) {
	return <div className={`${styles.world} ${cinzel.variable} ${rounded.variable}`}>{children}</div>;
}
