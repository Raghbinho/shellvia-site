import { getDict, type Lang } from "@/i18n";
import { ContactLink } from "./ContactLink";
import styles from "./Legal.module.css";

export function Privacy({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.privacy;
  return (
    <article className={styles.prose}>
      <h1>{d.pages.privacy}</h1>
      <p>{t.intro}</p>
      <h2>{t.siteTitle}</h2>
      <p>{t.siteNoAccount}</p>
      <h2>{t.measureTitle}</h2>
      <p>{t.measureText}</p>
      <h2>{t.downloadsTitle}</h2>
      <p>{t.downloadsText}</p>
      <h2>{t.appTitle}</h2>
      <p>{t.appText}</p>
      <h2>{t.contactTitle}</h2>
      <p>
        {t.contactText} <ContactLink />
      </p>
    </article>
  );
}
