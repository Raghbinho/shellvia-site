import { Privacy } from "@/components/Legal/Privacy";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("en");

export const metadata = pageMetadata("privacy", "en", t.pages.privacyTitle, t.privacy.intro);

export default function Page() {
  return <Privacy lang="en" />;
}
