import type { Profile } from "./types";

export const profile: Profile = {
  name: "Martin Yordanov",
  role: "Maker of kinetic furniture and drawing machines",
  tagline: "Tables, mechanisms, and machines that turn motion into pattern.",
  intro:
    "Martin builds tactile objects where wood, electronics, and mechanics meet. This portfolio presents two current projects: a kinetic sand table and a wall-mounted plotter.",
  bioParagraphs: [
    "Martin's work sits between furniture, mechanical design, and generative art. The available project material shows a focus on visible construction, precise movement, and physical traces: sand lines, plotted marks, toolheads, rails, and handmade assemblies.",
    "The portfolio is intentionally practical. Each project page explains the object, the visible materials, and what a visitor can understand from the build images. More personal background, studio location, commission details, and technical specifications can be added after Martin provides verified copy.",
    "For now, the site is ready as a polished first portfolio: clear project stories, a gallery, a process page, and a contact flow that can later connect to Supabase when deployment credentials are ready.",
  ],
  bookingCtaLabel: "Discuss a project",
  contactEmail: "hello@example.com",
  heroSrc: "/martin/kinetic-sand-table-hero.jpg",
  heroAlt: "A round kinetic sand table with an illuminated wooden rim and carved sand pattern",
  contactIntro:
    "Use this form for commissions, collaborations, repairs, documentation requests, or a conversation about one of Martin's machines. Replace the placeholder email and connect Supabase before launch.",
  social: [],
};
