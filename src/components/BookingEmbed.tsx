import type { BookingEmbed as BookingEmbedContent } from "../content/types";

type BookingEmbedProps = {
  booking: BookingEmbedContent;
};

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v3M16 3v3" strokeLinecap="round" />
    </svg>
  );
}

export default function BookingEmbed({ booking }: BookingEmbedProps) {
  return (
    <section
      className="mt-12 rounded-xl border p-6 shadow-sm"
      style={{
        background: "var(--card-surface)",
        borderColor: "var(--soft-border)",
      }}
      aria-labelledby="booking-calendar-title"
    >
      <div className="mb-5">
        <h2
          id="booking-calendar-title"
          className="text-2xl tracking-tight"
          style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}
        >
          {booking.title}
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-muted)" }}>
          {booking.summary}
        </p>
      </div>

      {booking.embedUrl ? (
        <div
          className="overflow-hidden rounded-lg border"
          style={{ borderColor: "var(--soft-border)" }}
        >
          <iframe
            src={booking.embedUrl}
            title={booking.title}
            loading="lazy"
            className="block h-[620px] w-full bg-white"
          />
        </div>
      ) : (
        // No verified scheduling URL yet — show a self-contained placeholder
        // instead of an external iframe (which would 404 and set cookies).
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-14 text-center"
          style={{ borderColor: "var(--soft-border)" }}
        >
          <span style={{ color: "var(--accent)" }}>
            <CalendarIcon />
          </span>
          <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
            Live scheduling coming soon
          </p>
          <p className="max-w-sm text-xs" style={{ color: "var(--ink-muted)" }}>
            Use the contact form above and Martin can arrange a time with you
            directly.
          </p>
        </div>
      )}
    </section>
  );
}
