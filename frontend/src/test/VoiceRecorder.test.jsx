import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import VoiceRecorder from "../pages/VoiceRecorder";

function renderPage() {
  return render(<MemoryRouter><VoiceRecorder /></MemoryRouter>);
}

describe("VoiceRecorder page", () => {
  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByText("Free Voice Recorder")).toBeInTheDocument();
  });

  it("renders the start recording button", () => {
    renderPage();
    expect(screen.getByText("Start Recording")).toBeInTheDocument();
  });

  it("renders the timer at 0:00", () => {
    renderPage();
    expect(screen.getByText("0:00")).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    renderPage();
    expect(screen.getByText("Turn Recordings into AI Voice Agents")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderPage();
    expect(screen.getByText("Share this tool")).toBeInTheDocument();
  });

  it("does not show recordings list initially", () => {
    renderPage();
    expect(screen.queryByText(/Recordings \(/)).not.toBeInTheDocument();
  });
});
