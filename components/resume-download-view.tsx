"use client";

import React, { lazy, Suspense, useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  Mail,
  Code,
  Database,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Globe,
} from "lucide-react";
import {
  DEFAULT_SITE_SETTINGS,
  getSiteSettings,
  type SiteSettings,
} from "@/lib/firestore";
import { siteDictionary, type Locale } from "@/lib/i18n";

const ChatbotLoader = lazy(() => import("@/components/chatbot-loader"));

const floatingOrb = (delay: number, size: string, position: string) => ({
  className: `absolute ${size} ${position} bg-gradient-to-br from-brand-mint-400 to-brand-mint-600 rounded-full blur-3xl opacity-30 pointer-events-none`,
  style: { animationDelay: `${delay}s` },
});

const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const prefix = value.match(/[^0-9]*/)?.[0] || "";

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(prefix + Math.floor(start) + suffix);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue, prefix, suffix, value]);

  return <span>{displayValue}</span>;
};

const SkillBadge = ({ skill, delay }: { skill: string; delay: number }) => {
  return (
    <span
      className="animate-skill-badge skill-badge-hover relative px-5 py-2.5 bg-card/80 backdrop-blur-sm border border-border rounded-full font-medium text-sm cursor-default overflow-hidden stagger-1"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="relative z-10">{skill}</span>
    </span>
  );
};

