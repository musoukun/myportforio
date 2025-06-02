/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/**
 * R2-D2 Audio Engine for Web Audio API
 * TypeScript port of the Python MCP implementation
 */

export enum Emotion {
	HAPPY = "happy",
	EXCITED = "excited",
	WORRIED = "worried",
	SAD = "sad",
	ANGRY = "angry",
	SURPRISED = "surprised",
	NEUTRAL = "neutral",
}

export enum SpeechPattern {
	QUESTION = "question",
	STATEMENT = "statement",
	EXCLAMATION = "exclamation",
	WHISTLE = "whistle",
	CHATTER = "chatter",
	SCREAM = "scream",
}

interface EmotionConfig {
	freqRange: [number, number];
	durationRange: [number, number];
	volume: number;
	syllableCount: [number, number];
	pauseRange: [number, number];
}

interface SpeechPatternConfig {
	description: string;
	patternType: string;
}

export class R2D2AudioEngine {
	private audioContext: AudioContext | null = null;
	private sampleRate = 44100;

	// 感情設定
	private emotionConfigs: Record<Emotion, EmotionConfig> = {
		[Emotion.HAPPY]: {
			freqRange: [800, 3000],
			durationRange: [0.08, 0.15],
			volume: 0.85,
			syllableCount: [4, 8],
			pauseRange: [0.02, 0.08],
		},
		[Emotion.EXCITED]: {
			freqRange: [1500, 5000],
			durationRange: [0.05, 0.12],
			volume: 0.95,
			syllableCount: [5, 10],
			pauseRange: [0.01, 0.05],
		},
		[Emotion.WORRIED]: {
			freqRange: [600, 2000],
			durationRange: [0.12, 0.25],
			volume: 0.7,
			syllableCount: [2, 5],
			pauseRange: [0.08, 0.15],
		},
		[Emotion.SAD]: {
			freqRange: [200, 1200],
			durationRange: [0.15, 0.35],
			volume: 0.6,
			syllableCount: [1, 4],
			pauseRange: [0.1, 0.2],
		},
		[Emotion.ANGRY]: {
			freqRange: [1000, 4000],
			durationRange: [0.1, 0.2],
			volume: 0.9,
			syllableCount: [3, 6],
			pauseRange: [0.05, 0.1],
		},
		[Emotion.SURPRISED]: {
			freqRange: [2000, 6000],
			durationRange: [0.03, 0.08],
			volume: 1.0,
			syllableCount: [1, 3],
			pauseRange: [0.15, 0.3],
		},
		[Emotion.NEUTRAL]: {
			freqRange: [500, 2500],
			durationRange: [0.1, 0.2],
			volume: 0.75,
			syllableCount: [3, 6],
			pauseRange: [0.05, 0.12],
		},
	};

	// 話し方パターン設定
	private speechPatterns: Record<SpeechPattern, SpeechPatternConfig> = {
		[SpeechPattern.QUESTION]: {
			description: "疑問文（語尾上がり）",
			patternType: "rising_tone",
		},
		[SpeechPattern.STATEMENT]: {
			description: "平叙文（安定したトーン）",
			patternType: "stable_tone",
		},
		[SpeechPattern.EXCLAMATION]: {
			description: "感嘆文（高く短い音）",
			patternType: "short_high",
		},
		[SpeechPattern.WHISTLE]: {
			description: "ホイッスル（スライド音）",
			patternType: "slide",
		},
		[SpeechPattern.CHATTER]: {
			description: "おしゃべり（連続音）",
			patternType: "warble",
		},
		[SpeechPattern.SCREAM]: {
			description: "叫び声（甲高い音）",
			patternType: "high_pitch",
		},
	};

	async initializeAudioContext(): Promise<void> {
		if (!this.audioContext) {
			this.audioContext = new (window.AudioContext ||
				(window as any).webkitAudioContext)();

			// Resume context if suspended (required for user interaction)
			if (this.audioContext.state === "suspended") {
				await this.audioContext.resume();
			}
		}
	}

