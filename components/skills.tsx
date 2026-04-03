"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import React, { useRef, useState, useMemo } from "react";
import {
  Code, Palette, Brush, Layers, Waves, FileCode, Braces, Atom,
  Smartphone, LayoutGrid, Sparkles, Database, Flame, UserCheck,
  CreditCard, Box, Zap, Cloud, Globe, Terminal, CloudFog, Gauge,
  GitBranch, RefreshCw, Bug, Shield, Cpu, BarChart
} from "lucide-react";
import { skillsData, SkillCategoryData } from "@/data/skills";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  HTML: Code, CSS: Palette, Sass: Brush, Bootstrap: Layers, "Tailwind CSS": Waves,
  "JavaScript (ES6+)": FileCode, TypeScript: Braces, "React.js": Atom, "Next.js": CloudFog,
  "Server Components": CloudFog, "React Native": Smartphone, "Material UI": LayoutGrid,
  "ShadCN UI": Sparkles, Zustand: Cpu, Storybook: Palette, DaisyUI: Palette, Nivo: BarChart,
  "React Query": Database, "API Integration": Globe, "Firebase Auth & Firestore": Flame,
  Clerk: UserCheck, GraphQL: Globe, "PayPal Integration": CreditCard, Webpack: Box, Vite: Zap,
  "Firebase Hosting": Cloud, Vercel: Cloud, Netlify: Globe, "Node.js": Cpu, "Express.js": Terminal,
  MongoDB: Database, "PostgreSQL & Redis": Cpu, Convex: CloudFog, "Git & GitHub": GitBranch,
  Figma: Palette, Postman: Globe, "React Performance": Gauge, "Next.js Production": CloudFog,
  Lighthouse: Gauge, "System Scalability": GitBranch, "PWA & Cloud Native": Cpu,
  "CI/CD & Docker": RefreshCw, "Jest & Cypress": Bug, "Web Security": Shield,
  "Design Patterns": Cpu
};

const SkillBadge = ({ name, icon, delay }: { name: string; icon: React.ReactNode; delay: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium
      bg-secondary/50 border border-border/50 text-foreground/80 cursor-default"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.08, 
        backgroundColor: "rgba(0, 255, 159, 0.1)",
        borderColor: "rgba(0, 255, 159, 0.3)",
      }}
      transition={{ delay, duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-brand-mint-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ filter: "blur(8px)" }}
      />
      <motion.span 
        className="relative z-10 flex items-center justify-center w-4 h-4 md:w-5 md:h-5 transition-transform"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {icon}
      </motion.span>
      <motion.span 
        className="relative z-10 pt-0.5 transition-colors"
        animate={{ color: isHovered ? "rgb(0, 255, 159)" : "inherit" }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills, index }: { title: string; skills: Array<{name: string; color: string}>; index: number }) => {
  const [isHoveredCategory, setIsHoveredCategory] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6"
      onMouseEnter={() => setIsHoveredCategory(true)}
      onMouseLeave={() => setIsHoveredCategory(false)}
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
              icon={Icon ? <Icon className="w-4 h-4" style={{ color: skill.color }} /> : <Code className="w-4 h-4" style={{ color: skill.color }} />}
              delay={i * 0.05}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

const Skills = React.memo(function Skills() {
  const skillCategories: SkillCategoryData[] = useMemo(() => skillsData, []);

  const getIcon = (name: string) => {
    const Icon = iconMap[name];
    return Icon ? <Icon className="w-4 h-4" /> : <Code className="w-4 h-4" />;
  };

  const containerRef = useRef(null);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-background text-foreground transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="mb-16 md:mb-24 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4 md:mb-6">
            <Sparkles className="text-accent w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold text-accent">
              Production Stack
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-20 md:w-24 h-1.5 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

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
