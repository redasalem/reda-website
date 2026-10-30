import type { Metadata } from "next";
import ResumeDownloadView from "@/components/resume-download-view";
import { getSiteSettings } from "@/lib/firestore";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "تحميل السيرة الذاتية | رضا سالم — مهندس برمجيات Full-Stack",
  description:
    "حمّل السيرة الذاتية المعتمدة للمهندس رضا سالم — خبرة عملية في تطوير تطبيقات الويب والموبايل باستخدام React و Next.js و Node.js.",
  alternates: {
    canonical: "https://reda-website.vercel.app/ar/download",
    languages: {
      en: "https://reda-website.vercel.app/download",
      ar: "https://reda-website.vercel.app/ar/download",
    },
  },
};

export default async function ArabicDownloadPage() {
  const settings = await getSiteSettings();
  return <ResumeDownloadView locale="ar" initialSettings={settings} />;
}
