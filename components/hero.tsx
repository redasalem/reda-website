"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import SocialIcon from "@/components/social-icon";

const CODE_LINES = [
  "const reda = {",
  '  role: "Full-Stack Engineer",',
  '  stack: ["React", "Next.js", "Node.js", "MongoDB"],',
  "  available: true,",
  "};",
];

const CODE_LINE_CLASSES = [
  "text-brand-mint-700 dark:text-brand-mint-400",
  "text-blue-700 dark:text-blue-400",
  "text-green-700 dark:text-green-400",
  "text-cyan-700 dark:text-cyan-400",
  "text-brand-mint-700 dark:text-brand-mint-400",
];

const FULL_CODE = CODE_LINES.join("\n");

const SOCIAL_LINKS = [
  { platform: "github" as const, href: "https://github.com/redasalem" },
  { platform: "linkedin" as const, href: "https://www.linkedin.com/in/reda-salem-dev/" },
  { platform: "email" as const, href: "mailto:redasalem287@gmail.com" },
];

const TypedCodeBlock = memo(function TypedCodeBlock() {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (charCount >= FULL_CODE.length) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCharCount((currentCount) => currentCount + 1);
    }, 28);

    return () => window.clearTimeout(timeout);
  }, [charCount]);

  const displayedCode = useMemo(() => FULL_CODE.slice(0, charCount), [charCount]);
  const lines = useMemo(() => displayedCode.split("\n"), [displayedCode]);

  return (
    <div className="space-y-3 font-mono text-sm opacity-0 animate-fade-in-delay-3">
      <pre className="text-brand-mint-700 dark:text-brand-mint-400 whitespace-pre-wrap">
        {lines.map((line, index) => {
          const isLastLine = index === lines.length - 1;

          return (
            <div key={`${index}-${line.length}`} className={CODE_LINE_CLASSES[index] ?? CODE_LINE_CLASSES[0]}>
              {line}
              {isLastLine ? <span className="hero-code-cursor ml-1 align-middle" aria-hidden="true" /> : null}
            </div>
          );
        })}
      </pre>
    </div>
  );
});

const HeroShowcase = memo(function HeroShowcase() {
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const resetTilt = useCallback(() => {
    if (!panelRef.current) {
      return;
    }

    panelRef.current.style.setProperty("--hero-rotate-x", "0deg");
    panelRef.current.style.setProperty("--hero-rotate-y", "0deg");
    panelRef.current.style.setProperty("--hero-glow-x", "50%");
    panelRef.current.style.setProperty("--hero-glow-y", "50%");
  }, []);

  const updateTilt = useCallback((clientX: number, clientY: number) => {
    if (!panelRef.current) {
      return;
    }

    const rect = panelRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) / rect.width;
    const relativeY = (clientY - rect.top) / rect.height;
    const rotateX = (0.5 - relativeY) * 6;
    const rotateY = (relativeX - 0.5) * 6;

    panelRef.current.style.setProperty("--hero-rotate-x", `${rotateX.toFixed(2)}deg`);
    panelRef.current.style.setProperty("--hero-rotate-y", `${rotateY.toFixed(2)}deg`);
    panelRef.current.style.setProperty("--hero-glow-x", `${(relativeX * 100).toFixed(2)}%`);
    panelRef.current.style.setProperty("--hero-glow-y", `${(relativeY * 100).toFixed(2)}%`);
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      updateTilt(clientX, clientY);
    });
  }, [updateTilt]);

  const handlePointerLeave = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    resetTilt();
  }, [resetTilt]);

  useEffect(() => {
    resetTilt();

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [resetTilt]);

  return (
    <div className="relative opacity-0 animate-fade-in-delay-3">
      <div
        ref={panelRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="hero-showcase-panel relative bg-card rounded-2xl p-1 border border-border shadow-xl"
      >
        <div className="hero-showcase-glow absolute inset-0 rounded-2xl pointer-events-none opacity-50" />

        <div className="bg-gray-50 dark:bg-slate-900/80 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700/50">
          <div className="bg-gray-100 dark:bg-slate-800/80 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200 dark:border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 text-center text-xs text-gray-500 dark:text-slate-500 font-medium">
              ~/reda-salem
            </div>
          </div>

          <div className="p-6 min-h-[220px] bg-white dark:bg-slate-900">
            <TypedCodeBlock />
          </div>
        </div>
      </div>
    </div>
  );
});

const HeroSection = memo(function HeroSection() {
  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id="about" className="relative min-h-screen overflow-hidden flex items-center bg-background">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,130,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,130,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,200,130,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,130,0.06)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Single subtle orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[500px] h-[500px] top-[-150px] left-[-150px] bg-gradient-to-br from-brand-mint-500/10 to-transparent rounded-full blur-3xl hero-orb"
          style={{ animationDuration: "18s" }}
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block mt-4 opacity-0 animate-fade-in-delay-1">
              <span className="px-4 py-2 bg-brand-mint-500/10 dark:bg-brand-mint-500/15 border border-brand-mint-500/20 dark:border-brand-mint-400/20 rounded-full text-brand-mint-700 dark:text-brand-mint-300 text-sm font-medium">
                Open to Remote & Freelance
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight opacity-0 animate-fade-in-delay-1">
                Hi, I&apos;m{" "}
                <span className="text-brand-mint-600 dark:text-brand-mint-400 font-extrabold">
                  Reda Salem
                </span>
              </h1>

              <h2 className="text-2xl lg:text-3xl font-semibold text-muted-foreground opacity-0 animate-fade-in-delay-2">
                Full-Stack Engineer
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl opacity-0 animate-fade-in-delay-2">
              I build web applications that work well and ship on time. My stack is{" "}
              <strong className="text-foreground">React, Next.js, Node.js, and MongoDB</strong> — and I&apos;ve used it
              to deliver car rental platforms, multi-vendor marketplaces, and SEO tools
              that handle real users and real payments.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-3">
              <button onClick={scrollToProjects} className="btn-secondary group">
                View My Projects
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToContact}
                className="cursor-pointer px-8 py-4 bg-gray-200/80 dark:bg-white/10 border border-gray-300 dark:border-white/15 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-300/80 dark:hover:bg-white/15 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <ArrowDown className="w-5 h-5" />
                Get in Touch
              </button>
            </div>

            <div className="flex gap-3 opacity-0 animate-fade-in-delay-4">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon
                  key={social.platform}
                  platform={social.platform}
                  href={social.href}
                  size="md"
                />
              ))}
            </div>
          </div>

          <HeroShowcase />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex opacity-0 animate-fade-in-delay-4">
        <div className="hero-scroll-shell w-6 h-10 border-2 border-gray-400 dark:border-white/20 rounded-full flex justify-center pt-2">
          <div className="hero-scroll-dot w-1 h-3 bg-gray-500 dark:bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
