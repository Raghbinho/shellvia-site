import { DownloadPage } from "@/components/Download/DownloadPage";
import { getDict } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import { loadBuildReleaseLinks } from "@/lib/releases";

const t = getDict("fr");

export const metadata = pageMetadata("download", "fr", t.download.metaTitle, t.meta.description);

export default async function Page() {
  return <DownloadPage lang="fr" links={await loadBuildReleaseLinks()} />;
}
