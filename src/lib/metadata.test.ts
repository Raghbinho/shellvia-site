import { describe, expect, it } from "vitest";
import { pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  it("builds absolute canonical and alternates", () => {
    const m = pageMetadata("download", "fr", "T", "D");
    expect(m.alternates?.canonical).toBe("https://shellvia.com/fr/telecharger/");
    expect(m.alternates?.languages).toEqual({
      en: "https://shellvia.com/download/",
      fr: "https://shellvia.com/fr/telecharger/",
      "x-default": "https://shellvia.com/download/",
    });
  });
});
