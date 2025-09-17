import { openai } from "@ai-sdk/openai";
import {
	convertToModelMessages,
	InferUITools,
	stepCountIs,
	streamText,
	tool,
	UIDataTypes,
	UIMessage,
	experimental_createMCPClient as createMcpClient,
} from "ai";
import { z } from "zod";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const tools = {
	getWeather: tool({
		description: "Get the current weather for a given location.",
		inputSchema: z.object({
			city: z.string().describe("The city to get the weather for."),
		}),
		execute: async ({ city }) => {
			if (city === "Gotham") {
				return "It's always cloudy in Gotham.";
			} else if (city === "Metropolis") {
				return "It's sunny in Metropolis.";
			} else {
				return `I don't have weather data for ${city}.`;
			}
		},
	}),
};

export type Chatools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, Chatools>;

export async function POST(request: Request) {
	try {
		const { messages }: { messages: ChatMessage[] } = await request.json();

		const httpTransport = new StreamableHTTPClientTransport(
			new URL("https://app.mockmcp.com/servers/7U7cGEXKXEoq/mcp"),
			{
				requestInit: {
					headers: {
						Authorization:
							"Bearer mcp_m2m_5YnyEWUNq3c4ssGPgCYAj5YCv9k3qyJYzU8HZUsIFFM_5a843c476c7a5c41",
					},
				},
			},
		);

		const mcpClient = await createMcpClient({
			transport: httpTransport,
		});

		const mcpTools = await mcpClient.tools();

		const result = streamText({
			model: openai("gpt-4.1-nano"),
			messages: convertToModelMessages(messages),
			tools: { ...mcpTools, ...tools },
			stopWhen: stepCountIs(2),
			onFinish: async () => {
				await mcpClient.close();
			},
			onError: async (error) => {
				await mcpClient.close(), console.error("Error during streaming", error);
			},
		});

		// Stream the response as a UI message stream
		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Error streaming chat completion:", error);
		return new Response("Failed to stream chat completion", { status: 500 });
	}
}
