import { DownloadButton } from "@/components/Download/DownloadButton";
import { Features } from "@/components/Features/Features";
import { Hero } from "@/components/Hero/Hero";
import { Closing } from "@/components/Home/Closing";
import { DownloadSection } from "@/components/Home/DownloadSection";
import { Faq } from "@/components/Home/Faq";
import { Marquee } from "@/components/Home/Marquee";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { loadBuildReleaseLinks } from "@/lib/releases";

const t = getDict("fr");

export const metadata = pageMetadata("home", "fr", t.home.title, t.meta.description);

export default async function Page() {
  const links = await loadBuildReleaseLinks();
  return (
    <>
      <Hero lang="fr" cta={<DownloadButton lang="fr" links={links} variant="hero" />} />
      <Marquee />
      <Features lang="fr" />
      <DownloadSection lang="fr" links={links} />
      <Faq lang="fr" />
      <Closing lang="fr" links={links} />
    </>
  );
}
