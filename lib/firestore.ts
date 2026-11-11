import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { setLogLevel } from "firebase/app";
import { getFirebaseApp } from "../config/firebase";
import { initialProjects } from "@/data/projects";
import { skillsData, type SkillCategoryData, type SkillData } from "@/data/skills";

if (typeof window === "undefined") {
  try {
    setLogLevel("silent");
  } catch {}
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  demo: string;
  code: string;
  image?: string;
  featured?: boolean;
  published?: boolean;
  order?: number;
  createdAt?: number;
  updatedAt?: number;
}

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "email"
  | "phone"
  | "facebook"
  | "x"
  | "devto"
  | "medium"
  | "stackoverflow"
  | "youtube"
  | "website";

export interface SocialLinkItem {
  id: string;
  platform: SocialPlatform;
  label: string;
  href: string;
  visible: boolean;
  showInHero?: boolean;
  showInSidebar?: boolean;
  showInFooter?: boolean;
  order: number;
}

export interface ResumeStatItem {
  value: string;
  label: string;
  labelAr?: string;
}

export interface SiteSettings {
  cvUrl: string;
  cvLabel: string;
  cvSubtitle: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  githubUrl: string;
  linkedinUrl: string;
  availabilityBadge: string;
  availabilityBadgeAr?: string;
  heroName: string;
  heroNameAr?: string;
  heroTitle: string;
  heroTitleAr?: string;
  heroBio: string;
  heroBioAr?: string;
  sidebarTagline: string;
  footerBlurb: string;
  footerBlurbAr?: string;
  avatarUrl: string;
  codeStack: string[];
  projectsHeading?: string;
  projectsHeadingAr?: string;
  projectsSubtitle?: string;
  projectsSubtitleAr?: string;
  skillsHeading?: string;
  skillsHeadingAr?: string;
  certificatesHeading?: string;
  certificatesHeadingAr?: string;
  certificatesSubtitle?: string;
  certificatesSubtitleAr?: string;
  contactHeading?: string;
  contactHeadingAr?: string;
  contactSubtitle?: string;
  contactSubtitleAr?: string;
  resumeStats?: ResumeStatItem[];
  resumeSkills?: string[];
  aiSystemPrompt?: string;
  updatedAt?: number;
}

export type CertificateTheme = "mint" | "violet" | "cyan" | "amber";
export type CertificateIconName = "Code2" | "Rocket" | "Bot" | "Award";

export interface CertificateItem {
  id: string;
  title: string;
  titleArabic?: string;
  issuer: string;
  date: string;
  description: string;
  descriptionArabic?: string;
  link: string;
  image: string;
  theme: CertificateTheme;
  iconName: CertificateIconName;
  order: number;
}

export interface SkillItemWithIcon extends SkillData {
  icon?: string;
}

