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
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Mailbox,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const CODE_LINES = [
  "const engineer = {",
  '  name: "Reda Salem",',
  '  focus: "Performance & Scale",',
  '  stack: ["React", "Next.js", "React Native", "Node.js"],',
  '  results: ["99 PageSpeed", "2x Faster", "+30% Engagement"],',
  "};",
];

const CODE_LINE_CLASSES = [
  "text-brand-mint-700 dark:text-brand-mint-400",
  "text-blue-700 dark:text-blue-400",
  "text-green-700 dark:text-green-400",
  "text-cyan-700 dark:text-cyan-400",
  "text-brand-mint-700 dark:text-brand-mint-300",
  "text-brand-mint-700 dark:text-brand-mint-400",
];

const FULL_CODE = CODE_LINES.join("\n");

const SOCIAL_LINKS = [
  {
    name: "github",
    href: "https://github.com/redasalem",
    icon: Code2,
    iconClassName: "text-[#181717] dark:text-white",
    glowBackground: "radial-gradient(circle, rgba(0, 255, 159, 0.45) 0%, transparent 72%)",
  },
  {
    name: "linkedin",
    href: "https://www.linkedin.com/in/reda-salem-dev/",
    icon: Users,
    iconClassName: "text-[#0A66C2]",
    glowBackground: "radial-gradient(circle, rgba(10, 102, 194, 0.45) 0%, transparent 72%)",
  },
  {
    name: "email",
    href: "mailto:redasalem287@gmail.com",
    icon: Mailbox,
    iconClassName: "text-red-600 dark:text-red-300",
    glowBackground: "radial-gradient(circle, rgba(239, 68, 68, 0.42) 0%, transparent 72%)",
  },
];

const PARTICLES = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: (index * 17) % 100,
  top: (index * 29) % 100,
  size: 1 + (index % 3),
  duration: 10 + (index % 6) * 2,
  delay: (index % 5) * 0.9,
  drift: 280 + (index % 7) * 36,
}));

const KEYBOARD_KEYS = Array.from({ length: 36 }, (_, index) => index);

