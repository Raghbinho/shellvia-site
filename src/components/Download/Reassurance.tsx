import { RefreshCw, ShieldCheck, UserX, type LucideIcon } from "lucide-react";
import { getDict, type Lang } from "@/i18n";
import styles from "./Download.module.css";

// Same order as `download.why` in the dictionaries.
const ICONS: readonly LucideIcon[] = [RefreshCw, UserX, ShieldCheck];

export function Reassurance({ lang }: { lang: Lang }) {
  const { why } = getDict(lang).download;
  return (
    <div className={styles.why}>
      {why.map((item, i) => {
        const Icon = ICONS[i];
        return (
          <div key={item.title} className={styles.w}>
            <Icon size="1.4em" aria-hidden="true" />
            <div>
              <b>{item.title}</b>
              <span>{item.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
