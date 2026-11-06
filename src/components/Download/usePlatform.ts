"use client";

import { useSyncExternalStore } from "react";
import { detectOs, type Os } from "@/lib/platform";

export interface Platform {
  os: Os;
  detected: boolean;
}

const SERVER_PLATFORM: Platform = { os: "windows", detected: false };
let lastPlatform: Platform = SERVER_PLATFORM;

function subscribe(): () => void {
  return () => {};
}

function getSnapshot(): Platform {
  const next = detectOs(navigator);
  // useSyncExternalStore needs the same object back while nothing changed.
  if (next.os !== lastPlatform.os || next.detected !== lastPlatform.detected) {
    lastPlatform = next;
  }
  return lastPlatform;
}

function getServerSnapshot(): Platform {
  return SERVER_PLATFORM;
}

/** Windows (not detected) in the pre-rendered HTML and on hydration, the real system after mount. */
export function usePlatform(): Platform {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
