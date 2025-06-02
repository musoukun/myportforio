"use client";

import {
	ActionBarPrimitive,
	BranchPickerPrimitive,
	ComposerPrimitive,
	MessagePrimitive,
	ThreadPrimitive,
	useMessage,
} from "@assistant-ui/react";
import type { FC } from "react";
import {
	ArrowDownIcon,
	CheckIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CopyIcon,
	PencilIcon,
	RefreshCwIcon,
	SendHorizontalIcon,
	Volume2,
	Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/markdown-text";
import { TooltipIconButton } from "@/components/tooltip-icon-button";
import { useEffect, useState } from "react";
import { getR2D2Engine } from "@/lib/r2d2-audio-engine";

export const R2D2Thread: FC = () => {
	return (
		<ThreadPrimitive.Root
			className="flex h-full flex-col overflow-hidden rounded-2xl"
			style={{
				["--thread-max-width" as string]: "100%",
				background:
					"linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)",
			}}
		>
			{/* ヘッダー */}
			<div className="bg-gradient-to-r from-orange-400 to-pink-500 p-4 flex items-center gap-3 rounded-t-2xl">
				<div className="relative">
					<Bot className="size-8 text-white" />
					<div className="absolute -top-1 -right-1 size-3 bg-yellow-300 rounded-full animate-pulse" />
				</div>
				<div>
					<h2 className="text-white font-bold text-lg">AIロボくん</h2>
					<p className="text-orange-100 text-sm">一緒に話そう！✨</p>
				</div>
			</div>

			<ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-transparent px-4 pt-4">
				<R2D2Welcome />

				<ThreadPrimitive.Messages
					components={{
						UserMessage: R2D2UserMessage,
						EditComposer: R2D2EditComposer,
						AssistantMessage: R2D2AssistantMessage,
					}}
				/>

				<ThreadPrimitive.If empty={false}>
					<div className="min-h-8 flex-grow" />
				</ThreadPrimitive.If>

				<div className="sticky bottom-0 mt-3 flex w-full flex-col items-center justify-end rounded-t-lg bg-gradient-to-t from-white/80 to-transparent pb-4 pt-4">
					<ThreadScrollToBottom />
					<R2D2Composer />
				</div>
			</ThreadPrimitive.Viewport>
		</ThreadPrimitive.Root>
	);
};

const ThreadScrollToBottom: FC = () => {
	return (
		<ThreadPrimitive.ScrollToBottom asChild>
			<TooltipIconButton
				tooltip="下までスクロール"
				variant="outline"
				className="absolute -top-8 rounded-full disabled:invisible bg-white/80 hover:bg-white border-orange-200"
			>
				<ArrowDownIcon className="text-orange-600" />
			</TooltipIconButton>
		</ThreadPrimitive.ScrollToBottom>
	);
};

const R2D2Welcome: FC = () => {
	return (
		<ThreadPrimitive.Empty>
			<div className="flex w-full flex-grow flex-col">
				<div className="flex w-full flex-grow flex-col items-center justify-center text-center p-6">
					<div className="relative mb-4">
						<Bot className="size-16 text-orange-600" />
						<div className="absolute -top-2 -right-2 size-4 bg-yellow-400 rounded-full animate-bounce" />
						<div className="absolute -bottom-2 -left-2 size-3 bg-blue-400 rounded-full animate-pulse" />
					</div>
					<h3 className="text-2xl font-bold text-orange-800 mb-2">
						ビープ！AIロボくんだよ！
					</h3>
					<p className="text-orange-700 text-lg font-medium mb-4">
						久しぶりだね！元気だった？
					</p>
				</div>
				<R2D2WelcomeSuggestions />
			</div>
		</ThreadPrimitive.Empty>
	);
};

const R2D2WelcomeSuggestions: FC = () => {
	return (
		<div className="mt-3 flex w-full flex-wrap items-stretch justify-center gap-3">
			<ThreadPrimitive.Suggestion
				className="hover:bg-white/80 flex grow basis-0 min-w-[120px] flex-col items-center justify-center rounded-xl border-2 border-orange-200 bg-white/60 p-3 transition-all duration-200 hover:scale-105 hover:border-orange-300"
				prompt="こんにちは！AIロボくん！"
				method="replace"
				autoSend
			>
				<span className="line-clamp-2 text-ellipsis text-sm font-semibold text-orange-800">
					こんにちは！👋
				</span>
			</ThreadPrimitive.Suggestion>
			<ThreadPrimitive.Suggestion
				className="hover:bg-white/80 flex grow basis-0 min-w-[120px] flex-col items-center justify-center rounded-xl border-2 border-orange-200 bg-white/60 p-3 transition-all duration-200 hover:scale-105 hover:border-orange-300"
				prompt="宇宙について教えて！"
				method="replace"
				autoSend
			>
				<span className="line-clamp-2 text-ellipsis text-sm font-semibold text-orange-800">
					宇宙について🚀
				</span>
			</ThreadPrimitive.Suggestion>
			<ThreadPrimitive.Suggestion
				className="hover:bg-white/80 flex grow basis-0 min-w-[120px] flex-col items-center justify-center rounded-xl border-2 border-orange-200 bg-white/60 p-3 transition-all duration-200 hover:scale-105 hover:border-orange-300"
				prompt="面白い話をして！"
				method="replace"
				autoSend
			>
				<span className="line-clamp-2 text-ellipsis text-sm font-semibold text-orange-800">
					楽しい話✨
				</span>
			</ThreadPrimitive.Suggestion>
		</div>
	);
};

const R2D2Composer: FC = () => {
	return (
		<ComposerPrimitive.Root className="focus-within:border-orange-400/50 flex w-full flex-wrap items-end rounded-2xl border-2 border-orange-200 bg-white/90 px-3 py-2 shadow-lg transition-all duration-200 focus-within:shadow-xl">
			<ComposerPrimitive.Input
				rows={1}
				autoFocus
				placeholder="AIロボくんに話しかけてみよう！💫✨"
				className="placeholder:text-orange-400 max-h-32 flex-grow resize-none border-none bg-transparent px-2 py-2 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed text-orange-800"
			/>
			<R2D2ComposerAction />
		</ComposerPrimitive.Root>
	);
};

const CircleStopIcon: FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="currentColor"
			width="16"
			height="16"
		>
			<rect width="10" height="10" x="3" y="3" rx="2" />
		</svg>
	);
};