export interface SkillCategoryDoc extends SkillCategoryData {
  id: string;
  order: number;
  skills: SkillItemWithIcon[];
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  cvUrl: "https://drive.google.com/file/d/1OPCpxoGmn_JoAVOvflMNVvE1-xvjBlwR/view",
  cvLabel: "Full-Stack Strategy CV",
  cvSubtitle: "System Design · Architecture",
  email: "redasalem287@gmail.com",
  phone: "+201121696299",
  phoneDisplay: "+20 112 169 6299",
  githubUrl: "https://github.com/redasalem",
  linkedinUrl: "https://www.linkedin.com/in/reda-salem-dev/",
  availabilityBadge: "Open to Remote & Freelance",
  availabilityBadgeAr: "متاح للعمل عن بُعد والمشاريع الحرة",
  heroName: "Reda Salem",
  heroNameAr: "رضا سالم",
  heroTitle: "Full-Stack Engineer",
  heroTitleAr: "مهندس برمجيات Full-Stack",
  heroBio:
    "I build web applications that work well and ship on time. My stack is React, Next.js, Node.js, and MongoDB — and I've used it to deliver car rental platforms, multi-vendor marketplaces, and SEO tools that handle real users and real payments.",
  heroBioAr:
    "أبني تطبيقات ويب ومنصات رقمية سريعة، مستقرة، وقابلة للتوسع باستخدام React وNext.js وNode.js وMongoDB — نفّذت بها منصات تأجير سيارات، وأسواق إلكترونية متعددة التجار، وأدوات فحص أداء تخدم مستخدمين حقيقيين وتدير مدفوعات فعلية.",
  sidebarTagline: "Next.js · React · Node.js",
  footerBlurb:
    "Full-Stack Engineer based in Egypt. Building for the web with React, Next.js, and Node.js. Open to remote work and freelance.",
  footerBlurbAr:
    "مهندس برمجيات Full-Stack مقيم في مصر. أطوّر تطبيقات ويب وموبايل سريعة باستخدام React وNext.js وNode.js. متاح للعمل عن بُعد وللمشاريع الحرة.",
  avatarUrl: "/images/reda.jpeg",
  codeStack: ["React", "Next.js", "Node.js", "MongoDB"],
  projectsHeading: "Featured Projects",
  projectsHeadingAr: "أبرز الأعمال والمشاريع",
  projectsSubtitle:
    "Production-grade platforms engineered for precision — from a 95+ Lighthouse score achieved through optimized Next.js App Router architecture, to secure Stripe Connect payment pipelines and scalable multi-vendor ecosystems.",
  projectsSubtitleAr:
    "مشاريع حقيقية ومنصات إنتاجية مبنية بمعايير هندسية دقيقة — سرعة أداء تتجاوز 95 على Lighthouse، وربط بوابات دفع Stripe Connect، ومعمارية قابلة للتوسع.",
  skillsHeading: "What I Work With",
  skillsHeadingAr: "التقنيات والأدوات",
  certificatesHeading: "Certificates",
  certificatesHeadingAr: "الشهادات والتدريب",
  certificatesSubtitle:
    "Formal training and certifications that shaped how I build software.",
  certificatesSubtitleAr:
    "التدريب الأكاديمي والشهادات المهنية التي صقلت خبرتي في بناء البرمجيات.",
  contactHeading: "Get in Touch",
  contactHeadingAr: "تواصل معي",
  contactSubtitle:
    "Have a project in mind or want to work together? I'd like to hear about it.",
  contactSubtitleAr:
    "عندك فكرة مشروع أو فرصة عمل؟ ابعتلي رسالة وهرد عليك في أقرب وقت.",
  resumeStats: [
    { value: "2+", label: "Years Experience", labelAr: "سنوات خبرة" },
    { value: "15+", label: "Projects Completed", labelAr: "مشروع مكتمل" },
    { value: "99/100", label: "PageSpeed Score", labelAr: "سرعة الأداء" },
    { value: "10+", label: "Technologies", labelAr: "تقنيات أساسية" },
  ],
  resumeSkills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "Tailwind CSS",
    "MongoDB",
    "Express.js",
    "Prisma",
    "Redux",
  ],
  aiSystemPrompt: "",
};

export const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "github",
    platform: "github",
    label: "GitHub",
    href: "https://github.com/redasalem",
    visible: true,
    showInHero: true,
    showInSidebar: true,
    showInFooter: true,
    order: 0,
  },
  {
    id: "linkedin",
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/reda-salem-dev/",
    visible: true,
    showInHero: true,
    showInSidebar: true,
    showInFooter: true,
    order: 1,
  },
  {
    id: "email",
    platform: "email",
    label: "Email",
    href: "mailto:redasalem287@gmail.com",
    visible: true,
    showInHero: true,
    showInSidebar: true,
    showInFooter: true,
    order: 2,
  },
  {
    id: "phone",
    platform: "phone",
    label: "WhatsApp",
    href: "tel:+201121696299",
    visible: true,
    showInHero: false,
    showInSidebar: true,
    showInFooter: false,
    order: 3,
  },
  {
    id: "x",
    platform: "x",
    label: "X (Twitter)",
    href: "https://x.com/salem_reda81609",
    visible: false,
    showInHero: false,
    showInSidebar: false,
    showInFooter: false,
    order: 4,
  },
  {
    id: "facebook",
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/reda.salem.3701?locale=ar_AR",
    visible: false,
    showInHero: false,
    showInSidebar: false,
    showInFooter: false,
    order: 5,
  },
  {
    id: "devto",
    platform: "devto",
    label: "DEV Community",
    href: "https://dev.to/redasalem",
    visible: false,
    showInHero: false,
    showInSidebar: false,
    showInFooter: false,
    order: 6,
  },
  {
    id: "medium",
    platform: "medium",
    label: "Medium",
    href: "https://medium.com/@redasalem",
    visible: false,
    showInHero: false,
    showInSidebar: false,
    showInFooter: false,
    order: 7,
  },
  {
    id: "stackoverflow",
    platform: "stackoverflow",
    label: "Stack Overflow",
    href: "https://stackoverflow.com/users/29207867/reda-salem",
    visible: false,
    showInHero: false,
    showInSidebar: false,
    showInFooter: false,
    order: 8,
  },
];

