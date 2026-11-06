"use client";

import { useEffect, useState } from "react";
import { getDict, otherLang, pathFor, type Lang, type PageKey } from "@/i18n";
import styles from "./Shell.module.css";

const DISMISSED_KEY = "shellvia.langBanner.dismissed";

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    window.localStorage.setItem(DISMISSED_KEY, "1");
  } catch {
    // Storage unavailable: the banner is only hidden for this page view.
  }
}

function mismatch(lang: Lang): boolean {
  const browserIsFrench = window.navigator.language.toLowerCase().startsWith("fr");
  return lang === "fr" ? !browserIsFrench : browserIsFrench;
}

export function LangBanner({ lang, page }: { lang: Lang; page: PageKey }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Browser-only checks, so they cannot run during the static render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(mismatch(lang) && !readDismissed());
  }, [lang]);

  if (!visible) return null;
  const text = getDict(lang).langBanner;
  const other = otherLang(lang);
  return (
    <div className={styles.banner} role="region" aria-label={text.text} lang={other}>
      <span>{text.text}</span>
      <a href={pathFor(page, other)} hrefLang={other}>
        {text.link}
      </a>
      <button
        type="button"
        onClick={() => {
          writeDismissed();
          setVisible(false);
        }}
      >
        {text.close}
      </button>
    </div>
  );
}
