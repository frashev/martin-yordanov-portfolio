interface GalleryImageProps {
  src: string;
  alt: string;
  aspect?: "square" | "portrait" | "video";
  className?: string;
  /** Set for the LCP image (e.g. hero) so it loads eagerly at high priority. */
  priority?: boolean;
}

export default function GalleryImage({
  src,
  alt,
  aspect = "square",
  className,
  priority = false,
}: GalleryImageProps) {
  const aspectStyle =
    aspect === "video"
      ? { aspectRatio: "16 / 9" }
      : aspect === "portrait"
        ? { aspectRatio: "3 / 4" }
        : { aspectRatio: "1 / 1" };

  return (
    <div
      className={`gallery-image${className ? ` ${className}` : ""}`}
      style={aspectStyle}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        ref={(img) => {
          if (!img) return;
          const reveal = () => img.classList.add("is-loaded");
          // Handle cached images: onload won't fire if already complete
          if (img.complete) {
            reveal();
          } else {
            img.onload = reveal;
            // Show broken-image indicator rather than staying invisible on error
            img.onerror = reveal;
          }
        }}
      />
    </div>
  );
}
