import PortfolioLanding from "@/components/portfolio-landing";
import { getPortfolioSnapshot } from "@/lib/firestore";

export const revalidate = 60;

export default async function Home() {
  const snapshot = await getPortfolioSnapshot();
  return <PortfolioLanding locale="en" snapshot={snapshot} />;
}
