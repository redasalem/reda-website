// chatbot.tsx - Modern Design
import { Send, Sparkles, Bot, User, X } from "lucide-react";
import { useState, useRef, useEffect, FormEvent } from "react";
import { getGeminiResponse } from "../config/gemini"; 

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

export default function ChatBot() {
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
      {/* Floating Chat Button - مع Tooltip */}
      <div className="fixed sm:bottom-6  bottom-24 right-6  z-50 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 ${
            isOpen
              ? "bg-linear-to-br from-red-500 to-pink-600 rotate-90"
              : "bg-linear-to-br from-purple-600 via-blue-600 to-cyan-500 hover:shadow-purple-500/50 animate-pulse"
          }`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <div className="relative">
              <Sparkles className="w-7 h-7 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full" />
            </div>
          )}
        </button>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap pointer-events-none">
            Ask Gemini ✨
            <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed md:bottom-28 bottom-44 right-6 z-40 md:w-[420px] w-[390px] max-w-[calc(100vw-3rem)] md:h-[600px] h-[500px] max-h-[calc(100vh-10rem)] rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-500 animate-in slide-in-from-bottom-5">
          
          {/* Header - خلفية متدرجة خرافية */}
          <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-5 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 via-blue-600/50 to-cyan-500/50 animate-pulse" />
            
            <div className="relative flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg">
                <Bot className="w-6 h-6 text-white animate-bounce" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  Reda's AI Assistant
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <p className="text-xs text-white/90 font-medium">Ask me anything about Reda!</p>
                </div>
              </div>
            </div>

            {/* تأثيرات الخلفية */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Welcome! 👋
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I'm Reda's AI assistant. Ask me anything about his skills, projects, or experience!
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-in slide-in-from-bottom-3 duration-500 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Avatar للـ AI */}
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`max-w-[75%] ${message.sender === "user" ? "order-first" : ""}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-md"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                  </div>
                  <p
                    className={`text-xs mt-1.5 px-2 ${
                      message.sender === "user"
                        ? "text-right text-gray-500 dark:text-gray-400"
                        : "text-left text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>

                {/* Avatar للـ User */}
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Animation */}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 py-3 rounded-2xl rounded-bl-md shadow-lg">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 disabled:opacity-50 text-sm shadow-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Sparkles className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}