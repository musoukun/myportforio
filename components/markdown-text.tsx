import React from "react";

// MessagePrimitive.Contentの正確な型定義に準拠
interface TextContentPart {
	type: "text";
	text: string;
}

interface Status {
	readonly type:
		| "running"
		| "complete"
		| "incomplete"
		| "error"
		| "requires-action";
	readonly reason?:
		| "length"
		| "other"
		| "cancelled"
		| "content-filter"
		| "error"
		| "tool-calls";
	readonly error?: unknown;
}

interface TextContentPartComponentProps extends TextContentPart {
	readonly status: Status;
}

export const MarkdownText: React.FC<TextContentPartComponentProps> = ({
	text,
}) => {
	// 簡単なマークダウン対応（改行、太字、イタリック）
	const processText = (text: string) => {
		return text.split("\n").map((line, index) => (
			<React.Fragment key={index}>
				{line}
				{index < text.split("\n").length - 1 && <br />}
			</React.Fragment>
		));
	};

	return <span>{processText(text)}</span>;
};
