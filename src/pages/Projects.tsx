import GalleryImage from "../components/GalleryImage";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import { projects } from "../content/projects";
import { seo } from "../content/seo";

export default function Projects() {
  return (
    <>
      <PageMeta {...seo["/projects"]} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 tabIndex={-1} className="mb-4 text-4xl tracking-tight" style={{ color: "var(--ink)" }}>
          Projects
        </h1>
        <p className="mb-12 max-w-2xl leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          A focused portfolio of kinetic objects: one table that draws in sand, and one machine that draws across a wall.
        </p>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <Reveal key={project.slug} index={index}>
              <article
                className="grid overflow-hidden rounded-lg border lg:grid-cols-[1.15fr_0.85fr]"
                style={{ borderColor: "var(--soft-border)", background: "var(--card-surface)" }}
              >
                <GalleryImage src={project.imageSrc} alt={project.imageAlt} aspect="video" />
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                    {project.eyebrow}
                  </p>
                  <h2 className="text-3xl" style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                    {project.title}
                  </h2>
                  <p className="mt-4 leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                    {project.description}
                  </p>

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                      Visible materials
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.materials.map((material) => (
                        <li
                          key={material}
                          className="rounded-full border px-3 py-1 text-xs"
                          style={{ borderColor: "var(--soft-border)", color: "var(--ink-muted)" }}
                        >
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                        <span aria-hidden="true" style={{ color: "var(--accent)" }}>- </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
