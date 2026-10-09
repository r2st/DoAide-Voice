import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SpeechToText from "../pages/SpeechToText";

function renderPage() {
  return render(<MemoryRouter><SpeechToText /></MemoryRouter>);
}

describe("SpeechToText page", () => {
  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByText("Free Speech-to-Text Demo")).toBeInTheDocument();
  });

  it("shows unsupported message when API missing", () => {
    renderPage();
    expect(screen.getByText(/does not support the Web Speech API/)).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    renderPage();
    expect(screen.getByText("Go Beyond Transcription")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderPage();
    expect(screen.getByText("Share this tool")).toBeInTheDocument();
  });

  describe("with SpeechRecognition", () => {
    beforeEach(() => {
      window.SpeechRecognition = vi.fn().mockImplementation(() => ({
        start: vi.fn(),
        stop: vi.fn(),
        continuous: false,
        interimResults: false,
        lang: "",
        onresult: null,
        onerror: null,
        onend: null,
      }));
    });
    afterEach(() => {
      delete window.SpeechRecognition;
    });

    it("renders language selector when supported", () => {
      renderPage();
      expect(screen.getByLabelText("Language")).toBeInTheDocument();
    });

    it("shows word count", () => {
      renderPage();
      expect(screen.getByText("0 words")).toBeInTheDocument();
    });

    it("renders start listening button", () => {
      renderPage();
      expect(screen.getByText("Start Listening")).toBeInTheDocument();
    });

    it("renders clear and copy buttons", () => {
      renderPage();
      expect(screen.getByText("Clear")).toBeInTheDocument();
      expect(screen.getByText("Copy Text")).toBeInTheDocument();
    });
  });
});
