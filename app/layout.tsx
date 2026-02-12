import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
import Script from "next/script";
import "./globals.css";

// Font optimization with display swap for maximum performance
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  preload: true,
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: true,
});

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://reda-website.vercel.app",
  ),

  title: {
    default:
      "Reda Salem | Full-Stack Developer | React, Next.js, Node.js & MongoDB",
    template: "%s | Reda Salem - Full-Stack Developer",
  },

  description:
    "Creative and performance-driven Full-Stack Developer specializing in Backend (Node.js, Express, MongoDB) and Frontend (React, Next.js, TypeScript) development. Expert in building high-performance React Native mobile apps for Android and iOS. Focus on clean architecture, scalable APIs, and modern UI/UX. Available for freelance projects and remote positions.",

  keywords: [
    // Primary Keywords
    "React Native Developer Egypt",
    "Mobile App Developer",
    "Full Stack React Native",
    "Next.js Developer",
    "reda salem",
    "Reda Salem",
    "react developer",
    "full-stack",
    "fullstack",
    "web developer",
    "web development",
    "Full-Stack Developer Egypt",
    "React Developer",
    "Next.js Expert",
    "React Native Developer",
    "React Developer Egypt",
    "Full-Stack Developer Egypt",
    "Full-Stack Developer Cairo",
    "Senior React Developer",
    "Next.js Developer",
    "JavaScript Full-Stack Developer",
    "TypeScript Full-Stack Developer",
    "Remote Full-Stack Developer",
    "Freelance React Developer",
    "Web Developer for hire",
    "Full-Stack Engineer Remote",
    "Backend Developer",
    "Frontend Developer",
    "Back-end Developer Egypt",
    "Front-end Developer Egypt",
    "React Native App Developer",
    "Mobile Application Developer",
    "مطور باك اند",
    "مطور فرونت اند",
    "مطور تطبيقات موبايل",
    "تطبيقات رياكت نيتف",
    "تطوير مواقع فول ستاك",
    "تطبيقات عالية الأداء",

    // Technical Skills
    "TypeScript Developer",
    "JavaScript Expert",
    "Tailwind CSS Specialist",
    "UI/UX Developer",
    "Responsive Web Design",

    // Services
    "Freelance Web Developer",
    "Remote Full-Stack Developer",
    "Website Development Services",
    "Mobile App Development",
    "Web Application Developer",
    "Real Estate Website Developer",
    "Medical Website Developer",
    "Educational Platform Developer",

    // Location-based
    "Web Developer Egypt",
    "Full-Stack Developer Cairo",
    "React Developer Middle East",
    "Web Developer Egypt",
    "Full-Stack Developer Egypt",
    "React Developer Egypt",
    "Next.js Developer Egypt",
    "Web Developer Middle East",
    "React Developer Middle East",
    "Full-Stack Developer Cairo",
    "Arab React Developer",

    // Project Types
    "E-commerce Developer",
    "Dashboard Development",
    "Landing Page Developer",
    "SaaS Application Developer",
    "Website Development Services",
    "Custom Web Application Development",
    "React Web App Developer",
    "Mobile App UI Developer",
    "Landing Page Developer",
    "E-commerce Website Developer",
    "Dashboard UI Developer",
    "SaaS Full-Stack Developer",
    "Business Website Developer",
    "Portfolio Website Developer",

    // Technologies
    "Next.js 15",
    "React 19",
    "Shadcn UI",
    "Framer Motion",
    "Redux Toolkit",
    "React Query",
    "Prisma",
    "MongoDB",
    "Postman",
    "DaisyUI",
    "Git",
    "Express.js",
    "React 19 Developer",
    "Next.js 15 Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Tailwind CSS Developer",
    "UI/UX Full-Stack Developer",
    "Responsive Web Design Expert",
    "Redux Toolkit Developer",
    "React Query Developer",
    "Framer Motion Developer",
    "Shadcn UI Expert",
    "best full-stack developer",
    "hire react developer",
    "hire full-stack engineer",
    "top web developer portfolio",
    "professional full-stack services",
    "modern web development",
    "performance optimized websites",
    "SEO friendly website developer",
    "Node.js Backend Specialist",
    "Express.js API Developer",
    "React Frontend Expert",
    "Next.js Fullstack Developer",
    "React Native Mobile Apps",
    "Cross-platform App Development",
    "Android & iOS Apps Developer",
    "Scalable Backend Architecture",
    "High-Performance Frontend",
  ],

  authors: [
    {
      name: "Reda Salem",
      url: "https://reda-website.vercel.app",
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

  alternates: {
    canonical: "https://reda-website.vercel.app",
    types: {
      "application/rss+xml": "https://reda-website.vercel.app/rss.xml",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    url: "https://reda-website.vercel.app",
    siteName: "Reda Salem - Professional Portfolio",
    title: "Reda Salem | Full-Stack Developer Portfolio",
    description:
      "Creative Full-Stack Developer building modern, scalable web & mobile applications with React, Next.js, React Native, Node.js, and MongoDB.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reda Salem - Full-Stack Developer Portfolio showcasing modern web and mobile applications",
        type: "image/png",
      },
      {
        url: "/reda.png",
        width: 800,
        height: 800,
        alt: "Reda Salem - Full-Stack Developer",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@redasalem",
    creator: "@redasalem",
    title: "Reda Salem | Full-Stack Developer",
    description:
      "Building modern, scalable web & mobile apps with React, Next.js, Node.js & MongoDB",
    images: {
      url: "https://pbs.twimg.com/profile_images/1976036993797623808/axU7IrRA_400x400.jpg",
      alt: "Reda Salem Portfolio",
    },
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
    google: "WdJppG3mAkZoon8ptYrXM7OGEllTG3SK7u3T__GSNtk",
    yandex: "YOUR_YANDEX_CODE",
    other: {
      "msvalidate.01": "YOUR_BING_CODE",
    },
  },

  appleWebApp: {
    capable: true,
    title: "Reda Salem",
    statusBarStyle: "black-translucent",
  },

  applicationName: "Reda Salem Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced Person Schema with maximum SEO juice
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "WebSite"],
    "@id": "https://reda-website.vercel.app/#person",
    name: "Reda Salem",
    alternateName: "Reda Salem Developer",
    url: "https://reda-website.vercel.app",
    image: {
      "@type": "ImageObject",
      url: "https://reda-website.vercel.app/images/reda.png",
      width: 800,
      height: 800,
      caption: "Reda Salem - Full-Stack Developer",
    },
    jobTitle: "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance / Remote",
    },
    description:
      "Creative and performance-driven Full-Stack Developer specializing in React, Next.js, React Native, TypeScript, Node.js, Express, MongoDB. Top-rated Mobile App Developer and React Native Expert in Egypt.",
    knowsAbout: [
      {
        "@type": "Thing",
        name: "React.js",
        description: "Expert level proficiency",
      },
      {
        "@type": "Thing",
        name: "Next.js",
        description: "Advanced framework knowledge",
      },
      {
        "@type": "Thing",
        name: "React Native",
        description: "Mobile app development",
      },
      {
        "@type": "Thing",
        name: "TypeScript",
        description: "Type-safe development",
      },
      {
        "@type": "Thing",
        name: "Tailwind CSS",
        description: "Modern styling",
      },
      "SEO Optimization",
      "UI/UX Design",
      "Responsive Design",
      "Web Accessibility",
      "Backend Development",
      "Frontend Development",
      "API Development",
      "Database Design",
      "Node.js Backend",
      "Express.js API",
      "React Frontend",
      "Next.js Full-Stack",
      "React Native Apps",
      "Mobile App Development",
      "Android & iOS Apps",
      "Clean Architecture",
      "Software Engineering",
      "Scalable Solutions",
      "react",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "react-native",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "css",
      "CSS",
      "Web Performance",
      "Wordpress",
      "wordpress",
      "Git & GitHub",
      "Postman",
      "DaisyUI",
      "Angular",
      "RESTful APIs",
      "GraphQL",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
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
      "https://www.facebook.com/reda.salem.3701?locale=ar_AR",
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
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Egypt",
      },
      estimatedSalary: {
        "@type": "MonetaryAmountDistribution",
        name: "Competitive rates",
        currency: "USD",
      },
    },
  };

  // Site Navigation Schema
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["About", "Skills", "Projects", "Certificates", "Contact", "Blog"],
    url: [
      "https://reda-website.vercel.app/#about",
      "https://reda-website.vercel.app/#skills",
      "https://reda-website.vercel.app/#projects",
      "https://reda-website.vercel.app/#certificates",
      "https://reda-website.vercel.app/#contact",
      "https://reda-website.vercel.app/blog",
    ],
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://reda-website.vercel.app/#website",
    url: "https://reda-website.vercel.app",
    name: "Reda Salem - Full-Stack Developer Portfolio",
    alternateName: "Reda Salem Full-Stack Developer",
    description:
      "Professional portfolio showcasing full-stack web development projects, React applications, and Node.js backend expertise.",
    keywords: [
      "Reda Salem",
      "React Developer Egypt",
      "Frontend Developer Cairo",
      "Next.js Developer",
      "Web Developer Egypt",
      "Freelance Full-Stack Developer",
      "Node.js Backend Developer",
      "Express.js API Specialist",
      "React Native Mobile Architect",
      "Frontend Engineering Expert",
      "Cross-platform App Development",
      "Scalable Backend Systems",
    ],
    publisher: {
      "@id": "https://reda-website.vercel.app/#person",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://reda-website.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Reda Salem - Full-Stack Development Services",
    image: "https://reda-website.vercel.app/images/reda.png",
    description:
      "Professional full-stack development services specializing in Backend (Node.js, Express, MongoDB), Frontend (React, Next.js), and Mobile App Development (React Native). High-performance, scalable, and SEO-optimized solutions for web and mobile.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.0444",
      longitude: "31.2357",
    },
    url: "https://reda-website.vercel.app",
    telephone: "+201121696299",
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Egypt",
      },
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      "Worldwide",
    ],
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://reda-website.vercel.app/#home",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://reda-website.vercel.app/#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Skills",
        item: "https://reda-website.vercel.app/#skills",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Projects",
        item: "https://reda-website.vercel.app/#projects",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: "https://reda-website.vercel.app/#contact",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/images/reda.png" />

        {/* Icons */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Google Verification */}
        <meta
          name="google-site-verification"
          content="WdJppG3mAkZoon8ptYrXM7OGEllTG3SK7u3T__GSNtk"
        />
        <meta
          name="google-site-verification"
          content="e2jaxxJkIU5x1v3Bl0_iodK_aWiOznLFl1mUANYd_Qc"
        />

        {/* SEO Core */}
        <meta name="author" content="Reda Salem" />
        <meta name="copyright" content="Reda Salem" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* OpenGraph (Facebook + LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Reda Salem | Full-Stack Developer Portfolio"
        />
        <meta
          property="og:description"
          content="React & Next.js Full-Stack Developer building high-performance web applications."
        />
        <meta
          property="og:image"
          content="https://reda-website.vercel.app/images/reda.png"
        />
        <meta property="og:url" content="https://reda-website.vercel.app" />
        <meta property="og:site_name" content="Reda Salem Portfolio" />

        {/* Twitter SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reda Salem | Full-Stack Developer Portfolio"
        />
        <meta
          name="twitter:description"
          content="React & Next.js Full-Stack Developer building modern web experiences."
        />
        <meta
          name="twitter:image"
          content="https://reda-website.vercel.app/images/reda.png"
        />

        {/* Keywords (مهمة جدًا للـ semantic SEO) */}
        <meta
          name="keywords"
          content="
    Reda Salem,
    React Developer Egypt,
    Full-Stack Developer Cairo,
    Next.js Developer,
    TypeScript Developer,
    JavaScript Developer,
    Freelance Full-Stack Developer,
    Web Developer Egypt,
    React 19 Developer,
    Next.js 15 Developer,
    Shadcn UI Developer,
    Tailwind CSS Developer
  "
        />

        {/* Geo */}
        <meta name="geo.region" content="EG-C" />
        <meta name="geo.placename" content="Cairo" />
        <meta name="geo.position" content="30.0444;31.2357" />
        <meta name="ICBM" content="30.0444, 31.2357" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://reda-website.vercel.app" />
      </head>

      <body
        className={`font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
          >
            Skip to main content
          </a>

          <main id="main-content">{children}</main>

          {/* JSON-LD Schemas - Maximum SEO Power */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            key="person-schema"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            key="website-schema"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(professionalServiceSchema),
            }}
            key="service-schema"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbSchema),
            }}
            key="breadcrumb-schema"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(navigationSchema),
            }}
            key="navigation-schema"
          />
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
  `}
        </Script>
      </body>
    </html>
  );
}
