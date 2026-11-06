"use client";

import { usePathname } from "next/navigation";
import { ROUTES, type Lang, type PageKey } from "@/i18n";
import { LangBanner } from "./LangBanner";
import { Nav } from "./Nav";

export function pageFromPath(pathname: string, lang: Lang): PageKey {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const keys = Object.keys(ROUTES) as PageKey[];
  return keys.find((key) => ROUTES[key][lang] === normalized) ?? "home";
}

// The current page is only known on the client side of a static export, so
// the page-aware parts of the header (language switch, banner) live here.
export function ShellHeader({ lang }: { lang: Lang }) {
  const page = pageFromPath(usePathname(), lang);
  return (
    <>
      <LangBanner lang={lang} page={page} />
      <div className="shell-wrap">
        <Nav lang={lang} page={page} />
      </div>
    </>
  );
}
