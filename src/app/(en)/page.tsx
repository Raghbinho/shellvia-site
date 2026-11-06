import { Features } from "@/components/Features/Features";
import { Hero } from "@/components/Hero/Hero";
import { getDict } from "@/i18n";
import { FALLBACK_URL } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

const t = getDict("en");

export const metadata = pageMetadata("home", "en", t.pages.home, t.meta.description);

export default function Page() {
  return (
    <>
      <Hero lang="en" downloadHref={FALLBACK_URL} downloadOs="Windows" />
      <Features lang="en" />
    </>
  );
}
