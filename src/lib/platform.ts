import type { Format } from "@/lib/releases";

export type Os = "windows" | "macos" | "linux";

interface NavLike {
  userAgent: string;
  userAgentData?: { platform?: string; mobile?: boolean };
}

const MOBILE = /Android|iPhone|iPad|iPod|Mobile/;
const NOT_DETECTED = { os: "windows", detected: false } as const;

function osFromText(text: string): Os | null {
  if (/Win/i.test(text)) return "windows";
  if (/Mac/i.test(text)) return "macos";
  if (/Linux|X11|Ubuntu|Fedora|Debian/i.test(text)) return "linux";
  return null;
}

export function detectOs(nav: NavLike): { os: Os; detected: boolean } {
  if (nav.userAgentData?.mobile === true || MOBILE.test(nav.userAgent)) {
    return NOT_DETECTED;
  }
  const hinted = nav.userAgentData?.platform
    ? osFromText(nav.userAgentData.platform)
    : null;
  const os = hinted ?? osFromText(nav.userAgent);
  return os ? { os, detected: true } : NOT_DETECTED;
}

const RECOMMENDED: Record<Os, Format> = {
  windows: "exe",
  macos: "dmg",
  linux: "appimage",
};

export function recommendedFormat(os: Os): Format {
  return RECOMMENDED[os];
}
