import { render, screen } from "@testing-library/react";
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
