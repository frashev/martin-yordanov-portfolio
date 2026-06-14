import { Link } from "react-router";
import { profile } from "../content/profile";
import Reveal from "./Reveal";

export default function BookingCTA() {
  return (
    <section
      aria-label="Discuss a project"
      className="warm-surface border-y"
      style={{
        borderColor: "var(--soft-border)",
      }}
    >
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-12 text-center sm:py-16">
        <h2
          className="text-3xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Build something with motion
        </h2>
        <p style={{ color: "var(--ink-muted)" }} className="max-w-xl">
          Share a commission idea, collaboration, repair question, or
          documentation request. Martin&rsquo;s contact details can be connected
          before launch.
        </p>
        <Link
          to="/contact"
          viewTransition
          className="inline-flex items-center rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
          style={{ background: "var(--accent)" }}
        >
          {profile.bookingCtaLabel}
        </Link>
      </Reveal>
    </section>
  );
}
