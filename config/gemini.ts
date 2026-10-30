import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "./prompt";
import { getSiteSettings } from "@/lib/firestore";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API;

// Lazy initialization for better startup performance
let genAI: GoogleGenerativeAI | null = null;
let cachedCustomPrompt: { value: string; fetchedAt: number } | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!GOOGLE_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_GEMINI_API environment variable");
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  }
  return genAI;
}

async function resolveSystemInstruction(): Promise<string> {
  if (
    cachedCustomPrompt &&
    Date.now() - cachedCustomPrompt.fetchedAt < 5 * 60 * 1000
  ) {
    return cachedCustomPrompt.value;
  }
  try {
    const settings = await getSiteSettings();
    const chosen =
      settings.aiSystemPrompt && settings.aiSystemPrompt.trim().length > 20
        ? settings.aiSystemPrompt.trim()
        : SYSTEM_INSTRUCTION;
    cachedCustomPrompt = { value: chosen, fetchedAt: Date.now() };
    return chosen;
  } catch {
    return SYSTEM_INSTRUCTION;
  }
}

// Cache for repeated prompts (simple implementation)
const responseCache = new Map<string, { text: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getGeminiResponse(prompt: string): Promise<string> {
  // Check cache
  const cached = responseCache.get(prompt);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.text;
  }

  const systemInstruction = await resolveSystemInstruction();

  const model = getGenAI().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    },
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Cache the response
  responseCache.set(prompt, { text, timestamp: Date.now() });

  // Cleanup old cache entries
  if (responseCache.size > 50) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) responseCache.delete(oldestKey);
  }

  return text;
}
