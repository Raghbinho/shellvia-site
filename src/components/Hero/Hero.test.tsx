import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders one h1, the download button and the features link", () => {
    render(<Hero lang="en" downloadHref="https://example.test/dl" downloadOs="Windows" />);
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
    render(<Hero lang="fr" downloadHref="/x" downloadOs="Windows" />);
    expect(screen.getByRole("link", { name: /Télécharger pour Windows/ })).toBeInTheDocument();
    expect(screen.getByText("Une seule app.")).toBeInTheDocument();
  });
});
