import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (name) => readFileSync(resolve(process.cwd(), "deploy", "nginx", name), "utf8");
const site = read("shellvia.conf");

describe("nginx site config", () => {
  it("serves the six names and sends HTTP to HTTPS", () => {
    for (const name of ["shellvia.com", "www.shellvia.com", "shellvia.fr", "www.shellvia.fr", "shellvia.app", "www.shellvia.app"]) {
      expect(site).toContain(name);
    }
    expect(site).toContain("return 301 https://$host$request_uri;");
  });

  it("keeps shellvia.fr visitors in French and the others on the canonical host", () => {
    expect(site).toContain("return 301 https://shellvia.com/fr$request_uri;");
    expect(site).toContain("return 301 https://shellvia.com$request_uri;");
  });

  it("uses the nginx 1.24 http2 syntax", () => {
    expect(site).not.toMatch(/^\s*http2 on;/m);
    expect(site).toContain("listen 443 ssl http2;");
  });

  it("serves the bilingual 404 and caches only hashed files for a year", () => {
    expect(site).toContain("error_page 404 /404.html;");
    expect(site).toMatch(/location \/_next\/static\/ \{[^}]*immutable/);
    expect(site).toMatch(/location \/ \{[^}]*no-cache/);
  });

  it("repeats the security headers in every location of the site", () => {
    const served = site.slice(site.indexOf("server_name shellvia.com;"));
    const locations = served.match(/location (\/|\/_next\/static\/) \{[^}]*\}/g) ?? [];
    expect(locations).toHaveLength(2);
    for (const block of locations) expect(block).toContain("include /etc/nginx/snippets/shellvia-headers.conf;");
    expect(read("shellvia-headers.conf")).toContain('X-Content-Type-Options "nosniff" always');
  });
});
