"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import ProjectCarousel from "./TripleCarousel";
import FullscreenGallery from "./FullscreenGallery";
import { useFadeIn } from "@/lib/useFadeIn";

interface Project {
  name: string;
  location: string;
  year: string;
  type: string;
  description: string;
  images: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const infoRef = useFadeIn<HTMLDivElement>();

  return (
    <>
      <article className="border-t border-rule py-20 first:border-t-0 lg:py-28">
        <div className="mx-auto grid min-h-[500px] max-w-7xl gap-6 px-6 md:grid-cols-[1fr_3fr] md:gap-10 lg:min-h-[550px] lg:px-10">
          {/* Info column */}
          <div ref={infoRef} className="flex flex-col justify-start">
            <h3
              data-fade
              className="text-3xl text-ink sm:text-5xl"
            >
              {project.name}
            </h3>
            <span
              data-fade
              className="mt-3 block text-xs uppercase tracking-[0.15em] text-ink-soft/50"
            >
              {project.type}
            </span>
            <span
              data-fade
              className="mt-2 block text-xs uppercase tracking-[0.15em] text-ink-soft/50"
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

          {/* Carousel column */}
          <div>
            <ProjectCarousel
              images={project.images}
              alt={project.name}
              projectKey={project.name}
              onOpenFullscreen={() => setFullscreenOpen(true)}
            />
          </div>
        </div>
      </article>

      {/* Fullscreen gallery overlay — portaled to body */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {fullscreenOpen && (
              <FullscreenGallery
                images={project.images}
                alt={project.name}
                onClose={() => setFullscreenOpen(false)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
