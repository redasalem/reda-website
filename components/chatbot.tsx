// chatbot.tsx - Modern Design
import { Send, Sparkles, Bot, User, X, MessageSquare } from "lucide-react";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGeminiResponse } from "../config/gemini";

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

const ChatBot = React.memo(function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponseText = await getGeminiResponse(userMessage.text);
      const aiMessage: Message = {
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      const errorMessage: Message = {
        text: "Sorry, I couldn't get a response. Please try again later.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Premium Floating Button - "Neo-Glass Sphere" */}
      <div className="fixed sm:bottom-6 bottom-24 right-6 z-50 group">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, rotate: isOpen ? 90 : 0 }}
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500 relative overflow-hidden backdrop-blur-xl border border-white/20 shadow-2xl ${
            isOpen
              ? "bg-gradient-to-br from-red-500/80 to-red-600/80"
              : "bg-gradient-to-br from-brand-mint-500/80 via-brand-mint-600/80 to-brand-mint-600/80 shadow-brand-mint-500/20"
          }`}
        >
          {/* Shine Animation */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
              animate={{ x: "200%" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
          )}

          {isOpen ? (
            <X className="w-8 h-8 text-white relative z-10" />
          ) : (
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-mint-300 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-mint-300 rounded-full" />
            </div>
          )}
        </motion.button>

        {/* Eye-Friendly Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-gray-900/90 backdrop-blur-md text-brand-mint-300 text-xs font-bold rounded-xl border border-brand-mint-500/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap pointer-events-none">
            Chat with Reda AI ✨
            <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900/90" />
          </div>
        )}
      </div>

      {/* Premium Chat Window - "Neo-Glass Window" */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(15px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(15px)" }}
            className="fixed md:bottom-28 bottom-44 right-6 z-40 md:w-[420px] w-[380px] max-w-[calc(100vw-3rem)] md:h-[600px] h-[500px] max-h-[calc(100vh-10rem)] rounded-[32px] bg-gray-950/80 backdrop-blur-3xl border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-all duration-500"
          >
            {/* Liquid Header */}
            <div className="relative bg-gradient-to-br from-brand-mint-500/20 via-brand-mint-600/10 to-transparent p-6 border-b border-white/5">
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-mint-500 to-teal-500 flex items-center justify-center shadow-xl shadow-brand-mint-500/20 border border-white/20">
                    <Bot className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-gray-950 rounded-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
                    Reda's AI
                    <Sparkles className="w-4 h-4 text-brand-mint-400" />
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-widest text-brand-mint-500 font-bold">System Online</span>
                  </div>
                </div>
              </div>

              {/* Decorative Orbs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-mint-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>

            {/* Messages Area - EyeFriendly Dark */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/5">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-8 opacity-60">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <MessageSquare className="w-10 h-10 text-brand-mint-400" />
                  </div>
                  <h4 className="text-white text-lg font-bold mb-3">Initialize Chat Sequence</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Ask me about Reda's technical stack, project impact, or professional certifications.
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end text-right" : "justify-start text-left"}`}
                >
                  <div className={`max-w-[85%] ${message.sender === "user" ? "order-first" : ""}`}>
                    <div
                      className={`px-5 py-3.5 rounded-2xl shadow-xl transition-all duration-300 ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-brand-mint-500 to-brand-mint-600 text-white rounded-tr-none shadow-brand-mint-500/10"
                          : "bg-white/5 backdrop-blur-md text-gray-200 border border-white/10 rounded-tl-none font-medium"
                      }`}
                    >
                      <p className="text-[14px] leading-relaxed whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                    </div>
                    <p className="text-[10px] mt-2 font-bold uppercase tracking-tighter opacity-40">
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Advanced Typing States */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 bg-brand-mint-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-brand-mint-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-brand-mint-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form - "Neo-Glass Input" */}
            <div className="p-6 bg-white/5 border-t border-white/5">
              <form onSubmit={handleSendMessage} className="relative group/form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Query system knowledge..."
                  disabled={isLoading}
                  className="w-full bg-gray-900/50 border-2 border-white/5 rounded-2xl px-6 py-4 pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-brand-mint-500/50 focus:bg-gray-900 transition-all duration-500 disabled:opacity-50 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-r from-brand-mint-500 to-brand-mint-600 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 hover:scale-105 active:scale-95 shadow-lg shadow-brand-mint-500/20"
                >
                  <Send className="w-5 h-5" />
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