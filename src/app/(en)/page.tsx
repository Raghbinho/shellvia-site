import { PagePlaceholder } from "@/components/Shell/PagePlaceholder";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("en");

export const metadata = pageMetadata("home", "en", t.pages.home, t.meta.description);

export default function Page() {
  return <PagePlaceholder page="home" lang="en" />;
}