export const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    id: "hsoub-frontend",
    title: "Front-End Certificate",
    titleArabic: "شهادة تطوير الواجهات الأمامية المعتمدة",
    issuer: "Hsoub Academy",
    date: "May 2025",
    description:
      "Comprehensive front-end engineering certification covering React, Next.js, performance optimization, and modern web development practices.",
    descriptionArabic:
      "شهادة هندسية متكاملة في تطوير الواجهات الأمامية تغطي React وNext.js وتحسين سرعة الأداء وأفضل ممارسات بناء تطبيقات الويب الحديثة.",
    link: "https://academy.hsoub.com/certificate/8CT2XWQB10SJXDYDRM4PT6GED.pdf",
    image: "/images/hasoup.webp",
    theme: "mint",
    iconName: "Code2",
    order: 0,
  },
  {
    id: "iti-fullstack",
    title: "Full-Stack Development Training",
    titleArabic: "البرنامج التدريبي لتطوير الويب المتكامل",
    issuer: "Information Technology Institute (ITI)",
    date: "Sep 2022",
    description:
      "Professional training program focused on frontend engineering fundamentals, component architectures, and responsive web applications with hands-on projects.",
    descriptionArabic:
      "برنامج تدريبي احترافي من معهد تكنولوجيا المعلومات (ITI) يركز على هندسة الواجهات ومعمارية المكونات وبناء تطبيقات ويب متجاوبة عبر مشاريع عملية.",
    link: "https://drive.google.com/file/d/1irnR_hedjneoMh7poPI9CM4SwqXeLAOU/view",
    image: "/images/reda_iti.png",
    theme: "violet",
    iconName: "Code2",
    order: 1,
  },
  {
    id: "humavolve-frontend",
    title: "Front-End Development Training",
    titleArabic: "التدريب العملي لهندسة الواجهات الأمامية",
    issuer: "Huma-volve",
    date: "Dec 2025",
    description:
      "Frontend engineering internship covering production-grade component development, state management, API integration, and Agile team workflows.",
    descriptionArabic:
      "تدريب هندسي تطبيقي يغطي بناء مكونات الإنتاج وإدارة الحالة وربط واجهات البرمجة (APIs) والعمل ضمن فرق Agile.",
    link: "https://www.linkedin.com/posts/reda-salem-dev_frontend-react-professionalgrowth-activity-7416949321494982656-bim4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAELm9IAB5ccC-E7q6WGg2fPYNK2bK5i7Yys",
    image: "/images/huma-volve.jpg",
    theme: "cyan",
    iconName: "Rocket",
    order: 2,
  },
  {
    id: "google-build-with-ai",
    title: "Build with AI: Masr Edition",
    titleArabic: "بناء الحلول بالذكاء الاصطناعي: نسخة مصر",
    issuer: "Google for Developers & ITI",
    date: "2024",
    description:
      "Hands-on sessions with Google for Developers covering AI tools, LLMs, and their integration into web applications.",
    descriptionArabic:
      "شهادة معتمدة من Google for Developers ومعهد ITI في توظيف نماذج الذكاء الاصطناعي التوليدي ودمجها داخل تطبيقات الويب الحديثة.",
    link: "https://drive.google.com/file/d/1-c0f0Ec5BMT8GZJUzQQyBX1X0AdGGkOu/view?usp=sharing",
    image: "/images/google.PNG",
    theme: "amber",
    iconName: "Bot",
    order: 3,
  },
];

export const DEFAULT_SKILL_CATEGORIES: SkillCategoryDoc[] = skillsData.map(
  (cat, index) => ({
    id: `cat-${index + 1}`,
    title: cat.title,
    titleArabic: cat.titleArabic,
    order: index,
    skills: cat.skills.map((s) => ({ ...s, icon: s.name })),
  }),
);

const db = getFirestore(getFirebaseApp());

