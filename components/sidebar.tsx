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
  "bg-brand-mint-500/15",
  "bg-brand-violet-500/15",
  "bg-brand-cyan-500/15",
  "bg-brand-amber-500/15",
  "bg-brand-mint-500/15",
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
      className={`hidden sm:flex sticky left-0 top-0 h-screen bg-sidebar/80 backdrop-blur-xl text-sidebar-foreground border-r border-sidebar-border/50 p-6 flex-col z-40 overflow-auto transition-[width] duration-300 ${
        isExpanded ? "w-72" : "w-20"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((currentValue) => !currentValue)}
        className="absolute cursor-pointer top-4 right-4 p-2 rounded-lg hover:bg-sidebar-primary/20 transition-colors z-10 hover:scale-105 active:scale-95"
        aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
      >
        {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className={`text-center mb-8 transition-all duration-300 ${!isExpanded ? "mt-12" : ""}`}>
        <div className={`mb-4 flex justify-center transition-all duration-300 ${!isExpanded ? "mb-0" : ""}`}>
          {/* Animated gradient ring around avatar */}
          <div
            className={`relative rounded-full overflow-hidden border-2 avatar-ring transition-all duration-300 ${
              isExpanded ? "w-24 h-24" : "w-[30px] h-[30px]"
            }`}
            style={{
              boxShadow: "0 0 20px rgba(0, 200, 130, 0.15), 0 0 40px rgba(139, 92, 246, 0.08)",
            }}
          >
            <Image
              src="/images/reda.jpeg"
              alt="Reda Salem - Full-Stack Engineer"
              fill
              priority
              sizes={isExpanded ? "96px" : "30px"}
              className="object-cover"
            />
          </div>
        </div>

        <div
          className={`transition-all duration-200 ${
            isExpanded ? "opacity-100 translate-y-0 max-h-32" : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
          }`}
        >
          <p className="text-2xl font-bold text-gradient-hero mb-2">Reda Salem</p>
          <p className="text-lg text-sidebar-foreground/80">Full-Stack Engineer</p>
          <p className="text-sm mt-1 text-sidebar-foreground/60">Next.js · React · React Native · TypeScript</p>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-mint-500/30 to-transparent mb-8" />

      <nav className="flex-1 mb-8">
        <p
          className={`text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-4 transition-opacity duration-200 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Navigation
        </p>

        <div className="space-y-1.5">
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
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground dark:text-white hover:bg-sidebar-primary/10 transition-all duration-300 group relative overflow-hidden ${
                  !isExpanded ? "flex justify-center px-2" : ""
                } ${isActive ? activeBg : ""}`}
                title={!isExpanded ? item.label : ""}
              >
                {/* Hover gradient sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-brand-mint-500/0 via-brand-mint-500/10 to-brand-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl" aria-hidden="true" />

                {isExpanded ? (
                  <span className="relative z-10 flex items-center justify-between gap-3 transition-transform duration-300 group-hover:translate-x-1">
                    <span>{item.label}</span>
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? activeColor : "text-sidebar-foreground/50"}`} />
                  </span>
                ) : (
                  <span className="relative z-10 text-lg transition-all duration-300 group-hover:scale-110">
                    <Icon className={`w-5 h-5 ${isActive ? activeColor : ""}`} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="space-y-3 mb-4">
        <p
          className={`text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 transition-opacity duration-200 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Resume
        </p>

        <Link
          href="/download"
          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground dark:text-white bg-gradient-to-r from-brand-mint-500/8 to-brand-violet-500/8 hover:from-brand-mint-500/15 hover:to-brand-violet-500/15 border border-brand-mint-500/10 hover:border-brand-mint-500/25 transition-all duration-300 group flex items-center gap-3 ${
            !isExpanded ? "justify-center px-2" : ""
          }`}
          title={!isExpanded ? "View Resumes" : "Front-End & Full-Stack CVs"}
        >
          <span className="text-lg flex-shrink-0 relative z-10 text-brand-mint-400 transition-transform duration-300 group-hover:rotate-6">
            <Download className="w-5 h-5" />
          </span>

          <span
            className={`relative z-10 flex flex-col transition-all duration-200 ${
              isExpanded ? "opacity-100 translate-x-0" : "opacity-0 absolute -translate-x-2 pointer-events-none"
            }`}
          >
            <span className="text-xs font-semibold leading-tight">View Resumes</span>
            <span className="text-[10px] text-sidebar-foreground/40 leading-tight mt-0.5">Front-End - Full-Stack CVs</span>
          </span>
        </Link>
      </div>

      <div className="space-y-4">
        <p
          className={`text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider transition-opacity duration-200 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          Connect
        </p>

        <div className={`flex gap-2 flex-wrap transition-all duration-300 ${!isExpanded ? "flex-col" : ""}`}>
          {SOCIAL_LINKS.map((social) => (
            <SocialIcon
              key={social.label}
              platform={social.platform}
              href={social.href}
              label={social.label}
              size="sm"
            />
          ))}
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;
