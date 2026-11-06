import { act, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Features } from "./Features";

type Callback = (entries: Array<{ isIntersecting: boolean }>) => void;

function stubObserver() {
  const state: { callback?: Callback; options?: IntersectionObserverInit; disconnected: boolean } =
    { disconnected: false };
  class FakeObserver {
    constructor(cb: Callback, options?: IntersectionObserverInit) {
      state.callback = cb;
      state.options = options;
    }
    observe() {}
    unobserve() {}
    disconnect() {
      state.disconnected = true;
    }
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  return state;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Features", () => {
  it("renders the section, nine tiles and nine chips", () => {
    stubObserver();
    render(<Features lang="en" />);
    expect(document.getElementById("features")).not.toBeNull();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    const tiles = within(screen.getByTestId("feature-grid")).getAllByRole("listitem");
    expect(tiles).toHaveLength(9);
    const chips = within(screen.getByRole("list", { name: "And also" })).getAllByRole("listitem");
    expect(chips).toHaveLength(9);
  });

  it("is localized in French", () => {
    stubObserver();
    render(<Features lang="fr" />);
    expect(screen.getByText("Glissez, c'est transféré.")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Et aussi" })).toBeInTheDocument();
  });

  it("has no data-play until the grid is visible, then sets it", () => {
    const observer = stubObserver();
    render(<Features lang="en" />);
    const grid = screen.getByTestId("feature-grid");
    expect(grid).not.toHaveAttribute("data-play");
    expect(observer.options?.threshold).toBe(0.15);
    act(() => observer.callback?.([{ isIntersecting: false }]));
    expect(grid).not.toHaveAttribute("data-play");
    act(() => observer.callback?.([{ isIntersecting: true }]));
    expect(grid).toHaveAttribute("data-play", "true");
    expect(observer.disconnected).toBe(true);
  });

  it("plays at once when IntersectionObserver is missing", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Features lang="en" />);
    expect(screen.getByTestId("feature-grid")).toHaveAttribute("data-play", "true");
  });
});
