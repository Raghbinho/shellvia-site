"use client";

import { getDict, type Lang } from "@/i18n";
import { DownloadButton } from "@/components/Download/DownloadButton";
import { usePlatform } from "@/components/Download/usePlatform";
import { useReleaseLinks } from "@/components/Download/useReleaseLinks";
import { isShown, type Format, type ReleaseLinks } from "@/lib/releases";
import type { Os } from "@/lib/platform";
import styles from "./Home.module.css";

const CARDS: ReadonlyArray<{ os: Os; formats: Format[] }> = [
  { os: "windows", formats: ["exe", "msi"] },
  { os: "macos", formats: ["dmg"] },
  { os: "linux", formats: ["appimage", "deb", "rpm"] },
];

const EXTENSIONS: Record<Format, string> = {
  exe: ".exe",
  msi: ".msi",
  dmg: ".dmg",
  appimage: ".AppImage",
  deb: ".deb",
  rpm: ".rpm",
};

export function DownloadSection({ lang, links }: { lang: Lang; links: ReleaseLinks }) {
  const home = getDict(lang).home;
  const t = home.download;
  const live = useReleaseLinks(links);
  const platform = usePlatform();
  const requirements: Record<Os, string> = {
    windows: t.windowsReq,
    macos: t.macosReq,
    linux: t.linuxReq,
  };
  return (
    <section id="download" className={styles.sec} aria-labelledby="download-title">
      <h2 id="download-title" className={styles.title}>
        {t.title} <em>{t.titleEm}</em>
      </h2>
      <p className={styles.sub}>{t.sub}</p>
      <div className={styles.dl}>
        {CARDS.map(({ os, formats }) => {
          const shown = formats.filter((f) => isShown(live, f)).map((f) => EXTENSIONS[f]);
          const current = platform.detected && platform.os === os;
          return (
            <div key={os} className={`${styles.os} ${current ? styles.oscur : ""}`}>
              <span className={styles.osn}>{home.osNames[os]}</span>
              <span className={styles.osf}>{[...shown, requirements[os]].join(" · ")}</span>
              <DownloadButton lang={lang} links={links} variant="card" os={os} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
