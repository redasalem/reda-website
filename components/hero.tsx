"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import SocialIcon from "@/components/social-icon";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_SOCIAL_LINKS,
  type SiteSettings,
  type SocialLinkItem,
} from "@/lib/firestore";
import { siteDictionary, type Locale } from "@/lib/i18n";

/* Richer syntax highlighting colors */
const CODE_LINE_CLASSES = [
  "text-brand-violet-400",
  "text-brand-cyan-400",
  "text-brand-mint-400",
  "text-brand-amber-400",
  "text-brand-violet-400",
];

const TypedCodeBlock = memo(function TypedCodeBlock({
  role,
  stack,
}: {
  role: string;
  stack: string[];
}) {
  const fullCode = useMemo(() => {
    const stackList = stack.map((item) => `"${item}"`).join(", ");
    return [
      "const reda = {",
      `  role: "${role}",`,
      `  stack: [${stackList}],`,
      "  available: true,",
      "};",
    ].join("\n");
  }, [role, stack]);

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (charCount >= fullCode.length) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCharCount((currentCount) => currentCount + 1);
    }, 28);

    return () => window.clearTimeout(timeout);
  }, [charCount, fullCode.length]);

  const displayedCode = useMemo(
    () => fullCode.slice(0, charCount),
    [charCount, fullCode],
  );
  const lines = useMemo(() => displayedCode.split("\n"), [displayedCode]);

  return (
    <div className="space-y-3 font-mono text-sm" dir="ltr">
      <pre className="text-brand-mint-400 whitespace-pre-wrap text-left">
        {lines.map((line, index) => {
          const isLastLine = index === lines.length - 1;

          return (
            <div
              key={`${index}-${line.length}`}
              className={CODE_LINE_CLASSES[index] ?? CODE_LINE_CLASSES[0]}
            >
              <span className="text-muted-foreground/40 mr-3 select-none text-xs">
                {index + 1}
              </span>
              {line}
              {isLastLine ? (
                <span
                  className="hero-code-cursor ml-1 align-middle"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          );
        })}
      </pre>
    </div>
  );
});

const HeroShowcase = memo(function HeroShowcase({
  role,
  stack,
}: {
  role: string;
  stack: string[];
}) {
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

    panelRef.current.style.setProperty(
      "--hero-rotate-x",
      `${rotateX.toFixed(2)}deg`,
    );
    panelRef.current.style.setProperty(
      "--hero-rotate-y",
      `${rotateY.toFixed(2)}deg`,
    );
    panelRef.current.style.setProperty(
      "--hero-glow-x",
      `${(relativeX * 100).toFixed(2)}%`,
    );
    panelRef.current.style.setProperty(
      "--hero-glow-y",
      `${(relativeY * 100).toFixed(2)}%`,
    );
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event;

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(() => {
        updateTilt(clientX, clientY);
      });
    },
    [updateTilt],
  );

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
    <div className="relative" dir="ltr">
      {/* Glow behind the panel */}
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-mint-500/20 via-brand-violet-500/10 to-brand-cyan-500/15 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      <div
        ref={panelRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="hero-showcase-panel relative bg-card/80 rounded-2xl p-1 border border-border/50 shadow-xl multi-glow"
      >
        <div className="hero-showcase-glow absolute inset-0 rounded-2xl pointer-events-none opacity-50" />

        <div className="bg-gray-50 dark:bg-slate-900/90 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700/30">
          {/* Terminal header with traffic lights */}
          <div className="bg-gray-100 dark:bg-slate-800/90 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200 dark:border-slate-700/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
            </div>
            <div className="flex-1 text-center">
              <span className="px-3 py-0.5 rounded-md bg-slate-700/20 dark:bg-slate-700/40 text-xs text-muted-foreground font-mono">
                ~/reda-salem
              </span>
            </div>
          </div>

          <div className="p-6 min-h-[220px] bg-white dark:bg-[#0d1117]">
            <TypedCodeBlock role={role} stack={stack} />
          </div>
        </div>
      </div>
    </div>
  );
});

