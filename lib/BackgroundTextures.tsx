"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXTURES = [
  "/textures/bg/image1_black_white_transparent.png",
  "/textures/bg/image2_black_white_transparent.png",
  "/textures/bg/image3_black_white_transparent.png",
  "/textures/bg/image3_alt_black_white_transparent.png",
];

const MAX_OPACITY = 0.12;

export default function BackgroundTextures() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      layerRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === 0 ? String(MAX_OPACITY) : "0";
      });
      return;
    }

    // Set initial state
    layerRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? MAX_OPACITY : 0 });
    });

    // Defer so page content is rendered and scroll height is accurate
    const frame = requestAnimationFrame(() => {
      const layers = layerRefs.current;

      // Timeline: slow crossfades tied to scroll, last image stays
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Crossfade 0 → 1 (first third)
      tl.to(layers[0], { opacity: 0, duration: 1 }, 0);
      tl.to(layers[1], { opacity: MAX_OPACITY, duration: 1 }, 0);

      // Crossfade 1 → 2 (second third)
      tl.to(layers[1], { opacity: 0, duration: 1 }, 1);
      tl.to(layers[2], { opacity: MAX_OPACITY, duration: 1 }, 1);

      // Crossfade 2 → 3 (final third — image 3 stays visible)
      tl.to(layers[2], { opacity: 0, duration: 1 }, 2);
      tl.to(layers[3], { opacity: MAX_OPACITY, duration: 1 }, 2);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frame);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {TEXTURES.map((src, i) => (
        <div
          key={src}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? MAX_OPACITY : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
