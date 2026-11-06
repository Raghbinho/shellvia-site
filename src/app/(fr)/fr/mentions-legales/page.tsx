import { PagePlaceholder } from "@/components/Shell/PagePlaceholder";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("fr");

export const metadata = pageMetadata("legal", "fr", t.pages.legal, t.meta.description);

export default function Page() {
  return <PagePlaceholder page="legal" lang="fr" />;
}
