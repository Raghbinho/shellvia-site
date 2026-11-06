import { Laptop, Monitor, Terminal, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { getDict, type Lang } from "@/i18n";
import { RELEASE_NOTES_URL } from "@/lib/constants";
import type { Os } from "@/lib/platform";
import styles from "./Download.module.css";

const ICONS: Record<Os, LucideIcon> = { windows: Monitor, macos: Laptop, linux: Terminal };

// Shell commands are the same in every language, so they are not in the dictionaries.
// Key: index of the step within the system's list.
const COMMANDS: Record<Os, Partial<Record<number, string>>> = {
  windows: {},
  macos: { 2: "xattr -dr com.apple.quarantine /Applications/Shellvia.app" },
  linux: { 0: "chmod +x Shellvia_*.AppImage" },
};

const ORDER: readonly Os[] = ["windows", "macos", "linux"];

/** Renders the `**bold**` segments of a dictionary string. */
function rich(text: string): ReactNode[] {
  return text.split("**").map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part));
}

export function FirstLaunch({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const t = dict.download;
  return (
    <section aria-labelledby="first-title">
      <h2 id="first-title" className={styles.sh}>
        {t.firstTitle}
      </h2>
      <div className={styles.first}>
        {ORDER.map((os) => {
          const Icon = ICONS[os];
          return (
            <div key={os} className={styles.step}>
              <h3>
                <Icon size="1.1em" aria-hidden="true" />
                {dict.home.osNames[os]}
              </h3>
              <ol>
                {t.steps[os].map((text, i) => (
                  <li key={i}>
                    {rich(text)}
                    {COMMANDS[os][i] && <code className={styles.code}>{COMMANDS[os][i]}</code>}
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
      <p className={styles.all}>
        {t.notSigned} · <a href={RELEASE_NOTES_URL}>{t.allReleases}</a>
      </p>
    </section>
  );
}
