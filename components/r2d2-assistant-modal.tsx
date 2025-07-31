"use client";

import { Volume2, VolumeX, Bot } from "lucide-react";
import { type FC, forwardRef } from "react";
import { AssistantModalPrimitive } from "@assistant-ui/react";
import { R2D2Thread } from "@/components/r2d2-thread";
import { TooltipIconButton } from "@/components/tooltip-icon-button";
import { useAudio } from "@/lib/audio-context";
import React from "react";

export const R2D2AssistantModal: FC = () => {
	return (
		<AssistantModalPrimitive.Root>
			<AssistantModalPrimitive.Anchor className="fixed bottom-6 right-6 size-16">
				<AssistantModalPrimitive.Trigger asChild>
					<R2D2ModalButton />
				</AssistantModalPrimitive.Trigger>
			</AssistantModalPrimitive.Anchor>
			<AssistantModalPrimitive.Content
				sideOffset={20}
				className="z-50 h-[540px] w-[405px] overflow-clip rounded-2xl border-0 p-0 shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-1/2 data-[state=open]:slide-in-from-right-1/2 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=closed]:slide-out-to-right-1/2"
				style={{
					background:
						"linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)",
				}}
			>
				<R2D2Thread />
			</AssistantModalPrimitive.Content>
		</AssistantModalPrimitive.Root>
	);
};

interface R2D2ModalButtonProps {
	"data-state"?: "open" | "closed";
}

const R2D2ModalButton = forwardRef<HTMLButtonElement, R2D2ModalButtonProps>(
	({ "data-state": state, ...rest }, ref) => {
		const { isAudioEnabled, setAudioEnabled, setModalOpen } = useAudio();
		const tooltip =
			state === "open"
				? "AIロボくんとのチャットを閉じる"
				: "AIロボくんと話す";

		// Modal状態の変更を通知
		React.useEffect(() => {
			setModalOpen(state === "open");
		}, [state, setModalOpen]);

		return (
			<div className="relative">
				<TooltipIconButton
					variant="default"
					tooltip={tooltip}
					side="left"
					{...rest}
					className="size-full rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-br from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 border-2 border-white/20"
					ref={ref}
				>
					{/* R2-D2アイコン */}
					<div className="relative">
						<Bot
							data-state={state}
							className="size-8 text-white transition-all duration-300 data-[state=closed]:rotate-0 data-[state=open]:rotate-12 data-[state=closed]:scale-100 data-[state=open]:scale-110"
						/>

						{/* 子供向けの装飾 */}
						<div className="absolute -top-1 -right-1 size-3 bg-yellow-300 rounded-full animate-pulse" />
						<div
							className="absolute -bottom-1 -left-1 size-2 bg-blue-300 rounded-full animate-bounce"
							style={{ animationDelay: "0.5s" }}
						/>
					</div>

					<span className="sr-only">{tooltip}</span>
				</TooltipIconButton>

				{/* 音声ON/OFFトグル */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						setAudioEnabled(!isAudioEnabled);
					}}
					className="absolute -top-2 -right-2 size-6 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 border border-gray-200"
					title={isAudioEnabled ? "音声OFF" : "音声ON"}
				>
					{isAudioEnabled ? (
						<Volume2 className="size-3 text-green-600" />
					) : (
						<VolumeX className="size-3 text-red-600" />
					)}
				</button>
			</div>
		);
	}
);

R2D2ModalButton.displayName = "R2D2ModalButton";
