import type { CSSProperties } from "react";
import { Link } from "react-router";
import GalleryImage from "../components/GalleryImage";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import StatsBand from "../components/StatsBand";
import { gallery } from "../content/media";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { seo } from "../content/seo";

export default function Home() {
  const featured = projects[0];
  const secondary = projects[1];
  const detailImages = gallery.slice(1, 4);

  return (
    <>
      <PageMeta {...seo["/"]} />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col items-start gap-6">
          <p
            className="entrance text-sm font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)", "--entrance-delay": "0ms" } as CSSProperties}
          >
            Kinetic furniture / drawing machines
          </p>
          <h1
            tabIndex={-1}
            className="entrance text-5xl tracking-tight sm:text-6xl"
            style={{ color: "var(--ink)", "--entrance-delay": "80ms" } as CSSProperties}
          >
            {profile.name}
          </h1>
          <p
            className="entrance max-w-xl text-xl leading-relaxed"
            style={{ color: "var(--ink)", "--entrance-delay": "160ms" } as CSSProperties}
          >
            {profile.tagline}
          </p>
          <p
            className="entrance max-w-xl leading-relaxed"
            style={{ color: "var(--ink-muted)", "--entrance-delay": "240ms" } as CSSProperties}
          >
            {profile.intro}
          </p>
          <div
            className="entrance flex flex-wrap gap-3"
            style={{ "--entrance-delay": "320ms" } as CSSProperties}
          >
            <Link
              to="/projects"
              viewTransition
              className="rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm"
              style={{ background: "var(--accent)" }}
            >
              View projects
            </Link>
            <Link
              to="/contact"
              viewTransition
              className="rounded-md border px-6 py-3 text-sm font-semibold"
              style={{ borderColor: "var(--soft-border)", color: "var(--ink)" }}
            >
              {profile.bookingCtaLabel}
            </Link>
          </div>
        </div>

        <div className="entrance" style={{ "--entrance-delay": "160ms" } as CSSProperties}>
          <GalleryImage
            src={featured.imageSrc}
            alt={featured.imageAlt}
            aspect="video"
            priority
            className="shadow-xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {detailImages.map((item, index) => (
            <Reveal key={item.src} index={index}>
              <GalleryImage src={item.src ?? ""} alt={item.alt ?? item.caption} aspect="square" />
            </Reveal>
          ))}
        </div>
      </section>

      <StatsBand />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
            Featured work
          </p>
          <h2 className="mb-8 text-3xl tracking-tight" style={{ color: "var(--ink)" }}>
            Two projects, one clear thread: motion made visible.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {[featured, secondary].map((project, index) => (
            <Reveal key={project.slug} index={index}>
              <Link
                to="/projects"
                viewTransition
                className="group block overflow-hidden rounded-lg border"
                style={{ borderColor: "var(--soft-border)", background: "var(--card-surface)" }}
              >
                <GalleryImage src={project.imageSrc} alt={project.imageAlt} aspect="video" />
                <div className="p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                    {project.eyebrow}
                  </p>
                  <h3 className="text-2xl" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                    {project.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
