import path from 'node:path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import {
  ASSISTANT_RULES,
  answerFromKnowledge,
  formatKnowledgeForPrompt,
  retrieveKnowledge,
} from './knowledgeBase';

export type ChatTurn = { role?: string; text?: string };

const GEMINI_MODEL = 'gemini-3.6-flash';
const GEMINI_TIMEOUT_MS = 7000;

let cachedApiKey: string | undefined;
let cachedClient: GoogleGenAI | undefined;

function loadApiKey() {
  if (cachedApiKey !== undefined) return cachedApiKey;
  dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: false });
  const raw = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
  cachedApiKey = raw.trim().replace(/^["']|["']$/g, '');
  return cachedApiKey;
}

function getClient(apiKey: string) {
  if (!cachedClient) cachedClient = new GoogleGenAI({ apiKey });
  return cachedClient;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Gemini timed out')), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export async function answerChat(
  message: string,
  conversationHistory: ChatTurn[] = [],
): Promise<{ reply: string; source: 'gemini' | 'local_assistant' | 'fallback_on_error' }> {
  const apiKey = loadApiKey();

  if (!apiKey) {
    return { reply: answerFromKnowledge(message), source: 'local_assistant' };
  }

  const knowledge = formatKnowledgeForPrompt(retrieveKnowledge(message, 3));
  const recentHistory = conversationHistory
    .filter((msg) => (msg.role === 'user' || msg.role === 'model') && msg.text)
    .slice(-4);

  const contents = [
    ...recentHistory.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text || '' }],
    })),
    { role: 'user', parts: [{ text: message }] },
  ];

  try {
    const response = await withTimeout(
      getClient(apiKey).models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
          systemInstruction: `${ASSISTANT_RULES}\n\nRELEVANT DIGIVATE KNOWLEDGE:\n${knowledge}`,
          temperature: 0.5,
          maxOutputTokens: 512,
        },
      }),
      GEMINI_TIMEOUT_MS,
    );
    const text = response.text?.trim();
    if (text) return { reply: text, source: 'gemini' };
  } catch (error) {
    console.error('Chat API error:', error instanceof Error ? error.message : error);
  }

  return {
    reply: answerFromKnowledge(message),
    source: 'fallback_on_error',
  };
}
