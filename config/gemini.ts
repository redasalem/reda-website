// gemini.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API;

if (!GOOGLE_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API environment variable");
}

// Lazy initialization for better startup performance
let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(GOOGLE_API_KEY!);
  }
  return genAI;
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

  const model = getGenAI().getGenerativeModel({ 
    model: "gemini-2.5-flash",
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