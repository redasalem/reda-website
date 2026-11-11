"use client";

import React, {
  memo,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Send, Sparkles, X } from "lucide-react";
import AiAvatarIcon from "./ai-avatar-icon";

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatBotProps {
  defaultOpen?: boolean;
}

function hasArabicCharacters(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

/**
 * Lightweight formatter for AI messages: renders **bold**, clickable URLs, and bullet points cleanly.
 */
function renderFormattedText(text: string) {
  const lines = text.split("\n");

  const formatInline = (line: string, lineIdx: number) => {
    // Split on URLs and **bold** segments
    const tokens = line.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g);
    return tokens.map((token, idx) => {
      if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
        return (
          <strong key={`${lineIdx}-${idx}`} className="font-bold text-white">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (/^https?:\/\/[^\s)]+$/.test(token)) {
        return (
          <a
            key={`${lineIdx}-${idx}`}
            href={token}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-mint-400 underline underline-offset-2 hover:text-brand-cyan-300 break-all"
          >
            {token}
          </a>
        );
      }
      return <React.Fragment key={`${lineIdx}-${idx}`}>{token}</React.Fragment>;
    });
  };

  return (
    <div className="space-y-1.5">
      {lines.map((rawLine, idx) => {
        const trimmed = rawLine.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-brand-mint-400 mt-1 text-xs">•</span>
              <span className="flex-1">
                {formatInline(trimmed.slice(2), idx)}
              </span>
            </div>
          );
        }
        return <p key={idx}>{formatInline(rawLine, idx)}</p>;
      })}
    </div>
  );
}

const QUICK_PROMPTS_EN = [
  "What are Reda's top projects?",
  "What tech stack does he specialize in?",
  "Can I get his CV & contact info?",
  "Is Reda available for remote or freelance work?",
];

const QUICK_PROMPTS_AR = [
  "إيه هي أبرز مشاريع رضا سالم؟",
  "إيه التقنيات اللي بيشتغل بيها؟",
  "ممكن رابط الـ CV وطرق التواصل؟",
  "هل متاح لشغل ريموت أو مشروع جديد؟",
];

