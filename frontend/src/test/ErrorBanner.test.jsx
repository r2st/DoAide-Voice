import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ErrorBanner from "../components/ErrorBanner";

describe("ErrorBanner", () => {
  it("renders nothing when message is empty", () => {
    const { container } = render(<ErrorBanner message="" />);
    expect(container.innerHTML).toBe("");
  });

  it("renders error message", () => {
    render(<ErrorBanner message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("calls onDismiss when close is clicked", async () => {
    const dismiss = vi.fn();
    render(<ErrorBanner message="Error" onDismiss={dismiss} />);
    await userEvent.click(screen.getByLabelText("Dismiss"));
    expect(dismiss).toHaveBeenCalledOnce();
  });
});
