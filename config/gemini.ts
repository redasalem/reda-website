import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "./prompt";
import { getPortfolioSnapshot } from "@/lib/firestore";

if (typeof window !== "undefined") {
  throw new Error("config/gemini.ts must only be imported on the server.");
}

const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

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

/**
 * Builds a rich system instruction that combines:
 * 1. Custom prompt from /admin/ai (or SYSTEM_INSTRUCTION fallback)
 * 2. Live Firestore snapshot (projects, skills, certificates, CV link, contact info)
 * so the AI always knows about newly added projects or updated links immediately.
 */
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
      .map((c) => `- ${c.title} (${c.issuer}, ${c.date}) — ${c.description}`)
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

export async function getGeminiResponse(
  prompt: string,
  history: ChatTurn[] = [],
): Promise<string> {
  const systemInstruction = await buildLiveSystemInstruction();

  const model = getGenAI().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
    generationConfig: {
      maxOutputTokens: 1200,
      temperature: 0.65,
    },
  });

  // Use multi-turn chat when conversation history is present
  const validHistory = history
    .slice(-10)
    .filter((h) => h.text && h.text.trim().length > 0)
    .map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    }));

  const chat = model.startChat({
    history: validHistory,
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
}
