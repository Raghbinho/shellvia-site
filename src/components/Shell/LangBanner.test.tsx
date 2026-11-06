import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LangBanner } from "./LangBanner";

function setLanguage(value: string) {
  vi.spyOn(window.navigator, "language", "get").mockReturnValue(value);
}

beforeEach(() => window.localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe("LangBanner", () => {
  it("offers French to a French browser on an English page", async () => {
    setLanguage("fr-FR");
    render(<LangBanner lang="en" page="home" />);
    expect(await screen.findByText("Ce site existe en français")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/fr/");
  });

  it("links to the matching page", async () => {
    setLanguage("fr-FR");
    render(<LangBanner lang="en" page="download" />);
    expect(await screen.findByRole("link")).toHaveAttribute("href", "/fr/telecharger/");
  });

  it("offers English to a non-French browser on a French page", async () => {
    setLanguage("de-DE");
    render(<LangBanner lang="fr" page="home" />);
    expect(await screen.findByText("This site is available in English")).toBeInTheDocument();
  });

  it("shows nothing when the language already matches", () => {
    setLanguage("en-US");
    const { container } = render(<LangBanner lang="en" page="home" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("stays hidden after being closed", async () => {
    setLanguage("fr-FR");
    const first = render(<LangBanner lang="en" page="home" />);
    await userEvent.click(await screen.findByRole("button", { name: "Fermer" }));
    expect(first.container).toBeEmptyDOMElement();
    first.unmount();
    const second = render(<LangBanner lang="en" page="home" />);
    expect(second.container).toBeEmptyDOMElement();
  });

  it("still renders when localStorage throws", async () => {
    setLanguage("fr-FR");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<LangBanner lang="en" page="home" />);
    const close = await screen.findByRole("button", { name: "Fermer" });
    await userEvent.click(close);
    expect(screen.queryByRole("button", { name: "Fermer" })).toBeNull();
  });
});
