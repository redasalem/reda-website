"use client";

import React, { lazy, Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { Download, FileText, ArrowRight, Mail, Code, Database, Smartphone, CheckCircle2, Sparkles } from "lucide-react";

const ChatbotLoader = lazy(() => import("@/components/chatbot-loader"));

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const floatingOrb = (delay: number, size: string, position: string) => ({
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.2, 1],
    x: [0, 30, 0],
    y: [0, -20, 0],
  },
  transition: {
    duration: 8,
    delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
  className: `absolute ${size} ${position} bg-gradient-to-br from-brand-mint-400 to-brand-mint-600 rounded-full blur-3xl opacity-30 pointer-events-none`,
});

const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
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

const HighlightCard = ({ item, index }: { item: { icon: React.ReactNode; title: string; description: string }; index: number }) => {
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

export default function DownloadPage() {
  const resumeHighlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "99/100 PageSpeed",
      description: "Core Web Vitals optimization specialist with proven Lighthouse results"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Architect",
      description: "React, Next.js 14, Node.js, TypeScript 5 mastery"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Cross-Platform Engineering",
      description: "React Native applications with scalable architecture"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Backend Architecture",
      description: "Scalable APIs with Express, MongoDB & secure JWT/RBAC flows"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Production Deployments",
      description: "End-to-end Stripe Connect & CI/CD via GitHub Actions"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Clean Architecture",
      description: "Type-safe, compile-time validated code patterns at scale"
    },
  ];

  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "React Native", 
    "Tailwind CSS", "MongoDB", "Express.js", "Prisma", "Redux"
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div {...floatingOrb(0, "w-[600px] h-[600px]", "top-[-200px] left-[-200px]")} />
        <div {...floatingOrb(2, "w-[400px] h-[400px]", "top-[20%] right-[-150px]")} />
        <div {...floatingOrb(4, "w-[500px] h-[500px]", "bottom-[-200px] right-[10%]")} />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,159,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.08)_1px,transparent_1px)] bg-size-[80px_80px]" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center mb-20 animate-page-fade-in">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-mint-500/15 border border-brand-mint-500/30 rounded-full text-brand-mint-600 dark:text-brand-mint-300 text-sm font-medium backdrop-blur-sm hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 animate-icon-spin" />
              Professional Resume
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span 
              className="block bg-gradient-to-r from-white via-brand-mint-400 to-brand-mint-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
            >
              Download My Resume
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore my strategic engineering profile — production-grade architectures, 
            compile-time type safety, and measurable performance achievements.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <a
              href="https://drive.google.com/file/d/16F5MI205bQZlWwt9JzOrqd6P8PNYPTQY/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 bg-card/80 backdrop-blur-sm border-2 border-brand-mint-500/40 text-foreground font-bold text-lg rounded-full shadow-xl hover:border-brand-mint-500 transition-all duration-500 overflow-hidden hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-mint-500/0 via-brand-mint-500/10 to-brand-mint-500/0 animate-shimmer" style={{ animationDelay: "1s" }} />
              <Database className="w-6 h-6 relative z-10 text-brand-mint-500 group-hover:-rotate-12 transition-transform" />
              <div className="relative z-10 flex flex-col items-start">
                <span className="text-base font-extrabold leading-tight">Full-Stack Strategy CV</span>
                <span className="text-xs font-medium text-muted-foreground leading-tight">System Design · Architecture</span>
              </div>
              <ArrowRight className="w-5 h-5 relative z-10 text-brand-mint-500 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { value: "2+", label: "Years Experience" },
              { value: "15+", label: "Projects Completed" },
              { value: "99/100", label: "PageSpeed Score" },
              { value: "10+", label: "Technologies" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center animate-page-stagger hover:scale-110 hover:-translate-y-2 transition-transform"
                style={{ animationDelay: `${0.8 + i * 0.1}s` }}
              >
                <div className="text-4xl font-black text-brand-mint-500">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="mb-20 animate-page-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You&apos;ll Find in My Resume
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A strategic overview of engineering achievements, technical depth, and production impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeHighlights.map((item, i) => (
              <HighlightCard key={i} item={item} index={i} />
            ))}
          </div>
        </section>

        <section className="mb-20 animate-page-fade-in" style={{ animationDelay: "0.8s" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tech Stack Proficiency
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Production-grade technologies I leverage daily to architect scalable applications
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, i) => (
              <SkillBadge key={skill} skill={skill} delay={i * 0.05} />
            ))}
          </div>
        </section>

        <section className="mb-20 animate-page-fade-in" style={{ animationDelay: "1s" }}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden hover:scale-[1.01] transition-transform">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-mint-500/10 rounded-full blur-3xl animate-pulse-glow" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Resume Includes
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Professional Summary & Career Objective",
                    "Detailed Work Experience with Achievements",
                    "Technical Skills & Proficiency Levels",
                    "Education & Certifications",
                    "Notable Projects with Impact Metrics",
                    "Contact Information & Social Links",
                  ].map((item, i) => (
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

        <section className="text-center mb-16 animate-page-fade-in" style={{ animationDelay: "1.3s" }}>
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-muted-foreground text-lg animate-pulse-slow">
              Interested in working together?
            </p>
            
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-secondary/50 backdrop-blur-sm border border-border rounded-full font-semibold hover:bg-brand-mint-500/20 hover:border-brand-mint-500/50 transition-all hover:scale-105"
            >
              <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Get In Touch
            </Link>
          </div>
        </section>

        <div className="text-center animate-page-fade-in" style={{ animationDelay: "1.5s" }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-mint-500 transition-colors hover:-translate-x-1"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>

      <Suspense fallback={null}>
        <ChatbotLoader />
      </Suspense>

      <div className="fixed bottom-10 right-10 w-32 h-32 pointer-events-none hidden lg:block animate-float">
        <FileText className="w-full h-full text-brand-mint-500" />
      </div>

      <div className="fixed bottom-20 left-10 w-24 h-24 pointer-events-none hidden lg:block animate-float-slow" style={{ animationDelay: "1s" }}>
        <FileText className="w-full h-full text-brand-mint-400/50" />
      </div>
    </div>
  );
}
