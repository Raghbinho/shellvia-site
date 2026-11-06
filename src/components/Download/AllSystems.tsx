"use client";

import { Download } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import type { Os } from "@/lib/platform";
import { isShown, linkFor, type Format, type ReleaseLinks } from "@/lib/releases";
import styles from "./Download.module.css";
import { usePlatform } from "./usePlatform";
import { useReleaseLinks } from "./useReleaseLinks";

interface OsRow {
  format: Format;
  extension: string;
  recommended: boolean;
}

const SYSTEMS: ReadonlyArray<{ os: Os; rows: OsRow[] }> = [
  {
    os: "windows",
    rows: [
      { format: "exe", extension: ".exe", recommended: true },
      { format: "msi", extension: ".msi", recommended: false },
    ],
  },
  { os: "macos", rows: [{ format: "dmg", extension: ".dmg", recommended: true }] },
  {
    os: "linux",
    rows: [
      { format: "appimage", extension: ".AppImage", recommended: true },
      { format: "deb", extension: ".deb", recommended: false },
      { format: "rpm", extension: ".rpm", recommended: false },
    ],
  },
];

export function AllSystems({ lang, links }: { lang: Lang; links: ReleaseLinks }) {
  const dict = getDict(lang);
  const t = dict.download;
  const live = useReleaseLinks(links);
  const platform = usePlatform();
  return (
    <section aria-labelledby="others-title">
      <h2 id="others-title" className={styles.sh}>
        {t.allTitle}
      </h2>
      <div id="others" className={styles.grid}>
        {SYSTEMS.map(({ os, rows }) => (
          <article key={os} className={styles.os}>
            <div className={styles.osh}>
              <h3 className={styles.osn}>{dict.home.osNames[os]}</h3>
              {platform.detected && platform.os === os && (
                <span className={styles.tag}>{t.detectedTag}</span>
              )}
            </div>
            <span className={styles.req}>{t.requirements[os]}</span>
            <div className={styles.files}>
              {rows
                .filter((row) => isShown(live, row.format))
                .map((row) => {
                  const label = t.downloadFile.replace("{format}", row.extension);
                  return (
                    <div key={row.format} className={styles.file}>
                      <div>
                        <b>{row.extension}</b>
                        <span>{t.formatNotes[row.format]}</span>
                      </div>
                      <a
                        className={`${styles.dlb} ${row.recommended ? styles.rec : ""}`}
                        href={linkFor(live, row.format)}
                        title={label}
                        aria-label={label}
                      >
                        <Download size="1.1em" aria-hidden="true" />
                      </a>
                    </div>
                  );
                })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
