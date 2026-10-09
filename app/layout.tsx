import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: site.title, template: "%s | Reda Salem" }, description: site.description,
  authors: [{ name: site.name, url: site.url }], creator: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: site.title, url: "/", title: site.title, description: site.description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true }, icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f5f3ed" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}

