import GalleryImage from "./GalleryImage";

type Props = {
  aspect: "square" | "video";
  caption?: string;
  src?: string;
  alt?: string;
};

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-8 w-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8.25A2.25 2.25 0 0 1 5.25 6h1.5l1.5-2h7.5l1.5 2h1.5A2.25 2.25 0 0 1 21 8.25v9A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25v-9Z"
    />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-10 w-10"
    fill="currentColor"
  >
    <path d="M8 5.5v13l11-6.5L8 5.5Z" />
  </svg>
);

export default function PlaceholderImage({ aspect, caption, src, alt }: Props) {
  // When a real image src is provided, delegate to GalleryImage for lazy-load + fade-in
  if (src) {
    return (
      <GalleryImage
        src={src}
        alt={alt ?? caption ?? ""}
        aspect={aspect}
        className="w-full"
      />
    );
  }

  const aspectClass = aspect === "square" ? "aspect-square" : "aspect-video";
  const Icon = aspect === "video" ? PlayIcon : CameraIcon;

  return (
    <div
      className={`placeholder-surface flex ${aspectClass} flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border p-3 text-center`}
      style={{
        borderColor: "var(--soft-border)",
        color: "var(--accent)",
      }}
    >
      <Icon />
      {caption && (
        <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
          {caption}
        </span>
      )}
    </div>
  );
}
