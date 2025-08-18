import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  try {
    // Parse the request body to get the prompt
    const { prompt } = await request.json();

    const result = streamText({
      model: openai('gpt-4.1-nano'),
      prompt: prompt,
    });

    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    // Stream the response as a UI message stream
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Error streaming text:', error);
    return new Response('Failed to stream text', { status: 500 });
  }
}
