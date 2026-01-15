"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Code as HtmlIcon,
  Palette as PaletteIcon,
  Brush as SassIcon,
  Layers as BootstrapIcon,
  Waves as TailwindIcon,
  Javascript as JavascriptIcon,
  IntegrationInstructions as TypescriptIcon,
  ChangeHistory as ReactIcon,
  NightsStay as NextIcon,
  PhoneIphone as ReactNativeIcon,
  Widgets as MaterialUIIcon,
  AutoAwesome as ShadcnIcon,
  BarChart as NivoIcon,
  QueryStats as ReactQueryIcon,
  Api as ApiIcon,
  Whatshot as FirebaseIcon,
  AccountCircle as ClerkIcon,
  Payment as PaypalIcon,
  Settings as WebpackIcon,
  FlashOn as ViteIcon,
  CloudUpload as FirebaseHostingIcon,
  ChangeCircle as VercelIcon,
  Public as NetlifyIcon,
  Hub as NodeIcon,
  Terminal as TerminalIcon,
  CloudQueue as ConvexIcon,
} from "@mui/icons-material";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "HTML", icon: <HtmlIcon sx={{ color: "#ff5722" }} /> },
        { name: "CSS", icon: <PaletteIcon sx={{ color: "#2196f3" }} /> },
        { name: "Sass", icon: <SassIcon sx={{ color: "#e91e63" }} /> },
        {
          name: "Bootstrap",
          icon: <BootstrapIcon sx={{ color: "#9c27b0" }} />,
        },
        {
          name: "Tailwind CSS",
          icon: <TailwindIcon sx={{ color: "#06b6d4" }} />,
        },
      ],
    },
    {
      title: "JavaScript & Frameworks",
      skills: [
        {
          name: "JavaScript (ES6+)",
          icon: <JavascriptIcon sx={{ color: "#f7df1e" }} />,
        },
        {
          name: "TypeScript",
          icon: <TypescriptIcon sx={{ color: "#3178c6" }} />,
        },
        { name: "React.js", icon: <ReactIcon sx={{ color: "#61dafb" }} /> },
        { name: "Next.js", icon: <NextIcon sx={{ color: "#bdbdbd" }} /> },
        {
          name: "React Native",
          icon: <ReactNativeIcon sx={{ color: "#61dafb" }} />,
        },
      ],
    },
    {
      title: "UI Libraries & Tools",
      skills: [
        {
          name: "Material UI",
          icon: <MaterialUIIcon sx={{ color: "#00b0ff" }} />,
        },
        { name: "ShadCN UI", icon: <ShadcnIcon sx={{ color: "#ab47bc" }} /> },
        { name: "DaisyUI", icon: <PaletteIcon sx={{ color: "#ff9800" }} /> },
        { name: "Nivo", icon: <NivoIcon sx={{ color: "#ff9800" }} /> },
        {
          name: "React Query",
          icon: <ReactQueryIcon sx={{ color: "#f06292" }} />,
        },
      ],
    },
    {
      title: "Integrations & Authentication",
      skills: [
        {
          name: "API Integration",
          icon: <ApiIcon sx={{ color: "#00e676" }} />,
        },
        {
          name: "Firebase Auth & Firestore",
          icon: <FirebaseIcon sx={{ color: "#ffb300" }} />,
        },
        { name: "Clerk", icon: <ClerkIcon sx={{ color: "#5c6bc0" }} /> },
        {
          name: "PayPal Integration",
          icon: <PaypalIcon sx={{ color: "#2196f3" }} />,
        },
      ],
    },
    {
      title: "Build & Deployment",
      skills: [
        { name: "Webpack", icon: <WebpackIcon sx={{ color: "#4fc3f7" }} /> },
        { name: "Vite", icon: <ViteIcon sx={{ color: "#d500f9" }} /> },
        {
          name: "Firebase Hosting",
          icon: <FirebaseHostingIcon sx={{ color: "#ffa000" }} />,
        },
        { name: "Vercel", icon: <VercelIcon sx={{ color: "#eeeeee" }} /> },
        { name: "Netlify", icon: <NetlifyIcon sx={{ color: "#00bfa5" }} /> },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", icon: <NodeIcon sx={{ color: "#339933" }} /> },
        {
          name: "Express.js",
          icon: <TerminalIcon sx={{ color: "#000000" }} />,
        },
        { name: "MongoDB", icon: <TerminalIcon sx={{ color: "#47A248" }} /> },
        { name: "Convex", icon: <ConvexIcon sx={{ color: "#F05138" }} /> },
      ],
    },
    {
      title: "Workspace & Collaboration",
      skills: [
        { name: "Git & GitHub", icon: <HtmlIcon sx={{ color: "#F05032" }} /> },
        { name: "Postman", icon: <ApiIcon sx={{ color: "#FF6C37" }} /> },
      ],
    },
  ];

  const containerRef = useRef(null);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-background text-foreground transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 md:opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="mb-16 md:mb-24 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm mb-4 md:mb-6">
            <ShadcnIcon className="text-accent w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold text-accent">
              Technical Proficiency
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-20 md:w-24 h-1.5 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              className="group relative h-full p-6 md:p-8 rounded-3xl border border-border/50 
              bg-card/50 backdrop-blur-xl hover:bg-card/80 transition-all duration-500
              shadow-lg hover:shadow-primary/5 dark:shadow-none flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="relative text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                {category.title}
              </h3>

              <div className="relative flex flex-wrap gap-2 md:gap-3">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium
                    bg-secondary/50 border border-border/50 text-foreground/80
                    hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-300 cursor-default"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
                      {skill.icon}
                    </span>
                    <span className="pt-0.5">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
