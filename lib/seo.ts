import type { Metadata, Viewport } from "next";
import type { Locale } from "@/lib/i18n";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://reda-website.vercel.app"
).replace(/\/+$/, "");

export type PageRouteKey = "home" | "download";

export function buildEnglishAlternates(
  enPath: string,
): NonNullable<Metadata["alternates"]> {
  const normalizedEnPath = enPath === "/" ? "" : enPath;
  const enUrl = `${SITE_URL}${normalizedEnPath}`;

  return {
    canonical: enUrl,
    languages: {
      en: enUrl,
      "en-US": enUrl,
      "x-default": enUrl,
    },
  };
}

export const SITE_VIEWPORT: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const ENGLISH_KEYWORDS: string[] = [
  "Reda Salem",
  "Full-Stack Engineer",
  "Full-Stack Developer Egypt",
  "React Developer Egypt",
  "Next.js Developer",
  "React Native Developer",
  "Performance Optimization Engineer",
  "Google PageSpeed 99",
  "Scalable Web Applications",
  "Remote JavaScript Developer",
  "TypeScript Full-Stack Developer",
  "Node.js Backend Developer",
  "Frontend Developer Cairo",
  "Remote Full-Stack Developer",
  "Freelance React Developer",
  "Web Developer for hire",
  "Tailwind CSS Specialist",
  "UI/UX Developer",
  "Responsive Web Design",
  "E-commerce Website Developer",
  "SaaS Application Developer",
  "Dashboard UI Developer",
  "Custom Web Application Development",
];

export const ARABIC_KEYWORDS: string[] = [
  "رضا سالم",
  "مبرمج فول ستاك",
  "مطور ويب",
  "مهندس برمجيات",
  "هندسة البرمجيات",
  "تطوير تطبيقات الويب",
  "تطوير تطبيقات الموبايل",
  "مطور React",
  "مطور Next.js",
  "مطور React Native",
  "مطور Node.js",
  "مطور TypeScript",
  "مطور باك اند",
  "مطور فرونت اند",
  "مطور تطبيقات موبايل",
  "تطبيقات رياكت نيتف",
  "تطوير مواقع فول ستاك",
  "تطبيقات عالية الأداء",
  "تطوير المواقع الإلكترونية",
  "تطبيقات الويب المتجاوبة",
  "مطور ويب مصري",
  "مبرمج مصري",
  "تطوير واجهات المستخدم",
  "تطوير الواجهات الأمامية",
  "مهندس برمجيات متخصص",
];

const NOINDEX_FOLLOW_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
  nocache: false,
  googleBot: {
    index: false,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

/**
 * Shared English base metadata without route-specific `alternates.canonical`
 * so child routes never inherit the root URL as their canonical.
 */
export const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Reda Salem | Performance Optimization Engineer & React Developer",
    template: "%s | Reda Salem - Full-Stack Engineer",
  },
  description:
    "Hire Reda Salem, a Remote Full-Stack JavaScript Developer & Performance Optimization Engineer specializing in high-speed, scalable web and mobile applications using React, Next.js, TypeScript, React Native, and Node.js.",
  keywords: ENGLISH_KEYWORDS,
  authors: [
    {
      name: "Reda Salem",
      url: SITE_URL,
    },
  ],
  creator: "Reda Salem",
  publisher: "Reda Salem",
  category: "technology",
  classification: "Portfolio, Full-Stack Development",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: [
      "WdJppG3mAkZoon8ptYrXM7OGEllTG3SK7u3T__GSNtk",
      "e2jaxxJkIU5x1v3Bl0_iodK_aWiOznLFl1mUANYd_Qc",
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Reda Salem",
    statusBarStyle: "black-translucent",
  },
  applicationName: "Reda Salem Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Reda Salem - Professional Portfolio",
  },
};

