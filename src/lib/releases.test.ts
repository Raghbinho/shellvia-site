import { describe, expect, it } from "vitest";
import { FALLBACK_URL } from "@/lib/constants";
import fixture from "@/lib/fixtures/release.json";
import {
  EMPTY_LINKS,
  classifyAsset,
  fetchReleaseLinks,
  isShown,
  linkFor,
  parseRelease,
} from "@/lib/releases";

const okResponse = (body: unknown): Response =>
  ({ ok: true, status: 200, json: async () => body }) as Response;

describe("releases", () => {
  it("parses the version and the six formats it has", () => {
    const links = parseRelease(fixture);
    expect(links.version).toBe("0.3.0");
    expect(links.files.exe).toMatch(/x64-setup\.exe$/);
    expect(links.files.msi).toMatch(/\.msi$/);
    expect(links.files.dmg).toMatch(/\.dmg$/);
    expect(links.files.deb).toMatch(/\.deb$/);
    expect(links.files.rpm).toBeUndefined();
  });

  it("ignores signatures and updater archives", () => {
    expect(parseRelease(fixture).files.appimage).toMatch(/\.AppImage$/);
    expect(classifyAsset("x.AppImage.sig")).toBeNull();
    expect(classifyAsset("x.app.tar.gz")).toBeNull();
    expect(classifyAsset("latest.json")).toBeNull();
    expect(classifyAsset("x-setup.exe.sig")).toBeNull();
    expect(classifyAsset("x.zip")).toBeNull();
  });

  it("malformed input gives empty links", () => {
    expect(parseRelease(null)).toEqual(EMPTY_LINKS);
    expect(parseRelease({})).toEqual(EMPTY_LINKS);
    expect(parseRelease({ assets: "x" })).toEqual(EMPTY_LINKS);
  });

  it("fetch failure gives empty links", async () => {
    const rejecting = (async () => {
      throw new Error("offline");
    }) as unknown as typeof fetch;
    const forbidden = (async () =>
      ({ ok: false, status: 403, json: async () => ({}) }) as Response) as typeof fetch;
    expect(await fetchReleaseLinks(rejecting)).toEqual(EMPTY_LINKS);
    expect(await fetchReleaseLinks(forbidden)).toEqual(EMPTY_LINKS);
  });

  it("fetch success parses the release", async () => {
    const fake = (async () => okResponse(fixture)) as typeof fetch;
    expect((await fetchReleaseLinks(fake)).version).toBe("0.3.0");
  });

  it("linkFor falls back", () => {
    expect(linkFor(EMPTY_LINKS, "exe")).toBe(FALLBACK_URL);
    expect(linkFor(parseRelease(fixture), "rpm")).toBe(FALLBACK_URL);
    expect(linkFor(parseRelease(fixture), "deb")).toMatch(/\.deb$/);
  });

  it("isShown", () => {
    for (const f of ["exe", "msi", "dmg", "appimage", "deb", "rpm"] as const) {
      expect(isShown(EMPTY_LINKS, f)).toBe(true);
    }
    const links = parseRelease(fixture);
    expect(isShown(links, "rpm")).toBe(false);
    expect(isShown(links, "deb")).toBe(true);
  });
});
