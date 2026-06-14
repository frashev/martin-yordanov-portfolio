import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import BookingCTA from "./BookingCTA";
import FloatingCTA from "./FloatingCTA";
import StructuredData from "./StructuredData";
import { useRouteAnnouncement } from "../lib/useRouteAnnouncement";

export default function Layout() {
  const { pathname } = useLocation();
  const showCta = pathname !== "/contact";
  useRouteAnnouncement();

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <StructuredData />
      <a
        href="#main"
        onClick={() => {
          document.getElementById("main")?.focus({ preventScroll: true });
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow focus:outline-none"
        style={{
          background: "var(--accent)",
          color: "var(--paper)",
        }}
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        aria-label="Main content"
        className="flex-1"
      >
        <Outlet />
      </main>
      {showCta && <BookingCTA />}
      {showCta && <FloatingCTA />}
      <Footer />
    </div>
  );
}
