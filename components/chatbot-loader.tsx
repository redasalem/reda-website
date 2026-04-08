"use client";

import React, { useCallback, useState } from "react";
import { Sparkles, X } from "lucide-react";

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
    <div className="fixed sm:bottom-6 bottom-24 right-6 z-50 group">
      <button
        type="button"
        onMouseEnter={() => void loadChatBot()}
        onFocus={() => void loadChatBot()}
        onTouchStart={() => void loadChatBot()}
        onClick={() => void loadChatBot(true)}
        aria-label="Open Reda AI chat"
        className="chatbot-loader-button relative w-16 h-16 rounded-3xl flex items-center justify-center overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl bg-gradient-to-br from-brand-mint-500/80 via-brand-mint-600/80 to-brand-mint-600/80 shadow-brand-mint-500/20 transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span className="chatbot-loader-shine absolute inset-0" aria-hidden="true" />
        <div className="relative z-10">
          {isPrefetching ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <>
              <Sparkles className="w-8 h-8 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-mint-300 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-mint-300 rounded-full" />
            </>
          )}
        </div>
      </button>

      <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-gray-900/90 backdrop-blur-md text-brand-mint-300 text-xs font-bold rounded-xl border border-brand-mint-500/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap pointer-events-none">
        Chat with Reda AI
        <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900/90" />
      </div>
    </div>
  );
}
