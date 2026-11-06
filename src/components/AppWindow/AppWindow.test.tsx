import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppWindow } from "./AppWindow";

describe("AppWindow", () => {
  it("renders the French copy", () => {
    const { container } = render(<AppWindow lang="fr" />);
    const text = container.textContent ?? "";
    expect(text).toContain("Fichiers · web-01");
    expect(text).toContain("2 tunnels actifs");
    expect(text).toContain("cd /var/www/app && ls -la");
    const follow = container.querySelector('[aria-label="Suivre le terminal"]');
    expect(follow).not.toBeNull();
    expect(follow?.querySelector("svg")).not.toBeNull();
  });

  it("renders the English copy", () => {
    const { container } = render(<AppWindow lang="en" />);
    const text = container.textContent ?? "";
    expect(text).toContain("Files · web-01");
    expect(text).toContain("2 active tunnels");
    expect(text).toContain("3.1 KiB");
    expect(text).toContain("cd /var/www/app && ls -la");
  });
});
