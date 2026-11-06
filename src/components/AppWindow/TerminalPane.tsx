import type { ReactNode } from "react";
import styles from "./AppWindow.module.css";

function Prompt({ dir = "~", children }: { dir?: string; children?: ReactNode }) {
  return (
    <>
      <span className={styles.u}>root@web-01</span>:<span className={styles.p}>{dir}</span>#{" "}
      {children}
    </>
  );
}

const LISTING: ReadonlyArray<{ meta: string; name: string; dir?: boolean }> = [
  { meta: "drwxr-xr-x 4 www-data www-data 4096 Nov  5 09:12 ", name: ".", dir: true },
  { meta: "drwxr-xr-x 3 root     root     4096 Sep 28 10:40 ", name: "..", dir: true },
  { meta: "-rw------- 1 www-data www-data  284 Nov  2 16:20 ", name: ".env.production" },
  { meta: "drwxr-xr-x 2 www-data www-data 4096 Nov  5 09:12 ", name: "assets", dir: true },
  { meta: "-rw-r--r-- 1 www-data www-data 1843 Nov  4 18:30 ", name: "index.html" },
  { meta: "drwxr-xr-x 2 www-data www-data 4096 Nov  3 11:02 ", name: "logs", dir: true },
  { meta: "-rw-r--r-- 1 www-data www-data  612 Oct 30 08:55 ", name: "robots.txt" },
];

// Terminal lines are identical in every language.
export function TerminalPane() {
  return (
    <div className={styles.term}>
      <div className={styles.l}>
        <Prompt>uptime</Prompt>
      </div>
      <div className={`${styles.l} ${styles.m}`}>
        {" 14:02:11 up 41 days,  3:17,  1 user,  load average: 0.21, 0.18, 0.12"}
      </div>
      <div className={styles.l}>
        <Prompt>systemctl is-active nginx</Prompt>
      </div>
      <div className={`${styles.l} ${styles.g}`}>active</div>
      <div className={styles.l}>
        <Prompt>
          <span className={styles.typed} data-testid="aw-typed">
            cd /var/www/app &amp;&amp; ls -la
          </span>
          <span className={`${styles.cur} ${styles.curA}`} />
        </Prompt>
      </div>
      <div className={styles.after} data-testid="aw-after">
        <div className={styles.l}>total 28</div>
        {LISTING.map((e) => (
          <div className={styles.l} key={e.name}>
            {e.meta}
            {e.dir ? <span className={styles.p}>{e.name}</span> : e.name}
          </div>
        ))}
        <div className={styles.l}>
          <Prompt dir="/var/www/app">
            <span className={`${styles.cur} ${styles.blink}`} />
          </Prompt>
        </div>
      </div>
    </div>
  );
}
