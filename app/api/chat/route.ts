import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export const maxDuration = 30;

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter.chat('openrouter/free'),
    system: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    onError: error => {
      if (error instanceof Error) {
        return error.message;
      }
      return 'An error occurred during message generation';
    },
  });
}