	private generateSineWave(
		frequency: number,
		duration: number,
		amplitude: number
	): AudioBuffer {
		if (!this.audioContext) throw new Error("AudioContext not initialized");

		const bufferLength = Math.floor(duration * this.sampleRate);
		const buffer = this.audioContext.createBuffer(
			1,
			bufferLength,
			this.sampleRate
		);
		const channelData = buffer.getChannelData(0);

		const volume = Math.min(amplitude, 1.0) * 0.3; // Lower volume for web

		for (let i = 0; i < bufferLength; i++) {
			const t = i / this.sampleRate;
			let value = Math.sin(2 * Math.PI * frequency * t);

			// フェードイン・フェードアウト効果
			const fadeLength = Math.min(
				Math.floor(0.005 * this.sampleRate),
				bufferLength / 4
			);
			let fadeFactor = 1.0;

			if (i < fadeLength) {
				fadeFactor = i / fadeLength;
			} else if (i > bufferLength - fadeLength) {
				fadeFactor = (bufferLength - i) / fadeLength;
			}

			channelData[i] = value * volume * fadeFactor;
		}

		return buffer;
	}

	private generateSlideWave(
		startFreq: number,
		endFreq: number,
		duration: number,
		amplitude: number
	): AudioBuffer {
		if (!this.audioContext) throw new Error("AudioContext not initialized");

		const bufferLength = Math.floor(duration * this.sampleRate);
		const buffer = this.audioContext.createBuffer(
			1,
			bufferLength,
			this.sampleRate
		);
		const channelData = buffer.getChannelData(0);

		const volume = Math.min(amplitude, 1.0) * 0.3;
		const freqStep = (endFreq - startFreq) / bufferLength;

		let phase = 0;

		for (let i = 0; i < bufferLength; i++) {
			const currentFreq = startFreq + freqStep * i;
			phase += (2 * Math.PI * currentFreq) / this.sampleRate;

			let value = Math.sin(phase);

			// フェード効果
			const fadeLength = Math.min(
				Math.floor(0.005 * this.sampleRate),
				bufferLength / 4
			);
			let fadeFactor = 1.0;

			if (i < fadeLength) {
				fadeFactor = i / fadeLength;
			} else if (i > bufferLength - fadeLength) {
				fadeFactor = (bufferLength - i) / fadeLength;
			}

			channelData[i] = value * volume * fadeFactor;
		}

		return buffer;
	}

	private generateWarbleWave(
		baseFreq: number,
		variance: number,
		duration: number,
		amplitude: number,
		warbleRate: number = 5
	): AudioBuffer {
		if (!this.audioContext) throw new Error("AudioContext not initialized");

		const bufferLength = Math.floor(duration * this.sampleRate);
		const buffer = this.audioContext.createBuffer(
			1,
			bufferLength,
			this.sampleRate
		);
		const channelData = buffer.getChannelData(0);

		const volume = Math.min(amplitude, 1.0) * 0.3;
		let phase = 0;

		for (let i = 0; i < bufferLength; i++) {
			const t = i / this.sampleRate;

			// 周波数変調
			const modulation =
				variance * Math.sin(2 * Math.PI * warbleRate * t);
			const currentFreq = baseFreq + modulation;

			phase += (2 * Math.PI * currentFreq) / this.sampleRate;
			let value = Math.sin(phase);

			// フェード効果
			const fadeLength = Math.min(
				Math.floor(0.005 * this.sampleRate),
				bufferLength / 4
			);
			let fadeFactor = 1.0;

			if (i < fadeLength) {
				fadeFactor = i / fadeLength;
			} else if (i > bufferLength - fadeLength) {
				fadeFactor = (bufferLength - i) / fadeLength;
			}

			channelData[i] = value * volume * fadeFactor;
		}

		return buffer;
	}

