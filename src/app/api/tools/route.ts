import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  InferUITools,
  stepCountIs,
  streamText,
  tool,
  UIDataTypes,
  UIMessage,
} from "ai";
import { z } from "zod";

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