export const AR_BASE_METADATA: Metadata = {
  ...BASE_METADATA,
  title: {
    default:
      "رضا سالم | مهندس برمجيات Full-Stack ومطور React و Next.js في مصر",
    template: "%s | رضا سالم — مهندس برمجيات Full-Stack",
  },
  description:
    "تواصل مع المهندس رضا سالم، مطور برمجيات Full-Stack متخصص في بناء تطبيقات الويب والموبايل فائقة السرعة باستخدام React و Next.js و Node.js و React Native.",
  keywords: ARABIC_KEYWORDS,
  robots: NOINDEX_FOLLOW_ROBOTS,
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "رضا سالم — معرض الأعمال المهني",
  },
};

export const EN_HOME_METADATA: Metadata = {
  title:
    "Reda Salem | Performance Optimization Engineer & React Developer",
  description:
    "Hire Reda Salem, a Remote Full-Stack JavaScript Developer & Performance Optimization Engineer. Achieving 99/100 Google PageSpeed scores, I build scalable web and mobile applications using React, Next.js, TypeScript, React Native, and Node.js.",
  keywords: ENGLISH_KEYWORDS,
  alternates: buildEnglishAlternates("/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Reda Salem - Professional Portfolio",
    title: "Reda Salem | Performance Optimization Engineer & React Developer",
    description:
      "Hire Reda Salem, a Remote Full-Stack JavaScript Developer & Performance Optimization Engineer building high-speed, scalable web applications with React, Next.js, and Node.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reda Salem - Full-Stack Engineer Portfolio showcasing modern web and mobile applications",
        type: "image/png",
      },
      {
        url: "/images/reda.jpeg",
        width: 800,
        height: 800,
        alt: "Reda Salem - Full-Stack Engineer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@redasalem",
    creator: "@redasalem",
    title: "Reda Salem | Performance Optimization Engineer & React Developer",
    description:
      "Achieving Google PageSpeed 99 on scalable web apps using React, Next.js, TypeScript, and Node.js.",
    images: {
      url: "/og-image.png",
      alt: "Reda Salem Portfolio",
    },
  },
};

export const AR_HOME_METADATA: Metadata = {
  title: {
    absolute:
      "رضا سالم | مهندس برمجيات Full-Stack ومطور React و Next.js في مصر",
  },
  description:
    "تواصل مع المهندس رضا سالم، مطور برمجيات Full-Stack متخصص في بناء تطبيقات الويب والموبايل فائقة السرعة باستخدام React و Next.js و Node.js و React Native مع تحقيق سرعة أداء قياسية 99/100 على Google PageSpeed.",
  keywords: ARABIC_KEYWORDS,
  robots: NOINDEX_FOLLOW_ROBOTS,
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: `${SITE_URL}/ar`,
    siteName: "رضا سالم — معرض الأعمال المهني",
    title: "رضا سالم | مهندس برمجيات Full-Stack ومطور React و Next.js",
    description:
      "أصمّم وأطوّر تطبيقات ويب ومنصات رقمية فائقة السرعة قابلة للتوسع وتتصدر نتائج البحث باستخدام React و Next.js و Node.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "رضا سالم - مهندس برمجيات Full-Stack",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@redasalem",
    creator: "@redasalem",
    title: "رضا سالم | مهندس برمجيات Full-Stack ومطور React و Next.js",
    description:
      "تطوير تطبيقات ويب وموبايل فائقة السرعة وقابلة للتوسع باستخدام React و Next.js و Node.js.",
    images: {
      url: "/og-image.png",
      alt: "رضا سالم — معرض الأعمال المهني",
    },
  },
};

