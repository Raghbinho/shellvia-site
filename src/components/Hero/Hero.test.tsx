import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders one h1, the download button and the features link", () => {
    render(<Hero
        lang="en"
        cta={<a href="https://example.test/dl">Download for Windows</a>}
      />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /Download for Windows/ })).toHaveAttribute(
      "href",
      "https://example.test/dl",
    );
    expect(screen.getByRole("link", { name: "See the features" })).toHaveAttribute(
      "href",
      "#features",
    );
  });

  it("is localized in French", () => {
    render(<Hero lang="fr" cta={<a href="/x">Télécharger pour Windows</a>} />);
    expect(screen.getByRole("link", { name: /Télécharger pour Windows/ })).toBeInTheDocument();
    expect(screen.getByText("Une seule app.")).toBeInTheDocument();
  });
});
