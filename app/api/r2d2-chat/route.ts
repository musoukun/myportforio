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

// R2-D2音声生成ツール
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
