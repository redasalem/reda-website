import { Suspense } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar";
import Hero from "@/components/hero";
import BottomNavbar from "@/components/Navbar";
import ChatbotLoader from "@/components/chatbot-loader";
import type { PortfolioSnapshot } from "@/lib/firestore";
import { siteDictionary, type Locale } from "@/lib/i18n";

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

interface PortfolioLandingProps {
  locale: Locale;
  snapshot: PortfolioSnapshot;
}

export default function PortfolioLanding({
  locale,
  snapshot,
}: PortfolioLandingProps) {
  const { dir, lang } = siteDictionary[locale];

  return (
    <div
      dir={dir}
      lang={lang}
      className="flex flex-row min-h-screen bg-background"
    >
      <Sidebar
        locale={locale}
        settings={snapshot.settings}
        socials={snapshot.socials}
      />

      <main className="flex-1 relative w-full overflow-x-hidden">
        <div className="w-full">
          <BottomNavbar locale={locale} />
          <Hero
            locale={locale}
            settings={snapshot.settings}
            socials={snapshot.socials}
          />

          <div id="skills">
            <Suspense fallback={<SectionSkeleton />}>
              <Skills locale={locale} categories={snapshot.skillCategories} />
            </Suspense>
          </div>
          <div id="projects">
            <Suspense fallback={<SectionSkeleton />}>
              <Projects
                locale={locale}
                initialData={snapshot.projects}
                githubUrl={snapshot.settings.githubUrl}
              />
            </Suspense>
          </div>
          <div id="certificates">
            <Suspense fallback={<SectionSkeleton />}>
              <Certificates locale={locale} items={snapshot.certificates} />
            </Suspense>
          </div>
          <div id="contact">
            <Suspense fallback={<SectionSkeleton />}>
              <Contact locale={locale} settings={snapshot.settings} />
            </Suspense>
          </div>
          <Suspense fallback={<SectionSkeleton />}>
            <Footer
              locale={locale}
              settings={snapshot.settings}
              socials={snapshot.socials}
            />
          </Suspense>
        </div>

        <ChatbotLoader />
      </main>
    </div>
  );
}
