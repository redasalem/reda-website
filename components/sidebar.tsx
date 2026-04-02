"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";
import { Menu, X, Code2, Users, Mail, Phone, User, List, Briefcase, Award, Contact, Download } from "lucide-react";

const sidebarVariants = {
  expanded: { width: 288, transition: { type: "spring" as const, stiffness: 200, damping: 25 } },
  collapsed: { width: 80, transition: { type: "spring" as const, stiffness: 200, damping: 25 } },
};

const navItemVariants = {
  expanded: { x: 0, opacity: 1 },
  collapsed: { x: -10, opacity: 0 },
};

const Sidebar = React.memo(function Sidebar() {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveItem(id);
    setTimeout(() => setActiveItem(null), 1000);
  };

  const navItems = useMemo(() => [
    { label: "About Me", id: "about", icon: <User /> },
    { label: "Skills", id: "skills", icon: <List /> },
    { label: "Projects", id: "projects", icon: <Briefcase /> },
    { label: "Certificates", id: "certificates", icon: <Award /> },
    { label: "Contact", id: "contact", icon: <Contact /> },
  ], []);

  const externalNavItems = useMemo(() => [
    { label: "Download Resume", href: "/download", icon: <Download /> },
  ], []);

  const socialLinks = useMemo(() => [
    {
      icon: <Code2 />,
      href: "https://github.com/redasalem",
      label: "GitHub",
      color: "hover:text-brand-mint-400",
    },
    {
      icon: <Users />,
      href: "https://www.linkedin.com/in/reda-salem-dev/",
      label: "LinkedIn",
      color: "hover:text-brand-mint-500",
    },
    {
      icon: <Mail />,
      href: "mailto:redasalem287@gmail.com",
      label: "Email",
      color: "hover:text-red-400",
    },
    {
      icon: <Phone />,
      href: "tel:+201121696299",
      label: "Phone",
      color: "hover:text-green-400",
    },
  ], []);

  return (
    <motion.aside
      className={`hidden sm:flex sticky left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-6 flex-col z-40 overflow-auto transition-all duration-300 ${isExpanded ? "w-72" : "w-20"}`}
      variants={sidebarVariants}
      initial="expanded"
      animate={isExpanded ? "expanded" : "collapsed"}
    >
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute cursor-pointer top-4 right-4 p-2 rounded-lg hover:bg-sidebar-primary/20 transition-colors z-10"
        aria-label={isExpanded ? "Collapse menu" : "Expand menu"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <X /> : <Menu />}
        </motion.div>
      </motion.button>

      {/* Developer Info */}
      <motion.div
        className={`text-center mb-8 ${!isExpanded && "mt-12"}`}
        layout
      >
        <motion.div 
          className={`mb-4 flex justify-center ${!isExpanded && "mb-0"}`}
          layout
        >
          <motion.div
            className={`relative rounded-full overflow-hidden border-2 border-brand-mint-600 dark:border-brand-mint-400 glow-effect-mint transition-all duration-300`}
            layout
            style={{
              width: isExpanded ? 96 : 30,
              height: isExpanded ? 96 : 30,
            }}
            whileHover={{ scale: 1.05, borderColor: "rgb(0, 255, 159)" }}
          >
            <Image
              src="/images/reda.png"
              alt="Reda Salem - Full Stack Developer"
              fill
              priority
              sizes="96px"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-2xl font-bold text-sidebar-foreground mb-2">
                Reda Salem
              </h1>
              <p className="text-lg text-sidebar-foreground/80">
                Full-Stack Developer
              </p>
              <p className="text-sm mt-1 text-sidebar-foreground/70">
                React | Next.js | React Native | Node.js | MongoDB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Divider */}
      <motion.div 
        className="h-px bg-sidebar-border mb-8 opacity-50" 
        layout
      />

      {/* Navigation */}
      <nav className="flex-1 mb-8">
        <AnimatePresence>
          {isExpanded && (
            <motion.p 
              className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Navigation
            </motion.p>
          )}
        </AnimatePresence>
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground dark:text-white hover:bg-sidebar-primary/20 transition-all duration-300 group relative overflow-hidden ${!isExpanded && "flex justify-center px-2"}`}
              title={!isExpanded ? item.label : ""}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: isExpanded ? 4 : 0 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-mint-500/0 via-brand-mint-500/20 to-brand-mint-500/0 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.5 }}
              />
              
              {isExpanded ? (
                <>
                  <motion.span className="relative z-10" layout>
                    {item.label}
                  </motion.span>
                  {activeItem === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-brand-mint-500/20 rounded-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      layoutId="activeIndicator"
                    />
                  )}
                </>
              ) : (
                <motion.span 
                  className="text-lg relative z-10"
                  whileHover={{ scale: 1.2, color: "rgb(0, 255, 159)" }}
                >
                  {item.icon}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* External Links */}
      <div className="space-y-4 mb-4">
        <AnimatePresence>
          {isExpanded && (
            <motion.p 
              className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Quick Access
            </motion.p>
          )}
        </AnimatePresence>
        <div className="space-y-2">
          {externalNavItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground dark:text-white bg-sidebar-primary/10 hover:bg-sidebar-primary/30 transition-all duration-300 group flex items-center gap-3 ${!isExpanded && "justify-center px-2"}`}
              title={!isExpanded ? item.label : ""}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ x: isExpanded ? 4 : 0, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span 
                className="text-lg flex-shrink-0 relative z-10"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.span>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span 
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <AnimatePresence>
          {isExpanded && (
            <motion.p 
              className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Connect
            </motion.p>
          )}
        </AnimatePresence>
        <motion.div 
          className={`flex gap-3 ${!isExpanded && "flex-col"}`}
          layout
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-sidebar-primary/10 hover:bg-sidebar-primary/20 transition-all duration-300 text-lg flex items-center justify-center relative overflow-hidden"
              style={{
                color:
                  theme === "dark"
                    ? `color-mix(in srgb, ${social.color} 80%, white 50%)`
                    : `color-mix(in srgb, ${social.color} 70%, #64748B 30%)`,
                opacity: theme === "dark" ? 1 : 0.85,
              }}
              title={social.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.15, rotate: 5, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1, backgroundColor: "rgba(0, 255, 159, 0.1)" }}
              />
              <span className="relative z-10">
                {social.icon}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.aside>
  );
});

export default Sidebar;