	private random(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	private randomInt(min: number, max: number): number {
		return Math.floor(this.random(min, max + 1));
	}

	private generateEmotionalBeep(
		emotion: Emotion,
		pattern: SpeechPattern
	): AudioBuffer {
		const emotionConfig = this.emotionConfigs[emotion];
		const patternConfig = this.speechPatterns[pattern];

		const [freqMin, freqMax] = emotionConfig.freqRange;
		const [durMin, durMax] = emotionConfig.durationRange;
		const volume = emotionConfig.volume;

		switch (patternConfig.patternType) {
			case "rising_tone": {
				const startFreq = this.random(freqMin, freqMax * 0.7);
				const endFreq = this.random(freqMax * 0.8, freqMax);
				const duration = this.random(durMin, durMax);
				return this.generateSlideWave(
					startFreq,
					endFreq,
					duration,
					volume
				);
			}

			case "stable_tone": {
				const frequency = this.random(freqMin, freqMax);
				const duration = this.random(durMin, durMax);
				return this.generateSineWave(frequency, duration, volume);
			}

			case "short_high": {
				const frequency = this.random(freqMax * 0.8, freqMax);
				const duration = this.random(durMin, durMin + 0.05);
				return this.generateSineWave(frequency, duration, volume);
			}

			case "slide": {
				const ascending = Math.random() > 0.5;
				const startFreq = ascending
					? this.random(freqMin, freqMax * 0.5)
					: this.random(freqMax * 0.7, freqMax);
				const endFreq = ascending
					? this.random(freqMax * 0.7, freqMax)
					: this.random(freqMin, freqMax * 0.5);
				const duration = this.random(durMin * 2, durMax * 2);
				return this.generateSlideWave(
					startFreq,
					endFreq,
					duration,
					volume
				);
			}

			case "warble": {
				const baseFreq = this.random(freqMin, freqMax);
				const variance = (freqMax - freqMin) * 0.1;
				const duration = this.random(durMin, durMax);
				const warbleRate = this.random(8, 15);
				return this.generateWarbleWave(
					baseFreq,
					variance,
					duration,
					volume,
					warbleRate
				);
			}

			case "high_pitch": {
				const frequency = this.random(
					freqMax * 0.9,
					Math.min(freqMax * 1.5, 8000)
				);
				const duration = this.random(durMin * 2, durMax * 2);
				return this.generateSineWave(frequency, duration, volume);
			}

			default:
				return this.generateSineWave(1000, 0.1, 0.5);
		}
	}

	async playBuffer(buffer: AudioBuffer): Promise<void> {
		if (!this.audioContext) throw new Error("AudioContext not initialized");

		const source = this.audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(this.audioContext.destination);

		source.start();

		// Promise that resolves when audio finishes playing
		return new Promise((resolve) => {
			source.onended = () => resolve();
		});
	}

	private analyzeTextEmotion(text: string): Emotion {
		const textLower = text.toLowerCase();

		const emotionKeywords = {
			[Emotion.EXCITED]: [
				"!",
				"awesome",
				"great",
				"amazing",
				"fantastic",
				"excellent",
				"wonderful",
			],
			[Emotion.HAPPY]: [
				"good",
				"nice",
				"well",
				"thanks",
				"thank you",
				"pleased",
				"glad",
			],
			[Emotion.WORRIED]: [
				"concern",
				"worry",
				"problem",
				"issue",
				"trouble",
				"difficult",
			],
			[Emotion.SAD]: [
				"sorry",
				"unfortunate",
				"sad",
				"bad",
				"poor",
				"fail",
			],
			[Emotion.ANGRY]: [
				"error",
				"wrong",
				"incorrect",
				"no",
				"stop",
				"cancel",
			],
			[Emotion.SURPRISED]: [
				"?",
				"really",
				"wow",
				"unexpected",
				"surprise",
			],
		};

		for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
			if (keywords.some((keyword) => textLower.includes(keyword))) {
				return emotion as Emotion;
			}
		}

		return Emotion.NEUTRAL;
	}

