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

  it("renders all 3 blog post cards", () => {
    renderBlog();
    expect(screen.getByText("AI Voice Agents vs Human Agents: 2026 Comparison")).toBeInTheDocument();
    expect(screen.getByText("How to Automate Customer Calls with AI")).toBeInTheDocument();
    expect(screen.getByText("Voice AI for Small Business: A Practical Guide")).toBeInTheDocument();
  });

  it("renders read article links", () => {
    renderBlog();
    const readLinks = screen.getAllByText(/Read article/);
    expect(readLinks).toHaveLength(3);
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
});
