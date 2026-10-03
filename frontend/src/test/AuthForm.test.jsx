import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AuthForm from "../components/AuthForm";
import { AuthProvider } from "../hooks/useAuth";

vi.mock("../lib/api", () => ({
  api: { get: vi.fn().mockResolvedValue({}), post: vi.fn().mockResolvedValue({}), login: vi.fn().mockResolvedValue({ access_token: "t" }) },
  getToken: vi.fn().mockReturnValue(null),
  setToken: vi.fn(),
}));

function renderForm() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <AuthForm />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("AuthForm", () => {
  it("renders sign in and create account tabs", () => {
    renderForm();
    expect(screen.getByRole("tab", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Create account" })).toBeInTheDocument();
  });

  it("starts in register mode", () => {
    renderForm();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
  });

  it("switches to login mode and hides registration fields", async () => {
    renderForm();
    await userEvent.click(screen.getByRole("tab", { name: "Sign in" }));
    expect(screen.queryByLabelText(/your name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/business name/i)).not.toBeInTheDocument();
  });

  it("shows validation error when email is empty", async () => {
    renderForm();
    await userEvent.click(screen.getByRole("tab", { name: "Sign in" }));
    await userEvent.click(screen.getByText("Sign in", { selector: "button[type='submit']" }));
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
  });

  it("shows validation error when password is empty", async () => {
    renderForm();
    await userEvent.click(screen.getByRole("tab", { name: "Sign in" }));
    await userEvent.type(screen.getByLabelText(/email/i), "a@b.com");
    await userEvent.click(screen.getByText("Sign in", { selector: "button[type='submit']" }));
    expect(screen.getByText("Enter your password.")).toBeInTheDocument();
  });
});
