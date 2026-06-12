import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Resume | Reda Salem",
  description:
    "Download Reda Salem's resume and certificates. Full-Stack Engineer specializing in React, Next.js, and Node.js.",
  openGraph: {
    title: "Download Resume | Reda Salem",
    description: "Download Reda Salem's resume and certificates.",
    url: "https://reda-website.vercel.app/download",
    siteName: "Reda Salem Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