export function normalizeTechStack(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

/**
 * Normalizes Google Drive share links into clean /view links while leaving other URLs untouched.
 */
export function normalizeDriveOrExternalUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";

  const driveMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/view`;
  }
  return trimmed;
}

export const getProjects = async (options?: {
  includeUnpublished?: boolean;
}): Promise<ProjectData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const items: ProjectData[] = querySnapshot.docs.map((docSnap, idx) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        title: data.title || "",
        description: data.desc || data.description || "",
        tech: normalizeTechStack(data.technologies ?? data.tech),
        demo: data.demo || data.demoLink || "",
        code: data.code || data.codeLink || "",
        image: data.image || "/images/placeholder.png",
        featured: typeof data.featured === "boolean" ? data.featured : true,
        published: typeof data.published === "boolean" ? data.published : true,
        order: typeof data.order === "number" ? data.order : idx,
        createdAt: typeof data.createdAt === "number" ? data.createdAt : 0,
        updatedAt: typeof data.updatedAt === "number" ? data.updatedAt : 0,
      };
    });

    const filtered = options?.includeUnpublished
      ? items
      : items.filter((p) => p.published !== false);

    filtered.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

    return filtered;
  } catch (error) {
    if (typeof window !== "undefined") {
      console.error("Error fetching projects from Firestore:", error);
    }
    return [];
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const snap = await getDoc(doc(db, "settings", "site"));
    if (!snap.exists()) {
      return DEFAULT_SITE_SETTINGS;
    }
    const data = snap.data() as Partial<SiteSettings>;
    return {
      ...DEFAULT_SITE_SETTINGS,
      ...data,
      codeStack: Array.isArray(data.codeStack) && data.codeStack.length > 0
        ? data.codeStack
        : DEFAULT_SITE_SETTINGS.codeStack,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
};

export const getSocialLinks = async (): Promise<SocialLinkItem[]> => {
  try {
    const snap = await getDoc(doc(db, "settings", "socials"));
    if (!snap.exists()) {
      return DEFAULT_SOCIAL_LINKS;
    }
    const data = snap.data();
    if (!Array.isArray(data?.links) || data.links.length === 0) {
      return DEFAULT_SOCIAL_LINKS;
    }
    const links = (data.links as SocialLinkItem[]).slice();
    links.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    return links;
  } catch {
    return DEFAULT_SOCIAL_LINKS;
  }
};

export const getSkillCategories = async (): Promise<SkillCategoryDoc[]> => {
  try {
    const snap = await getDocs(collection(db, "skillCategories"));
    if (snap.empty) {
      return DEFAULT_SKILL_CATEGORIES;
    }
    const categories: SkillCategoryDoc[] = snap.docs.map((d, idx) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        titleArabic: data.titleArabic || "",
        order: typeof data.order === "number" ? data.order : idx,
        skills: Array.isArray(data.skills) ? data.skills : [],
      };
    });
    categories.sort((a, b) => a.order - b.order);
    return categories;
  } catch {
    return DEFAULT_SKILL_CATEGORIES;
  }
};

export const getCertificates = async (): Promise<CertificateItem[]> => {
  try {
    const snap = await getDocs(collection(db, "certificates"));
    if (snap.empty) {
      return DEFAULT_CERTIFICATES;
    }
    const certs: CertificateItem[] = snap.docs.map((d, idx) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        titleArabic: data.titleArabic || "",
        issuer: data.issuer || "",
        date: data.date || "",
        description: data.description || "",
        descriptionArabic: data.descriptionArabic || "",
        link: data.link || "",
        image: data.image || "/images/placeholder.png",
        theme: (data.theme as CertificateTheme) || "mint",
        iconName: (data.iconName as CertificateIconName) || "Award",
        order: typeof data.order === "number" ? data.order : idx,
      };
    });
    certs.sort((a, b) => a.order - b.order);
    return certs;
  } catch {
    return DEFAULT_CERTIFICATES;
  }
};

export interface PortfolioSnapshot {
  projects: ProjectData[];
  settings: SiteSettings;
  socials: SocialLinkItem[];
  skillCategories: SkillCategoryDoc[];
  certificates: CertificateItem[];
}

export async function getPortfolioSnapshot(): Promise<PortfolioSnapshot> {
  const [projectsFromDb, settings, socials, skillCategories, certificates] =
    await Promise.all([
      getProjects(),
      getSiteSettings(),
      getSocialLinks(),
      getSkillCategories(),
      getCertificates(),
    ]);

  return {
    projects: projectsFromDb.length > 0 ? projectsFromDb : initialProjects,
    settings,
    socials,
    skillCategories,
    certificates,
  };
}
