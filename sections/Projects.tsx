"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { useFadeIn } from "@/lib/useFadeIn";

const projects = [
  {
    name: "Ridgeline House",
    location: "Park City, UT",
    year: "2024",
    type: "Architecture, Interiors",
    description:
      "A low-slung timber-and-stone residence tracing the contour of a high alpine ridge.",
    images: Array(4).fill("/projects/image_coming_soon.jpg"),
  },
  {
    name: "Ember Creek Residence",
    location: "Heber City, UT",
    year: "2023",
    type: "Architecture, Landscape",
    description:
      "Deep overhangs and charred-wood cladding along a seasonal creek.",
    images: Array(3).fill("/projects/image_coming_soon.jpg"),
  },
  {
    name: "Summit Overlook",
    location: "Deer Valley, UT",
    year: "2023",
    type: "Architecture, Interiors",
    description:
      "Cantilevered over a steep wooded slope with split-level living areas.",
    images: Array(4).fill("/projects/image_coming_soon.jpg"),
  },
  {
    name: "Cedar Draw Retreat",
    location: "Midway, UT",
    year: "2022",
    type: "Architecture, Landscape",
    description:
      "Reclaimed materials and passive solar orientation in a high-desert setting.",
    images: Array(3).fill("/projects/image_coming_soon.jpg"),
  },
];

function ProjectSection({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const infoRef = useFadeIn<HTMLDivElement>();

  return (
    <article className="border-t border-rule py-16 first:border-t-0 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-[1fr_2fr] md:gap-10 lg:px-10">
        {/* Project info — left on md+, above on mobile */}
        <div ref={infoRef} className="flex flex-col justify-start">
          <h3
            data-fade
            className="text-3xl text-ink sm:text-4xl lg:text-5xl"
          >
            {project.name}
          </h3>
          <span
            data-fade
            className="mt-3 block text-xs uppercase tracking-[0.15em] text-ink-soft/50"
          >
            {project.location} &mdash; {project.year}
          </span>
          <p
            data-fade
            className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base"
          >
            {project.description}
          </p>
        </div>

        {/* Image carousel */}
        <div className="aspect-[4/3] w-full lg:aspect-[3/2]">
          <ImageCarousel images={project.images} alt={project.name} />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-16 lg:py-24">
      {projects.map((project) => (
        <ProjectSection key={project.name} project={project} />
      ))}
    </section>
  );
}
