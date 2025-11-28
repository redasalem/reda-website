
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import {
  Code as HtmlIcon,
  Palette as CssIcon,
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
  Php as PhpIcon,
  Storage as MysqlIcon,
} from "@mui/icons-material"

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "HTML", icon: <HtmlIcon sx={{ color: "#ff5722" }} /> },
        { name: "CSS", icon: <CssIcon sx={{ color: "#2196f3" }} /> },
        { name: "Sass", icon: <SassIcon sx={{ color: "#e91e63" }} /> },
        { name: "Bootstrap", icon: <BootstrapIcon sx={{ color: "#9c27b0" }} /> },
        { name: "Tailwind CSS", icon: <TailwindIcon sx={{ color: "#06b6d4" }} /> },
      ],
    },
    {
      title: "JavaScript & Frameworks",
      skills: [
        { name: "JavaScript (ES6+)", icon: <JavascriptIcon sx={{ color: "#f7df1e" }} /> },
        { name: "TypeScript", icon: <TypescriptIcon sx={{ color: "#3178c6" }} /> },
        { name: "React.js", icon: <ReactIcon sx={{ color: "#61dafb" }} /> },
        { name: "Next.js", icon: <NextIcon sx={{ color: "#bdbdbd" }} /> },
        { name: "React Native", icon: <ReactNativeIcon sx={{ color: "#61dafb" }} /> },
      ],
    },
    {
      title: "UI Libraries & Tools",
      skills: [
        { name: "Material UI", icon: <MaterialUIIcon sx={{ color: "#00b0ff" }} /> },
        { name: "ShadCN UI", icon: <ShadcnIcon sx={{ color: "#ab47bc" }} /> },
        { name: "Nivo", icon: <NivoIcon sx={{ color: "#ff9800" }} /> },
        { name: "React Query", icon: <ReactQueryIcon sx={{ color: "#f06292" }} /> },
      ],
    },
    {
      title: "Integrations & Authentication",
      skills: [
        { name: "API Integration", icon: <ApiIcon sx={{ color: "#00e676" }} /> },
        { name: "Firebase Auth & Firestore", icon: <FirebaseIcon sx={{ color: "#ffb300" }} /> },
        { name: "Clerk", icon: <ClerkIcon sx={{ color: "#5c6bc0" }} /> },
        { name: "PayPal Integration", icon: <PaypalIcon sx={{ color: "#2196f3" }} /> },
      ],
    },
    {
      title: "Build & Deployment",
      skills: [
        { name: "Webpack", icon: <WebpackIcon sx={{ color: "#4fc3f7" }} /> },
        { name: "Vite", icon: <ViteIcon sx={{ color: "#d500f9" }} /> },
        { name: "Firebase Hosting", icon: <FirebaseHostingIcon sx={{ color: "#ffa000" }} /> },
        { name: "Vercel", icon: <VercelIcon sx={{ color: "#eeeeee" }} /> },
        { name: "Netlify", icon: <NetlifyIcon sx={{ color: "#00bfa5" }} /> },
      ],
    },
    {
      title: "Backend Basics",
      skills: [
        { name: "PHP", icon: <PhpIcon sx={{ color: "#7b68ee" }} /> },
        { name: "MySQL", icon: <MysqlIcon sx={{ color: "#f48fb1" }} /> },
      ],
    },
  ]

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen py-32 overflow-hidden text-gray-900 dark:text-white transition-colors duration-500
      bg-linear-to-b from-gray-100 via-indigo-50 to-white dark:from-black dark:via-zinc-950 dark:to-black"
    >
      <motion.div
        className="absolute inset-0 opacity-40 dark:opacity-60 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.15),transparent_70%),radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.15),transparent_70%)] blur-2xl"
        style={{ y: backgroundY }}
      />

      <div className="max-w-[90%] mx-auto relative z-10">
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-28 h-1 mx-auto bg-linear-to-r from-indigo-400 to-cyan-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              className="group relative p-8 rounded-3xl border border-black/10 dark:border-white/10 
              bg-white/70 dark:bg-white/5 backdrop-blur-lg hover:bg-white/90 dark:hover:bg-white/10
              shadow-lg hover:shadow-indigo-500/20 transition-all duration-700 cursor-default"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ scale: 1.05, rotateX: 4, rotateY: -4 }}
            >
              <h3 className="text-[30px] font-semibold mb-5 bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-base font-medium
                    border border-indigo-400/30 bg-indigo-400/10 text-indigo-900 dark:text-indigo-100
                    hover:bg-indigo-400/20 hover:border-indigo-400/50 transition-all duration-300"
                    whileHover={{ scale: 1.12, y: -3 }}
                  >
                    <span className="text-xl">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-gray-500 dark:text-white/40 animate-pulse"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll to Discover →
      </motion.div>
    </section>
  )
}
