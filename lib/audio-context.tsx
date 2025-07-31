"use client";

import React, {
	createContext,
	useContext,
	useState,
	useRef,
	type ReactNode,
} from "react";

interface AudioContextType {
	isAudioEnabled: boolean;
	setAudioEnabled: (enabled: boolean) => void;
	isModalOpen: boolean;
	setModalOpen: (open: boolean) => void;
	shouldPlayAudio: () => boolean;
	stopCurrentAudio: () => void;
	registerAudioControl: (stopFn: () => void) => void;
	unregisterAudioControl: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
	const [isAudioEnabled, setAudioEnabled] = useState(true);
	const [isModalOpen, setModalOpen] = useState(false);
	const currentAudioStopRef = useRef<(() => void) | null>(null);

	// 音声再生すべきかどうかを判定
	const shouldPlayAudio = (): boolean => {
		// ミュートされている場合は再生しない
		if (!isAudioEnabled) return false;

		// Modalが開いている場合のみ自動再生を許可
		return isModalOpen;
	};

	// 現在再生中の音声を停止
	const stopCurrentAudio = (): void => {
		if (currentAudioStopRef.current) {
			currentAudioStopRef.current();
			currentAudioStopRef.current = null;
		}
	};

	// 音声制御関数を登録
	const registerAudioControl = (stopFn: () => void): void => {
		currentAudioStopRef.current = stopFn;
	};

	// 音声制御関数を登録解除
	const unregisterAudioControl = (): void => {
		currentAudioStopRef.current = null;
	};

	// ミュート状態の変更時に再生中の音声を停止
	const handleSetAudioEnabled = (enabled: boolean): void => {
		if (!enabled) {
			stopCurrentAudio();
		}
		setAudioEnabled(enabled);
	};

	return (
		<AudioContext.Provider
			value={{
				isAudioEnabled,
				setAudioEnabled: handleSetAudioEnabled,
				isModalOpen,
				setModalOpen,
				shouldPlayAudio,
				stopCurrentAudio,
				registerAudioControl,
				unregisterAudioControl,
			}}
		>
			{children}
		</AudioContext.Provider>
	);
}

export function useAudio() {
	const context = useContext(AudioContext);
	if (context === undefined) {
		throw new Error("useAudio must be used within an AudioProvider");
	}
	return context;
}
