import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DetectedBlock } from "./DetectedBlock";

function linksWith(version: string | null) {
  return { version, files: {} };
}

describe("DetectedBlock version line", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 403 }));
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("shows a stable version", () => {
    render(<DetectedBlock lang="en" links={linksWith("0.3.0")} />);
    expect(screen.getByText(/0\.3\.0/)).toBeInTheDocument();
  });

  it("omits a pre-release version", () => {
    const { container } = render(<DetectedBlock lang="en" links={linksWith("0.2.0-beta.1")} />);
    expect(container.textContent).not.toMatch(/0\.2\.0|beta/);
  });
});

describe("DetectedBlock download event", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 403 }));
    vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15",
    );
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("tags the main button with the visitor's system and format", async () => {
    const { container } = render(<DetectedBlock lang="en" links={linksWith("0.3.0")} />);
    await waitFor(() => {
      const link = container.querySelector("[data-umami-event='download']");
      expect(link).toHaveAttribute("data-umami-event-os", "macos");
      expect(link).toHaveAttribute("data-umami-event-format", "dmg");
    });
  });
});
