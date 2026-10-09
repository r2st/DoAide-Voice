import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ScriptWriter from "../pages/ScriptWriter";

function renderPage() {
  return render(<MemoryRouter><ScriptWriter /></MemoryRouter>);
}

describe("ScriptWriter page", () => {
  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByText("Free AI Voice Script Generator")).toBeInTheDocument();
  });

  it("renders industry selector", () => {
    renderPage();
    expect(screen.getByLabelText("Industry")).toBeInTheDocument();
  });

  it("renders scenario selector", () => {
    renderPage();
    expect(screen.getByLabelText("Scenario")).toBeInTheDocument();
  });

  it("renders tone radio buttons", () => {
    renderPage();
    expect(screen.getByLabelText("Professional")).toBeInTheDocument();
    expect(screen.getByLabelText("Friendly")).toBeInTheDocument();
    expect(screen.getByLabelText("Casual")).toBeInTheDocument();
  });

  it("renders company name input", () => {
    renderPage();
    expect(screen.getByLabelText("Company Name (optional)")).toBeInTheDocument();
  });

  it("renders generate button", () => {
    renderPage();
    expect(screen.getByText("Generate Script")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    renderPage();
    expect(screen.getByText("Deploy This Script as a Live AI Agent")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderPage();
    expect(screen.getByText("Share this tool")).toBeInTheDocument();
  });

  it("does not show generated script initially", () => {
    renderPage();
    expect(screen.queryByText("Generated Script")).not.toBeInTheDocument();
  });
});
