import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/lib/theme-provider"
import Script from "next/script"
import "./globals.css"

// Font optimization with display swap for maximum performance
const geist = Geist({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  preload: true,
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: true,
})

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
}

export const metadata: Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://reda-website.vercel.app"),
  
  title: { 
    default: "Reda Salem | Expert Front-End Developer | React, Next.js & React Native Specialist", 
    template: "%s | Reda Salem - Front-End Developer" 
  },
  
  description: "Award-winning Front-End Developer with of experience building blazing-fast, pixel-perfect web and mobile applications. Specializing in React, Next.js, React Native, TypeScript, Tailwind CSS. Creating accessible, scalable, and SEO-optimized digital experiences. Available for freelance projects, remote positions, and consulting.",
  
  keywords: [
    // Primary Keywords
    "reda salem",
     "Reda Salem",
    "react developer", 
    "font-end",
    "frontend",
    "web developer",
    "web development",
    "Front-End Developer Egypt",
    "React Developer",
    "Next.js Expert",
    "React Native Developer",
    "React Developer Egypt",
    "Frontend Developer Egypt",
    "Front End Developer Cairo",
     "Senior React Developer",
     "Next.js Developer",
    "JavaScript Frontend Developer",
    "TypeScript Frontend Developer",
    "Remote Frontend Developer",
    "Freelance React Developer",
     "Web Developer for hire",
      "Frontend Engineer Remote",
    
    // Technical Skills
    "TypeScript Developer",
    "JavaScript Expert",
    "Tailwind CSS Specialist",
    "UI/UX Developer",
    "Responsive Web Design",
    
    // Services
    "Freelance Web Developer",
    "Remote Frontend Developer",
    "Website Development Services",
    "Mobile App Development",
    "Web Application Developer",
    "Real Estate Website Developer",
"Medical Website Developer",
"Educational Platform Developer",
    
    // Location-based
    "Web Developer Egypt",
    "Frontend Developer Cairo",
    "React Developer Middle East",
    "Web Developer Egypt",
   "Front End Developer Egypt",
   "React Developer Egypt",
   "Next.js Developer Egypt",
  "Web Developer Middle East",
  "React Developer Middle East",
  "Frontend Developer Cairo",
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
   "SaaS Frontend Developer",
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
    "React 19 Developer",
"Next.js 15 Developer",
"TypeScript Developer",
"JavaScript Developer",
"Tailwind CSS Developer",
"UI/UX Frontend Developer",
"Responsive Web Design Expert",
"Redux Toolkit Developer",
"React Query Developer",
"Framer Motion Developer",
"Shadcn UI Expert",
"best frontend developer",
"hire react developer",
"hire frontend engineer",
"top web developer portfolio",
"professional frontend services",
"modern web development",
"performance optimized websites",
"SEO friendly website developer",
  ],
  
  authors: [
    { 
      name: "Reda Salem", 
      url: "https://reda-website.vercel.app" 
    }
  ],
  
  creator: "Reda Salem",
  publisher: "Reda Salem",
  
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
    title: "Reda Salem | Expert Front-End Developer | React & Next.js Specialist",
    description: "Award-winning Front-End Developer creating blazing-fast, pixel-perfect web and mobile applications with React, Next.js, and React Native.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Reda Salem - Front-End Developer Portfolio showcasing modern web applications",
        type: "image/png",
      },
      {
        url: "/reda.png",
        width: 800,
        height: 800,
        alt: "Reda Salem - Professional Front-End Developer",
        type: "image/png",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: "@redasalem",
    creator: "@redasalem",
    title: "Reda Salem | Front-End Developer",
    description: "Building blazing-fast web experiences with React, Next.js & TypeScript",
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
  referrer: "origin-when-cross-origin",
  category: "technology",
  classification: "Portfolio Website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Enhanced Person Schema with maximum SEO juice
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "WebSite"],
    "@id": "https://reda-website.vercel.app/#person",
    "name": "Reda Salem",
    "alternateName": "Reda Salem Developer",
    "url": "https://reda-website.vercel.app",
    "image": {
      "@type": "ImageObject",
      "url": "https://reda-website.vercel.app/reda.png",
      "width": 800,
      "height": 800,
      "caption": "Reda Salem - Front-End Developer"
    },
    "jobTitle": "Front-End Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance / Remote"
    },
    "description": "Expert Front-End Developer specializing in React, Next.js, React Native, TypeScript & Tailwind CSS. Building fast, scalable, and accessible web & mobile applications.",
    "knowsAbout": [
      {
        "@type": "Thing",
        "name": "React.js",
        "description": "Expert level proficiency"
      },
      {
        "@type": "Thing",
        "name": "Next.js",
        "description": "Advanced framework knowledge"
      },
      {
        "@type": "Thing",
        "name": "React Native",
        "description": "Mobile app development"
      },
      {
        "@type": "Thing",
        "name": "TypeScript",
        "description": "Type-safe development"
      },
      {
        "@type": "Thing",
        "name": "Tailwind CSS",
        "description": "Modern styling"
      },
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
      "SEO Optimization",
      "UI/UX Design",
      "Responsive Design",
      "Web Accessibility",
      "Git & GitHub",
      "RESTful APIs",
      "GraphQL",
      "Node.js"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "Arabic",
        "alternateName": "ar"
      }
    ],
    "sameAs": [
  "https://github.com/redasalem",
  "https://www.linkedin.com/in/reda-salem-dev/",
  "https://redasalem.github.io/Reda_Salem_Portfolio/",
  "https://www.facebook.com/reda.salem.3701?locale=ar_AR",
  "https://x.com/salem_reda81609",
  "https://dev.to/redasalem",
  "https://medium.com/@redasalem",
  "https://stackoverflow.com/users/29207867/reda-salem",
 
],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cairo",
      "addressRegion": "Cairo Governorate",
      "addressCountry": "EG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Professional",
      "email": "redasalem287@gmail.com",
      "availableLanguage": ["English", "Arabic"]
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Front-End Developer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Egypt"
      },
      "estimatedSalary": {
        "@type": "MonetaryAmountDistribution",
        "name": "Competitive rates",
        "currency": "USD"
      }
    }
  }

  // Website Schema
  const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://reda-website.vercel.app/#website",
  "url": "https://reda-website.vercel.app",
  "name": "Reda Salem - Front-End Developer Portfolio",
  "alternateName": "Reda Salem React Developer",
  "description": "Professional portfolio showcasing web development projects, React applications, and frontend expertise.",
  "keywords": [
    "Reda Salem",
    "React Developer Egypt",
    "Frontend Developer Cairo",
    "Next.js Developer",
    "Web Developer Egypt",
    "Freelance Frontend Developer",
    "React 19 Developer",
    "Next.js 15 Developer"
  ],
  "publisher": {
    "@id": "https://reda-website.vercel.app/#person"
  },
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://reda-website.vercel.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};


  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Reda Salem - Front-End Development Services",
    "image": "https://reda-website.vercel.app/images/reda.png",
    "description": "Professional front-end development services including React, Next.js, and React Native applications",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.0444",
      "longitude": "31.2357"
    },
    "url": "https://reda-website.vercel.app",
    "telephone": "+201121696299",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Egypt"
      },
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "Worldwide"
    ]
  }

  // BreadcrumbList Schema
 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://reda-website.vercel.app/#home"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://reda-website.vercel.app/#about"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Skills",
      "item": "https://reda-website.vercel.app/#skills"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Projects",
      "item": "https://reda-website.vercel.app/#projects"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Contact",
      "item": "https://reda-website.vercel.app/#contact"
    }
  ]
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
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://www.google-analytics.com" />

  {/* Preload critical assets */}
  <link rel="preload" as="image" href="/reda.png" />

  {/* Icons */}
  <meta name="msapplication-TileColor" content="#000000" />
  <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
  <meta name="msapplication-config" content="/browserconfig.xml" />

  {/* Google Verification */}
  <meta name="google-site-verification" content="WdJppG3mAkZoon8ptYrXM7OGEllTG3SK7u3T__GSNtk" />
  <meta name="google-site-verification" content="e2jaxxJkIU5x1v3Bl0_iodK_aWiOznLFl1mUANYd_Qc" />

  {/* SEO Core */}
  <meta name="author" content="Reda Salem" />
  <meta name="copyright" content="Reda Salem" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

  {/* OpenGraph (Facebook + LinkedIn) */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Reda Salem | Front-End Developer Portfolio" />
  <meta property="og:description" content="React & Next.js Front-End Developer building high-performance web applications." />
  <meta property="og:image" content="https://reda-website.vercel.app/reda.png" />
  <meta property="og:url" content="https://reda-website.vercel.app" />
  <meta property="og:site_name" content="Reda Salem Portfolio" />

  {/* Twitter SEO */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Reda Salem | Front-End Developer Portfolio" />
  <meta name="twitter:description" content="React & Next.js Front-End Developer building modern web experiences." />
  <meta name="twitter:image" content="https://reda-website.vercel.app/reda.png" />

  {/* Keywords (مهمة جدًا للـ semantic SEO) */}
  <meta name="keywords" content="
    Reda Salem,
    React Developer Egypt,
    Front-End Developer Cairo,
    Next.js Developer,
    TypeScript Developer,
    JavaScript Developer,
    Freelance Frontend Developer,
    Web Developer Egypt,
    React 19 Developer,
    Next.js 15 Developer,
    Shadcn UI Developer,
    Tailwind CSS Developer
  " />

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
          
          <main id="main-content">
            {children}
          </main>
          
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            key="service-schema"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            key="breadcrumb-schema"
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
  )
}