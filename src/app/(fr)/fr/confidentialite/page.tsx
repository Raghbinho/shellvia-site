import { Privacy } from "@/components/Legal/Privacy";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("fr");

export const metadata = pageMetadata("privacy", "fr", t.pages.privacyTitle, t.privacy.intro);

export default function Page() {
  return <Privacy lang="fr" />;
}