const HeroParticles = memo(function HeroParticles() {
  return (
    <div className="absolute inset-0 hidden md:block pointer-events-none" aria-hidden="true">
      {PARTICLES.map((particle) => (
        <span
          key={particle.id}
          className="hero-particle absolute rounded-full bg-brand-mint-500/60 dark:bg-brand-mint-400/50"
          style={
            {
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              ["--hero-particle-drift" as string]: `${particle.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});

const TypedCodeBlock = memo(function TypedCodeBlock() {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (charCount >= FULL_CODE.length) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCharCount((currentCount) => currentCount + 1);
    }, 24);

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
    const rotateX = (0.5 - relativeY) * 8;
    const rotateY = (relativeX - 0.5) * 8;

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
      <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-brand-mint-500 to-brand-mint-600 blur-3xl opacity-20 dark:opacity-30 hero-orb" />

      <div
        ref={panelRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="hero-showcase-panel relative bg-linear-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-4 border border-gray-300 dark:border-brand-mint-500/30 shadow-2xl"
      >
        <div className="hero-showcase-glow absolute inset-0 rounded-2xl pointer-events-none" />

        <div className="bg-linear-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-black rounded-xl overflow-hidden border border-gray-300 dark:border-slate-700 shadow-inner">
          <div className="bg-gray-200 dark:bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-xs text-gray-600 dark:text-slate-400 font-medium">
              reda-salem.com
            </div>
          </div>

          <div className="p-6 min-h-[400px] relative overflow-hidden bg-white dark:bg-slate-900">
            <TypedCodeBlock />

            <div className="absolute top-8 right-8 w-20 h-20 hero-float-fast">
              <div className="w-full h-full bg-gradient-to-br from-brand-mint-500/40 to-brand-mint-600/20 rounded-xl backdrop-blur-sm border border-brand-mint-500/50 flex items-center justify-center shadow-lg shadow-brand-mint-500/20">
                <Zap className="w-8 h-8 text-brand-mint-100" />
              </div>
            </div>

            <div className="absolute bottom-12 right-16 w-14 h-14 hero-float-slow">
              <div className="w-full h-full bg-gradient-to-tr from-brand-mint-600/40 to-brand-mint-500/20 rounded-full backdrop-blur-sm border border-brand-mint-600/50 flex items-center justify-center shadow-lg shadow-brand-mint-600/20">
                <Rocket className="w-6 h-6 text-brand-mint-100" />
              </div>
            </div>

            <div className="absolute top-1/2 left-4 w-10 h-10 hero-float-side">
              <div className="w-full h-full bg-gradient-to-bl from-brand-mint-400/30 to-transparent rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-mint-200" />
              </div>
            </div>

            <div className="absolute top-10 right-10 w-16 h-16 bg-brand-mint-500/30 dark:bg-brand-mint-500/20 rounded-lg backdrop-blur-sm border border-brand-mint-500/50 dark:border-brand-mint-500/30 hero-float-fast">
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-7 h-7 text-brand-mint-50" />
              </div>
            </div>

            <div className="absolute bottom-10 right-20 w-12 h-12 bg-brand-mint-600/30 dark:bg-brand-mint-600/20 rounded-full backdrop-blur-sm border border-brand-mint-600/50 dark:border-brand-mint-600/30 hero-float-slow">
              <div className="w-full h-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-brand-mint-100" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-gray-300 dark:bg-slate-800 rounded-lg p-3 border border-gray-400 dark:border-slate-700">
          <div className="grid grid-cols-12 gap-1">
            {KEYBOARD_KEYS.map((key) => (
              <div
                key={key}
                className="h-8 bg-gray-400 dark:bg-slate-700 rounded border border-gray-500 dark:border-slate-600 transition-transform duration-150 hover:bg-brand-mint-500 hover:scale-95 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-mint-500 dark:bg-brand-mint-600 rounded-full blur-3xl opacity-15 dark:opacity-20 hero-orb" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-mint-600 dark:bg-teal-600 rounded-full blur-3xl opacity-15 dark:opacity-20 hero-orb-reverse" />
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[600px] h-[600px] top-[-200px] left-[-200px] bg-gradient-to-br from-brand-mint-500/20 via-brand-mint-400/10 to-transparent rounded-full blur-3xl hero-orb"
          style={{ animationDuration: "15s" }}
        />
        <div
          className="absolute w-[500px] h-[500px] bottom-[-150px] right-[-100px] bg-gradient-to-tl from-brand-mint-600/20 via-brand-mint-500/10 to-transparent rounded-full blur-3xl hero-orb-reverse"
          style={{ animationDuration: "18s", animationDelay: "-2s" }}
        />
        <div
          className="absolute w-[400px] h-[400px] top-[30%] right-[20%] bg-gradient-to-tr from-brand-mint-400/15 to-transparent rounded-full blur-3xl hero-orb"
          style={{ animationDuration: "12s", animationDelay: "-5s" }}
        />
      </div>

      <HeroParticles />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,159,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.1)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block mt-4 opacity-0 animate-fade-in-delay-1">
              <span className="px-4 py-2 bg-brand-mint-500/20 dark:bg-brand-mint-500/30 border border-brand-mint-500/50 dark:border-brand-mint-400/50 rounded-full text-brand-mint-700 dark:text-brand-mint-300 text-sm font-medium backdrop-blur-sm">
                Open to Remote & Freelance
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight opacity-0 animate-fade-in-delay-1">
                Hi, I&apos;m{" "}
                <span
                  className="font-extrabold"
                  style={{
                    background: "linear-gradient(90deg, #FFFFFF 0%, #00FF9F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 10px rgba(0,255,159,0.3))",
                  }}
                >
                  Reda Salem
                </span>
              </h1>

              <h2 className="text-3xl lg:text-4xl font-semibold text-brand-mint-700 dark:text-brand-mint-300 opacity-0 animate-fade-in-delay-2">
                Strategic Full-Stack Engineer — Architecting Scalable Systems
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl opacity-0 animate-fade-in-delay-2">
              I architect high-throughput digital products with a <strong>system-first mindset</strong>. Deep fluency in
              <strong>Node.js, Express &amp; MongoDB</strong> empowers me to engineer smarter,
              faster, and more secure <strong>React, Next.js &amp; React Native</strong> frontends. The result: a{" "}
              <strong>99/100 PageSpeed</strong> score, secure payment pipelines via Stripe Connect, and cross-platform
              mobile apps that ship on time and scale under pressure.
            </p>

            <p className="text-sm text-muted-foreground/70 italic max-w-xl opacity-0 animate-fade-in-delay-3">
              Driven by Clean Code (SOLID), compile-time type safety with TypeScript 5, and AI-augmented workflows for scalable, production-grade systems.
            </p>

            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-delay-3">
              <button onClick={scrollToProjects} className="btn-secondary group">
                View My Projects
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToContact}
                className="cursor-pointer px-8 py-4 bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-300/80 dark:hover:bg-white/20 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <ArrowDown className="w-5 h-5" />
                Let&apos;s Connect
              </button>
            </div>

            <div className="flex gap-6 opacity-0 animate-fade-in-delay-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Reda Salem on ${social.name}`}
                    className="group relative w-12 h-12 bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center hover:bg-brand-mint-500 dark:hover:bg-brand-mint-500/30 hover:border-brand-mint-500 dark:hover:border-brand-mint-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                  >
                    <span
                      className="absolute inset-0 rounded-full opacity-0 scale-75 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-125"
                      style={{ background: social.glowBackground }}
                      aria-hidden="true"
                    />
                    <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${social.iconClassName}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          <HeroShowcase />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-delay-4">
        <div className="hero-scroll-shell w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center pt-2">
          <div className="hero-scroll-dot w-1 h-3 bg-gray-600 dark:bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