interface HeroSectionProps {
  locale?: Locale;
  settings?: SiteSettings;
  socials?: SocialLinkItem[];
}

const HeroSection = memo(function HeroSection({
  locale = "en",
  settings = DEFAULT_SITE_SETTINGS,
  socials = DEFAULT_SOCIAL_LINKS,
}: HeroSectionProps) {
  const t = siteDictionary[locale];
  const isRtl = locale === "ar";

  const scrollToContact = useCallback(() => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToProjects = useCallback(() => {
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const heroSocials = useMemo(
    () => socials.filter((s) => s.visible && s.showInHero !== false),
    [socials],
  );

  const badgeText =
    locale === "ar"
      ? settings.availabilityBadgeAr || t.hero.defaultBadge
      : settings.availabilityBadge || t.hero.defaultBadge;

  const displayName =
    locale === "ar"
      ? settings.heroNameAr || settings.heroName
      : settings.heroName;

  const titleText =
    locale === "ar"
      ? settings.heroTitleAr || t.hero.defaultTitle
      : settings.heroTitle || t.hero.defaultTitle;

  const bioText =
    locale === "ar"
      ? settings.heroBioAr || t.hero.defaultBio
      : settings.heroBio || t.hero.defaultBio;

  const PrimaryArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden flex items-center bg-background"
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,130,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,130,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,200,130,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,130,0.06)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Multi-color orbs behind hero content */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute w-[500px] h-[500px] top-[-150px] left-[-150px] bg-gradient-to-br from-brand-mint-500/15 via-brand-cyan-500/8 to-transparent rounded-full blur-3xl"
          style={{ animation: "orbFloat1 18s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[400px] h-[400px] bottom-[-100px] right-[-100px] bg-gradient-to-tl from-brand-violet-500/10 via-brand-mint-500/5 to-transparent rounded-full blur-3xl"
          style={{ animation: "orbFloat2 22s ease-in-out infinite" }}
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Status Badge with pulse */}
            <div className="inline-block mt-4">
              <span className="badge-pulse px-4 py-2 bg-brand-mint-500/10 dark:bg-brand-mint-500/15 border border-brand-mint-500/30 dark:border-brand-mint-400/25 rounded-full text-brand-mint-600 dark:text-brand-mint-300 text-sm font-semibold inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-mint-500" />
                </span>
                {badgeText}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t.hero.greetingPrefix}{" "}
                <span className="text-gradient-hero font-extrabold">
                  {displayName}
                </span>
              </h1>

              <h2 className="text-2xl lg:text-3xl font-semibold">
                <span className="bg-gradient-to-r from-brand-cyan-400 via-brand-violet-400 to-brand-mint-400 bg-clip-text text-transparent">
                  {titleText}
                </span>
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {bioText}
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={scrollToProjects} className="btn-gradient group">
                {t.hero.viewProjectsBtn}
                <PrimaryArrow
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isRtl
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }`}
                />
              </button>

              <button
                onClick={scrollToContact}
                className="cursor-pointer px-8 py-4 glass-premium text-foreground font-semibold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-violet-500/10"
              >
                <ArrowDown className="w-5 h-5" />
                {t.hero.getInTouchBtn}
              </button>
            </div>

            <div className="flex gap-3 flex-wrap">
              {heroSocials.map((social) => (
                <SocialIcon
                  key={social.id}
                  platform={social.platform}
                  href={social.href}
                  label={social.label}
                  size="md"
                />
              ))}
            </div>
          </div>

          <HeroShowcase
            role={titleText}
            stack={
              settings.codeStack && settings.codeStack.length > 0
                ? settings.codeStack
                : ["React", "Next.js", "Node.js", "MongoDB"]
            }
          />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex">
        <div className="hero-scroll-shell w-6 h-10 border-2 border-brand-mint-500/30 dark:border-white/20 rounded-full flex justify-center pt-2">
          <div className="hero-scroll-dot w-1 h-3 bg-brand-mint-500/60 dark:bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
