import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Contact from "../pages/Contact";
import * as contactService from "../services/contact/contactService";

vi.mock("../services/contact/contactService", () => ({
  submitContact: vi.fn(),
}));

const mockedSubmit = vi.mocked(contactService.submitContact);

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
}

async function completeStepOne(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/name/i), "Alex");
  await user.type(screen.getByLabelText(/email/i), "alex@example.com");
  await user.click(screen.getByRole("button", { name: /continue/i }));
}

async function completeStepTwo(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByLabelText(/commission/i));
  await user.click(screen.getByRole("button", { name: /continue/i }));
}

beforeEach(() => {
  mockedSubmit.mockReset();
});

describe("Contact form", () => {
  it("shows required field errors when the first step is submitted empty", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(mockedSubmit).not.toHaveBeenCalled();
  });

  it("renders the booking placeholder (no live external iframe) below the form", () => {
    renderContact();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /project conversation/i,
      }),
    ).toBeInTheDocument();
    // While no verified scheduling URL exists, we must NOT mount a third-party
    // iframe (it would 404 and set cookies) — a static placeholder shows instead.
    expect(
      screen.getByText(/live scheduling coming soon/i),
    ).toBeInTheDocument();
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("shows the email error for an invalid email before continuing", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/name/i), "Alex");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(mockedSubmit).not.toHaveBeenCalled();
  });

  it("requires an inquiry type before moving to the message step", async () => {
    const user = userEvent.setup();
    renderContact();

    await completeStepOne(user);
    await user.click(screen.getByRole("button", { name: /continue/i }));

    expect(
      await screen.findByText(/inquiry type is required/i),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/message/i)).not.toBeInTheDocument();
  });

  it("transitions to the success state on a valid submission", async () => {
    const user = userEvent.setup();
    mockedSubmit.mockResolvedValue({ ok: true, provider: "supabase" });
    renderContact();

    await completeStepOne(user);
    await completeStepTwo(user);
    await user.type(screen.getByLabelText(/phone/i), "+380 123");
    await user.type(screen.getByLabelText(/message/i), "Looking forward to it");
    await user.click(screen.getByRole("button", { name: /discuss a project/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
    expect(mockedSubmit).toHaveBeenCalledWith({
      name: "Alex",
      email: "alex@example.com",
      phone: "+380 123",
      subject: "Commission",
      message: "Looking forward to it",
    });
  });

  it("shows the error banner when the service rejects", async () => {
    const user = userEvent.setup();
    mockedSubmit.mockResolvedValue({
      ok: false,
      provider: "supabase",
      message: "Network unreachable",
    });
    renderContact();

    await completeStepOne(user);
    await completeStepTwo(user);
    await user.type(screen.getByLabelText(/message/i), "Hello");
    await user.click(screen.getByRole("button", { name: /discuss a project/i }));

    expect(await screen.findByText(/network unreachable/i)).toBeInTheDocument();
  });

  it("falls back to a generic message when the service rejects without one", async () => {
    const user = userEvent.setup();
    mockedSubmit.mockResolvedValue({ ok: false, provider: "supabase" });
    renderContact();

    await completeStepOne(user);
    await completeStepTwo(user);
    await user.type(screen.getByLabelText(/message/i), "Hello");
    await user.click(screen.getByRole("button", { name: /discuss a project/i }));

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  it("clears a field error as soon as the user types into that field", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/name/i), "A");
    await waitFor(() => {
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  it("renders the animated loading indicator when reduced motion is preferred", async () => {
    const user = userEvent.setup();
    mockedSubmit.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () => resolve({ ok: true, provider: "supabase" as const }),
            100,
          ),
        ),
    );
    renderContact();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });

    await completeStepOne(user);
    await completeStepTwo(user);
    await user.type(screen.getByLabelText(/message/i), "Hi");
    await user.click(screen.getByRole("button", { name: /discuss a project/i }));

    const spinner = document.querySelector("svg.animate-spin");
    expect(spinner).not.toBeNull();
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
  });
});
