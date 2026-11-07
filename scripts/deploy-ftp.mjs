import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { Client } from "basic-ftp";

const REQUIRED = ["FTP_HOST", "FTP_USER", "FTP_PASSWORD", "FTP_DIR"];
// Local deploy settings (see .env.deploy.example). Variables already set in the
// shell win over the file.
const ENV_FILE = ".env.deploy.local";

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

const dir = process.argv[2];
if (!dir) fail("Usage: node scripts/deploy-ftp.mjs <dir>");

if (existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) fail(`Missing environment variable(s): ${missing.join(", ")} (set them in ${ENV_FILE})`);

if (!process.env.FTP_DIR.endsWith("/")) fail("FTP_DIR must end with a trailing slash.");

if (!process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) {
  process.stderr.write("Warning: NEXT_PUBLIC_UMAMI_WEBSITE_ID is empty, pages are built without analytics.\n");
}

// Built here so the production build sees the variables loaded above.
const build = spawnSync("pnpm", ["build:prod"], { stdio: "inherit", shell: process.platform === "win32" });
if (build.status !== 0) fail("Production build failed, nothing was uploaded.");

const client = new Client();
try {
  await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    secure: true,
  });
  await client.ensureDir(process.env.FTP_DIR);
  await client.uploadFromDir(resolve(dir));
} catch (error) {
  // Only the error class and code: messages could echo server details.
  fail(`FTP deploy failed (${error?.code ?? error?.name ?? "error"}).`);
} finally {
  client.close();
}
