export interface SkillData {
  name: string;
  color: string;
}

export interface SkillCategoryData {
  title: string;
  skills: SkillData[];
}

export const skillsData: SkillCategoryData[] = [
  {
    title: "Frontend Technologies",
    skills: [
      { name: "HTML", color: "#ff5722" },
      { name: "CSS", color: "#2196f3" },
      { name: "Sass", color: "#e91e63" },
      { name: "Bootstrap", color: "#9c27b0" },
      { name: "Tailwind CSS", color: "#06b6d4" },
    ],
  },
  {
    title: "JavaScript & Frameworks",
    skills: [
      { name: "JavaScript (ES6+)", color: "#f7df1e" },
      { name: "TypeScript", color: "#3178c6" },
      { name: "React.js", color: "#61dafb" },
      { name: "Next.js", color: "#bdbdbd" },
      { name: "Server Components", color: "#000000" },
      { name: "React Native", color: "#61dafb" },
    ],
  },
  {
    title: "UI Libraries & Tools",
    skills: [
      { name: "Material UI", color: "#00b0ff" },
      { name: "ShadCN UI", color: "#ab47bc" },
      { name: "Zustand", color: "#433333" },
      { name: "Storybook", color: "#FF4785" },
      { name: "DaisyUI", color: "#ff9800" },
      { name: "Nivo", color: "#ff9800" },
      { name: "React Query", color: "#f06292" },
    ],
  },
  {
    title: "Integrations & Authentication",
    skills: [
      { name: "API Integration", color: "#00e676" },
      { name: "Firebase Auth & Firestore", color: "#ffb300" },
      { name: "Clerk", color: "#5c6bc0" },
      { name: "GraphQL", color: "#E10098" },
      { name: "PayPal Integration", color: "#2196f3" },
    ],
  },
  {
    title: "Build & Deployment",
    skills: [
      { name: "Webpack", color: "#4fc3f7" },
      { name: "Vite", color: "#d500f9" },
      { name: "Firebase Hosting", color: "#ffa000" },
      { name: "Vercel", color: "#eeeeee" },
      { name: "Netlify", color: "#00bfa5" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", color: "#339933" },
      { name: "Express.js", color: "#000000" },
      { name: "MongoDB", color: "#47A248" },
      { name: "PostgreSQL & Redis", color: "#336791" },
      { name: "Convex", color: "#F05138" },
    ],
  },
  {
    title: "Workspace & Collaboration",
    skills: [
      { name: "Git & GitHub", color: "#F05032" },
      { name: "Figma", color: "#F24E1E" },
      { name: "Postman", color: "#FF6C37" },
    ],
  },
  {
    title: "Architecture & Performance",
    skills: [
      { name: "React Performance", color: "#61dafb" },
      { name: "Next.js Production", color: "#000000" },
      { name: "Lighthouse", color: "#F44B3E" },
      { name: "System Scalability", color: "#ff9800" },
      { name: "PWA & Cloud Native", color: "#4caf50" },
    ],
  },
  {
    title: "Testing, DevOps & Security",
    skills: [
      { name: "CI/CD & Docker", color: "#2196f3" },
      { name: "Jest & Cypress", color: "#C21325" },
      { name: "Web Security", color: "#9c27b0" },
      { name: "Design Patterns", color: "#795548" },
    ],
  },
];