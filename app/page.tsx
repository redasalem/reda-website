
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import BottomNavbar from "@/components/Navbar";
import ChatbotLoader from "@/components/chatbot-loader";

function SectionSkeleton() {
  return <div className="min-h-96 w-full bg-background animate-pulse" />;
}

const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <SectionSkeleton />,
});
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <SectionSkeleton />,
});
const Certificates = dynamic(() => import("@/components/certificates"), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <SectionSkeleton />,
});
const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <div className="flex flex-row min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 relative w-full overflow-x-hidden">
        <div className="w-full">
          <BottomNavbar />
          <Hero />

          <div id="skills">
            <Suspense fallback={<SectionSkeleton />}>
              <Skills />
            </Suspense>
          </div>
          <div id="projects">
            <Suspense fallback={<SectionSkeleton />}>
              <Projects />
            </Suspense>
          </div>
          <div id="certificates">
            <Suspense fallback={<SectionSkeleton />}>
              <Certificates />
            </Suspense>
          </div>
          <div id="contact">
            <Suspense fallback={<SectionSkeleton />}>
              <Contact />
            </Suspense>
          </div>
          <Suspense fallback={<SectionSkeleton />}>
            <Footer />
          </Suspense>
        </div>

        <ChatbotLoader />
      </main>
    </div>
  );
}
