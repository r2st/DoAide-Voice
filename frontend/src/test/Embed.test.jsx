import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Embed from "../pages/Embed";

function renderEmbed() {
  return render(<MemoryRouter><Embed /></MemoryRouter>);
}

describe("Embed page", () => {
  it("renders the page heading", () => {
    renderEmbed();
    expect(screen.getByText("Embed AI Voice Widget")).toBeInTheDocument();
  });

  it("renders configuration options", () => {
    renderEmbed();
    expect(screen.getByLabelText("Button text")).toBeInTheDocument();
    expect(screen.getByLabelText("Primary color")).toBeInTheDocument();
    expect(screen.getByText("Bottom Right")).toBeInTheDocument();
    expect(screen.getByText("Bottom Left")).toBeInTheDocument();
  });

  it("renders theme options", () => {
    renderEmbed();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Brand Gold")).toBeInTheDocument();
  });

  it("renders preview with default button text", () => {
    renderEmbed();
    expect(screen.getByText("Talk to AI")).toBeInTheDocument();
  });

  it("renders embed code section", () => {
    renderEmbed();
    expect(screen.getByText("Embed Code")).toBeInTheDocument();
    expect(screen.getByText("Copy Code")).toBeInTheDocument();
  });

  it("updates preview when button text changes", async () => {
    renderEmbed();
    const input = screen.getByLabelText("Button text");
    await userEvent.clear(input);
    await userEvent.type(input, "Ask AI");
    expect(screen.getByText("Ask AI")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderEmbed();
    expect(screen.getByText("Share with your developer")).toBeInTheDocument();
  });
});
