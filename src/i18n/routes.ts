export type Lang = "en" | "fr";
export const LANGS: readonly Lang[] = ["en", "fr"];

export type PageKey = "home" | "download" | "legal" | "privacy";

export const ROUTES: Record<PageKey, Record<Lang, string>> = {
  home: { en: "/", fr: "/fr/" },
  download: { en: "/download/", fr: "/fr/telecharger/" },
  legal: { en: "/legal/", fr: "/fr/mentions-legales/" },
  privacy: { en: "/privacy/", fr: "/fr/confidentialite/" },
};

export function pathFor(page: PageKey, lang: Lang): string {
  return ROUTES[page][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "fr" : "en";
}
