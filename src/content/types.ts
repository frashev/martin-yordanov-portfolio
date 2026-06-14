// Portfolio content for Martin Yordanov.
// Keep claims grounded in provided materials until Martin supplies verified copy.

export type SocialPlatform = "instagram" | "facebook" | "youtube" | "tiktok" | "github" | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  label: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  intro: string;
  bioParagraphs: string[];
  bookingCtaLabel: string;
  contactEmail: string;
  contactIntro: string;
  heroSrc?: string;
  heroAlt?: string;
  heroVideoSrc?: string;
  heroVideoPoster?: string;
  social?: SocialLink[];
};

export type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  materials: string[];
  highlights: string[];
};

export type ProcessStep = {
  title: string;
  summary: string;
};

export type GalleryItem = {
  caption: string;
  src?: string;
  alt?: string;
  projectSlug?: string;
};

export type Video = {
  title: string;
  summary: string;
  embedUrl?: string;
};

export type BookingEmbed = {
  title: string;
  summary: string;
  embedUrl?: string;
};

export type SocialFeedItem = {
  id: string;
  imageSrc: string;
  alt: string;
  caption: string;
  meta: string;
  url?: string;
};

export type SeoMeta = {
  title: string;
  description: string;
  ogImage?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatarSrc?: string;
};

export type StatItem = {
  value: string;
  label: string;
};
