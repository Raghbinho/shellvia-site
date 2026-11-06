import type { ReactNode } from "react";
import { SiteDocument } from "@/components/Shell/SiteDocument";

export default function FrLayout({ children }: { children: ReactNode }) {
  return <SiteDocument lang="fr">{children}</SiteDocument>;
}
