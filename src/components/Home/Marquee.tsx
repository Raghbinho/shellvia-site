import { Folder, Server, SquareTerminal, Waypoints, type LucideIcon } from "lucide-react";
import styles from "./Home.module.css";

const ITEMS: ReadonlyArray<readonly [string, LucideIcon]> = [
  ["PowerShell", SquareTerminal],
  ["bash", SquareTerminal],
  ["zsh", SquareTerminal],
  ["fish", SquareTerminal],
  ["WSL", SquareTerminal],
  ["cmd", SquareTerminal],
  ["OpenSSH", Server],
  ["SFTP", Folder],
  ["SOCKS5", Waypoints],
];

export function Marquee() {
  return (
    <div className={styles.marq}>
      {ITEMS.map(([name, Icon]) => (
        <span key={name}>
          <Icon size="1.1em" aria-hidden="true" />
          {name}
        </span>
      ))}
    </div>
  );
}
