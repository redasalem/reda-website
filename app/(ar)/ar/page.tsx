import type { Metadata } from "next";
import PortfolioLanding from "@/components/portfolio-landing";
import JsonLdScripts from "@/components/json-ld-scripts";
import { getPortfolioSnapshot } from "@/lib/firestore";
import { AR_HOME_METADATA } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = AR_HOME_METADATA;

export default async function ArabicHomePage() {
  const snapshot = await getPortfolioSnapshot();
  return (
    <>
      <JsonLdScripts locale="ar" route="home" />
      <PortfolioLanding locale="ar" snapshot={snapshot} />
    </>
  );
}
