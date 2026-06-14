import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PlaceholderImage from "./PlaceholderImage";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  src?: string;
  alt?: string;
  caption?: string;
  /** Optional gallery navigation. When both are provided, prev/next show. */
  onPrev?: () => void;
  onNext?: () => void;
  /** Position label, e.g. "2 / 6". */
  position?: string;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Lightbox({
  open,
  onClose,
  src,
  alt,
  caption,
  onPrev,
  onNext,
  position,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const hasNav = Boolean(onPrev && onNext);

  // Move focus to close button when lightbox opens
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // Escape closes, arrows navigate, Tab stays trapped within the overlay.
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
        return;
      }
      if (e.key === "Tab") {
        // Focus trap: cycle through the overlay's focusable controls.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  const navButtonStyle = {
    background: "var(--card-surface)",
    borderColor: "var(--soft-border)",
    color: "var(--ink)",
  };

  return createPortal(
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="lightbox-caption" className="sr-only">
          {caption?.trim() || "Photo"}
        </h2>
        <button
          ref={closeRef}
          type="button"
          className="lightbox-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {hasNav && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            style={navButtonStyle}
          >
            <Chevron dir="left" />
          </button>
        )}

        {src ? (
          <img
            src={src}
            alt={alt ?? caption ?? "Gallery image"}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        ) : (
          <div style={{ padding: "24px" }}>
            <PlaceholderImage aspect="square" caption={caption} />
          </div>
        )}

        {hasNav && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            style={navButtonStyle}
          >
            <Chevron dir="right" />
          </button>
        )}

        {(caption || position) && src && (
          <p
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
            style={{ color: "var(--ink-muted)" }}
          >
            <span>{caption}</span>
            {position && (
              <span className="shrink-0 text-xs tabular-nums">{position}</span>
            )}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
