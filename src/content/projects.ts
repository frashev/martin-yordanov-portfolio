import type { ProcessStep, Project } from "./types";
import { assetPath } from "./asset";

export const projects: Project[] = [
  {
    slug: "kinetic-sand-table",
    title: "Kinetic Sand Table",
    eyebrow: "Illuminated table / moving sand pattern",
    summary:
      "A round wooden table with an illuminated sand bed, glass top, and exposed structural rhythm below the rim.",
    description:
      "The kinetic sand table presents slow, graphic motion as furniture. The visible build combines a circular wooden frame, a lit sand surface, a protective glass layer, and a leg structure that leaves the mechanism visually present instead of hidden.",
    imageSrc: assetPath("martin/kinetic-sand-table-hero.jpg"),
    imageAlt:
      "Kinetic sand table viewed from the side with a glowing sand surface and wooden frame",
    materials: ["Wood frame", "Sand bed", "Glass top", "Integrated lighting", "Mechanical drive"],
    highlights: [
      "Circular composition designed to be read from above and from the side.",
      "Warm edge lighting makes the sand pattern visible as an ambient object.",
      "Visible support geometry gives the table a technical, handmade character.",
    ],
  },
  {
    slug: "wall-plotter",
    title: "Wall Plotter",
    eyebrow: "Drawing machine / large-format mark making",
    summary:
      "A wall-mounted plotting machine that pulls a drawing tool across a large surface and leaves layered, colorful marks.",
    description:
      "The wall plotter turns mechanism into drawing. The project images show rails, belts or cables, a toolhead, electronics, and a large-scale marked surface, making the build process as important as the finished output.",
    imageSrc: assetPath("martin/wall-plotter-hero.jpg"),
    imageAlt:
      "Wall-mounted plotting machine installed above a large colorful drawing",
    materials: ["Linear rail", "Cable-driven toolhead", "Electronics enclosure", "Drawing tools", "Large paper surface"],
    highlights: [
      "The machine scale allows drawings to occupy an architectural wall area.",
      "Open hardware details make the motion system legible to viewers.",
      "The plotted output keeps traces of both machine control and physical imperfection.",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Observe the object",
    summary:
      "Start from what the object should feel like in the room: furniture, machine, artwork, or all three.",
  },
  {
    title: "Prototype the motion",
    summary:
      "Test the moving parts early: toolheads, rails, drive geometry, lighting, and the path that creates the visible trace.",
  },
  {
    title: "Build the body",
    summary:
      "Bring the mechanical core into a physical form that can live in a space, be touched, and be photographed clearly.",
  },
  {
    title: "Tune the result",
    summary:
      "Adjust speed, material, tool pressure, light, and composition until the machine produces a convincing final experience.",
  },
];
