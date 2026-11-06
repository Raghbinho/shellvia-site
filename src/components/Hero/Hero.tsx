import { Download } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import { AppWindow } from "../AppWindow/AppWindow";
import styles from "./Hero.module.css";

export function Hero({
  lang,
  downloadHref,
  downloadOs,
}: {
  lang: Lang;
  downloadHref: string;
  downloadOs: string;
}) {
  const t = getDict(lang).hero;
  return (
    <section className={styles.hero}>
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <span className={styles.kick}>
        {t.kicker} <b>{t.kickerBadge}</b>
      </span>
      <h1 className={styles.title}>
        {t.titleLine1} <span className={styles.l2}>{t.titleLine2}</span>
      </h1>
      <p className={styles.lead}>
        <b>{t.leadStrong}</b>
        {t.leadRest}
      </p>
      <div className={styles.ctas}>
        <a className={`${styles.btn} ${styles.pri}`} href={downloadHref}>
          <Download size="1.1em" aria-hidden="true" />
          {t.download.replace("{os}", downloadOs)}
        </a>
        <a className={`${styles.btn} ${styles.glass}`} href="#features">
          {t.features}
        </a>
      </div>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.tilt}>
          <AppWindow lang={lang} />
        </div>
      </div>
      <div className={styles.fade} aria-hidden="true" />
    </section>
  );
}