const ChatBot = memo(function ChatBot({ defaultOpen = false }: ChatBotProps) {
  const pathname = usePathname();
  const isArabicPage = pathname?.startsWith("/ar") ?? false;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendPromptText = async (rawPrompt: string) => {
    const prompt = rawPrompt.trim();
    if (!prompt || isLoading) {
      return;
    }

    const userMessage: Message = {
      text: prompt,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const historyForGemini = messages.map((m) => ({
      role: m.sender === "user" ? ("user" as const) : ("model" as const),
      text: m.text,
    }));

    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          history: historyForGemini,
        }),
      });

      const data = (await response.json()) as { text?: string; error?: string };
      if (!response.ok || !data.text) {
        throw new Error(data.error || "Failed to fetch AI response");
      }

      const aiResponseText = data.text;

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          text: aiResponseText,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          text: isArabicPage
            ? "عذراً، المساعد الذكي غير متصل حالياً. يمكنك التواصل مع رضا مباشرة عبر واتساب +201121696299 أو البريد redasalem287@gmail.com."
            : "Sorry, I am currently unavailable. You can reach Reda directly via WhatsApp at +201121696299 or email redasalem287@gmail.com.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();
    await sendPromptText(inputValue);
  };

  const quickPrompts = isArabicPage ? QUICK_PROMPTS_AR : QUICK_PROMPTS_EN;

  return (
    <>
      <div className="fixed sm:bottom-8 bottom-24 right-8 z-50 group perspective-1000">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 overflow-visible shadow-2xl ${
            isOpen
              ? "bg-red-500/20 shadow-red-500/20"
              : "bg-black/40 shadow-brand-mint-500/30"
          } backdrop-blur-2xl border border-white/10`}
        >
          {!isOpen && (
            <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-brand-mint-400 via-teal-500 to-brand-mint-400 opacity-70 blur-[4px] animate-[spin_4s_linear_infinite]" />
          )}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-black z-0" />
          )}

          <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full overflow-hidden">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-red-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="custom-ai"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <AiAvatarIcon className="w-9 h-9 drop-shadow-[0_0_12px_rgba(0,255,159,0.8)]" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-mint-400 rounded-full animate-ping" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-mint-400 rounded-full shadow-[0_0_10px_rgba(0,255,159,1)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {!isOpen && (
          <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-4 px-4 py-2 bg-black/90 backdrop-blur-xl text-brand-mint-300 text-[11px] uppercase tracking-widest font-bold rounded-lg border border-brand-mint-500/30 shadow-[0_0_30px_rgba(0,255,159,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 whitespace-nowrap pointer-events-none transform translate-y-2 group-hover:translate-y-0">
            {isArabicPage ? "اسأل مساعد رضا الذكي" : "Ask Reda AI"}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-brand-mint-500/30" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-[3px] border-transparent border-t-black/90" />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed md:bottom-32 bottom-36 right-4 sm:right-8 z-40 md:w-[440px] w-[calc(100vw-2rem)] md:h-[650px] h-[560px] max-h-[calc(100vh-11rem)] rounded-[2.25rem] bg-slate-950/95 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-5 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-mint-500/50 to-transparent" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-mint-500/15 rounded-full blur-[50px]" />

              <div className="relative flex items-center gap-3.5 z-10">
                <div className="relative group/avatar">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,159,0.25)] border border-brand-mint-400/40 overflow-hidden relative">
                    <AiAvatarIcon className="w-7 h-7 drop-shadow-[0_0_10px_rgba(0,255,159,0.7)]" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base text-white flex items-center gap-2 tracking-tight">
                    Reda Salem AI
                    <span className="px-1.5 py-0.5 rounded bg-brand-mint-500/15 border border-brand-mint-500/30 text-[9px] uppercase tracking-wider text-brand-mint-400 font-bold">
                      Live Sync
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5 opacity-80">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[11px] text-emerald-400 font-medium">
                      {isArabicPage
                        ? "متصل ببيانات البورتفوليو الحية"
                        : "Connected to live portfolio data"}
                    </span>
                  </div>
                </div>

                {messages.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setMessages([])}
                    title={isArabicPage ? "محادثة جديدة" : "Reset chat"}
                    className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center justify-center h-full text-center px-2 space-y-5"
                  dir={isArabicPage ? "rtl" : "ltr"}
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 border border-brand-mint-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="w-14 h-14 rounded-full bg-brand-mint-500/10 flex items-center justify-center backdrop-blur-sm border border-brand-mint-500/25 shadow-[0_0_30px_rgba(0,255,159,0.15)]">
                      <AiAvatarIcon className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-white text-lg font-bold tracking-tight">
                      {isArabicPage
                        ? "أهلاً بك! اسألني أي سؤال عن رضا سالم"
                        : "Ask me anything about Reda"}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed max-w-[280px] mx-auto">
                      {isArabicPage
                        ? "أنا متصل مباشرة بأحدث مشاريع وتقنيات وشهادات رضا على الموقع. أرد بالعربية والإنجليزية."
                        : "I have live access to Reda's latest projects, tech stack, and resume. Ask in English or Arabic."}
                    </p>
                  </div>

                  {/* Quick Starter Chips */}
                  <div className="w-full space-y-2 pt-1">
                    <p className="text-[11px] font-semibold text-brand-mint-400 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {isArabicPage ? "أسئلة سريعة:" : "Suggested questions:"}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {quickPrompts.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => void sendPromptText(q)}
                          className="cursor-pointer px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-brand-mint-500/15 border border-white/10 hover:border-brand-mint-500/35 text-xs text-gray-200 hover:text-brand-mint-300 transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {messages.map((message, index) => {
                const isMsgRtl = hasArabicCharacters(message.text);
                return (
                  <motion.div
                    key={`${message.timestamp}-${index}`}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 22, stiffness: 300 }}
                    className={`flex gap-3 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] ${
                        message.sender === "user" ? "order-first" : ""
                      }`}
                    >
                      <div
                        dir={isMsgRtl ? "rtl" : "ltr"}
                        className={`px-4 py-3.5 rounded-2xl backdrop-blur-md shadow-xl text-sm leading-relaxed break-words ${
                          message.sender === "user"
                            ? "bg-gradient-to-br from-brand-mint-500 to-teal-500 text-black font-semibold rounded-tr-xs"
                            : "bg-white/[0.06] border border-white/10 text-gray-100 rounded-tl-xs"
                        }`}
                      >
                        {message.sender === "ai" ? (
                          renderFormattedText(message.text)
                        ) : (
                          <p className="whitespace-pre-wrap">{message.text}</p>
                        )}
                      </div>
                      <p
                        className={`text-[10px] mt-1.5 font-medium opacity-45 ${
                          message.sender === "user"
                            ? "text-right text-brand-mint-400"
                            : "text-left text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] border border-white/10 px-5 py-3.5 rounded-2xl rounded-tl-xs backdrop-blur-md">
                    <div className="flex items-center gap-1.5 h-5">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0,
                        }}
                        className="w-1.5 h-1.5 bg-brand-mint-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.2,
                        }}
                        className="w-1.5 h-1.5 bg-brand-mint-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: 0.4,
                        }}
                        className="w-1.5 h-1.5 bg-brand-mint-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/50 border-t border-white/10 backdrop-blur-xl relative z-20">
              <form
                onSubmit={handleSendMessage}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  dir="auto"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder={
                    isArabicPage
                      ? "اكتب سؤالك هنا..."
                      : "Ask about projects, skills, or hiring..."
                  }
                  disabled={isLoading}
                  className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/15 rounded-full pl-5 pr-13 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-mint-500/50 focus:border-transparent transition-all duration-300 disabled:opacity-50 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="cursor-pointer absolute right-2 w-9 h-9 rounded-full bg-brand-mint-500 text-black flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:scale-90 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,159,0.3)]"
                >
                  <Send className="w-4 h-4 translate-x-[0.5px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default ChatBot;
