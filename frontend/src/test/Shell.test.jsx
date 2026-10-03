import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Shell from "../components/Shell";
import { AuthProvider } from "../hooks/useAuth";
import { ThemeProvider } from "../hooks/useTheme";

vi.mock("../lib/api", () => ({
  api: { get: vi.fn().mockResolvedValue({}), post: vi.fn().mockResolvedValue({}), login: vi.fn().mockResolvedValue({ access_token: "t" }) },
  getToken: vi.fn().mockReturnValue("fake-token"),
  setToken: vi.fn(),
}));

function renderShell() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <AuthProvider>
          <Shell><div>Page content</div></Shell>
        </AuthProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe("Shell", () => {
  it("renders brand name", () => {
    renderShell();
    expect(screen.getByText("Voice")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderShell();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Agents")).toBeInTheDocument();
    expect(screen.getByText("Calls")).toBeInTheDocument();
    expect(screen.getByText("Campaigns")).toBeInTheDocument();
    expect(screen.getByText("Knowledge")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders sign out button", () => {
    renderShell();
    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  it("renders children content", () => {
    renderShell();
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders skip to content link", () => {
    renderShell();
    expect(screen.getByText("Skip to content")).toBeInTheDocument();
  });

  it("renders theme toggle", () => {
    renderShell();
    expect(screen.getByRole("button", { name: /theme/i })).toBeInTheDocument();
  });

  it("toggles mobile menu", async () => {
    renderShell();
    const toggle = screen.getByLabelText("Open menu");
    await userEvent.click(toggle);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });
});
