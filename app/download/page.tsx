"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Download, FileText, Star, Zap, Clock, Award, CheckCircle2, Sparkles, ArrowRight, Mail, Briefcase, Code, Database, Smartphone } from "lucide-react";
import React, { useState, useEffect } from "react";
import ChatBot from "@/components/chatbot";

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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.span
      key={skill}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.15, y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative px-5 py-2.5 bg-card/80 backdrop-blur-sm border border-border rounded-full font-medium text-sm cursor-default overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-mint-500/20 to-brand-mint-400/20"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 0.6 }}
      />
      <motion.span
        animate={{ color: isHovered ? "rgb(0, 255, 159)" : "inherit" }}
        className="relative z-10"
      >
        {skill}
      </motion.span>
    </motion.span>
  );
};

const HighlightCard = ({ item, index }: { item: { icon: React.ReactNode; title: string; description: string }; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-brand-mint-500/50 transition-all duration-300 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-brand-mint-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl p-[1px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: "linear-gradient(135deg, rgba(0, 255, 159, 0.5), transparent, rgba(0, 255, 159, 0.3))",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      
      <div className="relative z-10">
        <motion.div 
          className="w-14 h-14 bg-brand-mint-500/20 rounded-xl flex items-center justify-center text-brand-mint-500 mb-4 transition-transform duration-300"
          animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? 5 : 0 }}
          whileInView={{ rotate: [0, -5, 5, 0] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
        <motion.h3 
          className="text-xl font-bold mb-2"
          animate={{ color: isHovered ? "rgb(0, 255, 159)" : "inherit" }}
        >
          {item.title}
        </motion.h3>
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </div>
    </motion.div>
  );
};

export default function DownloadPage() {
  const resumeHighlights = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "99/100 PageSpeed",
      description: "Performance optimization specialist with proven results"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Expert",
      description: "React, Next.js, Node.js, TypeScript mastery"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Development",
      description: "React Native cross-platform applications"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Backend Architecture",
      description: "Scalable APIs with Express & MongoDB"
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Production Experience",
      description: "Real-world projects with Stripe & PayPal"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Clean Architecture",
      description: "Maintainable, testable code patterns"
    },
  ];

  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "React Native", 
    "Tailwind CSS", "MongoDB", "Express.js", "Prisma", "Redux"
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const glowX = useTransform(springX, [-0.5, 0.5], [-100, 100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-100, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background with Mouse-reactive Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          {...floatingOrb(0, "w-[600px] h-[600px]", "top-[-200px] left-[-200px]")}
        />
        <motion.div 
          {...floatingOrb(2, "w-[400px] h-[400px]", "top-[20%] right-[-150px]")}
        />
        <motion.div 
          {...floatingOrb(4, "w-[500px] h-[500px]", "bottom-[-200px] right-[10%]")}
        />
        
        {/* Mouse-reactive spotlight */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-brand-mint-500/10 blur-[100px] pointer-events-none"
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,159,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.08)_1px,transparent_1px)] bg-size-[80px_80px]" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-20"
        >
          {/* Animated Badge */}
          <motion.div variants={fadeInUp} className="mb-8">
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-mint-500/15 border border-brand-mint-500/30 rounded-full text-brand-mint-600 dark:text-brand-mint-300 text-sm font-medium backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 159, 0.3)" }}
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Professional Resume
            </motion.span>
          </motion.div>

          {/* Animated Title */}
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <motion.span 
              className="block"
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #00FF9F 50%, #00CC80 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(0,255,159,0.3))',
                backgroundSize: "200% auto",
              }}
            >
              Download My Resume
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Get the complete overview of my skills, experience, and achievements. 
            Available in multiple formats for your convenience.
          </motion.p>

          {/* Enhanced Main Download Button */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <motion.a
              href="https://drive.google.com/file/d/1MNYifjkRpiy6xXKeAqiXCinVBkOh6mrZ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, boxShadow: "0 0 60px rgba(0,255,159,0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-brand-mint-500 via-brand-mint-400 to-brand-mint-500 bg-[length:200%_100%] text-black font-bold text-xl rounded-full shadow-2xl shadow-brand-mint-500/40 hover:shadow-brand-mint-500/60 transition-all duration-500 overflow-hidden"
              animate={{
                boxShadow: [
                  "0 4px 30px rgba(0, 255, 159, 0.2)",
                  "0 4px 40px rgba(0, 255, 159, 0.4)",
                  "0 4px 30px rgba(0, 255, 159, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              />
              
              {/* Glow particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                  initial={{ x: "0%", y: "50%", opacity: 0 }}
                  animate={{
                    x: ["0%", "100%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              ))}
              
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Download className="w-7 h-7 relative z-10" />
              </motion.div>
              <span className="relative z-10">Download Resume</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 relative z-10" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Animated Quick Stats */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {[
              { value: "2+", label: "Years Experience" },
              { value: "15+", label: "Projects Completed" },
              { value: "99/100", label: "PageSpeed Score" },
              { value: "10+", label: "Technologies" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center"
              >
                <div className="text-4xl font-black text-brand-mint-500">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Resume Highlights */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You&apos;ll Find in My Resume
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A comprehensive overview of my technical expertise and professional achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeHighlights.map((item, i) => (
              <HighlightCard key={i} item={item} index={i} />
            ))}
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tech Stack Proficiency
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Technologies I work with daily to build production-grade applications
            </p>
          </div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {skills.map((skill, i) => (
              <SkillBadge key={skill} skill={skill} delay={i * 0.05} />
            ))}
          </motion.div>
        </motion.section>

        {/* Features List */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute top-0 right-0 w-64 h-64 bg-brand-mint-500/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              
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
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 100 }}
                      whileHover={{ x: 10, color: "rgb(0, 255, 159)" }}
                      className="flex items-start gap-3 cursor-default"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-brand-mint-500 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex flex-col items-center gap-6">
            <motion.p
              className="text-muted-foreground text-lg"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Interested in working together?
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-secondary/50 backdrop-blur-sm border border-border rounded-full font-semibold hover:bg-brand-mint-500/20 hover:border-brand-mint-500/50 transition-all"
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ x: -5 }}
            className="inline-flex"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-mint-500 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Document Icons */}
      <ChatBot />
      <motion.div
        initial={{ opacity: 0, y: 100, rotate: -10 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          y: [100, 80, 100],
          rotate: [-10, -5, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-10 right-10 w-32 h-32 pointer-events-none hidden lg:block"
      >
        <FileText className="w-full h-full text-brand-mint-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80, rotate: 15 }}
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          y: [80, 60, 80],
          rotate: [15, 20, 15],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="fixed bottom-20 left-10 w-24 h-24 pointer-events-none hidden lg:block"
      >
        <FileText className="w-full h-full text-brand-mint-400/50" />
      </motion.div>
    </div>
  );
}
