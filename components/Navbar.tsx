"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import { Award, Briefcase, Download, Globe, Info, Mail, Menu } from "lucide-react";
import { siteDictionary, type Locale } from "@/lib/i18n";

type NavItem =
  | {
      icon: typeof Download;
      label: string;
      href: string;
      isRoute: true;
    }
  | {
      icon: typeof Info;
      label: string;
      id: string;
      isRoute?: false;
    };

const TAB_COLORS = [
  "text-brand-mint-400",
  "text-brand-cyan-400",
  "text-brand-violet-400",
  "text-brand-mint-400",
  "text-brand-amber-400",
  "text-brand-cyan-400",
  "text-brand-mint-400",
];

const TAB_GLOW_BG = [
  "bg-brand-mint-500",
  "bg-brand-cyan-500",
  "bg-brand-violet-500",
  "bg-brand-mint-500",
  "bg-brand-amber-500",
  "bg-brand-cyan-500",
  "bg-brand-mint-500",
];

const BottomNavbar = memo(function BottomNavbar({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = siteDictionary[locale];

  const navItems: NavItem[] = [
    {
      icon: Download,
      label: t.nav.cvShort,
      href: locale === "ar" ? "/ar/download" : "/download",
      isRoute: true,
    },
    {
      icon: Info,
      label: t.nav.aboutShort,
      id: "about",
    },
    {
      icon: Menu,
      label: t.nav.skills,
      id: "skills",
    },
    {
      icon: Briefcase,
      label: t.nav.projects,
      id: "projects",
    },
    {
      icon: Award,
      label: t.nav.certsShort,
      id: "certificates",
    },
    {
      icon: Mail,
      label: t.nav.contact,
      id: "contact",
    },
    {
      icon: Globe,
      label: locale === "ar" ? "EN" : "عربي",
      href: locale === "ar" ? "/" : "/ar",
      isRoute: true,
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sm:hidden fixed bottom-4 left-4 right-4 z-50 nav-slide-up">
      <div className="relative bg-slate-950/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 bg-gradient-to-r from-brand-mint-500/10 via-brand-cyan-500/10 to-brand-violet-500/10 rounded-2xl transition-transform duration-300 ease-out"
          style={{
            width: `${100 / navItems.length}%`,
            transform: `translateX(${
              (locale === "ar" ? -activeIndex : activeIndex) * 100
            }%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative flex justify-around items-center px-1 py-3">
          {navItems.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            const activeTextColor = TAB_COLORS[index % TAB_COLORS.length];
            const activeBgColor = TAB_GLOW_BG[index % TAB_GLOW_BG.length];

            const sharedContent = (
              <>
                <div
                  className={`relative transition-transform duration-300 ${
                    isActive ? "scale-110 -translate-y-0.5" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? activeTextColor : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-semibold truncate w-full text-center transition-all duration-200 ${
                    isActive
                      ? `${activeTextColor} opacity-100`
                      : "text-muted-foreground opacity-70"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${activeBgColor} shadow-[0_0_8px_currentColor] transition-all duration-200 ${
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </>
            );

            if ("isRoute" in item && item.isRoute) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveIndex(index)}
                  className="relative flex flex-col items-center gap-1 p-1 flex-1 min-w-0 transition-transform duration-150 active:scale-95"
                >
                  {sharedContent}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  scrollToSection(item.id);
                }}
                className="relative flex flex-col items-center gap-1 p-1 flex-1 min-w-0 transition-transform duration-150 active:scale-95"
              >
                {sharedContent}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
});

export default BottomNavbar;
