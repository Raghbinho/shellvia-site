import { getDict, type Lang } from "@/i18n";
import { FeatureGrid } from "./FeatureGrid";
import { Also } from "./Also";
import { AgentTile, KeysTile, MultiTile, SnippetsTile, VaultTile } from "./TilesB";
import { FilesTile, SessionsTile, ShellsTile, TunnelsTile } from "./TilesA";
import styles from "./Features.module.css";

export function Features({ lang }: { lang: Lang }) {
  const t = getDict(lang).features;
  return (
    <section id="features" className={styles.features}>
      <h2 id="features-title" className={styles.title}>
        {t.title} <em>{t.titleEm}</em>
      </h2>
      <p className={styles.sub}>{t.sub}</p>
      <FeatureGrid labelledBy="features-title">
        <FilesTile lang={lang} />
        <SessionsTile lang={lang} />
        <ShellsTile lang={lang} />
        <TunnelsTile lang={lang} />
        <SnippetsTile lang={lang} />
        <MultiTile lang={lang} />
        <KeysTile lang={lang} />
        <AgentTile lang={lang} />
        <VaultTile lang={lang} />
      </FeatureGrid>
      <Also lang={lang} />
    </section>
  );
}
