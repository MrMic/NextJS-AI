import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { error } from "console";

// * NOTE: This is a serverless function that uses the OpenAI API to generate text.
export async function POST(req: Request) {
    try {
        // Parse the request body to get the prompt
        const { prompt } = await req.json();

        const { text } = await generateText({
            model: openai("gpt-4.1-nano"),
            prompt: prompt,
        });

        return Response.json({
            text,
        });
    } catch {
        console.log("Error generating text: ", error());
        Response.json({ error: "Failed to generate text" }, { status: 500 });
    }
}
