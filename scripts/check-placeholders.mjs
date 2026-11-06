// Fails when a built .html file still contains a "TODO(" placeholder.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const dir = process.argv[2];
if (!dir) {
  process.stderr.write("usage: check-placeholders.mjs <dir>\n");
  process.exit(2);
}

const offenders = htmlFiles(dir).filter((f) => readFileSync(f, "utf8").includes("TODO("));
if (offenders.length > 0) {
  process.stderr.write(
    `Unfilled TODO( placeholders found in:\n${offenders.map((f) => `  ${f}`).join("\n")}\n`,
  );
  process.exit(1);
}
