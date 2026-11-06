import { DownloadPage } from "@/components/Download/DownloadPage";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { loadBuildReleaseLinks } from "@/lib/releases";

const t = getDict("en");

export const metadata = pageMetadata("download", "en", t.download.metaTitle, t.meta.description);

export default async function Page() {
  return <DownloadPage lang="en" links={await loadBuildReleaseLinks()} />;
}
