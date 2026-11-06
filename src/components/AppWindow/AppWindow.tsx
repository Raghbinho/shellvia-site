import {
  Columns2,
  File,
  FileCode,
  FileText,
  Folder,
  FolderPlus,
  House,
  KeyRound,
  LocateFixed,
  RefreshCw,
  Server,
  Settings,
  SquareCode,
  Terminal,
  Upload,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import { getDict, type Dict, type Lang } from "@/i18n";
import styles from "./AppWindow.module.css";
import { Row } from "./Row";
import { TerminalPane } from "./TerminalPane";

const dirIcon = <Folder size="1em" className={`${styles.fi} ${styles.dir}`} />;
const fileIcon = <File size="1em" className={styles.fi} />;
const codeIcon = <FileCode size="1em" className={styles.fi} />;
const textIcon = <FileText size="1em" className={styles.fi} />;

function Rail() {
  return (
    <div className={styles.rail}>
      <Image
        className={styles.logo}
        src="/assets/shellvia-icon.svg"
        alt=""
        width={26}
        height={26}
        unoptimized
      />
      <House size="1em" />
      <Server size="1em" />
      <Folder size="1em" className={styles.on} />
      <SquareCode size="1em" />
      <Waypoints size="1em" />
      <span className={styles.sp} />
      <KeyRound size="1em" />
      <Settings size="1em" />
    </div>
  );
}

// Window chrome, hosts and terminal output are non-translatable app content.
function FileList({ w }: { w: Dict["window"] }) {
  return (
    <div className={styles.swap}>
      <div className={`${styles.list} ${styles.before}`}>
        <Row icon={dirIcon} name=".ssh" />
        <Row icon={dirIcon} name="backups" />
        <Row icon={fileIcon} name=".bashrc" size={w.sizeBashrc} />
        <Row icon={codeIcon} name="deploy.sh" size={w.sizeDeploy} />
      </div>
      <div className={`${styles.list} ${styles.after}`}>
        <Row icon={dirIcon} name="assets" />
        <Row icon={dirIcon} name="logs" />
        <Row icon={codeIcon} name="index.html" size={w.sizeIndex} selected />
        <Row icon={textIcon} name="robots.txt" size={w.sizeRobots} />
        <Row icon={fileIcon} name=".env.production" size={w.sizeEnv} />
      </div>
    </div>
  );
}

function Tunnels({ w }: { w: Dict["window"] }) {
  return (
    <div className={styles.sect}>
      <div className={styles.secth}>
        <span>{w.tunnels}</span>
        <span className={styles.swap}>
          <span className={styles.tbefore}>{w.tunnelsOne}</span>
          <span className={styles.tafter}>{w.tunnelsTwo}</span>
        </span>
      </div>
      <div className={styles.tun}>
        <span className={styles.dot} />
        <span className={styles.tunk}>L</span>
        <span className={styles.tunr}>5432 → db-01:5432</span>
      </div>
      <div className={`${styles.tun} ${styles.t2}`}>
        <span className={`${styles.dot} ${styles.t2dot}`} />
        <span className={styles.tunk}>D</span>
        <span className={styles.tunr}>1080 · SOCKS5</span>
      </div>
    </div>
  );
}

function Sidebar({ w }: { w: Dict["window"] }) {
  return (
    <div className={styles.side}>
      <div className={styles.hd}>
        <span>{`${w.files} · web-01`}</span>
        <span className={styles.hdic}>
          <Upload size="1em" />
          <FolderPlus size="1em" />
          <RefreshCw size="1em" />
          <Columns2 size="1em" />
        </span>
      </div>
      <div className={styles.swap}>
        <div className={`${styles.crumb} ${styles.before}`}>
          <span>/</span>
          <span>›</span>
          <b>root</b>
        </div>
        <div className={`${styles.crumb} ${styles.after}`}>
          <span>/</span>
          <span>›</span>
          <span>var</span>
          <span>›</span>
          <span>www</span>
          <span>›</span>
          <b>app</b>
        </div>
      </div>
      <div className={styles.filter}>
        <span className={styles.follow} title={w.follow} aria-label={w.follow}>
          <LocateFixed size="1em" />
        </span>
        <span className={styles.field}>{w.filter}</span>
      </div>
      <div className={styles.th}>
        <span />
        <span>{w.name}</span>
        <span>{w.size}</span>
      </div>
      <FileList w={w} />
      <Tunnels w={w} />
    </div>
  );
}

function Tabs() {
  return (
    <div className={styles.tabs}>
      <span className={`${styles.tab} ${styles.tabon}`}>
        <span className={styles.dot} />
        web-01
      </span>
      <span className={styles.tab}>
        <span className={styles.dot} />
        db-01
      </span>
      <span className={styles.tab}>
        <Terminal size="1em" />
        PowerShell
      </span>
      <span className={styles.tab}>
        <Terminal size="1em" />
        Ubuntu (WSL)
      </span>
    </div>
  );
}

function StatusBar({ w }: { w: Dict["window"] }) {
  return (
    <div className={styles.status}>
      <span className={styles.dot} />
      <span>{w.connected}</span>
      <span>root@10.0.0.1:22</span>
      <span className={styles.stun}>
        <Waypoints size="1em" />
        <span className={styles.swap}>
          <span className={styles.tbefore}>{w.statusOne}</span>
          <span className={styles.tafter}>{w.statusTwo}</span>
        </span>
      </span>
      <span className={styles.right}>{w.transfers}</span>
    </div>
  );
}

export function AppWindow({ lang }: { lang: Lang }) {
  const w = getDict(lang).window;
  return (
    <div className={styles.awl}>
      <div className={styles.title}>
        <span>Shellvia</span>
        <span className={styles.ctl}>
          <span>—</span>
          <span>▢</span>
          <span>✕</span>
        </span>
      </div>
      <div className={styles.body}>
        <Rail />
        <Sidebar w={w} />
        <div className={styles.main}>
          <Tabs />
          <TerminalPane />
        </div>
      </div>
      <StatusBar w={w} />
    </div>
  );
}
