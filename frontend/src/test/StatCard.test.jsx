import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatCard from "../components/StatCard";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Total Calls" value={42} />);
    expect(screen.getByText("Total Calls")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders sub text when provided", () => {
    render(<StatCard label="Usage" value="25/50" sub="50% used" />);
    expect(screen.getByText("50% used")).toBeInTheDocument();
  });

  it("applies tone class", () => {
    const { container } = render(<StatCard label="Errors" value={5} tone="bad" />);
    expect(container.querySelector(".tone-bad")).toBeTruthy();
  });
});
