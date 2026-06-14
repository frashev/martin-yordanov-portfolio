import { Link, useLocation } from "react-router";
import { profile } from "../content/profile";
import { useScrollDepth } from "../lib/useScrollDepth";

export default function FloatingCTA() {
  const { pathname } = useLocation();
  const isPastHero = useScrollDepth(300);

  if (pathname === "/contact") return null;

  return (
    <Link
      to="/contact"
      viewTransition
      data-testid="floating-cta"
      aria-hidden={!isPastHero}
      aria-label="Discuss a project with Martin"
      tabIndex={isPastHero ? 0 : -1}
      className={[
        "floating-cta",
        "fixed bottom-4 right-4 z-30 inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold text-white shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]",
        isPastHero
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
      style={{ background: "var(--accent)" }}
    >
      {profile.bookingCtaLabel}
    </Link>
  );
}
