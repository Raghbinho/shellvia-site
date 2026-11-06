import { ArrowRight, Files, Folder, Search } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import styles from "./Features.module.css";
import demo from "./DemosA.module.css";

const cx = (...names: string[]) => names.join(" ");

// Demo content below (hostnames, paths, commands) is the same in every language.
export function FilesTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.files;
  return (
    <div className={cx(styles.tile, styles.tbig)} role="listitem">
      <div className={demo.panes} aria-hidden="true">
        <div className={demo.pane}>
          <span className={demo.ph}>{t.local}</span>
          <span className={demo.psel}>dist/</span>
          <span className={demo.psel}>nginx.conf</span>
          <span>README.md</span>
          <span>package.json</span>
        </div>
        <span className={demo.arrow}>
          <ArrowRight size="1em" />
        </span>
        <div className={demo.pane}>
          <span className={demo.ph}>{t.remote}</span>
          <span className={demo.pnew}>dist/</span>
          <span className={demo.pnew}>nginx.conf</span>
          <span>assets/</span>
          <span>index.html</span>
          <div className={demo.prog}>
            <div className={demo.progb} />
          </div>
          <span className={demo.plab}>
            <span>{t.transfers}</span>
            <span>2 / 2</span>
          </span>
        </div>
        <span className={demo.ghost}>
          <Files size="1.1em" />
          {t.items}
        </span>
      </div>
      <h3>{t.title}</h3>
      <p>
        {t.before}
        <code>{t.code}</code>
        {t.after}
      </p>
    </div>
  );
}

export function SessionsTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.sessions;
  return (
    <div className={styles.tile} role="listitem">
      <div className={styles.mini} aria-hidden="true">
        <span className={demo.sfield}>
          <Search size="1em" />
          <span className={cx(styles.typ, demo.styp)}>db</span>
          <span className={styles.cur} />
        </span>
        <span className={cx(styles.mr, demo.sfold)}>
          <Folder size="1em" />
          Prod
        </span>
        <span className={cx(styles.mr, demo.sdim)}>&emsp;web-01</span>
        <span className={styles.mr}>
          <span className={styles.mn}>&emsp;db-01</span>
        </span>
        <span className={cx(styles.mr, demo.sdim)}>&emsp;api-02</span>
      </div>
      <h3>{t.title}</h3>
      <p>
        {t.before}
        <code>~/.ssh/config</code>
        {t.after}
      </p>
    </div>
  );
}

export function ShellsTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.shells;
  return (
    <div className={cx(styles.tile, styles.tvio)} role="listitem">
      <div className={styles.mini} aria-hidden="true">
        <span className={demo.shtabs}>
          <span className={cx(demo.sht, demo.sh1)}>PowerShell</span>
          <span className={cx(demo.sht, demo.sh2)}>zsh</span>
          <span className={cx(demo.sht, demo.sh3)}>WSL</span>
        </span>
        <span className={demo.shp}>
          <span className={demo.shp1}>PS C:\Users\ana&gt; git status</span>
          <span className={demo.shp2}>ana@mac ~ % brew upgrade</span>
          <span className={demo.shp3}>ana@ubuntu:~$ make test</span>
        </span>
      </div>
      <h3>{t.title}</h3>
      <p>{t.text}</p>
    </div>
  );
}

const TUNNELS = [
  { kind: "L", route: "5432 → db-01:5432", step: "" },
  { kind: "D", route: "1080 · SOCKS5", step: demo.d2 },
  { kind: "R", route: "8080 ← localhost:3000", step: demo.d3 },
];

export function TunnelsTile({ lang }: { lang: Lang }) {
  const t = getDict(lang).features.tunnels;
  return (
    <div className={styles.tile} role="listitem">
      <div className={styles.mini} aria-hidden="true">
        {TUNNELS.map(({ kind, route, step }) => (
          <span key={kind} className={cx(styles.mr, demo.trow, step)}>
            <span className={cx(styles.md, demo.tdot, step)} />
            <span className={styles.mk}>{kind}</span>
            <span className={styles.mn}>{route}</span>
          </span>
        ))}
      </div>
      <h3>{t.title}</h3>
      <p>{t.text}</p>
    </div>
  );
}
