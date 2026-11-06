"use client";

import { useEffect, useState } from "react";
import { fetchReleaseLinks, type ReleaseLinks } from "@/lib/releases";

let pending: Promise<ReleaseLinks> | null = null;

/** One shared request per page, however many buttons ask for it. */
function refreshOnce(): Promise<ReleaseLinks> {
  pending ??= fetchReleaseLinks();
  return pending;
}

/** Build-time links first, then the live ones once, if they are a known and different release. */
export function useReleaseLinks(initial: ReleaseLinks): ReleaseLinks {
  const [links, setLinks] = useState(initial);
  useEffect(() => {
    let active = true;
    void refreshOnce().then((fresh) => {
      if (active && fresh.version !== null && fresh.version !== initial.version) {
        setLinks(fresh);
      }
    });
    return () => {
      active = false;
    };
  }, [initial.version]);
  return links;
}
