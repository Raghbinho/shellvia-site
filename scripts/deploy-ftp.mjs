import { resolve } from "node:path";
import { Client } from "basic-ftp";

const REQUIRED = ["FTP_HOST", "FTP_USER", "FTP_PASSWORD", "FTP_DIR"];

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

const dir = process.argv[2];
if (!dir) fail("Usage: node scripts/deploy-ftp.mjs <dir>");

const missing = REQUIRED.filter((name) => !process.env[name]);
if (missing.length > 0) fail(`Missing environment variable(s): ${missing.join(", ")}`);

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
