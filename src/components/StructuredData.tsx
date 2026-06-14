import { useEffect } from "react";
import { profile } from "../content/profile";
import { siteUrl, defaultOgImagePath } from "../content/seo";

// Injects a single site-wide JSON-LD (schema.org) Person block so search
// engines can show a richer result for the performer. Built only from content
// that already exists — no fabricated awards, dates, or venues. Social links
// are emitted as `sameAs` only when they are real (placeholder "#" entries are
// skipped), so we never publish junk references.
export default function StructuredData() {
  useEffect(() => {
    const sameAs = (profile.social ?? [])
      .map((s) => s.url)
      .filter((url) => url && url !== "#");

    const data: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      description: profile.tagline,
      url: siteUrl,
      image: `${siteUrl}${defaultOgImagePath}`,
    };
    if (sameAs.length > 0) data.sameAs = sameAs;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      script.parentNode?.removeChild(script);
    };
  }, []);

  return null;
}
