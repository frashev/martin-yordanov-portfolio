import PlaceholderImage from "./PlaceholderImage";

interface VideoEmbedProps {
  embedUrl?: string;
  title: string;
}

export default function VideoEmbed({ embedUrl, title }: VideoEmbedProps) {
  if (!embedUrl) {
    return <PlaceholderImage aspect="video" />;
  }

  return (
    <div
      style={{
        aspectRatio: "16 / 9",
        width: "100%",
        overflow: "hidden",
        borderRadius: "6px",
      }}
    >
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{
          border: "none",
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
