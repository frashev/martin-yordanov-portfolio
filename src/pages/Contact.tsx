import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import BookingEmbed from "../components/BookingEmbed";
import PageMeta from "../components/PageMeta";
import TextField from "../components/TextField";
import { bookingEmbed } from "../content/booking";
import { profile } from "../content/profile";
import { seo } from "../content/seo";
import { submitContact } from "../services/contact/contactService";
import type { ContactMessageInput } from "../services/contact/types";

type FormState = "idle" | "success" | "error";
type Step = 1 | 2 | 3;

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
};

const inquiryOptions = [
  "Commission",
  "Collaboration",
  "Documentation",
  "Repair or technical question",
] as const;

const steps: { step: Step; label: string }[] = [
  { step: 1, label: "Contact" },
  { step: 2, label: "Inquiry" },
  { step: 3, label: "Message" },
];

export default function Contact() {
  const [step, setStep] = useState<Step>(1);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    },
  });

  const selectedInquiry = useWatch({ control, name: "subject" });

  async function goToStep(nextStep: Step) {
    const fieldsByStep: Record<Step, (keyof ContactFormValues)[]> = {
      1: ["name", "email"],
      2: ["subject"],
      3: ["message"],
    };
    const isValid = await trigger(fieldsByStep[step], { shouldFocus: true });
    if (isValid) setStep(nextStep);
  }

  async function onSubmit(values: ContactFormValues) {
    const input: ContactMessageInput = {
      name: values.name,
      email: values.email,
      phone: values.phone || undefined,
      subject: values.subject,
      message: values.message,
    };
    const result = await submitContact(input);
    if (result.ok) {
      setFormState("success");
    } else {
      setErrorMessage(
        result.message ?? "Something went wrong. Please try again.",
      );
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <>
        <PageMeta {...seo["/contact"]} />
        <section
          role="status"
          aria-live="polite"
          className="mx-auto max-w-2xl px-4 py-16"
        >
          <h1
            tabIndex={-1}
            className="mb-4 text-4xl tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            Contact
          </h1>
          <div
            className="rounded-xl border p-10 text-center shadow-sm"
            style={{
              background: "var(--card-surface)",
              borderColor: "var(--soft-border)",
            }}
          >
            <h2
              className="mb-2 text-2xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--accent)",
              }}
            >
              Thank you
            </h2>
            <p style={{ color: "var(--ink-muted)" }}>
              Your message has been sent. Martin will be in touch soon.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageMeta {...seo["/contact"]} />
      <section className="mx-auto max-w-2xl px-4 py-16">
        <h1
          tabIndex={-1}
          className="mb-4 text-4xl tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          Contact
        </h1>
        <p className="mb-8" style={{ color: "var(--ink-muted)" }}>
          {profile.contactIntro}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-xl border p-8 shadow-sm"
          style={{
            background: "var(--card-surface)",
            borderColor: "var(--soft-border)",
          }}
        >
          <ol className="mb-8 grid grid-cols-3 gap-3" aria-label="Form steps">
            {steps.map((item) => (
              <li key={item.step} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
                  style={{
                    background:
                      step >= item.step ? "var(--accent)" : "transparent",
                    borderColor:
                      step >= item.step
                        ? "var(--accent)"
                        : "var(--soft-border)",
                    color: step >= item.step ? "#ffffff" : "var(--ink-muted)",
                  }}
                >
                  {item.step}
                </span>
                <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                  {item.label}
                </span>
              </li>
            ))}
          </ol>

          {step === 1 && (
            <div className="space-y-5">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required." }}
                render={({ field }) => (
                  <TextField
                    id="name"
                    type="text"
                    autoComplete="name"
                    label="Name"
                    required
                    disabled={isSubmitting}
                    error={errors.name?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="email"
                    type="email"
                    autoComplete="email"
                    label="Email"
                    required
                    disabled={isSubmitting}
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </div>
          )}

          {step === 2 && (
            <fieldset>
              <legend
                className="mb-3 text-sm font-medium"
                style={{ color: "var(--ink)" }}
              >
                Inquiry type <span style={{ color: "var(--accent)" }}>*</span>
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {inquiryOptions.map((option) => {
                  const isSelected = selectedInquiry === option;

                  return (
                    <label
                      key={option}
                      className="cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium"
                      style={{
                        background: isSelected
                          ? "var(--accent-soft)"
                          : "var(--paper)",
                        borderColor: isSelected
                          ? "var(--accent)"
                          : "var(--soft-border)",
                        color: "var(--ink)",
                      }}
                    >
                      <input
                        type="radio"
                        value={option}
                        disabled={isSubmitting}
                        className="mr-2"
                        {...register("subject", {
                          required: "Inquiry type is required.",
                        })}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
              {errors.subject?.message && (
                <p className="mt-2 text-xs" style={{ color: "var(--accent)" }}>
                  {errors.subject.message}
                </p>
              )}
            </fieldset>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    label="Phone"
                    optional
                    disabled={isSubmitting}
                    {...field}
                  />
                )}
              />

              <Controller
                name="message"
                control={control}
                rules={{ required: "Message is required." }}
                render={({ field }) => (
                  <TextField
                    id="message"
                    multiline
                    rows={5}
                    label="Message"
                    required
                    disabled={isSubmitting}
                    error={errors.message?.message}
                    {...field}
                  />
                )}
              />
            </div>
          )}

          {formState === "error" && (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 rounded-lg border px-4 py-3 text-sm"
              style={{
                background: "var(--accent-soft)",
                borderColor: "var(--accent)",
                color: "var(--ink)",
              }}
            >
              {errorMessage}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as Step)}
                disabled={isSubmitting}
                className="rounded-lg border px-5 py-3 text-sm font-medium transition disabled:opacity-60"
                style={{
                  borderColor: "var(--soft-border)",
                  color: "var(--ink-muted)",
                }}
              >
                Back
              </button>
            ) : (
              <span aria-hidden="true" />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => goToStep((step + 1) as Step)}
                disabled={isSubmitting}
                className="rounded-lg px-6 py-3 text-sm font-medium transition disabled:opacity-60"
                style={{
                  background: "var(--accent)",
                  color: "#ffffff",
                }}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition disabled:opacity-60"
                style={{
                  background: "var(--accent)",
                  color: "#ffffff",
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  profile.bookingCtaLabel
                )}
              </button>
            )}
          </div>
        </form>

        <BookingEmbed booking={bookingEmbed} />
      </section>
    </>
  );
}
