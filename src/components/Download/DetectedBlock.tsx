"use client";

import { Download, Monitor } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import { RELEASE_NOTES_URL } from "@/lib/constants";
import { recommendedFormat } from "@/lib/platform";
import { linkFor, type ReleaseLinks } from "@/lib/releases";
import styles from "./Download.module.css";
import { usePlatform } from "./usePlatform";
import { useReleaseLinks } from "./useReleaseLinks";

export function DetectedBlock({ lang, links }: { lang: Lang; links: ReleaseLinks }) {
  const dict = getDict(lang);
  const t = dict.download;
  const live = useReleaseLinks(links);
  const { os, detected } = usePlatform();
  const osName = dict.home.osNames[os];
  return (
    <div className={styles.main}>
      <div>
        <div className={styles.det}>
          <Monitor size="1.2em" aria-hidden="true" />
          {detected ? t.yourSystem.replace("{os}", osName) : t.chooseSystem}
        </div>
        <h2 className={styles.mainTitle}>{t.productFor.replace("{os}", osName)}</h2>
        <div className={styles.meta}>
          {t.meta[os]}
          {live.version !== null && ` · ${t.version.replace("{version}", live.version)}`}
        </div>
        <div className={styles.alt}>
          {t.altPrompt} <a href="#others">{t.altLink}</a>
        </div>
      </div>
      <div className={styles.side}>
        <a className={`${styles.btn} ${styles.pri}`} href={linkFor(live, recommendedFormat(os))}>
          <Download size="1.1em" aria-hidden="true" />
          {t.button}
        </a>
        <a className={styles.note} href={RELEASE_NOTES_URL}>
          {t.releaseNotes} →
        </a>
      </div>
    </div>
  );
}
