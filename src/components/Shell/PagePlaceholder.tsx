import { getDict, type Lang, type PageKey } from "@/i18n";

export function PagePlaceholder({ page, lang }: { page: PageKey; lang: Lang }) {
  return <h1>{getDict(lang).pages[page]}</h1>;
}
