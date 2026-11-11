import type React from "react";
import type { Metadata, Viewport } from "next";
import RootShell from "@/components/root-shell";
import { AR_BASE_METADATA, SITE_VIEWPORT } from "@/lib/seo";

export const viewport: Viewport = SITE_VIEWPORT;

export const metadata: Metadata = AR_BASE_METADATA;

export default function ArabicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootShell locale="ar" dir="rtl">
      {children}
    </RootShell>
  );
}
