import { useState } from "react";
import GalleryImage from "./GalleryImage";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

type HeroMediaProps = {
  name: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  videoPoster?: string;
};

const Monogram = () => (
  <svg
    viewBox="0 0 200 200"
    aria-hidden="true"
    className="h-64 w-64 md:h-80 md:w-80"
  >
    <defs>
      <linearGradient id="mono-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--accent-soft)" />
        <stop offset="100%" stopColor="var(--accent)" />
      </linearGradient>
    </defs>
    <circle
      cx="100"
      cy="100"
      r="92"
      fill="none"
      stroke="url(#mono-grad)"
      strokeWidth="1.5"
    />
    <circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke="var(--soft-border)"
      strokeWidth="1"
    />
    <text
      x="50%"
      y="54%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="var(--font-display)"
      fontSize="84"
      fill="var(--accent)"
    >
      NK
    </text>
  </svg>
);

export default function HeroMedia({
  name,
  imageSrc,
  imageAlt,
  videoSrc,
  videoPoster,
}: HeroMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const label = imageAlt ?? name;

  // Reduced-motion visitors get the still poster image instead of the
  // autoplaying, looping video.
  if (videoSrc && !videoFailed && !prefersReducedMotion) {
    return (
      <video
        src={videoSrc}
        poster={videoPoster ?? imageSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setVideoFailed(true)}
        className="w-full max-w-sm rounded-2xl object-cover md:max-w-md"
        style={{ aspectRatio: "3/4" }}
        aria-label={label}
      />
    );
  }

  const stillSrc = imageSrc ?? videoPoster;
  if (stillSrc) {
    return (
      <GalleryImage
        src={stillSrc}
        alt={label}
        aspect="portrait"
        priority
        className="w-full max-w-sm rounded-2xl md:max-w-md"
      />
    );
  }

  return <Monogram />;
}
