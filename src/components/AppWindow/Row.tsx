import type { ReactNode } from "react";
import styles from "./AppWindow.module.css";

export function Row({
  icon,
  name,
  size,
  selected,
}: {
  icon: ReactNode;
  name: string;
  size?: string;
  selected?: boolean;
}) {
  return (
    <div className={selected ? `${styles.row} ${styles.rowsel}` : styles.row}>
      {icon}
      <span>{name}</span>
      <span className={styles.size}>{size}</span>
    </div>
  );
}
