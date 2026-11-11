import ResumeDownloadView from "@/components/resume-download-view";
import { getSiteSettings } from "@/lib/firestore";

export const revalidate = 60;

export default async function DownloadPage() {
  const settings = await getSiteSettings();
  return <ResumeDownloadView locale="en" initialSettings={settings} />;
}
