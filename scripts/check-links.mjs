import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const HREF = /\shref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });
}

function internalHrefs(html) {
  return [...html.matchAll(HREF)]
    .map((m) => (m[1] ?? m[2]).trim())
    .filter((h) => h && !h.startsWith("#") && !EXTERNAL.test(h))
    .map((h) => h.split(/[?#]/)[0])
    .filter((h) => h.startsWith("/"));
}

function resolves(href) {
  const rel = href.replace(/^\/+/, "");
  const target = join(root, rel);
  if (href.endsWith("/")) return existsSync(join(target, "index.html"));
  return existsSync(target) && statSync(target).isFile();
}

function findBroken() {
  const broken = [];
  for (const file of htmlFiles(root)) {
    for (const href of new Set(internalHrefs(readFileSync(file, "utf8")))) {
      if (!resolves(href)) broken.push(`${file.slice(root.length + 1)} -> ${href}`);
    }
  }
  return broken;
}

const broken = findBroken();
if (broken.length > 0) {
  process.stderr.write(`Broken internal links:\n${broken.join("\n")}\n`);
  process.exit(1);
}
