import Card from "../components/Card";
import GalleryImage from "../components/GalleryImage";
import PageMeta from "../components/PageMeta";
import Reveal from "../components/Reveal";
import { profile } from "../content/profile";
import { processSteps } from "../content/projects";
import { seo } from "../content/seo";
import { assetPath } from "../content/asset";

export default function Process() {
  return (
    <>
      <PageMeta {...seo["/process"]} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h1 tabIndex={-1} className="mb-6 text-4xl tracking-tight" style={{ color: "var(--ink)" }}>
            Process
          </h1>
          <div className="space-y-5 leading-relaxed" style={{ color: "var(--ink-muted)" }}>
            {profile.bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <GalleryImage
          src={assetPath("martin/wall-plotter-controller.jpg")}
          alt="Electronics and wiring inside a black enclosure on a workbench"
          aspect="video"
          className="shadow-xl"
          priority
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} index={index}>
              <Card title={step.title}>{step.summary}</Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
