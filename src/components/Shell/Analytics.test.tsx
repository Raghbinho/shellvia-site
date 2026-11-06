import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { UMAMI_SRC } from "@/lib/constants";
import { Analytics } from "./Analytics";

afterEach(() => vi.unstubAllEnvs());

describe("Analytics", () => {
  it("renders nothing without a website id", () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "");
    const { container } = render(<Analytics />);
    expect(container.querySelector("script")).toBeNull();
  });

  it("renders the Umami script when configured", () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "abc");
    const { container } = render(<Analytics />);
    const scripts = container.querySelectorAll("script");
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toHaveAttribute("src", UMAMI_SRC);
    expect(scripts[0]).toHaveAttribute("data-website-id", "abc");
    expect(scripts[0]).toHaveAttribute("data-domains", "shellvia.com");
    expect(scripts[0].defer).toBe(true);
  });
});
