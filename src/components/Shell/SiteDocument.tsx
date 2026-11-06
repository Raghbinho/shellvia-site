import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/inter";
import "@/styles/tokens.css";
import "@/styles/global.css";
import type { Lang } from "@/i18n";
import { Analytics } from "./Analytics";
import { Footer } from "./Footer";
import { ShellHeader } from "./ShellHeader";

export function SiteDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang}>
      <body>
        <ShellHeader lang={lang} />
        <main className="shell-wrap">{children}</main>
        <div className="shell-wrap">
          <Footer lang={lang} />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
