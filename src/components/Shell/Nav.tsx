import Image from "next/image";
import { getDict, pathFor, type Lang, type PageKey } from "@/i18n";
import styles from "./Shell.module.css";

export function Nav({ lang, page }: { lang: Lang; page: PageKey }) {
  const t = getDict(lang);
  const home = pathFor("home", lang);
  const download = pathFor("download", lang);
  return (
    <nav className={styles.nav} aria-label={t.nav.label}>
      <a className={styles.brand} href={home}>
        <Image src="/assets/shellvia-icon.svg" alt="" width={30} height={30} unoptimized />
        {t.meta.siteTitle}
      </a>
      <div className={styles.navlinks}>
        <a href={`${home}#features`}>{t.nav.product}</a>
        <a href={download}>{t.nav.download}</a>
        <a href={`${home}#faq`}>{t.nav.faq}</a>
      </div>
      <div className={styles.navend}>
        <span>
          <a
            href={pathFor(page, "fr")}
            hrefLang="fr"
            aria-label={lang === "fr" ? undefined : t.nav.switchLabel}
            aria-current={lang === "fr" ? "true" : undefined}
          >
            FR
          </a>
          {" / "}
          <a
            href={pathFor(page, "en")}
            hrefLang="en"
            aria-label={lang === "en" ? undefined : t.nav.switchLabel}
            aria-current={lang === "en" ? "true" : undefined}
          >
            EN
          </a>
        </span>
        <a className={styles.btn} href={download}>
          {t.nav.downloadButton}
        </a>
      </div>
    </nav>
  );
}
