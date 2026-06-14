import GalleryImage from "./GalleryImage";
import Reveal from "./Reveal";
import type { SocialFeedItem } from "../content/types";

type SocialFeedProps = {
  items: SocialFeedItem[];
};

export default function SocialFeed({ items }: SocialFeedProps) {
  if (items.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-16"
      aria-labelledby="social-feed-title"
    >
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal>
            <h2
              id="social-feed-title"
              className="text-2xl tracking-tight"
              style={{
                color: "var(--ink)",
                fontFamily: "var(--font-display)",
              }}
            >
              Studio Notes
            </h2>
          </Reveal>
          <p
            className="mt-2 max-w-2xl text-sm"
            style={{ color: "var(--ink-muted)" }}
          >
            Example social feed cards for rehearsal updates and approved
            Instagram posts.
          </p>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.id}>
            <Reveal index={index}>
              <article
                className="overflow-hidden rounded-lg border shadow-sm"
                style={{
                  background: "var(--card-surface)",
                  borderColor: "var(--soft-border)",
                }}
              >
                <GalleryImage src={item.imageSrc} alt={item.alt} />
                <div className="p-4">
                  <p
                    className="text-xs font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.meta}
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {item.caption}
                  </p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
