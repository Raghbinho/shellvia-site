import { LegalNotice } from "@/components/Legal/LegalNotice";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("en");

export const metadata = pageMetadata("legal", "en", t.pages.legalTitle, t.meta.description);

export default function Page() {
  return <LegalNotice lang="en" />;
}
