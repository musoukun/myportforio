import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
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
		<html lang="ja">
			<body
				className={`${outfit.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
