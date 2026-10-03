import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Demo from "../pages/Demo";

function renderDemo() {
  return render(<MemoryRouter><Demo /></MemoryRouter>);
}

describe("Demo page", () => {
  it("renders the page heading", () => {
    renderDemo();
    expect(screen.getByText("Try AI Voice Agent Demo")).toBeInTheDocument();
  });

  it("renders scenario buttons", () => {
    renderDemo();
    expect(screen.getByText("Customer Support")).toBeInTheDocument();
    expect(screen.getByText("Sales Outreach")).toBeInTheDocument();
    expect(screen.getByText("Appointment Booking")).toBeInTheDocument();
  });

  it("shows greeting message for selected scenario", () => {
    renderDemo();
    expect(screen.getByText(/Thanks for calling Acme Support/)).toBeInTheDocument();
  });

  it("switches scenarios", async () => {
    renderDemo();
    await userEvent.click(screen.getByText("Sales Outreach"));
    expect(screen.getByText(/calling from Acme Solutions/)).toBeInTheDocument();
  });

  it("sends a message via text input", async () => {
    renderDemo();
    const input = screen.getByPlaceholderText(/Type a message/);
    await userEvent.type(input, "I need help");
    await userEvent.click(screen.getByText("Send"));
    expect(screen.getByText("I need help")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    renderDemo();
    expect(screen.getByText("Ready to Build Your Own AI Agent?")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderDemo();
    expect(screen.getByText("Share this demo with your team")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on WhatsApp")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Copy link")).toBeInTheDocument();
  });
});
