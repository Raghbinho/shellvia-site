import { getDict, type Lang } from "@/i18n";
import { DownloadButton } from "@/components/Download/DownloadButton";
import type { ReleaseLinks } from "@/lib/releases";
import styles from "./Home.module.css";

export function Closing({ lang, links }: { lang: Lang; links: ReleaseLinks }) {
  const t = getDict(lang).home.closing;
  return (
    <div className={styles.fin}>
      <h2>{t.title}</h2>
      <DownloadButton lang={lang} links={links} variant="hero" />
    </div>
  );
}
