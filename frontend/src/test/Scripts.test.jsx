import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Scripts from "../pages/Scripts";

function renderScripts() {
  return render(<MemoryRouter><Scripts /></MemoryRouter>);
}

describe("Scripts page", () => {
  it("renders the page heading", () => {
    renderScripts();
    expect(screen.getByText("AI Voice Agent Scripts Library")).toBeInTheDocument();
  });

  it("renders all 6 script cards", () => {
    renderScripts();
    expect(screen.getByText("Sales Outreach")).toBeInTheDocument();
    expect(screen.getByText("Customer Support")).toBeInTheDocument();
    expect(screen.getByText("Appointment Booking")).toBeInTheDocument();
    expect(screen.getByText("Customer Survey")).toBeInTheDocument();
    expect(screen.getByText("Follow-up Call")).toBeInTheDocument();
    expect(screen.getByText("Lead Qualification")).toBeInTheDocument();
  });

  it("expands script preview on click", async () => {
    renderScripts();
    const viewBtns = screen.getAllByText("View Script");
    await userEvent.click(viewBtns[0]);
    expect(screen.getByText("Hide Script")).toBeInTheDocument();
  });

  it("renders category badges", () => {
    renderScripts();
    expect(screen.getAllByText("Sales")).toHaveLength(2);
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Scheduling")).toBeInTheDocument();
    expect(screen.getByText("Research")).toBeInTheDocument();
    expect(screen.getByText("Retention")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    renderScripts();
    expect(screen.getByText("Deploy These Scripts as AI Voice Agents")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderScripts();
    expect(screen.getByText("Share these scripts with your team")).toBeInTheDocument();
  });
});
