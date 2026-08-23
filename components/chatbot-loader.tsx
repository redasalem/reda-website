"use client";

import React, { useCallback, useState } from "react";
import { X } from "lucide-react";
import AiAvatarIcon from "./ai-avatar-icon";

type ChatBotComponent = typeof import("./chatbot")["default"];

export default function ChatbotLoader() {
  const [ChatBot, setChatBot] = useState<ChatBotComponent | null>(null);
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [isPrefetching, setIsPrefetching] = useState(false);

  const loadChatBot = useCallback(async (openOnLoad = false) => {
    if (openOnLoad) {
      setDefaultOpen(true);
    }

    if (ChatBot || isPrefetching) {
      return;
    }

    setIsPrefetching(true);

    try {
      const module = await import("./chatbot");
      setChatBot(() => module.default);
    } finally {
      setIsPrefetching(false);
    }
  }, [ChatBot, isPrefetching]);

  if (ChatBot) {
    return <ChatBot defaultOpen={defaultOpen} />;
  }

  return (
    <div className="fixed sm:bottom-8 bottom-24 right-6 sm:right-8 z-50 group">
      {/* Outer Holographic Energy Aura / Beacon Pulse */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-brand-mint-500/30 via-brand-cyan-500/25 to-brand-violet-500/30 blur-xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-500 pointer-events-none" />

      {/* Rotating Cyber Ring */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-mint-400 via-brand-cyan-400 to-brand-violet-500 opacity-60 blur-[2px] animate-[spin_6s_linear_infinite] pointer-events-none" />

      <button
        type="button"
        onMouseEnter={() => void loadChatBot()}
        onFocus={() => void loadChatBot()}
        onTouchStart={() => void loadChatBot()}
        onClick={() => void loadChatBot(true)}
        aria-label="Open Reda AI chat"
        className="chatbot-loader-button relative w-16 h-16 rounded-full flex items-center justify-center overflow-visible backdrop-blur-2xl border border-white/20 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 bg-slate-950/90 shadow-[0_0_35px_rgba(0,255,159,0.35)] hover:shadow-[0_0_50px_rgba(0,255,159,0.6)]"
      >
        {/* Shimmer sweep */}
        <span className="chatbot-loader-shine absolute inset-0 rounded-full overflow-hidden" aria-hidden="true" />

        {/* Inner Radial Glow */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,159,0.25)_0%,rgba(6,182,212,0.15)_50%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex items-center justify-center">
          {isPrefetching ? (
            <X className="w-7 h-7 text-red-400 animate-spin" />
          ) : (
            <>
              <AiAvatarIcon className="w-10 h-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-[0_0_12px_rgba(0,255,159,0.7)]" />
              {/* Online Neural Pulse Indicator */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-tr from-brand-mint-400 to-brand-cyan-300 border border-black shadow-[0_0_8px_#00ff9f]" />
              </span>
            </>
          )}
        </div>
      </button>

      {/* Cyberpunk Futuristic Tooltip */}
      <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-4 px-4 py-2 bg-slate-950/95 backdrop-blur-xl text-brand-mint-300 text-[11px] uppercase tracking-widest font-extrabold rounded-xl border border-brand-mint-500/40 shadow-[0_0_30px_rgba(0,255,159,0.25)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-y-2 group-hover:translate-y-0">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-mint-400 animate-ping" />
          Chat with Reda AI
        </span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-brand-mint-500/40" />
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-[3px] border-transparent border-t-slate-950/95" />
      </div>
    </div>
  );
}
