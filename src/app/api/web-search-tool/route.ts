import { openai } from "@ai-sdk/openai";
import {
	convertToModelMessages,
	InferUITools,
	stepCountIs,
	streamText,
	UIDataTypes,
	UIMessage,
} from "ai";

const tools = {
	web_search_preview: openai.tools.webSearchPreview({}),
};

export type Chatools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, Chatools>;

export async function POST(request: Request) {
	try {
		const { messages }: { messages: ChatMessage[] } = await request.json();

		const result = streamText({
			model: openai.responses("gpt-4.1-nano"),
			messages: convertToModelMessages(messages),
			tools,
			stopWhen: stepCountIs(2),
		});

		// Stream the response as a UI message stream
		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Error streaming chat completion:", error);
		return new Response("Failed to stream chat completion", { status: 500 });
	}
}
