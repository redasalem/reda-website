import type React from "react";
import type { Metadata, Viewport } from "next";
import RootShell from "@/components/root-shell";
import { BASE_METADATA, SITE_VIEWPORT } from "@/lib/seo";

export const viewport: Viewport = SITE_VIEWPORT;

export const metadata: Metadata = BASE_METADATA;

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootShell locale="en" dir="ltr">
      {children}
    </RootShell>
  );
}
