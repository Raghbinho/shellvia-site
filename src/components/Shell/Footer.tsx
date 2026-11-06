import { RELEASE_NOTES_URL } from "@/lib/constants";
import { getDict, pathFor, type Lang } from "@/i18n";
import styles from "./Shell.module.css";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang).footer;
  return (
    <footer className={styles.footer}>
      <span>{t.copyright}</span>
      <span className={styles.footR}>
        <a href={RELEASE_NOTES_URL}>{t.releaseNotes}</a>
        <a href={pathFor("privacy", lang)}>{t.privacy}</a>
        <a href={pathFor("legal", lang)}>{t.legal}</a>
        <a href="#">{t.contact}</a>
      </span>
    </footer>
  );
}
