import { useRef, useState } from "react";
import Lightbox from "../components/Lightbox";
import PlaceholderImage from "../components/PlaceholderImage";
import Reveal from "../components/Reveal";
import { gallery } from "../content/media";
import PageMeta from "../components/PageMeta";
import { seo } from "../content/seo";

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  // One ref per gallery item — used to restore focus when lightbox closes
  const triggerRefs = useRef<HTMLButtonElement[]>([]);

  function handleClose() {
    const prev = selected;
    setSelected(null);
    // Restore focus before Lightbox unmounts
    if (prev !== null) triggerRefs.current[prev]?.focus();
  }

  // Wrap-around navigation within the lightbox.
  function showPrev() {
    setSelected((cur) =>
      cur === null ? cur : (cur - 1 + gallery.length) % gallery.length,
    );
  }
  function showNext() {
    setSelected((cur) => (cur === null ? cur : (cur + 1) % gallery.length));
  }

  const selectedItem = selected !== null ? gallery[selected] : null;

  return (
    <>
      <PageMeta {...seo["/gallery"]} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1
          tabIndex={-1}
          className="mb-3 text-4xl tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          Gallery
        </h1>
        <p className="mb-10 max-w-2xl" style={{ color: "var(--ink-muted)" }}>
          Project photographs, mechanism details, and output from the wall
          plotter.
        </p>
        <ul className="grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 md:grid-flow-dense">
          {gallery.map((item, i) => {
            // First image anchors the bento as a 2×2 block; the rest fill
            // around it with grid-flow-dense, so the grid tessellates cleanly
            // (no trailing empty cell).
            const isFeatured = i === 0;

            return (
              <li
                key={i}
                data-testid="gallery-card"
                data-featured={isFeatured ? "true" : undefined}
                className={
                  isFeatured ? "md:col-span-2 md:row-span-2" : undefined
                }
              >
                <Reveal index={i}>
                  <button
                    ref={(el) => {
                      if (el) triggerRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setSelected(i)}
                    className="block w-full cursor-pointer rounded-lg"
                    style={{ background: "none", border: "none", padding: 0 }}
                    aria-label={
                      item.alt ?? item.caption ?? `Gallery photo ${i + 1}`
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.outline = `2px solid var(--accent)`)
                    }
                    onBlur={(e) => (e.currentTarget.style.outline = "none")}
                  >
                    <PlaceholderImage
                      aspect="square"
                      src={item.src}
                      alt={item.alt}
                      caption={item.caption}
                    />
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      {selected !== null && selectedItem && (
        <Lightbox
          open
          onClose={handleClose}
          src={selectedItem.src}
          alt={selectedItem.alt}
          caption={selectedItem.caption}
          onPrev={gallery.length > 1 ? showPrev : undefined}
          onNext={gallery.length > 1 ? showNext : undefined}
          position={`${selected + 1} / ${gallery.length}`}
        />
      )}
    </>
  );
}
