import { answerChat } from '../../src/lib/chatAssistant';

export const handler = async (event: { httpMethod?: string; body?: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { message, conversationHistory = [] } = JSON.parse(event.body || '{}');
    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid message string is required.' }),
      };
    }

    const result = await answerChat(message, conversationHistory);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reply:
          "I don't have that information right now. You can contact the Digivate team directly on WhatsApp or book an appointment.",
        source: 'fallback_on_error',
      }),
    };
  }
};
