import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../lib/useReveal";

const STAGGER_STEP = 80; // ms — mirrors --stagger-step
const MAX_STAGGER = 6; // cap so long lists don't lag

type RevealProps = {
  /** Position in a list; drives the staggered delay (capped). */
  index?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Wraps content so it fades and rises into view on scroll. Keeps `Card` and
 * page components free of animation logic. Renders a plain `<div>`; the actual
 * motion lives in the `.reveal` CSS. If `IntersectionObserver` is unavailable,
 * this renders as a fully-visible box.
 */
export default function Reveal({
  index = 0,
  className,
  children,
}: RevealProps) {
  const { ref, isRevealed } = useReveal<HTMLDivElement>();
  const delay = Math.min(index, MAX_STAGGER) * STAGGER_STEP;

  return (
    <div
      ref={ref}
      className={["reveal", isRevealed ? "is-revealed revealed" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
