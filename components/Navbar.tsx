"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";
import Link from "next/link";
import { Home, User, Menu, Briefcase, Award, Mail, Download, Sun, Moon, Info } from "lucide-react";

const BottomNavbar = React.memo(function BottomNavbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = useMemo(() => [
    {
      icon: <Download />,
      label: "CV",
      href: "/download",
      activeColor: "text-brand-mint-500",
      bgColor: "bg-brand-mint-500/10",
      isExternal: true,
    },
    {
      icon: <Info />,
      label: "About",
      id: "about",
      activeColor: "text-brand-mint-500",
      bgColor: "bg-brand-mint-500/10",
    },
    {
      icon: <Menu />,
      label: "Skills",
      id: "skills",
      activeColor: "text-brand-mint-500",
      bgColor: "bg-brand-mint-500/10",
    },
    {
      icon: <Briefcase />,
      label: "Projects",
      id: "projects",
      activeColor: "text-brand-mint-500",
      bgColor: "bg-brand-mint-500/10",
    },
    {
      icon: <Award />,
      label: "Certs",
      id: "certificates",
      activeColor: "text-brand-mint-500",
      bgColor: "bg-brand-mint-500/10",
    },
    {
      icon: <Mail />,
      label: "Contact",
      id: "contact",
      activeColor: "text-brand-mint-500",
      bgColor: "bg-brand-mint-500/10",
    },
  ], []);

  const handleClick = (item: any, index: number) => {
    setActiveIndex(index);
    if (item.isExternal && item.href) {
      window.location.href = item.href;
    } else if (item.id) {
      scrollToSection(item.id);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="sm:hidden fixed bottom-4 left-4 right-4 z-50"
    >
      {/* Main Container */}
      <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-xl rounded-2xl border border-border shadow-xl shadow-black/5 overflow-hidden">
        {/* Active Background Indicator */}
        <motion.div
          className={`absolute top-0 bottom-0 ${navItems[activeIndex].bgColor} rounded-2xl`}
          layoutId="activeTab"
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{
            width: `${100 / navItems.length}%`,
            left: `${(activeIndex * 100) / navItems.length}%`,
          }}
        />

        {/* Navigation Items */}
        <div className="relative flex justify-around items-center px-1 py-3">
          {navItems.map((item, index) => {
            const isActive = activeIndex === index;

            if (item.isExternal && item.href) {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="relative flex flex-col items-center gap-1 p-1 flex-1 min-w-0"
                  onClick={() => setActiveIndex(index)}
                >
                  <motion.div
                    className="relative"
                    whileTap={{ scale: 0.92 }}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  >
                    <motion.span
                      className={`text-xl transition-colors duration-200 ${isActive ? item.activeColor : "text-muted-foreground"}`}
                      whileTap={{ rotate: 360 }}
                    >
                      {item.icon}
                    </motion.span>
                  </motion.div>
                  <motion.span
                    className={`text-[9px] font-medium truncate w-full text-center transition-colors duration-200 ${isActive ? item.activeColor : "text-muted-foreground"}`}
                    animate={{ opacity: isActive ? 1 : 0.7 }}
                  >
                    {item.label}
                  </motion.span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-mint-500"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              );
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleClick(item, index)}
                className="relative flex flex-col items-center gap-1 p-1 flex-1 min-w-0"
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.15 }}
              >
                {/* Icon */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  <motion.span
                    className={`text-xl transition-colors duration-200 ${isActive ? item.activeColor : "text-muted-foreground"
                      }`}
                    animate={{
                      rotate: 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.span>
                </motion.div>

                {/* Label */}
                <motion.span
                  className={`text-[9px] font-medium truncate w-full text-center transition-colors duration-200 ${isActive ? item.activeColor : "text-muted-foreground"
                    }`}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Active Dot Indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-brand-mint-500"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
});

export default BottomNavbar;
