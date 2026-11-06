import { Hero } from "@/components/Hero/Hero";
import { getDict } from "@/i18n";
import { FALLBACK_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("fr");

export const metadata = pageMetadata("home", "fr", t.pages.home, t.meta.description);

export default function Page() {
  return <Hero lang="fr" downloadHref={FALLBACK_URL} downloadOs="Windows" />;
}
