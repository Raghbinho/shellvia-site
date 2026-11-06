import { Command, KeyRound, Lock, LockOpen, Server } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import styles from "./Features.module.css";
import demo from "./DemosB.module.css";

const cx = (...names: string[]) => names.join(" ");

// Demo content below (hostnames, commands, key names) is the same in every language.
const SNIPPET_COMMAND = "git pull && systemctl restart app";

export function SnippetsTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.snippets;
  return (
    <div className={cx(styles.tile, styles.tvio)} role="listitem">
      <div className={styles.mini} aria-hidden="true">
        <span className={cx(styles.mr, demo.snpick)}>
          <span className={styles.mn}>deploy</span>
          <span className={styles.mc}>{SNIPPET_COMMAND}</span>
        </span>
        <span className={styles.mr}>
          <span className={styles.mn}>logs</span>
          <span className={styles.mc}>tail -f /var/log/nginx/error.log</span>
        </span>
        <span className={cx(styles.mr, demo.snterm)}>
          <span>$</span>
          <span className={cx(styles.typ, demo.sntyp)}>{SNIPPET_COMMAND}</span>
        </span>
        <span className={cx(styles.mr, styles.mok, demo.snout)}>Already up to date.</span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.text}</p>
    </div>
  );
}

const HOSTS = ["web-01", "web-02", "web-03"];

export function MultiTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.multi;
  return (
    <div className={styles.tile} role="listitem">
      <div className={demo.multi} aria-hidden="true">
        {HOSTS.map((host) => (
          <div key={host} className={demo.mt}>
            <b>{host}</b>
            <span>
              ${" "}
              <span className={cx(styles.typ, demo.mtyp)} data-testid="demo-multi-typed">
                apt update
              </span>
            </span>
            <span className={cx(styles.mok, demo.mout)}>{t.done}</span>
          </div>
        ))}
      </div>
      <h3>{t.title}</h3>
      <p>{t.text}</p>
    </div>
  );
}

export function KeysTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.keys;
  return (
    <div className={styles.tile} role="listitem">
      <div className={demo.keys} aria-hidden="true">
        <kbd>{t.ctrl}</kbd>
        <kbd className={demo.k2}>{t.shift}</kbd>
        <kbd className={demo.k3}>K</kbd>
      </div>
      <div className={cx(styles.mini, demo.pal)} aria-hidden="true">
        <span className={demo.sfield}>
          <Command size="1em" />
          <span className={cx(styles.typ, demo.ptyp)}>web</span>
        </span>
        <span className={cx(styles.mr, demo.phl, demo.pres)}>
          <Server size="1em" />
          {t.connectTo} web-01
        </span>
        <span className={cx(styles.mr, demo.pres)}>
          <Server size="1em" />
          {t.connectTo} web-02
        </span>
      </div>
      <h3>{t.title}</h3>
      <p>
        {t.before}
        <code>{t.code}</code>.
      </p>
    </div>
  );
}

export function AgentTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.agent;
  return (
    <div className={cx(styles.tile, styles.tvio)} role="listitem">
      <div className={styles.mini} aria-hidden="true">
        <span className={styles.mr}>
          <KeyRound size="1em" />
          <span className={styles.mn}>web-01</span>
          <span className={styles.mc}>
            {t.asks} id_ed25519
          </span>
        </span>
        <span className={demo.agbtns}>
          <span className={demo.agb}>{t.deny}</span>
          <span className={cx(demo.agb, demo.agok)}>{t.allow}</span>
        </span>
        <span className={cx(styles.mr, styles.mok, demo.agdone)}>{t.granted}</span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.text}</p>
    </div>
  );
}

const VAULT_ROWS = [
  { host: "web-01", secret: "••••••••", step: "" },
  { host: "db-01", secret: "id_ed25519", step: demo.d2 },
  { host: "api-02", secret: "••••••••", step: demo.d3 },
];

export function VaultTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.vault;
  return (
    <div className={styles.tile} role="listitem">
      <div className={styles.mini} aria-hidden="true">
        <span className={styles.mr}>
          <span className={demo.vlock}>
            <LockOpen className={demo.vopen} size="1em" />
            <Lock className={demo.vshut} size="1em" />
          </span>
          <span className={styles.mn}>{t.name}</span>
          <span className={styles.mc}>{t.encrypted}</span>
        </span>
        {VAULT_ROWS.map(({ host, secret, step }) => (
          <span key={host} className={cx(styles.mr, demo.vrow, step)}>
            <span className={styles.mn}>{host}</span>
            <span className={styles.mc}>{secret}</span>
          </span>
        ))}
      </div>
      <h3>{t.title}</h3>
      <p>{t.text}</p>
    </div>
  );
}
