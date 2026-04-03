"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Download, ArrowDown, ArrowRight, Briefcase, MessageSquare, Sparkles, PenTool, Coffee, Send, Code2, Users, Mailbox, Terminal } from "lucide-react";
import Link from "next/link";

const HeroSection = React.memo(function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const springConfig = { damping: 20, stiffness: 300 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const glowX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const codeLines = [
    'const engineer = {',
    '  name: "Reda Salem",',
    '  focus: "Performance & Scale",',
    '  stack: ["React", "Next.js", "React Native", "Node.js"],',
    '  results: ["99 PageSpeed ⚡", "2x Faster", "+30% Engagement"]',
    '}',
  ];

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      setMousePosition({ x: x * 20, y: y * 20 });
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isClient) return;
    const fullCode = codeLines.join('\n');
    if (typingIndex < fullCode.length) {
      const timeout = setTimeout(() => {
        setTypingIndex(timingIndex => timingIndex + 1);
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, isClient]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(show => !show);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const backgroundParticles = useMemo(() => {
    if (typeof window === "undefined") return [];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }));
  }, []);

  const displayedCode = codeLines.join('\n').slice(0, typingIndex);

  return (
    <section
      id="About Me"
      className="relative min-h-screen overflow-hidden flex items-center bg-background"
    >
      {/* Animated Morphing Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute w-[600px] h-[600px] top-[-200px] left-[-200px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-brand-mint-500/20 via-brand-mint-400/10 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute w-[500px] h-[500px] bottom-[-150px] right-[-100px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="w-full h-full bg-gradient-to-tl from-brand-mint-600/20 via-brand-mint-500/10 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute w-[400px] h-[400px] top-[30%] right-[20%]"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-brand-mint-400/15 to-transparent rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Enhanced Particle System - Desktop only for performance */}
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        {isClient && backgroundParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-brand-mint-500/60 dark:bg-brand-mint-400/50 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: particle.size,
              opacity: 0,
            }}
            animate={{
              y: [particle.y, particle.y - 500],
              opacity: [0, 0.8, 0],
              scale: [particle.size, particle.size * 1.5, particle.size * 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: particle.size, height: particle.size, willChange: "transform, opacity" }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,159,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.1)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="container mx-auto px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mt-4"
            >
              <span className="px-4 py-2  bg-brand-mint-500/20 dark:bg-brand-mint-500/30 border border-brand-mint-500/50 dark:border-brand-mint-400/50 rounded-full text-brand-mint-700 dark:text-brand-mint-300 text-sm font-medium backdrop-blur-sm">
                ⚡ Open to Remote & Freelance
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Hi, I'm{" "}
                <span 
                  className="font-extrabold"
                  style={{
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #00FF9F 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 10px rgba(0,255,159,0.3))'
                  }}
                >
                   Reda Salem
                </span>
              </motion.h1>

              <motion.h2
                className="text-3xl lg:text-4xl font-semibold text-brand-mint-700 dark:text-brand-mint-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Specialized Full-Stack Engineer · 99/100 PageSpeed · 2× Faster Apps
              </motion.h2>
            </div>

            {/* Combined Concise Description */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              I engineer production-ready web and mobile products optimized for speed and scale. From achieving{" "}
              <strong>99/100 PageSpeed</strong> on the C4R platform, to integrating{" "}
              <strong>Stripe & PayPal</strong> flows and shipping cross-platform{" "}
              <strong>React Native</strong> apps — I bring measurable performance to every project. React · Next.js · Node.js · TypeScript.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* View Projects Button */}
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary group"
              >
                View My Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Contact Button */}
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer px-8 py-4 bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-300/80 dark:hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <ArrowDown className="w-5 h-5" />
                Take Me
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[
                {
                  name: "github",
                  icon: (
                    <span className="relative z-20 text-[#181717] dark:text-white">
                      <Code2 className="w-5 h-5" />
                    </span>
                  ),
                  url: "https://github.com/redasalem",
                  glowColor: "rgba(0, 255, 159, 0.5)",
                },
                {
                  name: "linkedin",
                  icon: (
                    <span className="relative z-20 text-[#0A66C2] dark:text-[#0A66C2]">
                      <Users className="w-5 h-5" />
                    </span>
                  ),
                  url: "https://www.linkedin.com/in/reda-salem-dev/",
                  glowColor: "rgba(10, 102, 194, 0.5)",
                },
                {
                  name: "email",
                  icon: (
                    <span className="relative z-20 text-red-600 dark:text-red-300">
                      <Mailbox className="w-5 h-5" />
                    </span>
                  ),
                  url: "mailto:redasalem287@gmail.com",
                  glowColor: "rgba(239, 68, 68, 0.5)",
                },
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Reda Salem on ${social.name}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative w-12 h-12 bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center hover:bg-brand-mint-500 dark:hover:bg-brand-mint-500/30 hover:border-brand-mint-500 dark:hover:border-brand-mint-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: `radial-gradient(circle, ${social.glowColor} 0%, transparent 70%)`,
                      filter: "blur(8px)",
                    }}
                  />
                  <span className="text-xl group-hover:scale-110 transition-transform relative z-10">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Computer */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", damping: 15 }}
            style={{
              rotateX,
              rotateY,
            }}
          >
            {/* Glowing Background */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-brand-mint-500 to-brand-mint-600 dark:from-brand-mint-500 dark:to-brand-mint-600 rounded-3xl blur-3xl opacity-20 dark:opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Computer Container */}
            <div className="relative bg-linear-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-4 border border-gray-300 dark:border-brand-mint-500/30 shadow-2xl">
              {/* Screen */}
              <div className="bg-linear-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-black rounded-xl overflow-hidden border border-gray-300 dark:border-slate-700 shadow-inner">
                {/* Screen Header */}
                <div className="bg-gray-200 dark:bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-gray-300 dark:border-slate-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-600 dark:text-slate-400 font-medium">
                    reda-salem.com
                  </div>
                </div>

                {/* Screen Content */}
                <div className="p-6 min-h-[400px] relative overflow-hidden bg-white dark:bg-slate-900">
                  {/* Typing Code Animation */}
                  <motion.div 
                    className="space-y-3 font-mono text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <pre className="text-brand-mint-700 dark:text-brand-mint-400 whitespace-pre-wrap">
                      {displayedCode.split('\n').map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className={i === 0 || i === 5 ? "text-brand-mint-700 dark:text-brand-mint-400" :
                                    i === 1 ? "text-blue-700 dark:text-blue-400" :
                                    i === 2 ? "text-green-700 dark:text-green-400" :
                                    i === 3 ? "text-cyan-700 dark:text-cyan-400" :
                                    "text-brand-mint-700 dark:text-brand-mint-300"}
                        >
                          {line}
                          {i === displayedCode.split('\n').length - 1 && showCursor && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="inline-block w-2 h-4 bg-brand-mint-500 dark:bg-brand-mint-400 ml-0.5"
                            />
                          )}
                        </motion.div>
                      ))}
                    </pre>
                  </motion.div>

                  {/* Enhanced Floating Elements */}
                  <motion.div
                    className="absolute top-8 right-8 w-20 h-20"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-brand-mint-500/40 to-brand-mint-600/20 rounded-xl backdrop-blur-sm border border-brand-mint-500/50 flex items-center justify-center shadow-lg shadow-brand-mint-500/20">
                      <span className="text-3xl">⚡</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-12 right-16 w-14 h-14"
                    animate={{
                      y: [0, 12, 0],
                      x: [0, -8, 0],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="w-full h-full bg-gradient-to-tr from-brand-mint-600/40 to-brand-mint-500/20 rounded-full backdrop-blur-sm border border-brand-mint-600/50 flex items-center justify-center shadow-lg shadow-brand-mint-600/20">
                      <span className="text-2xl">🚀</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 left-4 w-10 h-10"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, -15, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <div className="w-full h-full bg-gradient-to-bl from-brand-mint-400/30 to-transparent rounded-lg flex items-center justify-center">
                      <span className="text-lg">✨</span>
                    </div>
                  </motion.div>

                  {/* Floating Elements - CSS animated for performance */}
                  <div
                    className="absolute top-10 right-10 w-16 h-16 bg-brand-mint-500/30 dark:bg-brand-mint-500/20 rounded-lg backdrop-blur-sm border border-brand-mint-500/50 dark:border-brand-mint-500/30 animate-float"
                  >
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      ⚡
                    </div>
                  </div>

                  <div
                    className="absolute bottom-10 right-20 w-12 h-12 bg-brand-mint-600/30 dark:bg-brand-mint-600/20 rounded-full backdrop-blur-sm border border-brand-mint-600/50 dark:border-brand-mint-600/30 animate-float-slow"
                  >
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      🚀
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyboard - CSS hover for performance */}
              <div className="mt-4 bg-gray-300 dark:bg-slate-800 rounded-lg p-3 border border-gray-400 dark:border-slate-700">
                <div className="grid grid-cols-12 gap-1">
                  {[...Array(36)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-400 dark:bg-slate-700 rounded border border-gray-500 dark:border-slate-600 transition-all duration-100 hover:bg-brand-mint-500 hover:scale-95 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Orbs - CSS animated */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-brand-mint-500 dark:bg-brand-mint-600 rounded-full blur-3xl opacity-15 dark:opacity-20 animate-pulse-slow"
              style={{ willChange: "transform, opacity" }}
            />

            <div
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-mint-600 dark:bg-teal-600 rounded-full blur-3xl opacity-15 dark:opacity-20 animate-pulse-slow-delay"
              style={{ willChange: "transform, opacity" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-3 bg-gray-600 dark:bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
});

export default HeroSection;
