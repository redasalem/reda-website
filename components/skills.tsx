"use client";

import React, { useRef, useMemo } from "react";
import {
  Code, Palette, Sparkles, Database,
  CreditCard, Globe, CloudFog, Gauge,
  GitBranch, Shield, Cpu, BarChart, Lock
} from "lucide-react";
import { 
  SiHtml5, SiCss, SiSass, SiBootstrap, SiTailwindcss,
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiMui, SiStorybook, SiFirebase, SiGraphql,
  SiWebpack, SiVite, SiVercel, SiNetlify,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiGithub, SiFigma, SiPostman, SiLighthouse,
  SiDocker, SiJest, SiPwa
} from "react-icons/si";
import { skillsData, SkillCategoryData } from "@/data/skills";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  HTML: SiHtml5, CSS: SiCss, Sass: SiSass, Bootstrap: SiBootstrap, "Tailwind CSS": SiTailwindcss,
  "JavaScript (ES6+)": SiJavascript, TypeScript: SiTypescript, "React.js": SiReact, "Next.js": SiNextdotjs,
  "Server Components": SiNextdotjs, "React Native": SiReact, "Material UI": SiMui,
  "ShadCN UI": Sparkles, Zustand: Cpu, Storybook: SiStorybook, DaisyUI: Palette, Nivo: BarChart,
  "React Query": Database, "API Integration": Globe, "Firebase Auth & Firestore": SiFirebase,
  Clerk: Lock, GraphQL: SiGraphql, "PayPal Integration": CreditCard, Webpack: SiWebpack, Vite: SiVite,
  "Firebase Hosting": SiFirebase, Vercel: SiVercel, Netlify: SiNetlify, "Node.js": SiNodedotjs, "Express.js": SiExpress,
  MongoDB: SiMongodb, "PostgreSQL & Redis": SiPostgresql, Convex: CloudFog, "Git & GitHub": SiGithub,
  Figma: SiFigma, Postman: SiPostman, "React Performance": Gauge, "Next.js Production": SiNextdotjs,
  Lighthouse: SiLighthouse, "System Scalability": GitBranch, "PWA & Cloud Native": SiPwa,
  "CI/CD & Docker": SiDocker, "Jest & Cypress": SiJest, "Web Security": Shield,
  "Design Patterns": Cpu
};

/* Each category gets a unique accent color */
const CATEGORY_ACCENTS = [
  { border: "from-brand-mint-500/40 to-brand-cyan-500/40", glow: "rgba(0, 200, 130, 0.15)" },
  { border: "from-brand-violet-500/40 to-brand-mint-500/40", glow: "rgba(139, 92, 246, 0.15)" },
  { border: "from-brand-cyan-500/40 to-brand-violet-500/40", glow: "rgba(6, 182, 212, 0.15)" },
  { border: "from-brand-amber-500/40 to-brand-mint-500/40", glow: "rgba(245, 158, 11, 0.15)" },
  { border: "from-brand-mint-500/40 to-brand-violet-500/40", glow: "rgba(0, 200, 130, 0.15)" },
  { border: "from-brand-cyan-500/40 to-brand-amber-500/40", glow: "rgba(6, 182, 212, 0.15)" },
];

const SkillBadge = ({ name, icon, delay }: { name: string; icon: React.ReactNode; delay: number }) => {
  return (
    <div
      className="skill-badge-hover relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium bg-secondary/50 border border-border/50 text-foreground/80 cursor-default animate-skill-badge"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-180">
        {icon}
      </span>
      <span className="pt-0.5">{name}</span>
    </div>
  );
};

const SkillCategory = ({ title, skills, index }: { title: string; skills: Array<{name: string; color: string}>; index: number }) => {
  const accent = CATEGORY_ACCENTS[index % CATEGORY_ACCENTS.length];

  return (
    <div
      className="gradient-border-card card-shimmer glass-card card-hover-lift p-6 animate-page-fade-in rounded-2xl"
      style={{
        animationDelay: `${index * 0.1}s`,
        // Custom glow color for this category
        ...(accent.glow ? { "--card-glow": accent.glow } as React.CSSProperties : {}),
      }}
    >
      <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => {
          const Icon = iconMap[skill.name];
          return (
            <SkillBadge
              key={i}
              name={skill.name}
              icon={Icon ? <Icon className="w-4 h-4" style={{ color: skill.color, filter: `drop-shadow(0 0 4px ${skill.color}40)` }} /> : <Code className="w-4 h-4" style={{ color: skill.color, filter: `drop-shadow(0 0 4px ${skill.color}40)` }} />}
              delay={i * 0.05}
            />
          );
        })}
      </div>
    </div>
  );
};

const Skills = React.memo(function Skills() {
  const skillCategories: SkillCategoryData[] = useMemo(() => skillsData, []);
  const containerRef = useRef(null);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-background text-foreground transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 md:mb-24 text-center animate-page-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-brand-violet-500/10 border border-brand-violet-500/20 mb-4 md:mb-6">
            <Sparkles className="text-brand-violet-400 w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold text-brand-violet-400">
              Tech Stack
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6">
            <span className="text-gradient-animated">What I Work With</span>
          </h2>
          <div className="w-20 h-1.5 mx-auto bg-gradient-to-r from-brand-mint-500 via-brand-violet-500 to-brand-cyan-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, i) => (
            <SkillCategory
              key={i}
              title={category.title}
              skills={category.skills}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;