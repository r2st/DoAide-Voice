import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Calculator from "../pages/Calculator";

function renderCalc() {
  return render(<MemoryRouter><Calculator /></MemoryRouter>);
}

describe("Calculator page", () => {
  it("renders the page heading", () => {
    renderCalc();
    expect(screen.getByText("AI Voice Agent ROI Calculator")).toBeInTheDocument();
  });

  it("renders input fields", () => {
    renderCalc();
    expect(screen.getByLabelText("Calls per month")).toBeInTheDocument();
    expect(screen.getByLabelText("Average handle time (minutes)")).toBeInTheDocument();
    expect(screen.getByLabelText("Agent hourly rate ($)")).toBeInTheDocument();
  });

  it("renders calculate button", () => {
    renderCalc();
    expect(screen.getByText("Calculate Savings")).toBeInTheDocument();
  });

  it("shows results after clicking calculate", async () => {
    renderCalc();
    await userEvent.click(screen.getByText("Calculate Savings"));
    expect(screen.getByText("Annual Savings")).toBeInTheDocument();
    expect(screen.getByText("Monthly Savings")).toBeInTheDocument();
    expect(screen.getByText("Cost Reduction")).toBeInTheDocument();
  });

  it("renders breakdown section", async () => {
    renderCalc();
    await userEvent.click(screen.getByText("Calculate Savings"));
    expect(screen.getByText("Current monthly cost")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderCalc();
    expect(screen.getByText("Share this calculator with your team")).toBeInTheDocument();
  });
});
