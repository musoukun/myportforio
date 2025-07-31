import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";
import { R2D2_SYSTEM_PROMPT } from "@/lib/ai";

// 環境変数チェック（ビルド時とランタイムで分ける）
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

let model: ReturnType<typeof google> | null = null;
if (apiKey) {
	model = google("gemini-2.0-flash-exp");
}

// R2-D2感情分析ツール（AIによる判定）
const r2d2EmotionAnalysisTool = tool({
	description:
		"Analyze the emotional content of text and determine R2-D2's emotional response with intensity level",
	parameters: z.object({
		text: z
			.string()
			.describe("The text content to analyze for emotional content"),
		context: z
			.string()
			.optional()
			.describe("Additional context about the conversation or situation"),
	}),
	execute: async ({ text, context }) => {
		// AI感情分析：この部分でGeminiにより詳細な感情分析を実行
		const emotionAnalysisPrompt = `
分析対象テキスト: "${text}"
${context ? `コンテキスト: "${context}"` : ""}

このテキストから感情を分析し、R2-D2ドロイドが表現すべき感情と強度を判定してください。

以下の7つの感情カテゴリから1つ選択：
- happy: 喜び、満足、前向き
- excited: 興奮、熱意、エネルギッシュ
- worried: 心配、不安、懸念
- sad: 悲しみ、失望、落胆
- angry: 怒り、イライラ、不満
- surprised: 驚き、予想外、びっくり
- neutral: 中性的、平静、通常

強度レベル（1-10の数値）:
1-3: 軽度
4-6: 中程度
7-10: 強度

JSON形式で回答:
{
  "emotion": "選択された感情",
  "intensity": 数値,
  "reasoning": "判定理由",
  "audioModifications": {
    "frequencyMultiplier": 数値,
    "volumeMultiplier": 数値,
    "durationMultiplier": 数値
  }
}`;

		try {
			// Geminiによる感情分析の実行
			if (!model) {
				return {
					emotion: "neutral",
					intensity: 5,
					reasoning: "API unavailable, using default",
					audioModifications: {
						frequencyMultiplier: 1.0,
						volumeMultiplier: 1.0,
						durationMultiplier: 1.0,
					},
				};
			}

			const { generateText } = await import("ai");
			const emotionResult = await generateText({
				model,
				prompt: emotionAnalysisPrompt,
				maxTokens: 300,
				temperature: 0.3,
			});

			// JSONレスポンスの解析
			let analysisResult;
			try {
				const jsonMatch = emotionResult.text.match(/\{[\s\S]*\}/);
				if (jsonMatch) {
					analysisResult = JSON.parse(jsonMatch[0]);
				} else {
					throw new Error("No JSON found in response");
				}
			} catch (parseError) {
				// JSONパースエラーの場合、テキストから感情を推定
				console.warn(
					"JSON parse error in emotion analysis:",
					parseError
				);
				const text = emotionResult.text.toLowerCase();
				let detectedEmotion = "neutral";
				if (text.includes("happy") || text.includes("joy"))
					detectedEmotion = "happy";
				else if (
					text.includes("excited") ||
					text.includes("enthusiastic")
				)
					detectedEmotion = "excited";
				else if (text.includes("worried") || text.includes("concern"))
					detectedEmotion = "worried";
				else if (text.includes("sad") || text.includes("disappointed"))
					detectedEmotion = "sad";
				else if (text.includes("angry") || text.includes("frustrated"))
					detectedEmotion = "angry";
				else if (
					text.includes("surprised") ||
					text.includes("unexpected")
				)
					detectedEmotion = "surprised";

				analysisResult = {
					emotion: detectedEmotion,
					intensity: 5,
					reasoning: "Fallback text analysis due to JSON parse error",
					audioModifications: {
						frequencyMultiplier: 1.0,
						volumeMultiplier: 1.0,
						durationMultiplier: 1.0,
					},
				};
			}

			// 音声パラメータの計算
			const emotion = analysisResult.emotion || "neutral";
			const intensity = Math.max(
				1,
				Math.min(10, analysisResult.intensity || 5)
			);

			// 感情と強度に基づく音声調整パラメータ
			let frequencyMultiplier = 1.0;
			let volumeMultiplier = 1.0;
			let durationMultiplier = 1.0;

			switch (emotion) {
				case "excited":
					frequencyMultiplier = 1.2 + intensity * 0.1;
					volumeMultiplier = 0.9 + intensity * 0.05;
					durationMultiplier = 0.8 + intensity * 0.02;
					break;
				case "happy":
					frequencyMultiplier = 1.1 + intensity * 0.05;
					volumeMultiplier = 0.85 + intensity * 0.03;
					durationMultiplier = 0.9 + intensity * 0.02;
					break;
				case "worried":
					frequencyMultiplier = 0.8 - intensity * 0.03;
					volumeMultiplier = 0.7 + intensity * 0.02;
					durationMultiplier = 1.2 + intensity * 0.05;
					break;
				case "sad":
					frequencyMultiplier = 0.6 - intensity * 0.02;
					volumeMultiplier = 0.6 + intensity * 0.01;
					durationMultiplier = 1.5 + intensity * 0.05;
					break;
				case "angry":
					frequencyMultiplier = 1.3 + intensity * 0.08;
					volumeMultiplier = 0.9 + intensity * 0.04;
					durationMultiplier = 0.8 + intensity * 0.03;
					break;
				case "surprised":
					frequencyMultiplier = 1.5 + intensity * 0.1;
					volumeMultiplier = 1.0;
					durationMultiplier = 0.6 + intensity * 0.02;
					break;
				default: // neutral
					frequencyMultiplier = 1.0;
					volumeMultiplier = 0.75;
					durationMultiplier = 1.0;
			}

			return {
				emotion,
				intensity,
				reasoning:
					analysisResult.reasoning || "AI emotion analysis completed",
				audioModifications: {
					frequencyMultiplier: Math.max(
						0.3,
						Math.min(3.0, frequencyMultiplier)
					),
					volumeMultiplier: Math.max(
						0.1,
						Math.min(1.0, volumeMultiplier)
					),
					durationMultiplier: Math.max(
						0.3,
						Math.min(3.0, durationMultiplier)
					),
				},
			};
		} catch (error) {
			console.error("Emotion analysis error:", error);
			return {
				emotion: "neutral",
				intensity: 5,
				reasoning: "Error in emotion analysis, using default",
				audioModifications: {
					frequencyMultiplier: 1.0,
					volumeMultiplier: 0.75,
					durationMultiplier: 1.0,
				},
			};
		}
	},
});

