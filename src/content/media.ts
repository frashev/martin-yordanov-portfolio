import type { GalleryItem, Video } from "./types";

export const gallery: GalleryItem[] = [
  {
    caption: "Kinetic sand table - angled hero view",
    src: "/martin/kinetic-sand-table-hero.jpg",
    alt: "Round kinetic sand table with illuminated sand pattern and wooden rim",
    projectSlug: "kinetic-sand-table",
  },
  {
    caption: "Kinetic sand table - top pattern",
    src: "/martin/kinetic-sand-table-top.jpg",
    alt: "Top view of a detailed sand pattern inside the round table",
    projectSlug: "kinetic-sand-table",
  },
  {
    caption: "Kinetic sand table - side construction",
    src: "/martin/kinetic-sand-table-side.jpg",
    alt: "Side view of the table showing legs, wooden body, cable, and mechanical supports",
    projectSlug: "kinetic-sand-table",
  },
  {
    caption: "Wall plotter - full installation",
    src: "/martin/wall-plotter-hero.jpg",
    alt: "Wall plotter mounted above a large yellow, blue, green, and red drawing",
    projectSlug: "wall-plotter",
  },
  {
    caption: "Wall plotter - plotted surface detail",
    src: "/martin/wall-plotter-drawing.jpg",
    alt: "Close view of the wall plotter drawing with layered colorful marks",
    projectSlug: "wall-plotter",
  },
  {
    caption: "Wall plotter - mechanism detail",
    src: "/martin/wall-plotter-mechanics.jpg",
    alt: "Close view of a black mechanical assembly and white printed parts on a wooden table",
    projectSlug: "wall-plotter",
  },
  {
    caption: "Wall plotter - electronics enclosure",
    src: "/martin/wall-plotter-controller.jpg",
    alt: "Electronics and wiring inside a black enclosure on a workbench",
    projectSlug: "wall-plotter",
  },
  {
    caption: "Wall plotter - drawing toolhead",
    src: "/martin/wall-plotter-toolhead.jpg",
    alt: "Close view of a black toolhead holding a pointed drawing tool",
    projectSlug: "wall-plotter",
  },
];

export const videos: Video[] = [];

export const performanceReel: Video = {
  title: "Motion study",
  summary:
    "Video slot reserved for kinetic sand table and wall plotter footage once Martin provides approved clips.",
};
