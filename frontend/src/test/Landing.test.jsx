import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Landing from "../pages/Landing";

describe("Landing page", () => {
  it("renders hero section", () => {
    render(<MemoryRouter><Landing /></MemoryRouter>);
    expect(screen.getByText("for Your Business")).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<MemoryRouter><Landing /></MemoryRouter>);
    expect(screen.getAllByText("AI Voice Agents").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Real-time Analytics")).toBeInTheDocument();
    expect(screen.getByText("Knowledge Base")).toBeInTheDocument();
  });

  it("renders CTA links", () => {
    render(<MemoryRouter><Landing /></MemoryRouter>);
    expect(screen.getByText("Start Free")).toBeInTheDocument();
    expect(screen.getByText("Get Started Free")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<MemoryRouter><Landing /></MemoryRouter>);
    expect(screen.getByText(/DoAide Voice by Apprend Technologies/)).toBeInTheDocument();
  });
});
