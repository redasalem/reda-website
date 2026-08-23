"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Award, Code2, Rocket, Bot } from "lucide-react";

const Certificates = React.memo(function Certificates() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const certificates = useMemo(() => [
    {
      title: "Front-End Certificate",
      titleArabic: "شهادة الواجهة الأمامية",
      issuer: "Hsoub Academy",
      date: "May 2025",
      description:
        "Comprehensive front-end engineering certification covering React, Next.js, performance optimization, and modern web development practices.",
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
        "Professional training program focused on frontend engineering fundamentals, component architectures, and responsive web applications with hands-on projects.",
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
        "Frontend engineering internship covering production-grade component development, state management, API integration, and Agile team workflows.",
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
        "Hands-on sessions with Google for Developers covering AI tools, LLMs, and their integration into web applications.",
      descriptionArabic:
        "شهادة مشاركة معتمدة من جوجل للمطورين (Google for Developers) ومعهد ITI، تؤكد الإلمام بأحدث أدوات الذكاء الاصطناعي وطرق دمجها في مشاريع وتطبيقات الويب الحديثة لتقديم حلول مبتكرة.",
      link: "https://drive.google.com/file/d/1-c0f0Ec5BMT8GZJUzQQyBX1X0AdGGkOu/view?usp=sharing",
      color: "from-blue-500/20 to-yellow-500/20",
      icon: <Bot className="w-8 h-8 text-brand-mint-400 drop-shadow-[0_0_15px_rgba(0,255,159,0.5)]" />,
      image: "/images/google.PNG",
    },
  ], []);

  return (
    <section
      id="certificates"
      className="py-16 md:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,200,130,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(0,200,130,0.02)_2px,transparent_2px)] bg-size-[80px_80px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-brand-mint-400 via-brand-mint-500 to-brand-mint-400 bg-clip-text text-transparent">
              Certificates
            </span>
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-mint-500 to-brand-mint-600 rounded-full mx-auto" />

          <p className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto">
            Formal training and certifications that shaped how I build software.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificates.map((cert, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative h-full transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Card Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${cert.color} rounded-3xl blur-xl transition-opacity duration-300 pointer-events-none ${
                    isHovered ? "opacity-30" : "opacity-0"
                  }`}
                />

                {/* Main Card */}
                <div className="relative h-full flex flex-col bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-border group-hover:border-brand-mint-500/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-brand-mint-500/20 transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative aspect-video overflow-hidden">
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${cert.color} mix-blend-multiply z-10 transition-opacity duration-300 ${
                        isHovered ? "opacity-70" : "opacity-50"
                      }`}
                    />

                    {/* Background Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={cert.image}
                        alt={`Certificate: ${cert.title} — Issued by ${cert.issuer}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover transition-transform duration-500 ${
                          isHovered ? "scale-105" : "scale-100"
                        }`}
                      />
                    </div>

                    {/* Trophy Icon */}
                    <div
                      className={`absolute top-4 right-4 w-14 h-14 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 z-20 transition-transform duration-300 ${
                        isHovered ? "scale-110 rotate-6" : "scale-100"
                      }`}
                    >
                      <Award className="text-brand-mint-400 text-2xl" />
                    </div>

                    {/* Floating Icon */}
                    <div className="absolute top-4 left-4 z-20">
                      {cert.icon}
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-3.5 py-1.5 bg-gradient-to-r from-brand-mint-500 to-brand-mint-600 text-black text-[11px] font-black rounded-full shadow-lg shadow-brand-mint-500/20 uppercase tracking-wider">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    {/* Title & Issuer */}
                    <div>
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-brand-mint-400 group-hover:to-brand-mint-500 transition-all duration-300 mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-brand-mint-400 font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-mint-500" />
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Action Button */}
                    <div className="pt-2 mt-auto">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium w-full !py-3.5"
                      >
                        <span className="relative z-10">View Certificate</span>
                        <Award className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Certificates;

