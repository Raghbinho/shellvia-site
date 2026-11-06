import { LegalNotice } from "@/components/Legal/LegalNotice";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("fr");

export const metadata = pageMetadata("legal", "fr", t.pages.legalTitle, t.meta.description);

export default function Page() {
  return <LegalNotice lang="fr" />;
}