const R2D2ComposerAction: FC = () => {
	return (
		<>
			<ThreadPrimitive.If running={false}>
				<ComposerPrimitive.Send asChild>
					<TooltipIconButton
						tooltip="送信"
						variant="default"
						className="my-1 size-9 p-2 transition-all duration-200 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 hover:scale-110"
					>
						<SendHorizontalIcon className="text-white" />
					</TooltipIconButton>
				</ComposerPrimitive.Send>
			</ThreadPrimitive.If>
			<ThreadPrimitive.If running>
				<ComposerPrimitive.Cancel asChild>
					<TooltipIconButton
						tooltip="キャンセル"
						variant="outline"
						className="my-1 size-9 p-2 transition-all duration-200 bg-red-500 hover:bg-red-600 border-red-300"
					>
						<CircleStopIcon />
					</TooltipIconButton>
				</ComposerPrimitive.Cancel>
			</ThreadPrimitive.If>
		</>
	);
};

const R2D2UserMessage: FC = () => {
	return (
		<MessagePrimitive.Root className="grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 [&:where(>*)]:col-start-2 w-full py-3">
			<R2D2UserActionBar />

			<div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white max-w-[80%] break-words rounded-2xl px-4 py-3 col-start-2 row-start-2 shadow-lg">
				<MessagePrimitive.Content />
			</div>

			<BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
		</MessagePrimitive.Root>
	);
};

const R2D2UserActionBar: FC = () => {
	return (
		<ActionBarPrimitive.Root
			hideWhenRunning
			autohide="not-last"
			className="flex flex-col items-end col-start-1 row-start-2 mr-3 mt-3"
		>
			<ActionBarPrimitive.Edit asChild>
				<TooltipIconButton
					tooltip="編集"
					className="hover:bg-orange-100"
				>
					<PencilIcon className="text-orange-600" />
				</TooltipIconButton>
			</ActionBarPrimitive.Edit>
		</ActionBarPrimitive.Root>
	);
};

const R2D2EditComposer: FC = () => {
	return (
		<ComposerPrimitive.Root className="bg-white/80 border-2 border-orange-200 my-4 flex w-full flex-col gap-2 rounded-2xl shadow-lg">
			<ComposerPrimitive.Input className="text-orange-800 flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none placeholder:text-orange-400" />

			<div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
				<ComposerPrimitive.Cancel asChild>
					<Button
						variant="ghost"
						className="text-orange-600 hover:bg-orange-100"
					>
						キャンセル
					</Button>
				</ComposerPrimitive.Cancel>
				<ComposerPrimitive.Send asChild>
					<Button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600">
						送信
					</Button>
				</ComposerPrimitive.Send>
			</div>
		</ComposerPrimitive.Root>
	);
};

const R2D2AudioPlayer: FC = () => {
	const message = useMessage();

	const handlePlayAudio = async () => {
		try {
			const textContent = message.content.filter(
				(c) => c.type === "text"
			);
			if (textContent.length === 0) return;

			const messageText = textContent
				.map((c) => (c as { text: string }).text)
				.join(" ");

			const engine = getR2D2Engine();
			await engine.initializeAudioContext();

			// 参考プログラムと同じように "auto" で感情を判定
			const result = await engine.generateSpeech(messageText, "auto");

			console.log(`手動音声再生完了: ${result.message}`);
		} catch (error) {
			console.error("音声生成エラー:", error);
		}
	};

	return (
		<div className="mt-2 flex items-center gap-2">
			<button
				onClick={handlePlayAudio}
				className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 bg-white/80 rounded-full px-2 py-1 border border-orange-200 hover:bg-orange-50 transition-colors"
			>
				<Volume2 className="size-3" />
				<span>AIロボくんの声を聞く</span>
			</button>
		</div>
	);
};

