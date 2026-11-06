import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FALLBACK_URL } from "@/lib/constants";
import { EMPTY_LINKS, parseRelease } from "@/lib/releases";
import release from "@/lib/fixtures/release.json";
import { DownloadButton } from "./DownloadButton";

const MAC_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15";
const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/126.0 Mobile Safari/537.36";
const links = parseRelease(release);

function stubUserAgent(ua: string) {
  vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue(ua);
}

describe("DownloadButton", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 403 }));
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("hero variant follows a macOS visitor to the dmg", async () => {
    stubUserAgent(MAC_UA);
    render(<DownloadButton lang="en" links={links} variant="hero" />);
    const link = await screen.findByRole("link", { name: "Download for macOS" });
    expect(link).toHaveAttribute("href", links.files.dmg);
  });

  it("falls back to Windows on a phone", async () => {
    stubUserAgent(ANDROID_UA);
    render(<DownloadButton lang="en" links={links} variant="hero" />);
    const link = await screen.findByRole("link", { name: "Download for Windows" });
    expect(link).toHaveAttribute("href", links.files.exe);
  });

  it("links to the fallback page when no release is known", async () => {
    stubUserAgent(MAC_UA);
    render(<DownloadButton lang="fr" links={EMPTY_LINKS} variant="hero" />);
    const link = await screen.findByRole("link", { name: "Télécharger pour macOS" });
    expect(link).toHaveAttribute("href", FALLBACK_URL);
  });

  it("card variant is fixed to its own system", () => {
    stubUserAgent(MAC_UA);
    render(<DownloadButton lang="en" links={links} variant="card" os="linux" />);
    const link = screen.getByRole("link", { name: "Download for Linux" });
    expect(link).toHaveAttribute("href", links.files.appimage);
    expect(link).toHaveTextContent("Download");
  });
});
