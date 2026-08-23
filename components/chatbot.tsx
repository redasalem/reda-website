"use client";

import React, { memo, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";
import AiAvatarIcon from "./ai-avatar-icon";

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatBotProps {
  defaultOpen?: boolean;
}

const ChatBot = memo(function ChatBot({ defaultOpen = false }: ChatBotProps) {
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
  }, [messages]);

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    const prompt = inputValue.trim();

    if (!prompt || isLoading) {
      return;
    }

    const userMessage: Message = {
      text: prompt,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const { getGeminiResponse } = await import("../config/gemini");
      const aiResponseText = await getGeminiResponse(prompt);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          text: aiResponseText,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          text: "Sorry, I am currently offline. Please contact Reda directly.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed sm:bottom-8 bottom-24 right-8 z-50 group perspective-1000">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 overflow-visible shadow-2xl ${
            isOpen ? "bg-red-500/20 shadow-red-500/20" : "bg-black/40 shadow-brand-mint-500/30"
          } backdrop-blur-2xl border border-white/10`}
        >
          {/* Animated Glow Border Effect when Closed */}
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

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-4 px-4 py-2 bg-black/90 backdrop-blur-xl text-brand-mint-300 text-[11px] uppercase tracking-widest font-bold rounded-lg border border-brand-mint-500/30 shadow-[0_0_30px_rgba(0,255,159,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 whitespace-nowrap pointer-events-none transform translate-y-2 group-hover:translate-y-0">
            Ask Reda AI
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
            className="fixed md:bottom-32 bottom-36 right-4 sm:right-8 z-40 md:w-[440px] w-[calc(100vw-2rem)] md:h-[650px] h-[550px] max-h-[calc(100vh-12rem)] rounded-[2.5rem] bg-black/80 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-mint-500/50 to-transparent" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-mint-500/20 rounded-full blur-[50px]" />
              
              <div className="relative flex items-center gap-4 z-10">
                <div className="relative group/avatar">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,159,0.3)] border border-brand-mint-400/40 overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-mint-500/10 -translate-y-full group-hover/avatar:translate-y-full transition-transform duration-1000 ease-in-out" />
                    <AiAvatarIcon className="w-8 h-8 drop-shadow-[0_0_10px_rgba(0,255,159,0.7)]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white flex items-center gap-2 tracking-tight">
                    Reda Salem AI
                    <div className="px-1.5 py-0.5 rounded bg-brand-mint-500/20 border border-brand-mint-500/30 text-[9px] uppercase tracking-widest text-brand-mint-400 font-bold">
                      v2.0
                    </div>
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 opacity-70">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-medium">Ready to assist</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center justify-center h-full text-center px-4"
                >
                  <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 border border-brand-mint-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-2 border border-brand-mint-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    <div className="w-16 h-16 rounded-full bg-brand-mint-500/10 flex items-center justify-center backdrop-blur-sm border border-brand-mint-500/20 shadow-[0_0_30px_rgba(0,255,159,0.15)]">
                      <AiAvatarIcon className="w-9 h-9" />
                    </div>
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2 tracking-tight">Ask me anything</h4>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
                    I am trained on Reda's engineering profile. I can answer questions in Arabic and English.
                  </p>
                </motion.div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={`${message.timestamp}-${index}`}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end text-right" : "justify-start text-left"}`}
                >
                  <div className={`max-w-[88%] ${message.sender === "user" ? "order-first" : ""}`}>
                    <div
                      className={`px-5 py-4 rounded-3xl backdrop-blur-md shadow-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-brand-mint-500 to-teal-600 text-black rounded-tr-sm shadow-[0_10px_40px_-10px_rgba(0,255,159,0.4)]"
                          : "bg-white/[0.05] border border-white/10 text-gray-100 rounded-tl-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                      }`}
                    >
                      <p className={`text-[15px] leading-relaxed whitespace-pre-wrap break-words ${message.sender === "user" ? "font-medium" : "font-normal"}`}>
                        {message.text}
                      </p>
                    </div>
                    <p className={`text-[10px] mt-2 font-medium tracking-widest opacity-40 ${message.sender === "user" ? "text-brand-mint-400" : "text-gray-400"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] border border-white/10 px-5 py-4 rounded-3xl rounded-tl-sm backdrop-blur-md">
                    <div className="flex items-center gap-1.5 h-6">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-brand-mint-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-mint-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-mint-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-black/40 border-t border-white/5 backdrop-blur-xl relative z-20">
              <form onSubmit={handleSendMessage} className="relative group/form flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-full pl-6 pr-14 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-mint-500/50 focus:border-transparent transition-all duration-300 disabled:opacity-50 text-[15px] shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 w-10 h-10 rounded-full bg-brand-mint-500 text-black flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:scale-90 hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(0,255,159,0.3)]"
                >
                  <Send className="w-4 h-4 translate-x-[1px] translate-y-[1px]" />
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                  Powered by Gemini Flash 2.5
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default ChatBot;
