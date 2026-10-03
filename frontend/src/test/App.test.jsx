import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { AuthProvider } from "../hooks/useAuth";
import { ThemeProvider } from "../hooks/useTheme";

vi.mock("../lib/api", () => ({
  api: {
    get: vi.fn().mockResolvedValue({}),
    post: vi.fn().mockResolvedValue({}),
    login: vi.fn().mockResolvedValue({ access_token: "tok" }),
  },
  getToken: vi.fn().mockReturnValue(null),
  setToken: vi.fn(),
}));

function renderApp(route = "/") {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe("App routing", () => {
  it("renders landing page at /", () => {
    renderApp("/");
    expect(screen.getByText("Your AI Receptionist is Ready")).toBeInTheDocument();
  });

  it("renders login page at /login", () => {
    renderApp("/login");
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });

  it("renders register page at /register", () => {
    renderApp("/register");
    expect(screen.getByText("Create your account")).toBeInTheDocument();
  });

  it("renders pricing page at /pricing", () => {
    renderApp("/pricing");
    expect(screen.getByText("Simple, Transparent Pricing")).toBeInTheDocument();
  });

  it("redirects dashboard to login when not authenticated", () => {
    renderApp("/dashboard");
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
  });
});
