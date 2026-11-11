import { NextResponse } from "next/server";
import { getGeminiResponse, type ChatTurn } from "@/config/gemini";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      prompt?: unknown;
      history?: unknown;
    };

    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt || prompt.length > 2000) {
      return NextResponse.json(
        { error: "Invalid prompt" },
        { status: 400 },
      );
    }

    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const history: ChatTurn[] = rawHistory
      .filter(
        (item): item is { role: "user" | "model"; text: string } =>
          Boolean(item) &&
          typeof item === "object" &&
          (item.role === "user" || item.role === "model") &&
          typeof item.text === "string",
      )
      .slice(-10)
      .map((item) => ({
        role: item.role,
        text: item.text.slice(0, 2000),
      }));

    const text = await getGeminiResponse(prompt, history);
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "AI assistant is temporarily unavailable." },
      { status: 500 },
    );
  }
}
