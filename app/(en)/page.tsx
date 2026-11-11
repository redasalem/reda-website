import type { Metadata } from "next";
import PortfolioLanding from "@/components/portfolio-landing";
import JsonLdScripts from "@/components/json-ld-scripts";
import { getPortfolioSnapshot } from "@/lib/firestore";
import { EN_HOME_METADATA } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = EN_HOME_METADATA;

export default async function Home() {
  const snapshot = await getPortfolioSnapshot();
  return (
    <>
      <JsonLdScripts locale="en" route="home" />
      <PortfolioLanding locale="en" snapshot={snapshot} />
    </>
  );
}
