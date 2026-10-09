import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TextToSpeech from "../pages/TextToSpeech";

function renderPage() {
  return render(<MemoryRouter><TextToSpeech /></MemoryRouter>);
}

describe("TextToSpeech page", () => {
  it("renders the page heading", () => {
    renderPage();
    expect(screen.getByText("Free Text-to-Speech Preview")).toBeInTheDocument();
  });

  it("shows unsupported message when API missing", () => {
    renderPage();
    expect(screen.getByText(/does not support the Web Speech API/)).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    renderPage();
    expect(screen.getByText("Build AI Voice Agents for Your Business")).toBeInTheDocument();
  });

  it("renders share buttons", () => {
    renderPage();
    expect(screen.getByText("Share this tool")).toBeInTheDocument();
  });

  describe("with speechSynthesis", () => {
    beforeEach(() => {
      window.speechSynthesis = {
        getVoices: () => [{ name: "Test Voice", lang: "en-US" }],
        speak: vi.fn(),
        cancel: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });
    afterEach(() => {
      delete window.speechSynthesis;
    });

    it("renders speak button when supported", () => {
      renderPage();
      expect(screen.getByText("Speak")).toBeInTheDocument();
    });

    it("renders text input area", () => {
      renderPage();
      expect(screen.getByLabelText("Text to speak")).toBeInTheDocument();
    });

    it("has sample text pre-filled", () => {
      renderPage();
      const textarea = screen.getByLabelText("Text to speak");
      expect(textarea.value).toContain("DoAide Voice");
    });
  });
});
