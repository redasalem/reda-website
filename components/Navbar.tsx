"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import { Award, Briefcase, Download, Info, Mail, Menu } from "lucide-react";

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

const NAV_ITEMS: NavItem[] = [
  {
    icon: Download,
    label: "CV",
    href: "/download",
    isRoute: true,
  },
  {
    icon: Info,
    label: "About",
    id: "about",
  },
  {
    icon: Menu,
    label: "Skills",
    id: "skills",
  },
  {
    icon: Briefcase,
    label: "Projects",
    id: "projects",
  },
  {
    icon: Award,
    label: "Certs",
    id: "certificates",
  },
  {
    icon: Mail,
    label: "Contact",
    id: "contact",
  },
];

const BottomNavbar = memo(function BottomNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sm:hidden fixed bottom-4 left-4 right-4 z-50 nav-slide-up">
      <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-xl rounded-2xl border border-border shadow-xl shadow-black/5 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 bg-brand-mint-500/10 rounded-2xl transition-transform duration-300 ease-out"
          style={{
            width: `${100 / NAV_ITEMS.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative flex justify-around items-center px-1 py-3">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            const sharedContent = (
              <>
                <div
                  className={`relative transition-transform duration-300 ${
                    isActive ? "scale-110 -translate-y-0.5" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isActive ? "text-brand-mint-500" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-medium truncate w-full text-center transition-all duration-200 ${
                    isActive ? "text-brand-mint-500 opacity-100" : "text-muted-foreground opacity-70"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`absolute -bottom-1 w-1 h-1 rounded-full bg-brand-mint-500 transition-all duration-200 ${
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
