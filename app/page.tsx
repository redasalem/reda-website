"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import BottomNavbar from "@/components/Navbar";

// Lazy load below-fold components
const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <div className="h-96 bg-background animate-pulse" />,
  ssr: true,
});
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <div className="h-96 bg-background animate-pulse" />,
  ssr: true,
});
const Certificates = dynamic(() => import("@/components/certificates"), {
  loading: () => <div className="h-96 bg-background animate-pulse" />,
  ssr: true,
});
const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <div className="h-96 bg-background animate-pulse" />,
  ssr: true,
});
const Footer = dynamic(() => import("@/components/footer"), { ssr: true });
const ChatBot = dynamic(() => import("@/components/chatbot"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 relative w-full overflow-x-hidden">
        <div className="w-full">
          <BottomNavbar />
          <Hero />

          {/* Below-fold sections (lazy loaded) */}
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
