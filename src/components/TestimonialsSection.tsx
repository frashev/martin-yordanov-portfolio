import { useCallback, useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { testimonials } from "../content/testimonials";

const AUTOPLAY_INTERVAL = 4000;

type Props = {
  limit?: number;
  compact?: boolean;
};

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M12.5 4.5 7 10l5.5 5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="m7.5 4.5 5.5 5.5-5.5 5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TestimonialsSection({ limit, compact = false }: Props) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: items.length > 1,
    duration: 35,
    active: typeof IntersectionObserver !== "undefined",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const updateSelected = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateSelected);
    emblaApi.on("reInit", updateSelected);

    return () => {
      emblaApi.off("select", updateSelected);
      emblaApi.off("reInit", updateSelected);
    };
  }, [emblaApi, updateSelected]);

  useEffect(() => {
    // Honour the visitor's reduced-motion preference: no auto-advance.
    // Manual controls (buttons, arrow keys, dots) stay fully available.
    if (!emblaApi || isPaused || items.length <= 1 || prefersReducedMotion)
      return;
    const id = window.setInterval(
      () => emblaApi.scrollNext(),
      AUTOPLAY_INTERVAL,
    );

    return () => window.clearInterval(id);
  }, [emblaApi, isPaused, items.length, prefersReducedMotion]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  }

  const active = items[selectedIndex];

  return (
    <section aria-label="Testimonials">
      <p className="sr-only" aria-live="polite">
        {active
          ? `Testimonial ${selectedIndex + 1} of ${items.length}: ${active.author}, ${active.role}`
          : ""}
      </p>

      <div
        className="relative"
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-xl"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-roledescription="carousel"
          aria-label="Testimonials carousel"
        >
          <ul className="flex">
            {items.map((t, i) => (
              <li
                key={`${t.author}-${i}`}
                className="min-w-0 flex-[0_0_100%]"
                aria-current={i === selectedIndex ? "true" : undefined}
              >
                <Reveal index={i}>
                  <figure
                    className="flex min-h-64 flex-col rounded-xl border p-7 shadow-sm sm:p-8"
                    style={{
                      background: "var(--card-surface)",
                      borderColor: "var(--soft-border)",
                    }}
                  >
                    <blockquote
                      className={[
                        "flex-1 text-base leading-relaxed",
                        compact ? "line-clamp-4" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ color: "var(--ink-muted)" }}
                    >
                      <span
                        className="mb-2 block text-3xl leading-none"
                        style={{
                          color: "var(--accent)",
                          fontFamily: "var(--font-display)",
                        }}
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                      {t.avatarSrc && (
                        <img
                          src={t.avatarSrc}
                          alt={t.author}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--ink)" }}
                        >
                          {t.author}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--accent)" }}
                        >
                          {t.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {items.length > 1 && (
        <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
            style={{
              background: "var(--card-surface)",
              borderColor: "var(--soft-border)",
              color: "var(--accent)",
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          <div
            className="flex items-center justify-center gap-2"
            aria-label="Testimonials"
          >
            {items.map((item, i) => (
              <button
                key={`${item.author}-dot`}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className="h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
                style={{
                  width: i === selectedIndex ? "28px" : "10px",
                  background:
                    i === selectedIndex
                      ? "var(--accent)"
                      : "var(--soft-border)",
                }}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === selectedIndex ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
            style={{
              background: "var(--card-surface)",
              borderColor: "var(--soft-border)",
              color: "var(--accent)",
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>

          <span
            className="col-span-3 justify-self-end text-xs font-medium"
            style={{ color: "var(--ink-muted)" }}
            aria-hidden="true"
          >
            {selectedIndex + 1} / {items.length}
          </span>
        </div>
      )}
    </section>
  );
}
