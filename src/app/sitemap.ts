import type { MetadataRoute } from "next";
import { LANGS, ROUTES, pathFor, type PageKey } from "@/i18n";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(ROUTES) as PageKey[];
  return pages.flatMap((page) => {
    const languages = Object.fromEntries(
      [...LANGS.map((lang) => [lang, SITE_URL + pathFor(page, lang)]), ["x-default", SITE_URL + pathFor(page, "en")]],
    );
    return LANGS.map((lang) => ({
      url: SITE_URL + pathFor(page, lang),
      alternates: { languages },
    }));
  });
}