const HighlightCard = ({
  item,
  index,
}: {
  item: { icon: React.ReactNode; title: string; description: string };
  index: number;
}) => {
  return (
    <div
      className="group card-hover-lift relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 overflow-hidden animate-page-stagger"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-mint-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-14 h-14 bg-brand-mint-500/20 rounded-xl flex items-center justify-center text-brand-mint-500 mb-4 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-5">
          <div className="transition-transform duration-300 group-hover:rotate-360">
            {item.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-mint-500 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </div>
    </div>
  );
};

const HIGHLIGHT_ICONS = [
  <Code key="0" className="w-6 h-6" />,
  <Code key="1" className="w-6 h-6" />,
  <Smartphone key="2" className="w-6 h-6" />,
  <Database key="3" className="w-6 h-6" />,
  <Code key="4" className="w-6 h-6" />,
  <Database key="5" className="w-6 h-6" />,
];

interface ResumeDownloadViewProps {
  locale?: Locale;
  initialSettings?: SiteSettings;
}

export default function ResumeDownloadView({
  locale = "en",
  initialSettings = DEFAULT_SITE_SETTINGS,
}: ResumeDownloadViewProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const t = siteDictionary[locale];
  const isRtl = locale === "ar";

  useEffect(() => {
    let active = true;
    getSiteSettings()
      .then((fresh) => {
        if (active && fresh) setSettings(fresh);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const resumeHighlights = t.download.highlights.map((h, i) => ({
    icon: HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length],
    title: h.title,
    description: h.description,
  }));

  const skills =
    settings.resumeSkills && settings.resumeSkills.length > 0
      ? settings.resumeSkills
      : [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "React Native",
          "Tailwind CSS",
          "MongoDB",
          "Express.js",
          "Prisma",
          "Redux",
        ];

  const statsList =
    settings.resumeStats && settings.resumeStats.length > 0
      ? settings.resumeStats.map((st) => ({
          value: st.value,
          label: locale === "ar" ? st.labelAr || st.label : st.label,
        }))
      : t.download.stats;

  const cvLabel =
    locale === "ar"
      ? t.download.defaultCvLabel
      : settings.cvLabel || t.download.defaultCvLabel;
  const cvSub =
    locale === "ar"
      ? t.download.defaultCvSubtitle
      : settings.cvSubtitle || t.download.defaultCvSubtitle;

  const ActionArrow = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const homeHref = locale === "ar" ? "/ar" : "/";
  const contactHref = locale === "ar" ? "/ar#contact" : "/#contact";
  const switchHref = locale === "ar" ? "/download" : "/ar/download";

  return (
    <div
      dir={t.dir}
      lang={t.lang}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          {...floatingOrb(0, "w-[600px] h-[600px]", "top-[-200px] left-[-200px]")}
        />
        <div
          {...floatingOrb(2, "w-[400px] h-[400px]", "top-[20%] right-[-150px]")}
        />
        <div
          {...floatingOrb(4, "w-[500px] h-[500px]", "bottom-[-200px] right-[10%]")}
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,159,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.08)_1px,transparent_1px)] bg-size-[80px_80px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Top bar with Home + Language switch */}
        <div className="flex items-center justify-between mb-10">
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-mint-400 transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {t.download.backHome}
          </Link>

          <Link
            href={switchHref}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-mint-500/10 hover:bg-brand-mint-500/20 border border-brand-mint-500/25 text-brand-mint-300 text-xs font-bold transition-all"
          >
            <Globe className="w-4 h-4" />
            {t.switchLangLabel}
          </Link>
        </div>

        <div className="text-center mb-20 animate-page-fade-in">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-mint-500/15 border border-brand-mint-500/30 rounded-full text-brand-mint-600 dark:text-brand-mint-300 text-sm font-medium backdrop-blur-sm hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 animate-icon-spin" />
              {t.download.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="block bg-gradient-to-r from-white via-brand-mint-400 to-brand-mint-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {t.download.title}
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.download.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <a
              href={settings.cvUrl || DEFAULT_SITE_SETTINGS.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 bg-card/80 backdrop-blur-sm border-2 border-brand-mint-500/40 text-foreground font-bold text-lg rounded-full shadow-xl hover:border-brand-mint-500 transition-all duration-500 overflow-hidden hover:scale-105"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-brand-mint-500/0 via-brand-mint-500/10 to-brand-mint-500/0 animate-shimmer"
                style={{ animationDelay: "1s" }}
              />
              <Database className="w-6 h-6 relative z-10 text-brand-mint-500 group-hover:-rotate-12 transition-transform" />
              <div className="relative z-10 flex flex-col items-start">
                <span className="text-base font-extrabold leading-tight">
                  {cvLabel}
                </span>
                <span className="text-xs font-medium text-muted-foreground leading-tight">
                  {cvSub}
                </span>
              </div>
              <ActionArrow
                className={`w-5 h-5 relative z-10 text-brand-mint-500 transition-transform ${
                  isRtl
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {statsList.map((stat, i) => (
              <div
                key={i}
                className="text-center animate-page-stagger hover:scale-110 hover:-translate-y-2 transition-transform"
                style={{ animationDelay: `${0.8 + i * 0.1}s` }}
              >
                <div className="text-4xl font-black text-brand-mint-500">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section
          className="mb-20 animate-page-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.download.whatYouFindTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.download.whatYouFindSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeHighlights.map((item, i) => (
              <HighlightCard key={i} item={item} index={i} />
            ))}
          </div>
        </section>

        <section
          className="mb-20 animate-page-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.download.proficiencyTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.download.proficiencySubtitle}
            </p>
          </div>

          <div
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
            dir="ltr"
          >
            {skills.map((skill, i) => (
              <SkillBadge key={skill} skill={skill} delay={i * 0.05} />
            ))}
          </div>
        </section>

        <section
          className="mb-20 animate-page-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden hover:scale-[1.01] transition-transform">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint-500/10 rounded-full blur-3xl animate-pulse-glow" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  {t.download.includesTitle}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {t.download.includesList.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 cursor-default animate-page-stagger group-hover:text-brand-mint-500 transition-colors"
                      style={{ animationDelay: `${1.2 + i * 0.1}s` }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-brand-mint-500 flex-shrink-0 mt-0.5 group-hover:scale-120 transition-transform" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="text-center mb-16 animate-page-fade-in"
          style={{ animationDelay: "1.3s" }}
        >
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-muted-foreground text-lg animate-pulse-slow">
              {t.download.ctaPrompt}
            </p>

            <Link
              href={contactHref}
              className="inline-flex items-center gap-3 px-8 py-4 bg-secondary/50 backdrop-blur-sm border border-border rounded-full font-semibold hover:bg-brand-mint-500/20 hover:border-brand-mint-500/50 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {t.download.ctaBtn}
            </Link>
          </div>
        </section>

        <div
          className="text-center animate-page-fade-in"
          style={{ animationDelay: "1.5s" }}
        >
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-mint-500 transition-colors"
          >
            <BackArrow className="w-4 h-4" />
            {t.download.backHome}
          </Link>
        </div>
      </div>

      <Suspense fallback={null}>
        <ChatbotLoader />
      </Suspense>

      <div className="fixed bottom-10 right-10 w-32 h-32 pointer-events-none hidden lg:block animate-float">
        <FileText className="w-full h-full text-brand-mint-500" />
      </div>

      <div
        className="fixed bottom-20 left-10 w-24 h-24 pointer-events-none hidden lg:block animate-float-slow"
        style={{ animationDelay: "1s" }}
      >
        <FileText className="w-full h-full text-brand-mint-400/50" />
      </div>
    </div>
  );
}
