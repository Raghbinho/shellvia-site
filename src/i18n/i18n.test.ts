import { describe, expect, it } from "vitest";
import { getDict } from "./index";
import { LANGS, ROUTES, otherLang, pathFor, type PageKey } from "./routes";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) =>
      keyPaths(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [`${prefix}:non-string`];
}

function leaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (value !== null && typeof value === "object") {
    return Object.values(value).flatMap(leaves);
  }
  return [];
}

describe("dictionaries", () => {
  it("same keys in both languages", () => {
    expect(keyPaths(getDict("en")).sort()).toEqual(keyPaths(getDict("fr")).sort());
  });

  it("no empty string", () => {
    for (const lang of LANGS) {
      const all = leaves(getDict(lang));
      expect(all.length).toBeGreaterThan(0);
      expect(all.every((s) => s.trim().length > 0)).toBe(true);
      expect(keyPaths(getDict(lang)).some((p) => p.endsWith(":non-string"))).toBe(false);
    }
  });

  it("never mentions beta", () => {
    for (const lang of LANGS) {
      expect(leaves(getDict(lang)).filter((s) => /b[eê]ta/i.test(s))).toEqual([]);
    }
  });
});

describe("routes", () => {
  it("routes are paired and end with a slash", () => {
    for (const page of Object.keys(ROUTES) as PageKey[]) {
      for (const lang of LANGS) {
        const p = pathFor(page, lang);
        expect(p.startsWith("/")).toBe(true);
        expect(p.endsWith("/")).toBe(true);
      }
      expect(pathFor(page, "fr").startsWith("/fr/")).toBe(true);
    }
  });

  it("otherLang", () => {
    expect(otherLang("en")).toBe("fr");
    expect(otherLang("fr")).toBe("en");
  });
});
