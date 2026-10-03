import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Pricing from "../pages/Pricing";

describe("Pricing page", () => {
  it("renders all three plans", () => {
    render(<MemoryRouter><Pricing /></MemoryRouter>);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
  });

  it("renders prices", () => {
    render(<MemoryRouter><Pricing /></MemoryRouter>);
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("marks Pro as most popular", () => {
    render(<MemoryRouter><Pricing /></MemoryRouter>);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });
});
