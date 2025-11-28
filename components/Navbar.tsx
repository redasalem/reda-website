"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function BottomNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { 
      icon: theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />, 
      label: "Theme", 
      action: "theme",
      activeColor: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    { 
      icon: <InfoIcon />, 
      label: "About", 
      id: "About Me",
      activeColor: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    { 
      icon: <MenuIcon />, 
      label: "Skills", 
      id: "skills",
      activeColor: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    { 
      icon: <WorkIcon />, 
      label: "Projects", 
      id: "projects",
      activeColor: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-500/10"
    },
    { 
      icon: <EmojiEventsIcon />, 
      label: "Certificates", 
      id: "certificates",
      activeColor: "text-yellow-500 dark:text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    { 
      icon: <ContactMailIcon />, 
      label: "Contact", 
      id: "contact",
      activeColor: "text-pink-500 dark:text-pink-400",
      bgColor: "bg-pink-500/10"
    },
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
      className="sm:hidden fixed bottom-3 left-3 right-3 z-50"
    >
      {/* Main Container */}
      <div className="relative bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-2xl overflow-hidden">
        
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
        <div className="relative flex justify-around items-center px-1 py-2">
          {navItems.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.button
                key={index}
                onClick={() => handleClick(item, index)}
                className="relative flex flex-col items-center gap-0.5 p-2 min-w-[58px] rounded-xl"
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
                    className={`text-xl transition-colors duration-200 ${
                      isActive 
                        ? item.activeColor
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                    animate={{
                      rotate: isActive && item.action === "theme" ? 180 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.span>
                </motion.div>

                {/* Label */}
                <motion.span
                  className={`text-[9px] font-medium transition-colors duration-200 ${
                    isActive
                      ? item.activeColor
                      : 'text-gray-500 dark:text-gray-400'
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
                      className={`absolute -top-0.5 w-1 h-1 rounded-full ${
                        item.activeColor.split(' ')[0].replace('text-', 'bg-')
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