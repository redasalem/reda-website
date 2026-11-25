import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "./prompt";
import { getPortfolioSnapshot, type PortfolioSnapshot } from "@/lib/firestore";

if (typeof window !== "undefined") {
  throw new Error("config/gemini.ts must only be imported on the server.");
}

const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL_CANDIDATES = Array.from(
  new Set(
    [
      process.env.GEMINI_MODEL?.trim(),
      "gemini-3.8-flash",
      "gemini-3.8-flash-lite",
      "gemini-2.5-flash",
    ].filter((m): m is string => Boolean(m)),
  ),
);

export interface ChatTurn {
  role: "user" | "model";
  text: string;
}

// Lazy initialization for better startup performance
let genAI: GoogleGenerativeAI | null = null;
let cachedDynamicInstruction: { value: string; fetchedAt: number } | null =
  null;

function getGenAI(): GoogleGenerativeAI {
  if (!GOOGLE_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  }
  return genAI;
}

async function buildLiveSystemInstruction(): Promise<string> {
  if (
    cachedDynamicInstruction &&
    Date.now() - cachedDynamicInstruction.fetchedAt < 3 * 60 * 1000
  ) {
    return cachedDynamicInstruction.value;
  }

  try {
    const snapshot = await getPortfolioSnapshot();
    const { settings, projects, skillCategories, certificates, socials } =
      snapshot;

    const basePrompt =
      settings.aiSystemPrompt && settings.aiSystemPrompt.trim().length > 20
        ? settings.aiSystemPrompt.trim()
        : SYSTEM_INSTRUCTION;

    const projectsContext = projects
      .map(
        (p, i) =>
          `${i + 1}. **${p.title}**: ${p.description} | Tech: ${p.tech.join(", ")}${
            p.demo ? ` | Live Demo: ${p.demo}` : ""
          }${p.code ? ` | Code: ${p.code}` : ""}`,
      )
      .join("\n");

    const skillsContext = skillCategories
      .map(
        (cat) =>
          `- ${cat.title}: ${cat.skills.map((s) => s.name).join(", ")}`,
      )
      .join("\n");

    const certsContext = certificates
      .map((c) => `- ${c.title} (${c.issuer}, ${c.date}) - ${c.description}`)
      .join("\n");

    const socialsContext = socials
      .filter((s) => s.visible)
      .map((s) => `- ${s.label}: ${s.href}`)
      .join("\n");

    const liveAppendix = `

=== LIVE PORTFOLIO DATA FROM FIRESTORE (Always up to date) ===
- Name: ${settings.heroName} (${settings.heroTitle})
- Availability: ${settings.availabilityBadge}
- Bio: ${settings.heroBio}
- Direct CV Link: ${settings.cvUrl}
- Email: ${settings.email}
- Phone / WhatsApp: ${settings.phoneDisplay || settings.phone}

### Live Projects (${projects.length}):
${projectsContext || "No projects listed."}

### Live Skills & Tech Stack:
${skillsContext}

### Accredited Certificates:
${certsContext}

### Social & Contact Links:
${socialsContext}
`;

    const fullInstruction = `${basePrompt}\n${liveAppendix}`;
    cachedDynamicInstruction = {
      value: fullInstruction,
      fetchedAt: Date.now(),
    };
    return fullInstruction;
  } catch {
    return SYSTEM_INSTRUCTION;
  }
}

function buildPortfolioFallbackReply(
  prompt: string,
  snapshot: PortfolioSnapshot | null,
): string {
  const isArabic = /[\u0600-\u06FF]/.test(prompt);
  const lower = prompt.toLowerCase();
  const topProjects = (snapshot?.projects || []).slice(0, 4);
  const email = snapshot?.settings.email || "redasalem287@gmail.com";
  const phone = snapshot?.settings.phoneDisplay || "+20 112 169 6299";

  if (isArabic) {
    if (lower.includes("مشاريع") || lower.includes("project")) {
      const list = topProjects
        .map((p) => `- **${p.title}**: ${p.demo || p.code}`)
        .join("\n");
      return `أهلاً بك! هذه أبرز مشاريع **رضا سالم** (${snapshot?.settings.heroTitle || "Full-Stack Software Engineer"}):\n\n${list}\n\nللتفاصيل أو عرض عمل: **${email}** أو واتساب **https://wa.me/201121696299**`;
    }
    return `أهلاً بك! أنا المساعد التقني لبورتفوليو **رضا سالم** (${snapshot?.settings.heroTitle || "Full-Stack Software Engineer"}).\n\n- **التقنيات الأساسية:** React، Next.js، TypeScript، Node.js، PostgreSQL، MongoDB، Redis، Docker، وMCP.\n- **أبرز المشاريع:** Veycraft v2.4.0، C4R Car Rental، Apex Athletics، RankBoost، PRO-BOT.\n- **التواصل المباشر:** ${email} | واتساب: https://wa.me/201121696299`;
  }

  if (lower.includes("project") || lower.includes("work")) {
    const list = topProjects
      .map((p) => `- **${p.title}**: ${p.demo || p.code}`)
      .join("\n");
    return `Here are **Reda Salem's** top shipped projects:\n\n${list}\n\nReach Reda directly at **${email}** or WhatsApp **https://wa.me/201121696299** (${phone}).`;
  }

  return `Hi! **Reda Salem** is a **Full-Stack Software Engineer** (2.5+ years, Remote · UTC+2) specializing in **React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, Redis, Docker, and MCP**.\n\n- **Top Projects:** Veycraft v2.4.0, C4R Car Rental, Apex Athletics, RankBoost, PRO-BOT.\n- **Resume:** https://reda-website.vercel.app/download\n- **Contact:** ${email} | WhatsApp: https://wa.me/201121696299`;
}

export async function getGeminiResponse(
  prompt: string,
  history: ChatTurn[] = [],
): Promise<string> {
  const systemInstruction = await buildLiveSystemInstruction();
  const validHistory = history
    .slice(-10)
    .filter((h) => h.text && h.text.trim().length > 0)
    .map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

  let lastError: unknown = null;
  for (const modelName of GEMINI_MODEL_CANDIDATES) {
    try {
      const model = getGenAI().getGenerativeModel({
        model: modelName,
        systemInstruction,
        generationConfig: {
          maxOutputTokens: 1200,
          temperature: 0.65,
        },
      });

      const chat = model.startChat({
        history: validHistory,
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = response.text().trim();
      if (text) {
        return text;
      }
    } catch (err) {
      lastError = err;
      console.warn(`Gemini model "${modelName}" failed, trying next:`, err);
    }
  }

  console.error("All Gemini model candidates failed:", lastError);
  const snapshot = await getPortfolioSnapshot().catch(() => null);
  return buildPortfolioFallbackReply(prompt, snapshot);
}
