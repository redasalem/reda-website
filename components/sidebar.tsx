"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Briefcase,
  Contact,
  Download,
  List,
  Menu,
  User,
  X,
} from "lucide-react";
import SocialIcon from "@/components/social-icon";

const NAV_ITEMS = [
  { label: "About Me", id: "about", icon: User },
  { label: "Skills", id: "skills", icon: List },
  { label: "Projects", id: "projects", icon: Briefcase },
  { label: "Certificates", id: "certificates", icon: Award },
  { label: "Contact", id: "contact", icon: Contact },
];

const SOCIAL_LINKS = [
  { platform: "github" as const, href: "https://github.com/redasalem", label: "GitHub" },
  { platform: "linkedin" as const, href: "https://www.linkedin.com/in/reda-salem-dev/", label: "LinkedIn" },
  { platform: "email" as const, href: "mailto:redasalem287@gmail.com", label: "Email" },
  { platform: "phone" as const, href: "tel:+201121696299", label: "WhatsApp" },
];

/* Color per nav item for active state */
const NAV_COLORS = [
  "text-brand-mint-400",
  "text-brand-violet-400",
  "text-brand-cyan-400",
  "text-brand-amber-400",
  "text-brand-mint-400",
];

const NAV_BG_COLORS = [
  "bg-brand-mint-500/15 text-brand-mint-400",
  "bg-brand-violet-500/15 text-brand-violet-400",
  "bg-brand-cyan-500/15 text-brand-cyan-400",
  "bg-brand-amber-500/15 text-brand-amber-400",
  "bg-brand-mint-500/15 text-brand-mint-400",
];

const Sidebar = memo(function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveItem(id);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setActiveItem(null);
    }, 1000);
  };

  return (
    <aside
      className={`hidden sm:flex sticky left-0 top-0 h-screen bg-slate-950/85 backdrop-blur-2xl text-sidebar-foreground border-r border-white/10 flex-col z-40 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-all duration-300 ${
        isExpanded ? "w-72 p-6" : "w-20 px-3 py-5 items-center"
      }`}
    >
      {/* Toggle Button */}
      <div className={`w-full flex ${isExpanded ? "justify-end mb-2" : "justify-center mb-4"}`}>
        <button
          type="button"
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
          className="cursor-pointer p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/10 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center shadow-md"
          aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
          title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <X className="w-4 h-4" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Avatar & Profile */}
      <div className={`text-center transition-all duration-300 ${isExpanded ? "mb-6" : "mb-5 flex flex-col items-center"}`}>
        <div className={`flex justify-center transition-all duration-300 ${isExpanded ? "mb-4" : "mb-0"}`}>
          {/* Animated gradient ring around avatar */}
          <div
            className={`relative rounded-full overflow-hidden border-2 avatar-ring transition-all duration-300 shadow-xl ${
              isExpanded ? "w-24 h-24" : "w-12 h-12"
            }`}
            style={{
              boxShadow: "0 0 20px rgba(0, 200, 130, 0.25), 0 0 35px rgba(139, 92, 246, 0.15)",
            }}
          >
            <Image
              src="/images/reda.jpeg"
              alt="Reda Salem - Full-Stack Engineer"
              fill
              priority
              sizes={isExpanded ? "96px" : "48px"}
              className="object-cover"
            />
          </div>
        </div>

        {/* Text info only visible when expanded */}
        <div
          className={`transition-all duration-300 ${
            isExpanded ? "opacity-100 translate-y-0 max-h-32 mt-2" : "opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none"
          }`}
        >
          <p className="text-xl font-bold text-gradient-hero mb-1 tracking-tight">Reda Salem</p>
          <p className="text-sm font-semibold text-sidebar-foreground/90">Full-Stack Engineer</p>
          <p className="text-xs mt-1 text-muted-foreground">Next.js · React · Node.js</p>
        </div>
      </div>

      {/* Gradient divider */}
      <div className={`h-px bg-gradient-to-r from-transparent via-brand-mint-500/30 to-transparent transition-all duration-300 ${isExpanded ? "w-full mb-6" : "w-10 mb-4"}`} />

      {/* Navigation */}
      <nav className={`w-full flex-1 ${isExpanded ? "mb-6" : "mb-4 flex flex-col items-center"}`}>
        {isExpanded ? (
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-2">
            Navigation
          </p>
        ) : null}

        <div className={`space-y-1.5 w-full ${!isExpanded ? "flex flex-col items-center" : ""}`}>
          {NAV_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const activeColor = NAV_COLORS[idx];
            const activeBg = NAV_BG_COLORS[idx];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-200 group relative overflow-hidden flex items-center ${
                  isExpanded
                    ? `w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 ${
                        isActive ? activeBg : "text-sidebar-foreground/80 hover:text-white"
                      }`
                    : `w-11 h-11 justify-center rounded-xl hover:bg-white/10 ${
                        isActive ? activeBg : "text-muted-foreground hover:text-white"
                      }`
                }`}
                title={!isExpanded ? item.label : ""}
              >
                {/* Hover gradient sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-brand-mint-500/0 via-brand-mint-500/10 to-brand-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl" aria-hidden="true" />

                {isExpanded ? (
                  <span className="relative z-10 flex items-center justify-between w-full gap-3 transition-transform duration-300 group-hover:translate-x-1">
                    <span>{item.label}</span>
                    <Icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? activeColor : "text-muted-foreground group-hover:text-white"}`} />
                  </span>
                ) : (
                  <span className="relative z-10 transition-transform duration-200 group-hover:scale-110">
                    <Icon className={`w-5 h-5 ${isActive ? activeColor : ""}`} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Resume Section */}
      <div className={`w-full ${isExpanded ? "mb-5" : "mb-4 flex justify-center"}`}>
        {isExpanded ? (
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-2">
            Resume
          </p>
        ) : null}

        <Link
          href="/download"
          className={`transition-all duration-200 group flex items-center ${
            isExpanded
              ? "w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-brand-mint-500/10 via-brand-cyan-500/5 to-brand-violet-500/10 hover:from-brand-mint-500/20 hover:to-brand-violet-500/20 border border-brand-mint-500/20 hover:border-brand-mint-500/40 gap-3 shadow-sm"
              : "w-11 h-11 justify-center rounded-xl bg-brand-mint-500/10 hover:bg-brand-mint-500/20 border border-brand-mint-500/25 hover:border-brand-mint-500/50"
          }`}
          title="View Resumes (Front-End & Full-Stack)"
        >
          <span className="flex-shrink-0 text-brand-mint-400 transition-transform duration-300 group-hover:rotate-6">
            <Download className="w-5 h-5" />
          </span>

          {isExpanded ? (
            <span className="relative z-10 flex flex-col">
              <span className="text-xs font-bold leading-tight text-white">View Resumes</span>
              <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">Front-End · Full-Stack</span>
            </span>
          ) : null}
        </Link>
      </div>

      {/* Social / Connect */}
      <div className={`w-full ${isExpanded ? "space-y-3" : "flex flex-col items-center mt-auto pt-2"}`}>
        {isExpanded ? (
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-2">
            Connect
          </p>
        ) : null}

        <div className={isExpanded ? "flex gap-2 flex-wrap" : "grid grid-cols-2 gap-1.5 justify-items-center"}>
          {SOCIAL_LINKS.map((social) => (
            <SocialIcon
              key={social.label}
              platform={social.platform}
              href={social.href}
              label={social.label}
              size="sm"
              className={!isExpanded ? "!w-8 !h-8 !text-xs" : ""}
            />
          ))}
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;