	private getSpeechPatternsForText(text: string): SpeechPattern[] {
		const patterns: SpeechPattern[] = [];

		if (text.includes("?")) patterns.push(SpeechPattern.QUESTION);
		if (text.includes("!")) patterns.push(SpeechPattern.EXCLAMATION);

		const lowerText = text.toLowerCase();
		if (
			["hello", "hi", "greetings"].some((word) =>
				lowerText.includes(word)
			)
		) {
			patterns.push(SpeechPattern.CHATTER, SpeechPattern.STATEMENT);
		}
		if (
			["error", "warning", "alert"].some((word) =>
				lowerText.includes(word)
			)
		) {
			patterns.push(SpeechPattern.SCREAM);
		}

		if (patterns.length === 0) {
			patterns.push(SpeechPattern.STATEMENT, SpeechPattern.CHATTER);
		}

		return patterns;
	}

	private estimateTextReadingTime(text: string): number {
		const charCount = text.length;
		const readingTime = charCount / 10.0; // 10文字=1秒
		return Math.max(1.0, Math.min(readingTime, 30.0));
	}

	async generateSpeech(
		text: string,
		emotion: Emotion | "auto" = "auto"
	): Promise<{ duration: number; message: string }> {
		await this.initializeAudioContext();

		const detectedEmotion =
			emotion === "auto"
				? this.analyzeTextEmotion(text)
				: (emotion as Emotion);

		const patterns = this.getSpeechPatternsForText(text);
		const targetDuration = this.estimateTextReadingTime(text);
		const emotionConfig = this.emotionConfigs[detectedEmotion];

		const [syllableMin, syllableMax] = emotionConfig.syllableCount;
		const [pauseMin, pauseMax] = emotionConfig.pauseRange;

		let totalDuration = 0;
		const audioBuffers: AudioBuffer[] = [];

		// targetDurationに合わせて適切なsyllableCountを動的に計算
		const averageSyllableDuration =
			(emotionConfig.durationRange[0] + emotionConfig.durationRange[1]) /
			2;
		const averagePauseDuration = (pauseMin + pauseMax) / 2;
		const estimatedSyllablesNeeded = Math.ceil(
			targetDuration / (averageSyllableDuration + averagePauseDuration)
		);

		// 基本のsyllableCountとtargetDurationベースの計算の大きい方を使用
		const syllableCount = Math.max(
			this.randomInt(syllableMin, syllableMax),
			Math.min(estimatedSyllablesNeeded, Math.floor(targetDuration * 3)) // 最大でも targetDuration * 3 個まで
		);

		for (
			let i = 0;
			i < syllableCount && totalDuration < targetDuration;
			i++
		) {
			const pattern =
				patterns[Math.floor(Math.random() * patterns.length)];
			const buffer = this.generateEmotionalBeep(detectedEmotion, pattern);
			audioBuffers.push(buffer);
			totalDuration += buffer.duration;

			// 最後以外は間を入れる
			if (i < syllableCount - 1 && totalDuration < targetDuration - 0.1) {
				// 残り時間に合わせてpause時間を調整
				const remainingTime = targetDuration - totalDuration;
				const remainingSyllables = syllableCount - i - 1;
				const targetPauseDuration =
					remainingSyllables > 0
						? Math.min(
								this.random(pauseMin, pauseMax),
								(remainingTime -
									remainingSyllables *
										averageSyllableDuration) /
									remainingSyllables
							)
						: this.random(pauseMin, pauseMax);

				const pauseDuration = Math.max(
					0.01,
					Math.min(
						targetPauseDuration,
						targetDuration - totalDuration - 0.05
					)
				);

				if (pauseDuration > 0) {
					const pauseBuffer = this.audioContext!.createBuffer(
						1,
						Math.floor(pauseDuration * this.sampleRate),
						this.sampleRate
					);
					audioBuffers.push(pauseBuffer);
					totalDuration += pauseDuration;
				}
			}
		}

		// 順次再生
		for (const buffer of audioBuffers) {
			await this.playBuffer(buffer);
		}

		return {
			duration: totalDuration,
			message: `AIロボくんが${text.length}文字の回答に合わせて${totalDuration.toFixed(1)}秒の音声を再生しました`,
		};
	}
}

// グローバルインスタンス
let r2d2Engine: R2D2AudioEngine | null = null;

export function getR2D2Engine(): R2D2AudioEngine {
	if (!r2d2Engine) {
		r2d2Engine = new R2D2AudioEngine();
	}
	return r2d2Engine;
}
