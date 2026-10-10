import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Blog from "../pages/Blog";

function renderBlog(path = "/blog") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Blog page", () => {
  it("renders the blog listing", () => {
    renderBlog();
    expect(screen.getByText("DoAide Voice Blog")).toBeInTheDocument();
  });

  it("renders all 9 blog post cards", () => {
    renderBlog();
    expect(screen.getByText("AI Voice Agents vs Human Agents: 2026 Comparison")).toBeInTheDocument();
    expect(screen.getByText("How to Automate Customer Calls with AI")).toBeInTheDocument();
    expect(screen.getByText("Voice AI for Small Business: A Practical Guide")).toBeInTheDocument();
    expect(screen.getByText("Best Text-to-Speech Tools for Hindi and Indian Languages in 2026")).toBeInTheDocument();
    expect(screen.getByText(/Free Online Voice Recorder/)).toBeInTheDocument();
    expect(screen.getByText(/Audio Transcription for Indian Languages/)).toBeInTheDocument();
  });

  it("renders read article links", () => {
    renderBlog();
    const readLinks = screen.getAllByText(/Read article/);
    expect(readLinks).toHaveLength(9);
  });

  it("renders a blog post when slug matches", () => {
    renderBlog("/blog/ai-voice-agents-vs-human-agents");
    expect(screen.getByText("AI Voice Agents vs Human Agents: 2026 Comparison")).toBeInTheDocument();
    expect(screen.getByText("Cost Comparison")).toBeInTheDocument();
    expect(screen.getByText(/All Articles/)).toBeInTheDocument();
  });

  it("renders blog post CTA", () => {
    renderBlog("/blog/how-to-automate-customer-calls");
    expect(screen.getByText("Ready to Try AI Voice Agents?")).toBeInTheDocument();
  });

  it("renders share buttons on blog post", () => {
    renderBlog("/blog/voice-ai-for-small-business");
    expect(screen.getByText("Share this article")).toBeInTheDocument();
  });

  it("renders India-focused blog post", () => {
    renderBlog("/blog/best-text-to-speech-hindi-tools-india");
    expect(screen.getByText("Best Text-to-Speech Tools for Hindi and Indian Languages in 2026")).toBeInTheDocument();
    expect(screen.getByText("Why Indian Language TTS Is Different")).toBeInTheDocument();
  });

  it("injects JSON-LD structured data for blog posts with FAQs", () => {
    renderBlog("/blog/free-voice-recorder-online-india");
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const types = Array.from(scripts).map((s) => JSON.parse(s.textContent)["@type"]);
    expect(types).toContain("BlogPosting");
    expect(types).toContain("FAQPage");
  });
});
