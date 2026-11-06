import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const SCRIPT = resolve(process.cwd(), "scripts", "check-links.mjs");
const dirs = [];

function write(dir, files) {
  for (const [name, content] of Object.entries(files)) {
    const target = join(dir, name);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
}

function tempDir(files) {
  const dir = mkdtempSync(join(tmpdir(), "links-"));
  dirs.push(dir);
  write(dir, files);
  return dir;
}

function run(dir) {
  return spawnSync(process.execPath, [SCRIPT, dir], { encoding: "utf8" });
}

afterEach(() => {
  while (dirs.length) rmSync(dirs.pop(), { recursive: true, force: true });
});

const link = (href) => `<a href="${href}">x</a>`;

describe("check-links", () => {
  it("fails and names a broken internal link, then passes once fixed", () => {
    const dir = tempDir({
      "index.html": link("/download/") + link("/missing/"),
      "download/index.html": "<p>d</p>",
    });
    const r = run(dir);
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("/missing/");
    expect(r.stderr).not.toContain("/download/");

    write(dir, { "missing/index.html": "<p>m</p>" });
    expect(run(dir).status).toBe(0);
  });

  it("ignores anchors, external and mailto links, strips ? and #", () => {
    const dir = tempDir({
      "index.html": [
        link("#top"),
        link("https://example.com/x"),
        link("mailto:a@b.c"),
        link("/download/?os=win#dl"),
        link("/feed.xml"),
      ].join(""),
      "download/index.html": "<p>d</p>",
      "feed.xml": "<rss/>",
    });
    expect(run(dir).status).toBe(0);
  });

  it("fails when a file link such as /x.xml is missing", () => {
    const r = run(tempDir({ "index.html": link("/x.xml") }));
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("/x.xml");
  });
});
