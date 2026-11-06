import { describe, expect, it } from "vitest";
import { detectOs, recommendedFormat } from "@/lib/platform";

const WIN =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const MAC =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15";
const LINUX =
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0";
const ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36";
const IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1";

describe("detectOs", () => {
  it("detects Windows", () => {
    expect(detectOs({ userAgent: WIN })).toEqual({ os: "windows", detected: true });
  });
  it("detects macOS", () => {
    expect(detectOs({ userAgent: MAC })).toEqual({ os: "macos", detected: true });
  });
  it("detects Linux", () => {
    expect(detectOs({ userAgent: LINUX })).toEqual({ os: "linux", detected: true });
  });
  it("userAgentData platform wins over the UA", () => {
    expect(detectOs({ userAgent: WIN, userAgentData: { platform: "macOS" } })).toEqual({
      os: "macos",
      detected: true,
    });
  });
  it("mobile is not detected", () => {
    const none = { os: "windows", detected: false };
    expect(detectOs({ userAgent: ANDROID })).toEqual(none);
    expect(detectOs({ userAgent: IPHONE })).toEqual(none);
    expect(detectOs({ userAgent: WIN, userAgentData: { mobile: true } })).toEqual(none);
    expect(detectOs({ userAgent: "SomethingOdd/1.0" })).toEqual(none);
  });
});

describe("recommendedFormat", () => {
  it("maps each OS", () => {
    expect(recommendedFormat("windows")).toBe("exe");
    expect(recommendedFormat("macos")).toBe("dmg");
    expect(recommendedFormat("linux")).toBe("appimage");
  });
});
