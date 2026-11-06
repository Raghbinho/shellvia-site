import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const SCRIPT = resolve(process.cwd(), "scripts", "check-placeholders.mjs");
const dirs = [];

function tempDir(files) {
  const dir = mkdtempSync(join(tmpdir(), "placeholders-"));
  dirs.push(dir);
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(dir, name), content);
  }
  return dir;
}

function run(dir) {
  return spawnSync(process.execPath, [SCRIPT, dir], {
    encoding: "utf8",
  });
}

afterEach(() => {
  while (dirs.length) rmSync(dirs.pop(), { recursive: true, force: true });
});

describe("check-placeholders", () => {
  it("fails and lists the file when a TODO( placeholder is present", () => {
    const r = run(tempDir({ "a.html": "<p>TODO(éditeur)</p>", "b.html": "<p>ok</p>" }));
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("a.html");
    expect(r.stderr).not.toContain("b.html");
  });

  it("passes on a clean directory", () => {
    expect(run(tempDir({ "a.html": "<p>clean</p>" })).status).toBe(0);
  });
});
