import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Zen_Maru_Gothic } from "next/font/google";
import Countdown from "./Countdown";

// 誕生日までのカウントダウン (/birthday/)。数字と見出しは Dela Gothic One、文は Zen Maru Gothic
// 日本語の字は数が多いので先読みしない (使う字の分だけブラウザが読む)
const dela = Dela_Gothic_One({ weight: "400", preload: false, variable: "--font-dela" });
const maru = Zen_Maru_Gothic({ weight: ["700"], preload: false, variable: "--font-maru" });

export const metadata: Metadata = {
	title: "Boku_Risky と musoukun の誕生日まで",
	description: "11月25日の誕生日までを、ろうそくやケーキのキャラクターたちが数えるページ。",
};

export const viewport: Viewport = { themeColor: "#f6ecd2" };

export default function BirthdayPage() {
	return (
		<div className={`${dela.variable} ${maru.variable}`}>
			<Countdown />
		</div>
	);
}
