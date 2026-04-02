"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import React, { useRef, useMemo, useState } from "react";
import {
  Code,
  Palette,
  Brush,
  Layers,
  Waves,
  FileCode,
  Braces,
  Atom,
  Smartphone,
  LayoutGrid,
  Sparkles,
  BarChart3,
  Database,
  Flame,
  UserCheck,
  CreditCard,
  Box,
  Zap,
  Cloud,
  Globe,
  Terminal,
  CloudFog,
  Gauge,
  GitBranch,
  Search,
  RefreshCw,
  Bug,
  Shield,
  Cpu,
} from "lucide-react";

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

const SkillCategory = ({ title, skills, index }: { title: string; skills: Array<{name: string; icon: React.ReactNode}>; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      className="group relative h-full p-6 md:p-8 rounded-3xl border border-border/50 
      bg-card/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-500
      shadow-lg hover:shadow-primary/5 dark:shadow-none flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/10 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Corner glow effect */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-mint-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.h3 
        className="relative text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground group-hover:text-primary transition-colors duration-300"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {title}
      </motion.h3>

      <div className="relative flex flex-wrap gap-2 md:gap-3">
        {skills.map((skill, idx) => (
          <SkillBadge
            key={idx}
            name={skill.name}
            icon={skill.icon}
            delay={index * 0.1 + idx * 0.05}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = React.memo(function Skills() {
  const skillCategories = useMemo(() => [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "HTML", icon: <Code className="w-4 h-4" style={{ color: "#ff5722" }} /> },
        { name: "CSS", icon: <Palette className="w-4 h-4" style={{ color: "#2196f3" }} /> },
        { name: "Sass", icon: <Brush className="w-4 h-4" style={{ color: "#e91e63" }} /> },
        {
          name: "Bootstrap",
          icon: <Layers className="w-4 h-4" style={{ color: "#9c27b0" }} />,
        },
        {
          name: "Tailwind CSS",
          icon: <Waves className="w-4 h-4" style={{ color: "#06b6d4" }} />,
        },
      ],
    },
    {
      title: "JavaScript & Frameworks",
      skills: [
        {
          name: "JavaScript (ES6+)",
          icon: <FileCode className="w-4 h-4" style={{ color: "#f7df1e" }} />,
        },
        {
          name: "TypeScript",
          icon: <Braces className="w-4 h-4" style={{ color: "#3178c6" }} />,
        },
        { name: "React.js", icon: <Atom className="w-4 h-4" style={{ color: "#61dafb" }} /> },
        { name: "Next.js", icon: <CloudFog className="w-4 h-4" style={{ color: "#bdbdbd" }} /> },
        { name: "Server Components", icon: <CloudFog className="w-4 h-4" style={{ color: "#000000" }} /> },
        {
          name: "React Native",
          icon: <Smartphone className="w-4 h-4" style={{ color: "#61dafb" }} />,
        },
      ],
    },
    {
      title: "UI Libraries & Tools",
      skills: [
        {
          name: "Material UI",
          icon: <LayoutGrid className="w-4 h-4" style={{ color: "#00b0ff" }} />,
        },
        { name: "ShadCN UI", icon: <Sparkles className="w-4 h-4" style={{ color: "#ab47bc" }} /> },
        { name: "Zustand", icon: <Cpu className="w-4 h-4" style={{ color: "#433333" }} /> },
        { name: "Storybook", icon: <Palette className="w-4 h-4" style={{ color: "#FF4785" }} /> },
        { name: "DaisyUI", icon: <Palette className="w-4 h-4" style={{ color: "#ff9800" }} /> },
        { name: "Nivo", icon: <BarChart3 className="w-4 h-4" style={{ color: "#ff9800" }} /> },
        {
          name: "React Query",
          icon: <Database className="w-4 h-4" style={{ color: "#f06292" }} />,
        },
      ],
    },
    {
      title: "Integrations & Authentication",
      skills: [
        {
          name: "API Integration",
          icon: <Globe className="w-4 h-4" style={{ color: "#00e676" }} />,
        },
        {
          name: "Firebase Auth & Firestore",
          icon: <Flame className="w-4 h-4" style={{ color: "#ffb300" }} />,
        },
        { name: "Clerk", icon: <UserCheck className="w-4 h-4" style={{ color: "#5c6bc0" }} /> },
        { name: "GraphQL", icon: <Globe className="w-4 h-4" style={{ color: "#E10098" }} /> },
        {
          name: "PayPal Integration",
          icon: <CreditCard className="w-4 h-4" style={{ color: "#2196f3" }} />,
        },
      ],
    },
    {
      title: "Build & Deployment",
      skills: [
        { name: "Webpack", icon: <Box className="w-4 h-4" style={{ color: "#4fc3f7" }} /> },
        { name: "Vite", icon: <Zap className="w-4 h-4" style={{ color: "#d500f9" }} /> },
        {
          name: "Firebase Hosting",
          icon: <Cloud className="w-4 h-4" style={{ color: "#ffa000" }} />,
        },
        { name: "Vercel", icon: <Cloud className="w-4 h-4" style={{ color: "#eeeeee" }} /> },
        { name: "Netlify", icon: <Globe className="w-4 h-4" style={{ color: "#00bfa5" }} /> },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", icon: <Cpu className="w-4 h-4" style={{ color: "#339933" }} /> },
        {
          name: "Express.js",
          icon: <Terminal className="w-4 h-4" style={{ color: "#000000" }} />,
        },
        { name: "MongoDB", icon: <Database className="w-4 h-4" style={{ color: "#47A248" }} /> },
        { name: "PostgreSQL & Redis", icon: <Cpu className="w-4 h-4" style={{ color: "#336791" }} /> },
        { name: "Convex", icon: <CloudFog className="w-4 h-4" style={{ color: "#F05138" }} /> },
      ],
    },
    {
      title: "Workspace & Collaboration",
      skills: [
        { name: "Git & GitHub", icon: <GitBranch className="w-4 h-4" style={{ color: "#F05032" }} /> },
        { name: "Figma", icon: <Palette className="w-4 h-4" style={{ color: "#F24E1E" }} /> },
        { name: "Postman", icon: <Globe className="w-4 h-4" style={{ color: "#FF6C37" }} /> },
      ],
    },
    {
      title: "Architecture & Performance",
      skills: [
        { name: "React Performance", icon: <Gauge className="w-4 h-4" style={{ color: "#61dafb" }} /> },
        { name: "Next.js Production", icon: <CloudFog className="w-4 h-4" style={{ color: "#000000" }} /> },
        { name: "Lighthouse", icon: <Gauge className="w-4 h-4" style={{ color: "#F44B3E" }} /> },
        { name: "System Scalability", icon: <GitBranch className="w-4 h-4" style={{ color: "#ff9800" }} /> },
        { name: "PWA & Cloud Native", icon: <Cpu className="w-4 h-4" style={{ color: "#4caf50" }} /> },
      ],
    },
    {
      title: "Testing, DevOps & Security",
      skills: [
        { name: "CI/CD & Docker", icon: <RefreshCw className="w-4 h-4" style={{ color: "#2196f3" }} /> },
        { name: "Jest & Cypress", icon: <Bug className="w-4 h-4" style={{ color: "#C21325" }} /> },
        { name: "Web Security", icon: <Shield className="w-4 h-4" style={{ color: "#9c27b0" }} /> },
        { name: "Design Patterns", icon: <Cpu className="w-4 h-4" style={{ color: "#795548" }} /> },
      ],
    },
  ], []);

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
