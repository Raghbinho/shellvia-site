import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FALLBACK_URL } from "@/lib/constants";
import { EMPTY_LINKS, parseRelease } from "@/lib/releases";
import release from "@/lib/fixtures/release.json";
import { AllSystems } from "./AllSystems";

const links = parseRelease(release);
const ROWS = [".exe", ".msi", ".dmg", ".AppImage", ".deb", ".rpm"];

function rowLink(name: string) {
  return screen.queryByRole("link", { name: `Download the ${name}` });
}

describe("AllSystems", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 403 }));
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("hides the rpm row when the release has none", () => {
    render(<AllSystems lang="en" links={links} />);
    expect(rowLink(".deb")).toHaveAttribute("href", links.files.deb);
    expect(rowLink(".rpm")).toBeNull();
    expect(screen.getAllByRole("link")).toHaveLength(5);
  });

  it("sends every row to the fallback page when no release is known", () => {
    render(<AllSystems lang="en" links={EMPTY_LINKS} />);
    for (const name of ROWS) {
      expect(rowLink(name)).toHaveAttribute("href", FALLBACK_URL);
    }
    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  it("groups the rows by system", () => {
    render(<AllSystems lang="fr" links={links} />);
    const linux = screen.getByRole("heading", { name: /Linux/ }).closest("article");
    expect(linux).not.toBeNull();
    expect(within(linux as HTMLElement).getAllByRole("link")).toHaveLength(2);
  });

  it("tags each row with the Umami download event of its system and format", () => {
    render(<AllSystems lang="en" links={links} />);
    const deb = rowLink(".deb");
    expect(deb).toHaveAttribute("data-umami-event", "download");
    expect(deb).toHaveAttribute("data-umami-event-os", "linux");
    expect(deb).toHaveAttribute("data-umami-event-format", "deb");
    expect(rowLink(".msi")).toHaveAttribute("data-umami-event-os", "windows");
  });
});
