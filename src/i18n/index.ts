import { en } from "./en";
import { fr } from "./fr";
import type { Dict } from "./types";
import type { Lang } from "./routes";

export type { Dict } from "./types";
export { LANGS, ROUTES, pathFor, otherLang } from "./routes";
export type { Lang, PageKey } from "./routes";

const DICTS: Record<Lang, Dict> = { en, fr };

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
