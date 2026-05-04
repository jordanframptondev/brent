"use client";

import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    name: "Ridgeline House",
    location: "Park City, UT",
    year: "2024",
    type: "Architecture, Interiors",
    description:
      "A low-slung timber-and-stone residence tracing the contour of a high alpine ridge.",
    images: Array(4).fill("/projects/placeholder.jpg"),
  },
  {
    name: "Ember Creek Residence",
    location: "Heber City, UT",
    year: "2023",
    type: "Architecture, Landscape",
    description:
      "Deep overhangs and charred-wood cladding along a seasonal creek.",
    images: Array(3).fill("/projects/placeholder.jpg"),
  },
  {
    name: "Summit Overlook",
    location: "Deer Valley, UT",
    year: "2023",
    type: "Architecture, Interiors",
    description:
      "Cantilevered over a steep wooded slope with split-level living areas.",
    images: Array(4).fill("/projects/placeholder.jpg"),
  },
  {
    name: "Cedar Draw Retreat",
    location: "Midway, UT",
    year: "2022",
    type: "Architecture, Landscape",
    description:
      "Reclaimed materials and passive solar orientation in a high-desert setting.",
    images: Array(3).fill("/projects/placeholder.jpg"),
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 pt-4 pb-16 lg:pt-6 lg:pb-24">
      {/* Instagram CTA */}
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 pt-20 pb-6 text-center lg:px-10 lg:pt-28 lg:pb-8">
        <p className="font-body text-sm tracking-wide text-ink-soft sm:text-base">
          Follow along with our latest work and collaborations on Instagram.
        </p>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 font-body text-lg leading-none text-ink transition-opacity duration-300 hover:opacity-60 sm:text-xl"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span className="-translate-y-[2px]">@jbd.customhomes</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </section>
  );
}
