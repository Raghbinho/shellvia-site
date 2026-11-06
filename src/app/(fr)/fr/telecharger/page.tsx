import { PagePlaceholder } from "@/components/Shell/PagePlaceholder";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("fr");

export const metadata = pageMetadata("download", "fr", t.pages.download, t.meta.description);

export default function Page() {
  return <PagePlaceholder page="download" lang="fr" />;
}
