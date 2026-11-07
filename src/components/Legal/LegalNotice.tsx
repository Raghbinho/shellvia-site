import { HOST, PUBLISHER } from "@/content/publisher";
import { getDict, type Lang } from "@/i18n";
import { ContactLink } from "./ContactLink";
import styles from "./Legal.module.css";

export function LegalNotice({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const t = d.legal;
  return (
    <article className={styles.prose}>
      <h1>{d.pages.legal}</h1>
      <h2>{t.publisherTitle}</h2>
      <dl>
        <dt>{t.publisherName}</dt>
        <dd>{PUBLISHER.name}</dd>
        {PUBLISHER.address && (
          <>
            <dt>{t.publisherAddress}</dt>
            <dd>{PUBLISHER.address}</dd>
          </>
        )}
      </dl>
      <h2>{t.contactTitle}</h2>
      <p>
        {t.contactText} <ContactLink />
      </p>
      <h2>{t.hostTitle}</h2>
      <dl>
        <dt>{t.hostName}</dt>
        <dd>{HOST.name}</dd>
        <dt>{t.hostAddress}</dt>
        <dd>{HOST.address}</dd>
      </dl>
      <h2>{t.contentTitle}</h2>
      <p>{t.contentText}</p>
    </article>
  );
}
