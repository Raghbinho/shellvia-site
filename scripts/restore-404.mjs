// Next.js writes its own generic out/404.html during export; the site ships a
// standalone bilingual one in public/, so put it back after the build.
import { copyFileSync } from "node:fs";

copyFileSync("public/404.html", "out/404.html");
