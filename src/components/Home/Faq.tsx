import { getDict, type Lang } from "@/i18n";
import styles from "./Home.module.css";

export function Faq({ lang }: { lang: Lang }) {
  const t = getDict(lang).home.faq;
  return (
    <section id="faq" className={styles.sec} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.title}>
        {t.title}
      </h2>
      <div className={styles.faq}>
        {t.items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
