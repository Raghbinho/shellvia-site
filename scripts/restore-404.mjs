// Next.js writes its own generic out/404.html during export; the site ships a
// standalone bilingual one in public/, so put it back after the build.
import { copyFileSync, rmSync } from "node:fs";

copyFileSync("public/404.html", "out/404.html");
// Next also exports generic 404 pages as directories; only 404.html ships.
for (const dir of ["out/404", "out/_not-found"]) {
  rmSync(dir, { recursive: true, force: true });
}
