"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function BottomNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    {
      icon: <InfoIcon />,
      label: "About",
      id: "About Me",
      activeColor: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: <MenuIcon />,
      label: "Skills",
      id: "skills",
      activeColor: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: <WorkIcon />,
      label: "Projects",
      id: "projects",
      activeColor: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: <EmojiEventsIcon />,
      label: "Certificates",
      id: "certificates",
      activeColor: "text-amber-500",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: <ContactMailIcon />,
      label: "Contact",
      id: "contact",
      activeColor: "text-pink-500",
      bgColor: "bg-pink-500/10"
    },
    {
      icon: theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />,
      label: theme === "dark" ? "Dark" : "Light",
      action: "theme",
      activeColor: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

  const handleClick = (item: any, index: number) => {
    setActiveIndex(index);
    if (item.action === "theme") {
      toggleTheme();
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
            left: `${(activeIndex * 100) / navItems.length}%`
          }}
        />

        {/* Navigation Items */}
        <div className="relative flex justify-around items-center px-1 py-3">
          {navItems.map((item, index) => {
            const isActive = activeIndex === index;

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
                    y: isActive ? -2 : 0
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                >
                  <motion.span
                    className={`text-xl transition-colors duration-200 ${isActive
                      ? item.activeColor
                      : 'text-muted-foreground'
                      }`}
                    animate={{
                      rotate: 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.span>
                </motion.div>

                {/* Label */}
                <motion.span
                  className={`text-[9px] font-medium truncate w-full text-center transition-colors duration-200 ${isActive
                    ? item.activeColor
                    : 'text-muted-foreground'
                    }`}
                  animate={{
                    opacity: isActive ? 1 : 0.7
                  }}
                >
                  {item.label}
                </motion.span>

                {/* Active Dot Indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className={`absolute -bottom-1 w-1 h-1 rounded-full ${item.activeColor.split(' ')[0].replace('text-', 'bg-')
                        }`}
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
}