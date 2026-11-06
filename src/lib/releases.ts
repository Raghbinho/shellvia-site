import { FALLBACK_URL, LATEST_API } from "@/lib/constants";

export type Format = "exe" | "msi" | "dmg" | "appimage" | "deb" | "rpm";

export interface ReleaseLinks {
  version: string | null;
  files: Partial<Record<Format, string>>;
}

export const EMPTY_LINKS: ReleaseLinks = { version: null, files: {} };

const IGNORED = /(\.sig|\.tar\.gz|\.zip)$/;
const SUFFIXES: ReadonlyArray<readonly [string, Format]> = [
  ["-setup.exe", "exe"],
  [".msi", "msi"],
  [".dmg", "dmg"],
  [".AppImage", "appimage"],
  [".deb", "deb"],
  [".rpm", "rpm"],
];

export function classifyAsset(name: string): Format | null {
  if (name === "latest.json" || IGNORED.test(name)) return null;
  return SUFFIXES.find(([suffix]) => name.endsWith(suffix))?.[1] ?? null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseRelease(json: unknown): ReleaseLinks {
  if (!isRecord(json) || typeof json.tag_name !== "string") return EMPTY_LINKS;
  if (!Array.isArray(json.assets)) return EMPTY_LINKS;
  const files: Partial<Record<Format, string>> = {};
  for (const asset of json.assets) {
    if (!isRecord(asset)) continue;
    const { name, browser_download_url: url } = asset;
    if (typeof name !== "string" || typeof url !== "string") continue;
    const format = classifyAsset(name);
    if (format && !(format in files)) files[format] = url;
  }
  return { version: json.tag_name.replace(/^v/, ""), files };
}

export async function fetchReleaseLinks(
  fetchFn: typeof fetch = fetch,
): Promise<ReleaseLinks> {
  try {
    const res = await fetchFn(LATEST_API, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (res.status !== 200) return EMPTY_LINKS;
    return parseRelease(await res.json());
  } catch {
    return EMPTY_LINKS;
  }
}

export async function loadBuildReleaseLinks(): Promise<ReleaseLinks> {
  const fixture = process.env.SHELLVIA_RELEASES_FIXTURE;
  if (!fixture) return fetchReleaseLinks();
  const { readFile } = await import("node:fs/promises");
  return parseRelease(JSON.parse(await readFile(fixture, "utf8")));
}

export function linkFor(links: ReleaseLinks, format: Format): string {
  return links.files[format] ?? FALLBACK_URL;
}

export function isShown(links: ReleaseLinks, format: Format): boolean {
  return links.version === null || format in links.files;
}
