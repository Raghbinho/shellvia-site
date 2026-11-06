"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Features.module.css";

const THRESHOLD = 0.15;

export function FeatureGrid({
  labelledBy,
  children,
}: {
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // The attribute is set on the DOM node (React never renders it), so the
    // server markup has no animation and no-JS visitors see the end state.
    const play = () => {
      node.dataset.play = "true";
    };
    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { threshold: THRESHOLD },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={styles.grid}
      role="list"
      aria-labelledby={labelledBy}
      data-testid="feature-grid"
    >
      {children}
    </div>
  );
}
