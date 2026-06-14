import { useEffect } from "react";
import { useLocation } from "react-router";
import { defaultOgImagePath, siteUrl } from "../content/seo";

interface PageMetaProps {
  title: string;
  description: string;
  ogImage?: string;
}

function upsertMeta(selector: string, attr: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrValue] = attr.split("=");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

export default function PageMeta({
  title,
  description,
  ogImage,
}: PageMetaProps) {
  const { pathname } = useLocation();
  // Base canonical/OG URLs on the declared production domain (siteUrl) so they
  // stay consistent with sitemap.xml and the JSON-LD, regardless of the host
  // the SPA is currently served from (e.g. the *.workers.dev preview domain).
  const image = ogImage ?? `${siteUrl}${defaultOgImagePath}`;
  const url = `${siteUrl}${pathname}`;

  useEffect(() => {
    const prev = document.title;
    document.title = title;

    const desc = upsertMeta(
      'meta[name="description"]',
      "name=description",
      description,
    );
    const ogTitle = upsertMeta(
      'meta[property="og:title"]',
      "property=og:title",
      title,
    );
    const ogDesc = upsertMeta(
      'meta[property="og:description"]',
      "property=og:description",
      description,
    );
    const ogType = upsertMeta(
      'meta[property="og:type"]',
      "property=og:type",
      "website",
    );
    const ogUrl = upsertMeta('meta[property="og:url"]', "property=og:url", url);
    const ogImg = upsertMeta(
      'meta[property="og:image"]',
      "property=og:image",
      image,
    );
    const canonical = upsertCanonical(url);

    return () => {
      document.title = prev;
      [desc, ogTitle, ogDesc, ogType, ogUrl, ogImg, canonical].forEach((el) =>
        el.parentNode?.removeChild(el),
      );
    };
  }, [title, description, image, url]);

  return null;
}
