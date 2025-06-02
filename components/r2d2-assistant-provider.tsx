"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { ReactNode } from "react";

interface R2D2AssistantProviderProps {
	children: ReactNode;
}

export const R2D2AssistantProvider = ({
	children,
}: R2D2AssistantProviderProps) => {
	const runtime = useChatRuntime({
		api: "/api/r2d2-chat",
		// カスタム設定
		body: {
			temperature: 0.7,
			maxTokens: 200,
		},
	});

	return (
		<AssistantRuntimeProvider runtime={runtime}>
			{children}
		</AssistantRuntimeProvider>
	);
};
