"use client";

import { Download } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import { linkFor, type ReleaseLinks } from "@/lib/releases";
import { recommendedFormat, type Os } from "@/lib/platform";
import buttons from "@/styles/buttons.module.css";
import { useReleaseLinks } from "./useReleaseLinks";
import { usePlatform } from "./usePlatform";

interface Props {
  lang: Lang;
  links: ReleaseLinks;
  variant: "hero" | "card";
  /** Card variant only: the system this card is for. */
  os?: Os;
}

export function DownloadButton({ lang, links, variant, os }: Props) {
  const live = useReleaseLinks(links);
  const platform = usePlatform();
  const target = variant === "card" && os ? os : platform.os;
  const t = getDict(lang);
  const label = t.hero.download.replace("{os}", t.home.osNames[target]);
  const isCard = variant === "card";
  const primary = !isCard || (target === platform.os && platform.detected);
  return (
    <a
      className={`${buttons.btn} ${primary ? buttons.pri : buttons.glass}`}
      href={linkFor(live, recommendedFormat(target))}
      aria-label={isCard ? label : undefined}
    >
      <Download size="1.1em" aria-hidden="true" />
      {isCard ? t.home.download.button : label}
    </a>
  );
}
