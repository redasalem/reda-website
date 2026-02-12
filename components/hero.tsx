"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, ArrowDown } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden flex items-center bg-background"
    >
      {/* Animated Background - يتغير مع الثيم */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full opacity-60 dark:opacity-40"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
              scale: Math.random() * 1.5,
            }}
            animate={{
              y: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 1000),
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Grid Background - يتكيف مع الثيم */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-size-[100px_100px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

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
              <span className="px-4 py-2  bg-purple-500/20 dark:bg-purple-500/30 border border-purple-500/50 dark:border-purple-400/50 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium backdrop-blur-sm">
                ✨ Available for freelance
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
                <span className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
                  Reda Salem
                </span>
              </motion.h1>

              <motion.h2
                className="text-3xl lg:text-4xl font-semibold text-purple-700 dark:text-purple-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Full-Stack Developer
              </motion.h2>
            </div>

            {/* Description - وصف احترافي */}
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Creative and performance-driven{" "}
              <strong>Full-Stack Developer</strong> specialized in building
              modern, responsive, and user-focused web & mobile applications. I
              focus on writing clean, maintainable code and delivering real
              business value through scalable, high-performance solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Download Resume Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                <Link
                  target="_blank"
                  href="https://drive.google.com/file/d/1mUY7CPgjKr8DBDFMMr28SMGcZIAFh7xO/view"
                  className="flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </Link>
              </motion.button>

              {/* Contact Button */}
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer px-8 py-4 bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-300/80 dark:hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <ArrowDown className="w-5 h-5" />
                Let's Talk
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
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gray-200/80 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center hover:bg-purple-600 dark:hover:bg-purple-500/30 hover:border-purple-600 dark:hover:border-purple-500/50 transition-all group"
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
              transform: `perspective(1000px) rotateY(${
                mousePosition.x
              }deg) rotateX(${-mousePosition.y}deg)`,
            }}
          >
            {/* Glowing Background */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-3xl blur-3xl opacity-20 dark:opacity-30"
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
            <div className="relative bg-linear-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-4 border border-gray-300 dark:border-purple-500/30 shadow-2xl">
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
                        code: "const developer = {",
                        color: "text-purple-700 dark:text-purple-400",
                        delay: 0,
                      },
                      {
                        code: '  name: "Reda Salem",',
                        color: "text-blue-700 dark:text-blue-400",
                        delay: 0.1,
                      },
                      {
                        code: '  role: "Front-End Dev",',
                        color: "text-green-700 dark:text-green-400",
                        delay: 0.2,
                      },
                      {
                        code: '  skills: ["React", "Next.js"],',
                        color: "text-cyan-700 dark:text-cyan-400",
                        delay: 0.25,
                      },
                      {
                        code: '  passion: "Building Magic ✨"',
                        color: "text-pink-700 dark:text-pink-400",
                        delay: 0.3,
                      },
                      {
                        code: "}",
                        color: "text-purple-700 dark:text-purple-400",
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
                          className="inline-block w-2 h-4 bg-purple-600 dark:bg-purple-500 ml-1"
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-10 right-10 w-16 h-16 bg-purple-500/30 dark:bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-500/50 dark:border-purple-500/30"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      ⚡
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-10 right-20 w-12 h-12 bg-pink-500/30 dark:bg-pink-500/20 rounded-full backdrop-blur-sm border border-pink-500/50 dark:border-pink-500/30"
                    animate={{
                      y: [0, 15, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      🚀
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Keyboard */}
              <div className="mt-4 bg-gray-300 dark:bg-slate-800 rounded-lg p-3 border border-gray-400 dark:border-slate-700">
                <div className="grid grid-cols-12 gap-1">
                  {[...Array(36)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-8 bg-gray-400 dark:bg-slate-700 rounded border border-gray-500 dark:border-slate-600"
                      whileHover={{ scale: 0.95, backgroundColor: "#6366f1" }}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Orbs */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 dark:bg-purple-600 rounded-full blur-3xl opacity-15 dark:opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500 dark:bg-pink-600 rounded-full blur-3xl opacity-15 dark:opacity-20"
              animate={{
                scale: [1, 1.4, 1],
                x: [0, -15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
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
}
