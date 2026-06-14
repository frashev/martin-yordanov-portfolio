import type { SeoMeta } from "./types";

export const siteUrl = "https://frashev.github.io/martin-yordanov-portfolio";
export const defaultOgImagePath = "/og-default.png";

export const seo: Record<string, SeoMeta> = {
  "/": {
    title: "Martin Yordanov | Kinetic Furniture & Drawing Machines",
    description:
      "Portfolio for Martin Yordanov, featuring a kinetic sand table and a wall-mounted drawing plotter.",
    ogImage: "/og-default.png",
  },
  "/projects": {
    title: "Projects | Martin Yordanov",
    description:
      "Explore Martin Yordanov's kinetic sand table and wall plotter projects.",
    ogImage: "/og-default.png",
  },
  "/process": {
    title: "Process | Martin Yordanov",
    description:
      "A practical look at how Martin's kinetic furniture and drawing machines move from idea to prototype.",
    ogImage: "/og-default.png",
  },
  "/gallery": {
    title: "Gallery | Martin Yordanov",
    description:
      "Images of Martin Yordanov's kinetic sand table, wall plotter, mechanisms, and plotted surfaces.",
    ogImage: "/og-default.png",
  },
  "/contact": {
    title: "Contact | Martin Yordanov",
    description:
      "Contact Martin Yordanov about commissions, collaborations, and kinetic object projects.",
    ogImage: "/og-default.png",
  },
};