export const EN_DOWNLOAD_METADATA: Metadata = {
  title: "Download Resume",
  description:
    "Download Reda Salem's resume and certificates. Full-Stack Engineer specializing in React, Next.js, TypeScript, and Node.js.",
  keywords: [
    ...ENGLISH_KEYWORDS,
    "Reda Salem Resume",
    "Reda Salem CV",
    "Full-Stack Engineer Resume",
  ],
  alternates: buildEnglishAlternates("/download"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/download`,
    siteName: "Reda Salem - Professional Portfolio",
    title: "Download Resume | Reda Salem - Full-Stack Engineer",
    description:
      "Download Reda Salem's resume and view engineering qualifications, technical skills, and certifications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reda Salem Resume & CV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@redasalem",
    creator: "@redasalem",
    title: "Download Resume | Reda Salem - Full-Stack Engineer",
    description:
      "Download Reda Salem's resume and view engineering qualifications, technical skills, and certifications.",
    images: {
      url: "/og-image.png",
      alt: "Reda Salem Resume & CV",
    },
  },
};

export const AR_DOWNLOAD_METADATA: Metadata = {
  title: {
    absolute: "تحميل السيرة الذاتية | رضا سالم — مهندس برمجيات Full-Stack",
  },
  description:
    "حمّل السيرة الذاتية المعتمدة للمهندس رضا سالم — خبرة عملية في تطوير تطبيقات الويب والموبايل باستخدام React و Next.js و Node.js.",
  keywords: [
    ...ARABIC_KEYWORDS,
    "السيرة الذاتية رضا سالم",
    "تحميل CV مطور ويب",
  ],
  robots: NOINDEX_FOLLOW_ROBOTS,
  alternates: {
    canonical: `${SITE_URL}/download`,
    languages: {
      en: `${SITE_URL}/download`,
      "en-US": `${SITE_URL}/download`,
      "x-default": `${SITE_URL}/download`,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: `${SITE_URL}/ar/download`,
    siteName: "رضا سالم — معرض الأعمال المهني",
    title: "تحميل السيرة الذاتية | رضا سالم — مهندس برمجيات Full-Stack",
    description:
      "حمّل السيرة الذاتية المعتمدة للمهندس رضا سالم — خبرة عملية في تطوير تطبيقات الويب والموبايل باستخدام React و Next.js و Node.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "السيرة الذاتية — رضا سالم",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@redasalem",
    creator: "@redasalem",
    title: "تحميل السيرة الذاتية | رضا سالم — مهندس برمجيات Full-Stack",
    description:
      "حمّل السيرة الذاتية المعتمدة للمهندس رضا سالم — خبرة عملية في تطوير تطبيقات الويب والموبايل باستخدام React و Next.js و Node.js.",
    images: {
      url: "/og-image.png",
      alt: "السيرة الذاتية — رضا سالم",
    },
  },
};

export function getLocalizedSchemas(
  locale: Locale,
  route: PageRouteKey = "home",
) {
  const isAr = locale === "ar";
  const isDownload = route === "download";
  const homeUrl = isAr ? `${SITE_URL}/ar` : SITE_URL;
  const downloadUrl = isAr ? `${SITE_URL}/ar/download` : `${SITE_URL}/download`;
  const pageUrl = isDownload ? downloadUrl : homeUrl;
  const inLanguage = isAr ? "ar-EG" : "en-US";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Reda Salem",
    alternateName: ["رضا سالم", "Reda Salem", "Reda Salem Developer"],
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/reda.jpeg`,
      width: 800,
      height: 800,
      caption: isAr
        ? "رضا سالم - مهندس برمجيات Full-Stack"
        : "Reda Salem - Full-Stack Engineer",
    },
    jobTitle: isAr
      ? "مهندس برمجيات Full-Stack ومتخصص تحسين الأداء"
      : "Full-Stack Engineer & Performance Optimization Specialist",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Remote",
    },
    description: isAr
      ? "مطور برمجيات Full-Stack ومتخصص في تحسين سرعة وأداء تطبيقات الويب والموبايل باستخدام React وNext.js وReact Native وNode.js."
      : "Remote JavaScript Developer and Performance Optimization Engineer achieving 99/100 PageSpeed scores. Specializing in scalable web applications, React, Next.js, React Native, and Node.js.",
    knowsAbout: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Web Performance Optimization",
      "SEO Optimization",
      "Full-Stack Development",
    ],
    knowsLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
      {
        "@type": "Language",
        name: "Arabic",
        alternateName: "ar",
      },
    ],
    sameAs: [
      "https://github.com/redasalem",
      "https://www.linkedin.com/in/reda-salem-dev/",
      "https://redasalem.github.io/Reda_Salem_Portfolio/",
      "https://x.com/salem_reda81609",
      "https://dev.to/redasalem",
      "https://medium.com/@redasalem",
      "https://stackoverflow.com/users/29207867/reda-salem",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
      addressCountry: "EG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Professional",
      email: "redasalem287@gmail.com",
      availableLanguage: ["English", "Arabic"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Reda Salem - Full-Stack Engineer Portfolio",
    alternateName: [
      "رضا سالم — معرض الأعمال المهني",
      "Reda Salem Full-Stack Engineer",
    ],
    description:
      "Professional portfolio showcasing full-stack web development projects, React applications, and Node.js backend expertise.",
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: ["en-US", "ar-EG"],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: isDownload
      ? isAr
        ? "تحميل السيرة الذاتية | رضا سالم — مهندس برمجيات Full-Stack"
        : "Download Resume | Reda Salem - Full-Stack Engineer"
      : isAr
        ? "رضا سالم | مهندس برمجيات Full-Stack ومطور React و Next.js في مصر"
        : "Reda Salem | Performance Optimization Engineer & React Developer",
    description: isDownload
      ? isAr
        ? "حمّل السيرة الذاتية المعتمدة للمهندس رضا سالم — خبرة عملية في تطوير تطبيقات الويب والموبايل باستخدام React و Next.js و Node.js."
        : "Download Reda Salem's resume and certificates. Full-Stack Engineer specializing in React, Next.js, TypeScript, and Node.js."
      : isAr
        ? "تواصل مع المهندس رضا سالم، مطور برمجيات Full-Stack متخصص في بناء تطبيقات الويب والموبايل فائقة السرعة باستخدام React و Next.js و Node.js."
        : "Hire Reda Salem, a Remote Full-Stack JavaScript Developer & Performance Optimization Engineer building scalable web and mobile applications.",
    inLanguage,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#person`,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: isAr
      ? "رضا سالم — خدمات هندسة وتطوير البرمجيات"
      : "Reda Salem - Full-Stack Engineering Services",
    image: `${SITE_URL}/images/reda.jpeg`,
    description: isAr
      ? "خدمات تطوير تطبيقات الويب والموبايل المتكاملة باستخدام React وNext.js وNode.js وReact Native."
      : "Professional full-stack development services specializing in Backend (Node.js, Express, MongoDB), Frontend (React, Next.js), and Mobile App Development (React Native).",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    url: SITE_URL,
    telephone: "+201121696299",
    priceRange: "$$",
    areaServed: ["Worldwide", "United States", "United Kingdom", "Egypt"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: isDownload
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: isAr ? "الرئيسية" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isAr ? "السيرة الذاتية" : "Download Resume",
            item: downloadUrl,
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: isAr ? "الرئيسية" : "Home",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isAr ? "المهارات" : "Skills",
            item: `${homeUrl}#skills`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: isAr ? "المشاريع" : "Projects",
            item: `${homeUrl}#projects`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: isAr ? "الشهادات" : "Certificates",
            item: `${homeUrl}#certificates`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: isAr ? "تواصل معي" : "Contact",
            item: `${homeUrl}#contact`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: isAr ? "السيرة الذاتية" : "Resume",
            item: downloadUrl,
          },
        ],
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    inLanguage,
    name: isAr
      ? [
          "نبذة عني",
          "المهارات",
          "المشاريع",
          "الشهادات",
          "تواصل معي",
          "السيرة الذاتية",
        ]
      : ["About", "Skills", "Projects", "Certificates", "Contact", "Resume"],
    url: [
      `${homeUrl}#about`,
      `${homeUrl}#skills`,
      `${homeUrl}#projects`,
      `${homeUrl}#certificates`,
      `${homeUrl}#contact`,
      downloadUrl,
    ],
  };

  return {
    personSchema,
    websiteSchema,
    webPageSchema,
    professionalServiceSchema,
    breadcrumbSchema,
    navigationSchema,
  };
}
