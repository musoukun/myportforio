"use client";

import { useState, useEffect } from "react";

interface Message {
	id: number;
	sender: "user" | "hatakeyama";
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
				currentIndex === 0 ? 1000 : 1500
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
			<div className="text-center mb-3">
				<h3 className="text-base sm:text-lg font-semibold mb-1">
					私について
				</h3>
			</div>

			<div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
				{/* Header */}
				<div className="bg-neutral-100 dark:bg-neutral-800 px-4 sm:px-6 py-3 flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700">
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 bg-brand rounded-full" />
						<span className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-mono">
							Chat Demo
						</span>
					</div>
					<button
						onClick={resetDemo}
						className="text-xs text-neutral-400 hover:text-brand transition-colors font-mono uppercase tracking-wider"
					>
						Reset
					</button>
				</div>

				{/* Messages */}
				<div className="h-[20rem] sm:h-[24rem] lg:h-[28rem] overflow-y-auto p-4 sm:p-6 space-y-3">
					{messages.map((message) => (
						<div
							key={message.id}
							className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
						>
							<div
								className={`max-w-[80%] px-4 py-3 text-sm ${
									message.sender === "user"
										? "bg-brand/10 dark:bg-brand/15 text-neutral-900 dark:text-neutral-100 border border-brand/20"
										: "bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
								}`}
							>
								<div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5 font-mono">
									{message.sender === "user"
										? "You"
										: "hatakeyama"}
								</div>
								<p className="leading-relaxed">
									{message.content}
								</p>
							</div>
						</div>
					))}

					{/* Typing indicator */}
					{isTyping && (
						<div className="flex justify-start animate-fade-in">
							<div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-3">
								<div className="flex gap-1">
									<div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" />
									<div
										className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce"
										style={{ animationDelay: "0.1s" }}
									/>
									<div
										className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce"
										style={{ animationDelay: "0.2s" }}
									/>
								</div>
							</div>
						</div>
					)}

					{/* Empty state */}
					{messages.length === 0 && !isTyping && (
						<div className="text-center py-8">
							<p className="text-neutral-400 text-xs font-mono uppercase tracking-wider">
								Loading conversation...
							</p>
						</div>
					)}
				</div>

				{/* Input (disabled) */}
				<div className="px-4 sm:px-6 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700">
					<div className="flex gap-2">
						<input
							type="text"
							className="flex-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-400 cursor-not-allowed"
							placeholder=""
							disabled
						/>
						<button
							className="bg-neutral-200 dark:bg-neutral-700 text-neutral-400 px-3 py-2 cursor-not-allowed"
							disabled
						>
							<svg
								className="w-3.5 h-3.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(8px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in {
					animation: fade-in 0.4s ease-out;
				}
			`}</style>
		</div>
	);
}
