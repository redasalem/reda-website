import type { Metadata } from "next";
import ResumeDownloadView from "@/components/resume-download-view";
import JsonLdScripts from "@/components/json-ld-scripts";
import { getSiteSettings } from "@/lib/firestore";
import { AR_DOWNLOAD_METADATA } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = AR_DOWNLOAD_METADATA;

export default async function ArabicDownloadPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <JsonLdScripts locale="ar" route="download" />
      <ResumeDownloadView locale="ar" initialSettings={settings} />
    </>
  );
}
