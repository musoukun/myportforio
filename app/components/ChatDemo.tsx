"use client";

import { useState, useEffect } from "react";

interface Message {
	id: number;
	sender: "user" | "ai";
	content: string;
	timestamp: Date;
}

const sampleConversation: Omit<Message, "id" | "timestamp">[] = [
	{
		sender: "user",
		content: "こんにちは！どのようなWebアプリケーションを開発できますか？",
	},
	{
		sender: "ai",
		content:
			"こんにちは！私は様々なWebアプリケーションの開発が可能です。React + Next.js でのSPAから、PHP + Laravel でのWebシステム、AIを活用したアプリケーションまで幅広く対応してきました。",
	},
	{
		sender: "user",
		content: "AIを活用したアプリケーションについて詳しく教えてください",
	},
	{
		sender: "ai",
		content:
			"Nextjs + TypeScript を使用して、自然言語でデータベースに問い合わせができるSQLAgentや、Web検索機能を持つLLMアプリケーションの開発経験があります。",
	},
	{ sender: "user", content: "過去にどのような開発実績がありますか？" },
	{
		sender: "ai",
		content:
			"7年間のアプリケーション開発経験があり、住宅基幹システムのWebアプリケーション、医薬系ECサイト、IoT関連の管理ツールなどを手がけてきました。技術スタックとしては Java + Spring、PHP + Laravel、Salesforce + Apex、そして最近ではReact + TypeScript でのモダンフロントエンド開発を得意としています。",
	},
	{ sender: "user", content: "チーム開発での役割はどうでしたか？" },
	{
		sender: "ai",
		content:
			"技術選定、開発環境の整備、教育資料の作成、E2Eテストの導入など、レガシーシステムからモダンな環境へのリプレイスなどに取り組んでいました！",
	},
];

export default function ChatDemo() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		if (currentIndex < sampleConversation.length) {
			const timer = setTimeout(
				() => {
					setIsTyping(true);
					setTimeout(() => {
						const newMessage: Message = {
							id: currentIndex,
							...sampleConversation[currentIndex],
							timestamp: new Date(),
						};
						setMessages((prev) => [...prev, newMessage]);
						setIsTyping(false);
						setCurrentIndex((prev) => prev + 1);
					}, 1000);
				},
				currentIndex === 0 ? 500 : 2000
			);

			return () => clearTimeout(timer);
		}
	}, [currentIndex]);

	const resetDemo = () => {
		setMessages([]);
		setCurrentIndex(0);
		setIsTyping(false);
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
				{/* チャットヘッダー */}
				<div className="bg-blue-600 text-white p-4 flex justify-between items-center">
					<div className="flex items-center space-x-3">
						<div className="w-3 h-3 bg-green-400 rounded-full"></div>
						<span className="font-medium">AIアシスタント デモ</span>
					</div>
					<button
						onClick={resetDemo}
						className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition-colors"
					>
						リセット
					</button>
				</div>

				{/* チャットエリア */}
				<div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
						>
							<div
								className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
									message.sender === "user"
										? "bg-blue-600 text-white"
										: "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border"
								}`}
							>
								<div className="flex items-center space-x-2 mb-1">
									<span className="text-xs font-medium">
										{message.sender === "user"
											? "あなた"
											: "AI"}
									</span>
								</div>
								<p className="text-sm">{message.content}</p>
							</div>
						</div>
					))}

					{/* タイピングインジケーター */}
					{isTyping && (
						<div className="flex justify-start">
							<div className="bg-white dark:bg-gray-700 border rounded-lg px-4 py-2 max-w-xs">
								<div className="flex items-center space-x-1">
									<span className="text-xs font-medium text-gray-600 dark:text-gray-300">
										AI
									</span>
								</div>
								<div className="flex space-x-1 mt-1">
									<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
									<div
										className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
										style={{ animationDelay: "0.1s" }}
									></div>
									<div
										className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
										style={{ animationDelay: "0.2s" }}
									></div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* 入力エリア（デモ用なので無効化） */}
				<div className="p-4 bg-white dark:bg-gray-800 border-t">
					<div className="flex space-x-2">
						<input
							type="text"
							placeholder=""
							className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
							disabled
						/>
						<button
							className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
							disabled
						>
							送信
						</button>
					</div>
					<p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center"></p>
				</div>
			</div>
		</div>
	);
}
