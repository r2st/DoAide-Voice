import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeProvider } from "../hooks/useTheme";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  it("renders a button with theme label", () => {
    renderToggle();
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(btn.getAttribute("aria-label")).toMatch(/Theme:/);
  });

  it("cycles through themes on click", async () => {
    renderToggle();
    const btn = screen.getByRole("button");
    expect(btn.getAttribute("aria-label")).toContain("Auto");
    await userEvent.click(btn);
    expect(btn.getAttribute("aria-label")).toContain("Light");
    await userEvent.click(btn);
    expect(btn.getAttribute("aria-label")).toContain("Dark");
    await userEvent.click(btn);
    expect(btn.getAttribute("aria-label")).toContain("Auto");
  });
});
