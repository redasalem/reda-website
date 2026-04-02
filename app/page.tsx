"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import BottomNavbar from "@/components/Navbar";

function SectionSkeleton() {
  return <div className="min-h-96 bg-background animate-pulse" />;
}

const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});
const Certificates = dynamic(() => import("@/components/certificates"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});
const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});
const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});
const ChatBot = dynamic(() => import("@/components/chatbot"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 relative w-full overflow-x-hidden">
        <div className="w-full">
          <BottomNavbar />
          <Hero />

          <Suspense fallback={<SectionSkeleton />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Certificates />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Footer />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
      </main>
    </div>
  );
}
