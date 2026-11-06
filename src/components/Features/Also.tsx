import { getDict, type Lang } from "@/i18n";
import styles from "./Features.module.css";

export function Also({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.also;
  return (
    <div className={styles.also}>
      <p id="features-also" className={styles.alsoh}>
        {t.title}
      </p>
      <ul className={styles.chips} aria-labelledby="features-also">
        {t.chips.map((chip) => (
          <li key={chip} className={styles.chip}>
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}
