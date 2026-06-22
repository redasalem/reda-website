"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { Award, Code2, Rocket, Bot } from "lucide-react";

const Certificates = React.memo(function Certificates() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [particles, setParticles] = useState<{left: number, top: number, duration: number, delay: number}[]>([]);
  
  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  const certificates = useMemo(() => [
    {
      title: "Front-End Certificate",
      titleArabic: "شهادة الواجهة الأمامية",
      issuer: "Hsoub Academy",
      date: "May 2025",
      description:
        "Rigorous front-end engineering certification validating deep expertise in React, Next.js (App Router), performance optimization, and modern web architectures.",
      descriptionArabic:
        "شهادة شاملة في تطوير الواجهة الأمامية تغطي تقنيات الويب الحديثة",
      link: "https://academy.hsoub.com/certificate/8CT2XWQB10SJXDYDRM4PT6GED.pdf",
      color: "from-brand-mint-500/20 to-brand-mint-600/20",
      icon: <Code2 className="w-8 h-8 text-brand-mint-400 drop-shadow-[0_0_15px_rgba(0,255,159,0.5)]" />,
      image: "/images/hasoup.webp",
    },
    {
      title: "Full-Stack Development Training",
      titleArabic: "تدريب تطوير الويب الكامل",
      issuer: "Information Technology Institute (ITI)",
      date: "Sep 2022",
      description:
        "Intensive professional training program focused on core frontend engineering, component architectures, and responsive web applications with hands-on project delivery.",
      descriptionArabic:
        "تدريب احترافي في تطوير الواجهة الأمامية مع مشاريع عملية",
      link: "https://drive.google.com/file/d/1irnR_hedjneoMh7poPI9CM4SwqXeLAOU/view",
      color: "from-brand-mint-500/20 to-brand-mint-600/20",
      icon: <Code2 className="w-8 h-8 text-brand-mint-400 drop-shadow-[0_0_15px_rgba(0,255,159,0.5)]" />,
      image: "/images/reda_iti.png",
    },
    {
      title: "Front-End Development Training",
      titleArabic: "تدريب تطوير الواجهة الأمامية",
      issuer: "Huma-volve",
      date: "Dec 2025",
      description:
        "Accelerated frontend engineering residency emphasizing production-grade component development, state management, complex API integration, and Agile team workflows.",
      descriptionArabic:
        "خبرة عملية مكثفة في تحليل الأنظمة الخلفية والتعاون المهني",
      link: "https://www.linkedin.com/posts/reda-salem-dev_frontend-react-professionalgrowth-activity-7416949321494982656-bim4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELm9IAB5ccC-E7q6WGg2fPYNK2bK5i7Yys",
      color: "from-brand-mint-500/20 to-brand-mint-600/20",
      icon: <Rocket className="w-8 h-8 text-brand-mint-400 drop-shadow-[0_0_15px_rgba(0,255,159,0.5)]" />,
      image: "/images/huma-volve.jpg",
    },
    {
      title: "Build with AI: Masr Edition",
      titleArabic: "بناء الحلول بالذكاء الاصطناعي: نسخة مصر",
      issuer: "Google for Developers & ITI",
      date: "2024",
      description:
        "Certified participation in Google for Developers' 'Build with AI' intensive sessions, validating hands-on exposure to advanced Artificial Intelligence tools, LLMs, and their integration into scalable web architectures.",
      descriptionArabic:
        "شهادة مشاركة معتمدة من جوجل للمطورين (Google for Developers) ومعهد ITI، تؤكد الإلمام بأحدث أدوات الذكاء الاصطناعي وطرق دمجها في مشاريع وتطبيقات الويب الحديثة لتقديم حلول مبتكرة.",
      link: "https://drive.google.com/file/d/1-c0f0Ec5BMT8GZJUzQQyBX1X0AdGGkOu/view?usp=sharing",
      color: "from-blue-500/20 to-yellow-500/20",
      icon: <Bot className="w-8 h-8 text-brand-mint-400 drop-shadow-[0_0_15px_rgba(0,255,159,0.5)]" />,
      image: "/images/google.PNG",
    },
  ], []);

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="min-h-screen py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(0,255,159,0.03)_2px,transparent_2px)] bg-size-[80px_80px]" />

      {/* Floating Orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-96 h-96 bg-brand-mint-500 rounded-full blur-[150px] opacity-10"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-80, 80]) }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-teal-500 rounded-full blur-[120px] opacity-10"
      />

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-brand-mint-400/20 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-brand-mint-400 via-brand-mint-500 to-brand-mint-400 bg-clip-text text-transparent">
              Certificates
            </span>
          </motion.h2>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-brand-mint-500 to-brand-mint-600 rounded-full mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Verifiable credentials and professional certifications from tech leaders validating advanced expertise in modern frontend engineering, SEO optimization, and delivering high-performance, scalable web applications.
          </motion.p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${cert.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500`}
                animate={{
                  scale: hoveredIndex === index ? 1.05 : 1,
                }}
              />

              {/* Main Card */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-border group-hover:border-brand-mint-500/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-brand-mint-500/20 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  {/* Gradient Overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-60 mix-blend-multiply z-10`}
                    animate={{
                      opacity: hoveredIndex === index ? 0.7 : 0.6,
                    }}
                  />

                  {/* Background Image */}
                  <motion.div
                    className="relative w-full h-full"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={cert.image}
                      alt={`Certificate: ${cert.title} — Issued by ${cert.issuer}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Trophy Icon */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 z-20"
                    animate={{
                      rotate: hoveredIndex === index ? [0, -10, 10, -10, 0] : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Award className="text-brand-mint-400 text-3xl" />
                  </motion.div>

                  {/* Floating Emoji */}
                  <motion.div
                    className="absolute top-4 left-4 text-4xl z-20"
                    animate={{
                      y: hoveredIndex === index ? [0, -10, 0] : 0,
                      rotate: hoveredIndex === index ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredIndex === index ? Infinity : 0,
                    }}
                  >
                    {cert.icon}
                  </motion.div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full z-20"
                    animate={{
                      x: hoveredIndex === index ? "200%" : "-100%",
                    }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Date Badge */}
                  <motion.div
                    className="absolute bottom-4 left-4 z-20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <span
                      className="px-4 py-2 bg-gradient-to-r from-brand-mint-500 to-brand-mint-600 text-black text-xs font-black rounded-full shadow-lg shadow-brand-mint-500/20 uppercase tracking-widest"
                    >
                      {cert.date}
                    </span>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  {/* Title & Issuer */}
                  <div>
                    <motion.h3 className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-brand-mint-400 group-hover:to-brand-mint-500 transition-all duration-300 mb-2">
                       {cert.title}
                    </motion.h3>
                    <motion.p className="text-brand-mint-400 font-semibold flex items-center gap-2">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-brand-mint-500"
                        animate={{
                          scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                          opacity: hoveredIndex === index ? [1, 0.5, 1] : 1,
                        }}
                        transition={{
                          duration: 1,
                          repeat: hoveredIndex === index ? Infinity : 0,
                        }}
                      />
                      {cert.issuer}
                    </motion.p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Action Button - Unified Premium Style */}
                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium w-full !py-4"
                  >
                    <span className="relative z-10">View Certificate</span>
                    <Award className="w-5 h-5 ml-2" />
                  </motion.a>
                </div>

                {/* Corner Decoration */}
                <motion.div
                  className={`absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br ${cert.color} opacity-10 blur-3xl rounded-full`}
                  animate={{
                    scale: hoveredIndex === index ? 1.5 : 1,
                    opacity: hoveredIndex === index ? 0.2 : 0.1,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Certificates;
