import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ShareButtons from "../components/ShareButtons";

describe("ShareButtons component", () => {
  it("renders WhatsApp, Twitter, and Copy buttons", () => {
    render(
      <MemoryRouter>
        <ShareButtons url="https://example.com" text="Test" />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Share on WhatsApp")).toBeInTheDocument();
    expect(screen.getByLabelText("Share on Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("Copy link")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(
      <MemoryRouter>
        <ShareButtons url="https://example.com" text="Test" label="Share results" />
      </MemoryRouter>
    );
    expect(screen.getByRole("group", { name: "Share results" })).toBeInTheDocument();
  });

  it("WhatsApp link includes text and url", () => {
    render(
      <MemoryRouter>
        <ShareButtons url="https://example.com" text="Hello world" />
      </MemoryRouter>
    );
    const wa = screen.getByLabelText("Share on WhatsApp");
    expect(wa.getAttribute("href")).toContain("wa.me");
    expect(wa.getAttribute("href")).toContain("Hello");
  });
});
