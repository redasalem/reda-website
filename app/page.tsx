"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import BottomNavbar from "@/components/Navbar";

// Lazy load heavy components
const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <div className="h-screen bg-background animate-pulse" />,
  ssr: true,
});
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <div className="h-screen bg-background animate-pulse" />,
  ssr: true,
});
const Certificates = dynamic(() => import("@/components/certificates"), {
  loading: () => <div className="h-screen bg-background animate-pulse" />,
  ssr: true,
});
const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <div className="h-screen bg-background animate-pulse" />,
  ssr: true,
});
const Footer = dynamic(() => import("@/components/footer"), { ssr: true });
const ChatBot = dynamic(() => import("@/components/chatbot"), {
  ssr: false, // Client-only for ChatBot to avoid hydration issues
  loading: () => null, // No loader for chat bubble, it just appears
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 relative w-full overflow-x-hidden">
        <div className="w-full">
          <BottomNavbar />
          <Hero />

          {/* Deferred usage of heavy components */}
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
          <Footer />
        </div>

        {/* Chatbot */}
        <ChatBot />
      </main>
    </div>
  );
}
