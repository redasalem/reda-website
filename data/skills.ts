export interface SkillData {
  name: string;
  arabicName: string;
  color: string;
}

export interface SkillCategoryData {
  title: string;
  titleArabic?: string;
  skills: SkillData[];
}

export const skillsData: SkillCategoryData[] = [
  {
    title: "Frontend Technologies",
    titleArabic: "تقنيات الواجهة الأمامية",
    skills: [
      { name: "HTML", arabicName: "HTML", color: "#ff5722" },
      { name: "CSS", arabicName: "CSS", color: "#2196f3" },
      { name: "Sass", arabicName: "Sass", color: "#e91e63" },
      { name: "Bootstrap", arabicName: "Bootstrap", color: "#9c27b0" },
      { name: "Tailwind CSS", arabicName: "Tailwind CSS", color: "#06b6d4" },
    ],
  },
  {
    title: "JavaScript & Frameworks",
    titleArabic: "جافاسكريبت والإطارات",
    skills: [
      { name: "JavaScript (ES6+)", arabicName: "جافاسكريبت", color: "#f7df1e" },
      { name: "TypeScript", arabicName: "تايب سكريبت", color: "#3178c6" },
      { name: "React.js", arabicName: "React.js", color: "#61dafb" },
      { name: "Next.js", arabicName: "Next.js", color: "#bdbdbd" },
      { name: "Server Components", arabicName: "مكونات الخادم", color: "#000000" },
      { name: "React Native", arabicName: "React Native", color: "#61dafb" },
    ],
  },
  {
    title: "UI Libraries & Tools",
    titleArabic: "مكتبات وأدوات UI",
    skills: [
      { name: "Material UI", arabicName: "Material UI", color: "#00b0ff" },
      { name: "ShadCN UI", arabicName: "ShadCN UI", color: "#ab47bc" },
      { name: "Zustand", arabicName: "Zustand", color: "#433333" },
      { name: "Storybook", arabicName: "Storybook", color: "#FF4785" },
      { name: "DaisyUI", arabicName: "DaisyUI", color: "#ff9800" },
      { name: "Nivo", arabicName: "Nivo", color: "#ff9800" },
      { name: "React Query", arabicName: "React Query", color: "#f06292" },
    ],
  },
  {
    title: "Integrations & Authentication",
    titleArabic: "التكامل والمصادقة",
    skills: [
      { name: "API Integration", arabicName: "تكامل API", color: "#00e676" },
      { name: "Firebase Auth & Firestore", arabicName: "Firebase", color: "#ffb300" },
      { name: "Clerk", arabicName: "Clerk", color: "#5c6bc0" },
      { name: "GraphQL", arabicName: "GraphQL", color: "#E10098" },
      { name: "PayPal Integration", arabicName: "PayPal", color: "#2196f3" },
    ],
  },
  {
    title: "Build & Deployment",
    titleArabic: "البناء والنشر",
    skills: [
      { name: "Webpack", arabicName: "Webpack", color: "#4fc3f7" },
      { name: "Vite", arabicName: "Vite", color: "#d500f9" },
      { name: "Firebase Hosting", arabicName: "Firebase Hosting", color: "#ffa000" },
      { name: "Vercel", arabicName: "Vercel", color: "#eeeeee" },
      { name: "Netlify", arabicName: "Netlify", color: "#00bfa5" },
    ],
  },
  {
    title: "Backend & Database",
    titleArabic: "الخلفي وقاعدة البيانات",
    skills: [
      { name: "Node.js", arabicName: "Node.js", color: "#339933" },
      { name: "Express.js", arabicName: "Express.js", color: "#000000" },
      { name: "MongoDB", arabicName: "MongoDB", color: "#47A248" },
      { name: "PostgreSQL & Redis", arabicName: "PostgreSQL & Redis", color: "#336791" },
      { name: "Convex", arabicName: "Convex", color: "#F05138" },
    ],
  },
  {
    title: "Workspace & Collaboration",
    titleArabic: "العمل والتعاون",
    skills: [
      { name: "Git & GitHub", arabicName: "Git & GitHub", color: "#F05032" },
      { name: "Figma", arabicName: "Figma", color: "#F24E1E" },
      { name: "Postman", arabicName: "Postman", color: "#FF6C37" },
    ],
  },
  {
    title: "Architecture & Performance",
    titleArabic: "الهندسة والأداء",
    skills: [
      { name: "React Performance", arabicName: "أداء React", color: "#61dafb" },
      { name: "Next.js Production", arabicName: "Next.js للإنتاج", color: "#000000" },
      { name: "Lighthouse", arabicName: "Lighthouse", color: "#F44B3E" },
      { name: "System Scalability", arabicName: "قابلية التوسع", color: "#ff9800" },
      { name: "PWA & Cloud Native", arabicName: "PWA وCloud", color: "#4caf50" },
    ],
  },
  {
    title: "Testing, DevOps & Security",
    titleArabic: "الاختبار والديفوبس والأمان",
    skills: [
      { name: "CI/CD & Docker", arabicName: "CI/CD وDocker", color: "#2196f3" },
      { name: "Jest & Cypress", arabicName: "Jest & Cypress", color: "#C21325" },
      { name: "Web Security", arabicName: "أمان الويب", color: "#9c27b0" },
      { name: "Design Patterns", arabicName: "أنماط التصميم", color: "#795548" },
    ],
  },
];