import { Link } from "react-router";
import PageMeta from "../components/PageMeta";
import { seo } from "../content/seo";

export default function NotFound() {
  return (
    <>
      <PageMeta {...seo["*"]} />
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1
          tabIndex={-1}
          className="mb-3 text-4xl font-semibold tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          Page not found
        </h1>
        <p className="mb-6" style={{ color: "var(--ink-muted)" }}>
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Back to Home
        </Link>
      </section>
    </>
  );
}
