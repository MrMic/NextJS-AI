import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export async function POST(request: Request) {
	try {
		const { messages }: { messages: UIMessage[] } = await request.json();

		const result = streamText({
			model: openai("gpt-5-nano"),
			messages: convertToModelMessages(messages),
			providerOptions: {
				openai: {
					reasoningSummary: "auto",
					reasoningEffort: "low",
				},
			},
		});

		// Stream the response as a UI message stream
		return result.toUIMessageStreamResponse({
			sendReasoning: true,
		});
	} catch (error) {
		console.error("Error streaming chat completion:", error);
		return new Response("Failed to stream chat completion", { status: 500 });
	}
}
