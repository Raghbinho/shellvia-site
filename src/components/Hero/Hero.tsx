import type { ReactNode } from "react";
import { getDict, type Lang } from "@/i18n";
import { AppWindow } from "../AppWindow/AppWindow";
import styles from "./Hero.module.css";

export function Hero({ lang, cta }: { lang: Lang; cta: ReactNode }) {
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
        {cta}
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
