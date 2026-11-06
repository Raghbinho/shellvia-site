import { PagePlaceholder } from "@/components/Shell/PagePlaceholder";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("en");

export const metadata = pageMetadata("privacy", "en", t.pages.privacy, t.meta.description);

export default function Page() {
  return <PagePlaceholder page="privacy" lang="en" />;
}