const R2D2AssistantActionBar: FC = () => {
	return (
		<ActionBarPrimitive.Root
			hideWhenRunning
			autohide="not-last"
			autohideFloat="single-branch"
			className="text-orange-600 data-[floating]:bg-white/90 col-start-3 row-start-2 -ml-1 flex gap-1 data-[floating]:absolute data-[floating]:rounded-lg data-[floating]:border data-[floating]:border-orange-200 data-[floating]:p-1 data-[floating]:shadow-lg"
		>
			<ActionBarPrimitive.Copy asChild>
				<TooltipIconButton
					tooltip="コピー"
					className="hover:bg-orange-100"
				>
					<MessagePrimitive.If copied>
						<CheckIcon className="text-green-600" />
					</MessagePrimitive.If>
					<MessagePrimitive.If copied={false}>
						<CopyIcon />
					</MessagePrimitive.If>
				</TooltipIconButton>
			</ActionBarPrimitive.Copy>
			<ActionBarPrimitive.Reload asChild>
				<TooltipIconButton
					tooltip="再生成"
					className="hover:bg-orange-100"
				>
					<RefreshCwIcon />
				</TooltipIconButton>
			</ActionBarPrimitive.Reload>
		</ActionBarPrimitive.Root>
	);
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
	className,
	...rest
}) => {
	return (
		<BranchPickerPrimitive.Root
			hideWhenSingleBranch
			className={cn(
				"text-orange-600 inline-flex items-center text-xs",
				className
			)}
			{...rest}
		>
			<BranchPickerPrimitive.Previous asChild>
				<TooltipIconButton
					tooltip="前へ"
					className="hover:bg-orange-100"
				>
					<ChevronLeftIcon />
				</TooltipIconButton>
			</BranchPickerPrimitive.Previous>
			<span className="font-medium mx-2">
				<BranchPickerPrimitive.Number /> /{" "}
				<BranchPickerPrimitive.Count />
			</span>
			<BranchPickerPrimitive.Next asChild>
				<TooltipIconButton
					tooltip="次へ"
					className="hover:bg-orange-100"
				>
					<ChevronRightIcon />
				</TooltipIconButton>
			</BranchPickerPrimitive.Next>
		</BranchPickerPrimitive.Root>
	);
};

const R2D2AssistantMessage: FC = () => {
	const message = useMessage();
	const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

	useEffect(() => {
		// メッセージの内容が更新され、完了している場合に音声を自動再生
		if (message.status?.type === "complete" && !hasPlayedAudio) {
			const textContent = message.content.filter(
				(c) => c.type === "text"
			);
			if (textContent.length > 0) {
				const messageText = textContent
					.map((c) => (c as { text: string }).text)
					.join(" ");

				const playAudioAutomatically = async () => {
					try {
						if (!messageText.trim()) return;

						const engine = getR2D2Engine();
						await engine.initializeAudioContext();

						// 参考プログラムと同じように "auto" で感情を判定
						const result = await engine.generateSpeech(
							messageText,
							"auto"
						);

						console.log(`自動音声再生完了: ${result.message}`);
						setHasPlayedAudio(true);
					} catch (error) {
						console.error("自動音声再生エラー:", error);
					}
				};

				// 少し遅延させてから実行
				setTimeout(playAudioAutomatically, 500);
			}
		}
	}, [message.status, message.content, hasPlayedAudio]);

	return (
		<MessagePrimitive.Root className="relative grid w-full grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr] py-3">
			{/* R2-D2アバター */}
			<div className="col-start-1 row-start-1 mr-3 mt-1">
				<div className="relative">
					<div className="size-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
						<Bot className="size-6 text-white" />
					</div>
					<div className="absolute -top-1 -right-1 size-3 bg-yellow-300 rounded-full animate-pulse" />
				</div>
			</div>

			{/* メッセージ内容 */}
			<div className="col-start-2 row-start-1 my-1.5 max-w-[85%] break-words leading-7">
				<div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-orange-200 rounded-2xl px-4 py-3 shadow-lg">
					<MessagePrimitive.Content
						components={{ Text: MarkdownText }}
					/>

					{/* 音声再生ボタン（手動再生用） */}
					<R2D2AudioPlayer />
				</div>
			</div>

			<R2D2AssistantActionBar />

			<BranchPicker className="col-start-2 row-start-2 -ml-2 mr-2" />
		</MessagePrimitive.Root>
	);
};
