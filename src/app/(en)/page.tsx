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

const t = getDict("en");

export const metadata = pageMetadata("home", "en", t.home.title, t.meta.description);

export default async function Page() {
  const links = await loadBuildReleaseLinks();
  return (
    <>
      <Hero lang="en" cta={<DownloadButton lang="en" links={links} variant="hero" />} />
      <Marquee />
      <Features lang="en" />
      <DownloadSection lang="en" links={links} />
      <Faq lang="en" />
      <Closing lang="en" links={links} />
    </>
  );
}
