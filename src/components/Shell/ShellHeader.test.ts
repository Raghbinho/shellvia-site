import { describe, expect, it } from "vitest";
import { pageFromPath } from "./ShellHeader";

describe("pageFromPath", () => {
  it("maps paths to pages per language", () => {
    expect(pageFromPath("/download/", "en")).toBe("download");
    expect(pageFromPath("/fr/telecharger", "fr")).toBe("download");
    expect(pageFromPath("/fr/", "fr")).toBe("home");
    expect(pageFromPath("/nope/", "en")).toBe("home");
  });
});
