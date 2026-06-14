import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Lightbox from "../components/Lightbox";

describe("Lightbox", () => {
  it("renders nothing when open is false", () => {
    render(<Lightbox open={false} onClose={() => {}} caption="Anything" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders a dialog with role=dialog and aria-modal=true when open", () => {
    render(<Lightbox open onClose={() => {}} caption="Stage performance" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("uses the caption as the dialog's accessible name via aria-labelledby", () => {
    render(<Lightbox open onClose={() => {}} caption="Workshop group" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "lightbox-caption");
    const heading = document.getElementById("lightbox-caption");
    expect(heading?.textContent).toBe("Workshop group");
  });

  it("falls back to 'Photo' as the dialog's accessible name when no caption", () => {
    render(<Lightbox open onClose={() => {}} />);
    const heading = document.getElementById("lightbox-caption");
    expect(heading?.textContent).toBe("Photo");
  });

  it("falls back to 'Photo' as the dialog's accessible name when caption is an empty string", () => {
    render(<Lightbox open onClose={() => {}} caption="" />);
    const heading = document.getElementById("lightbox-caption");
    expect(heading?.textContent).toBe("Photo");
  });

  it("falls back to 'Photo' when caption is only whitespace", () => {
    render(<Lightbox open onClose={() => {}} caption="   " />);
    const heading = document.getElementById("lightbox-caption");
    expect(heading?.textContent).toBe("Photo");
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Lightbox open onClose={onClose} caption="x" />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<Lightbox open onClose={onClose} caption="x" />);
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("moves focus to the close button when opened", () => {
    render(<Lightbox open onClose={() => {}} caption="x" />);
    const closeBtn = screen.getByRole("button", { name: /close/i });
    expect(document.activeElement).toBe(closeBtn);
  });
});
