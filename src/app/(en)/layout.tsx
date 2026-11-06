import type { ReactNode } from "react";
import { SiteDocument } from "@/components/Shell/SiteDocument";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
