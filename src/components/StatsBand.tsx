import Reveal from "./Reveal";
import { stats } from "../content/stats";

export default function StatsBand() {
  return (
    <div
      className="w-full border-y py-10"
      style={{ borderColor: "var(--soft-border)" }}
    >
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            index={i}
            className="flex flex-col items-center gap-1 text-center"
          >
            <dt
              className="text-4xl font-semibold tracking-tight"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-display)",
              }}
            >
              {s.value}
            </dt>
            <dd className="text-sm" style={{ color: "var(--ink-muted)" }}>
              {s.label}
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
