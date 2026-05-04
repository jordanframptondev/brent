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
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </section>
  );
}
