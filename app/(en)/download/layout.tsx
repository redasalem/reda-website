import type React from "react";
import type { Metadata } from "next";
import JsonLdScripts from "@/components/json-ld-scripts";
import { EN_DOWNLOAD_METADATA } from "@/lib/seo";

export const metadata: Metadata = EN_DOWNLOAD_METADATA;

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdScripts locale="en" route="download" />
      {children}
    </>
  );
}
