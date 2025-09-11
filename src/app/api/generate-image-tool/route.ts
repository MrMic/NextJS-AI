import { openai } from "@ai-sdk/openai";
import {
	convertToModelMessages,
	streamText,
	UIMessage,
	experimental_generateImage as generateImage,
	tool,
	stepCountIs,
	InferUITools,
	UIDataTypes,
} from "ai";
import z from "zod";

const tools = {
	generateImage: tool({
		description: "Generate an Image from a prompt",
		inputSchema: z.object({
			prompt: z.string().describe("The prompt to generate an image for"),
		}),
		execute: async ({ prompt }) => {
			const { image } = await generateImage({
				model: openai.imageModel("dall-e-3"),
				prompt,
				size: "1024x1024",
				providerOptions: {
					openai: {
						style: "vivid",
						quality: "hd",
					},
				},
			});
			return image.base64;
		},
		toModelOutput: () => {
			return {
				type: "content",
				value: [
					{
						type: "text",
						text: "generated image in base64",
					},
				],
			};
		},
	}),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(request: Request) {
	try {
		const { messages }: { messages: ChatMessage[] } = await request.json();

		const result = streamText({
			model: openai("gpt-4.1-nano"),
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
