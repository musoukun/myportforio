import type { Metadata } from "next";
import { DotGothic16, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const pixel = DotGothic16({
	variable: "--font-pixel",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Hatakeyama — Web Developer",
	description:
		"React + Next.js + TypeScript でモダンなWebアプリケーションを開発",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" className="dark">
			<body
				className={`${outfit.variable} ${geistMono.variable} ${pixel.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
