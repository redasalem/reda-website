import type { Metadata } from "next";
import PortfolioLanding from "@/components/portfolio-landing";
import { getPortfolioSnapshot } from "@/lib/firestore";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "رضا سالم | مهندس برمجيات Full-Stack ومطور React و Next.js في مصر",
  description:
    "تواصل مع المهندس رضا سالم، مطور برمجيات Full-Stack متخصص في بناء تطبيقات الويب والموبايل فائقة السرعة باستخدام React و Next.js و Node.js و React Native مع تحقيق سرعة أداء قياسية 99/100 على Google PageSpeed.",
  alternates: {
    canonical: "https://reda-website.vercel.app/ar",
    languages: {
      en: "https://reda-website.vercel.app",
      ar: "https://reda-website.vercel.app/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    url: "https://reda-website.vercel.app/ar",
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
      },
    ],
  },
};

export default async function ArabicHomePage() {
  const snapshot = await getPortfolioSnapshot();
  return <PortfolioLanding locale="ar" snapshot={snapshot} />;
}
