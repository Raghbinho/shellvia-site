import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HOST, PUBLISHER } from "@/content/publisher";
import { LegalNotice } from "./LegalNotice";

describe("LegalNotice", () => {
  it("names the publisher, the contact address and the host", () => {
    render(<LegalNotice lang="fr" />);
    expect(screen.getByText(PUBLISHER.name)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: PUBLISHER.email })).toHaveAttribute("href", `mailto:${PUBLISHER.email}`);
    expect(screen.getByText(HOST.name)).toBeInTheDocument();
  });

  it("leaves out the address line while no address is given", () => {
    render(<LegalNotice lang="fr" />);
    expect(screen.queryByText("Adresse :")).toBeNull();
    expect(screen.getByText("Adresse de l'hébergeur :")).toBeInTheDocument();
  });
});
