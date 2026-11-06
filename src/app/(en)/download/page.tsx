import { PagePlaceholder } from "@/components/Shell/PagePlaceholder";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("en");

export const metadata = pageMetadata("download", "en", t.pages.download, t.meta.description);

export default function Page() {
  return <PagePlaceholder page="download" lang="en" />;
}
