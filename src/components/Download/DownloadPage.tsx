import { getDict, type Lang } from "@/i18n";
import type { ReleaseLinks } from "@/lib/releases";
import { AllSystems } from "./AllSystems";
import { DetectedBlock } from "./DetectedBlock";
import styles from "./Download.module.css";
import { FirstLaunch } from "./FirstLaunch";
import { Reassurance } from "./Reassurance";

export function DownloadPage({ lang, links }: { lang: Lang; links: ReleaseLinks }) {
  const t = getDict(lang).download;
  return (
    <div className={styles.page}>
      <div className={styles.aurora} aria-hidden="true" />
      <header className={styles.head}>
        <h1>
          {t.title} <em>{t.titleEm}</em>
        </h1>
        <p className={styles.lead}>{t.lead}</p>
      </header>
      <DetectedBlock lang={lang} links={links} />
      <AllSystems lang={lang} links={links} />
      <FirstLaunch lang={lang} />
      <Reassurance lang={lang} />
    </div>
  );
}
