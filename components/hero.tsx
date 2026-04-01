"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Download, ArrowDown } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";

const HeroSection = React.memo(function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const backgroundParticles = useMemo(() => {
    if (typeof window === "undefined") return [];
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 1.5,
      duration: Math.random() * 5 + 5,
    }));
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden flex items-center bg-background"
    >
      {/* Animated Background - CSS-based for better performance */}
      <div className="absolute inset-0" aria-hidden="true">
        {isClient && backgroundParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-brand-mint-500 dark:bg-brand-mint-400 rounded-full opacity-60 dark:opacity-40"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: particle.scale,
            }}
            animate={{
              y: [null, window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "transform, opacity" }}
          />
        ))}
      </div>

      {/* Grid Background - يتكيف مع الثيم */}
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
                className="text-6xl lg:text-7xl font-bold text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Hi, I'm{" "}
                <span className="bg-linear-to-r from-brand-mint-500 via-brand-mint-600 to-brand-mint-500 dark:from-brand-mint-400 dark:via-brand-mint-500 dark:to-brand-mint-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                  Reda Salem
                </span>
              </motion.h1>

              <motion.h2
                className="text-3xl lg:text-4xl font-semibold text-brand-mint-700 dark:text-brand-mint-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Full-Stack Engineer · 99/100 PageSpeed · 2× Faster Apps
              </motion.h2>
            </div>

            {/* Description - وصف احترافي */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              I build production-grade web & mobile products that ship fast and
              scale further. From delivering{" "}
              <strong>99/100 PageSpeed</strong> on the C4R Car Rental platform
              to enabling <strong>Stripe & PayPal</strong> payments and shipping
              cross-platform <strong>React Native</strong> apps — I bring
              measurable engineering to every engagement. React · Next.js ·
              Node.js · TypeScript.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Download Resume Button */}
              <Link
                target="_blank"
                href="https://drive.google.com/file/d/1MNYifjkRpiy6xXKeAqiXCinVBkOh6mrZ/view?usp=sharing"
                className="px-8 py-4 bg-linear-to-r from-brand-mint-500 to-brand-mint-600 dark:from-brand-mint-500 dark:to-brand-mint-600 text-white font-semibold rounded-full shadow-lg hover:shadow-brand-mint-500/50 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </Link>

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
                      <GitHubIcon />
                    </span>
                  ),
                  url: "https://github.com/redasalem",
                },
                {
                  name: "linkedin",
                  icon: (
                    <span className="relative z-20 text-[#0A66C2] dark:text-[#0A66C2]">
                      <LinkedInIcon />
                    </span>
                  ),
                  url: "https://www.linkedin.com/in/reda-salem-dev/",
                },
                {
                  name: "email",
                  icon: (
                    <span className="relative z-20 text-red-600 dark:text-red-300">
                      <EmailIcon />
                    </span>
                  ),
                  url: "mailto:redasalem287@gmail.com",
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
                  className="w-12 h-12 bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center hover:bg-brand-mint-500 dark:hover:bg-brand-mint-500/30 hover:border-brand-mint-500 dark:hover:border-brand-mint-500/50 transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Computer */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x
                }deg) rotateX(${-mousePosition.y}deg)`,
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
                  {/* Code Animation */}
                  <motion.div className="space-y-3 font-mono text-sm">
                    {[
                      {
                        code: "const engineer = {",
                        color: "text-brand-mint-700 dark:text-brand-mint-400",
                        delay: 0,
                      },
                      {
                        code: '  name: "Reda Salem",',
                        color: "text-blue-700 dark:text-blue-400",
                        delay: 0.1,
                      },
                      {
                        code: '  focus: "Performance & Scale",',
                        color: "text-green-700 dark:text-green-400",
                        delay: 0.2,
                      },
                      {
                        code: '  stack: ["React", "Next.js", "React Native", "Node.js"],',
                        color: "text-cyan-700 dark:text-cyan-400",
                        delay: 0.25,
                      },
                      {
                        code: '  results: ["99 PageSpeed ⚡", "2x Faster", "+30% Engagement"]',
                        color: "text-brand-mint-700 dark:text-brand-mint-300",
                        delay: 0.3,
                      },
                      {
                        code: "}",
                        color: "text-brand-mint-700 dark:text-brand-mint-400",
                        delay: 0.4,
                      },
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: line.delay + 1 }}
                        className={line.color}
                      >
                        {line.code}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="inline-block w-2 h-4 bg-brand-mint-500 dark:bg-brand-mint-400 ml-1"
                        />
                      </motion.div>
                    ))}
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
