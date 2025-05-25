"use client";

import { useState, useEffect } from "react";

interface Message {
	id: number;
	sender: "user" | "ai" | "hatakeyama";
	content: string;
	timestamp: Date;
}

const sampleConversation: Omit<Message, "id" | "timestamp">[] = [
	{
		sender: "user",
		content: "どのようなWebアプリケーションを開発できますか？",
	},
	{
		sender: "hatakeyama",
		content:
			"React + Next.js、PHP + Laravel でのWebシステム開発、AIを活用したアプリケーションが得意です。",
	},
	{ sender: "user", content: "AIアプリケーションはどんなものが作れる？" },
	{
		sender: "hatakeyama",
		content:
			"現在は主にNextjs + Typescriptを使ってAIAgentの開発に取り組んでいます!",
	},
	{ sender: "user", content: "どのような業務を主にやっていたの？" },
	{
		sender: "hatakeyama",
		content:
			"レガシーシステムからモダンなシステムのへの移行（システム開発業務）、技術選定や教育に取り組んでいました。",
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
					}, 1500);
				},
				currentIndex === 0 ? 1000 : 3000
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
		<div className="w-full mx-auto">
			{/* AI Chat Demo Header */}
			<div className="text-center mb-4">
				<h3 className="text-xl font-semibold text-white mb-2">
					私について
				</h3>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
				{/* Chat Header - サイズ大きく */}
				<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-4">
							<div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
							<span className="font-semibold text-lg">
								AI Assistant
							</span>
						</div>
						<button
							onClick={resetDemo}
							className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-blue-950 text-sm transition-all duration-300"
						>
							リセット
						</button>
					</div>
				</div>

				{/* Chat Messages Area - さらに大きく */}
				<div className="h-[28rem] lg:h-[32rem] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
						>
							<div
								className={`max-w-md lg:max-w-lg xl:max-w-xl px-5 py-4 rounded-2xl shadow-lg ${
									message.sender === "user"
										? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
										: "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-bl-sm"
								}`}
							>
								<div className="flex items-center space-x-2 mb-2">
									<span
										className={`text-sm font-medium ${
											message.sender === "user"
												? "text-blue-100"
												: "text-gray-500 dark:text-gray-400"
										}`}
									>
										{message.sender === "user"
											? "You"
											: "AI"}
									</span>
								</div>
								<p className="text-base leading-relaxed">
									{message.content}
								</p>
							</div>
						</div>
					))}

					{/* Typing Indicator */}
					{isTyping && (
						<div className="flex justify-start animate-fade-in">
							<div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-bl-sm px-5 py-4 max-w-md lg:max-w-lg shadow-lg">
								<div className="flex items-center space-x-2 mb-2">
									<span className="text-sm font-medium text-gray-500 dark:text-gray-400">
										AI
									</span>
								</div>
								<div className="flex space-x-1">
									<div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
									<div
										className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
										style={{ animationDelay: "0.1s" }}
									></div>
									<div
										className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
										style={{ animationDelay: "0.2s" }}
									></div>
								</div>
							</div>
						</div>
					)}

					{/* Empty State */}
					{messages.length === 0 && !isTyping && (
						<div className="text-center py-8">
							<div className="text-4xl mb-4">🤖</div>
							<p className="text-gray-500 dark:text-gray-400 text-sm">
								まもなく会話が始まります...
							</p>
						</div>
					)}
				</div>

				{/* Input Area (Disabled Demo) */}
				<div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
					<div className="flex space-x-3">
						<input
							type="text"
							placeholder=""
							className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
							disabled
						/>
						<button
							className="bg-gray-400 text-white p-2 rounded-full cursor-not-allowed"
							disabled
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
								/>
							</svg>
						</button>
					</div>
					<p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center"></p>
				</div>
			</div>

			{/* Tech Stack Indicator */}
			{/* <div className="mt-4 text-center">
				<div className="inline-flex items-center space-x-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2">
					<span className="text-xs text-gray-300">Built with</span>
					<span className="text-xs font-semibold text-blue-300">
						React
					</span>
					<span className="text-xs text-gray-300">+</span>
					<span className="text-xs font-semibold text-purple-300">
						LangChain.js
					</span>
				</div>
			</div> */}

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in {
					animation: fade-in 0.5s ease-out;
				}
			`}</style>
		</div>
	);
}
