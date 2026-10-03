import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Landing from "../pages/Landing";
import { AuthProvider } from "../hooks/useAuth";

vi.mock("../lib/api", () => ({
  api: { get: vi.fn().mockResolvedValue({}), post: vi.fn().mockResolvedValue({}), login: vi.fn().mockResolvedValue({ access_token: "t" }) },
  getToken: vi.fn().mockReturnValue(null),
  setToken: vi.fn(),
}));

function renderLanding() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Landing />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Landing page", () => {
  it("renders hero headline", () => {
    renderLanding();
    expect(screen.getByText("AI Voice Agents for Your Business")).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    renderLanding();
    expect(screen.getByText("AI Voice Agents")).toBeInTheDocument();
    expect(screen.getByText("Inbound Call Handling")).toBeInTheDocument();
    expect(screen.getByText("Outbound Campaigns")).toBeInTheDocument();
    expect(screen.getByText("Real-time Analytics")).toBeInTheDocument();
    expect(screen.getByText("Knowledge Base")).toBeInTheDocument();
    expect(screen.getByText("Twilio Integration")).toBeInTheDocument();
  });

  it("renders how-it-works section", () => {
    renderLanding();
    expect(screen.getByRole("heading", { name: "How It Works" })).toBeInTheDocument();
    expect(screen.getByText("Build your agent")).toBeInTheDocument();
    expect(screen.getByText("Connect a number")).toBeInTheDocument();
    expect(screen.getByText("Track results")).toBeInTheDocument();
  });

  it("renders testimonials", () => {
    renderLanding();
    expect(screen.getByText("Trusted by Growing Businesses")).toBeInTheDocument();
    expect(screen.getByText("Sarah K.")).toBeInTheDocument();
  });

  it("renders FAQ section with toggle", async () => {
    renderLanding();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    const q = screen.getByText("What are AI voice agents?");
    expect(q).toBeInTheDocument();
    await userEvent.click(q);
    expect(screen.getByText(/intelligent virtual assistants/)).toBeInTheDocument();
  });

  it("renders CTA section", () => {
    renderLanding();
    expect(screen.getByText("Start Building Your AI Voice Team")).toBeInTheDocument();
    expect(screen.getByText("Sign Up Free")).toBeInTheDocument();
  });

  it("renders footer with DoAide product links", () => {
    renderLanding();
    expect(screen.getByText("doaide.com")).toBeInTheDocument();
    expect(screen.getByText("GST")).toBeInTheDocument();
    expect(screen.getByText("Desk")).toBeInTheDocument();
  });

  it("renders auth form with tabs", () => {
    renderLanding();
    expect(screen.getByRole("tab", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Create account" })).toBeInTheDocument();
  });

  it("renders pricing hints", () => {
    renderLanding();
    expect(screen.getByText("Free forever")).toBeInTheDocument();
    expect(screen.getByText("From $49/mo")).toBeInTheDocument();
  });
});
