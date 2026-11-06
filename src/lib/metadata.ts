import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { pathFor, type Lang, type PageKey } from "@/i18n";

export function pageMetadata(
  page: PageKey,
  lang: Lang,
  title: string,
  description: string,
): Metadata {
  const en = SITE_URL + pathFor(page, "en");
  const fr = SITE_URL + pathFor(page, "fr");
  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL + pathFor(page, lang),
      languages: { en, fr, "x-default": en },
    },
  };
}
