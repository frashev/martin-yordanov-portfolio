import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  meta?: string;
  children?: ReactNode;
};

export default function Card({ title, meta, children }: CardProps) {
  return (
    <article
      className="group rounded-xl border p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      style={{
        background: "var(--card-surface)",
        borderColor: "var(--soft-border)",
      }}
    >
      {title && (
        <h2
          className="text-lg font-medium"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {title}
        </h2>
      )}
      {meta && (
        <p className="mt-1 text-sm" style={{ color: "var(--accent)" }}>
          {meta}
        </p>
      )}
      {children && (
        <div
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "var(--ink-muted)" }}
        >
          {children}
        </div>
      )}
    </article>
  );
}