// R2-D2音声生成ツール（従来版：後方互換性のため残存）
const r2d2SpeakTool = tool({
	description: "Generate R2-D2 style speech with emotions and patterns",
	parameters: z.object({
		response_text: z
			.string()
			.describe("The text content to convert to R2-D2 speech"),
		emotion: z
			.enum([
				"happy",
				"excited",
				"worried",
				"sad",
				"angry",
				"surprised",
				"neutral",
			])
			.optional()
			.describe("The emotion to convey in the speech"),
	}),
	execute: async ({ response_text, emotion = "neutral" }) => {
		// この部分は実際にはクライアントサイドで音声生成されるため、
		// ここではメタデータのみを返す
		return {
			text: response_text,
			emotion,
			shouldPlayAudio: true,
			audioGenerated: true,
		};
	},
});

export const maxDuration = 30;

export async function POST(req: Request) {
	try {
		// APIキーが設定されていない場合はエラーレスポンスを返す
		if (!apiKey || !model) {
			return new Response(
				JSON.stringify({
					error: "ビープ... APIキーが設定されていません。",
					message: "GOOGLE_GENERATIVE_AI_API_KEYが必要です。",
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const { messages } = await req.json();

		const result = await streamText({
			model,
			system: R2D2_SYSTEM_PROMPT,
			messages,
			maxTokens: 200,
			temperature: 0.7,
			tools: {
				r2d2_emotion_analysis: r2d2EmotionAnalysisTool,
				r2d2_speak: r2d2SpeakTool,
			},
			toolChoice: "auto",
		});

		return result.toDataStreamResponse();
	} catch (error) {
		console.error("R2-D2 chat API error:", error);
		return new Response(
			JSON.stringify({
				error: "ビープ... システムエラーが発生しました。",
				message:
					"R2-D2は現在お話しできません。しばらく待ってから再度お試しください。",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
