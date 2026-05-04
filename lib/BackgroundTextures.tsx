"use client";

import { useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const SRCS = [
  "/textures/topo/topo-standalone-section-01.png",
  "/textures/topo/topo-standalone-section-03.png",
  "/textures/topo/topo-standalone-section-04.png",
  "/textures/topo/topo-standalone-section-06.png",
  "/textures/topo/topo-standalone-section-07.png",
  "/textures/topo/topo-standalone-section-08.png",
];

// Generate random non-overlapping starting positions
function generatePositions() {
  const positions: { x: number; y: number; rot: number }[] = [];
  const pieceW = 55; // % of viewport
  const pieceH = 60;

  for (let i = 0; i < SRCS.length; i++) {
    let x: number, y: number, attempts = 0;

    // Try to place without overlapping (light touching ok)
    do {
      x = rand(-10, 100 - pieceW + 10);
      y = rand(-10, 100 - pieceH + 10);
      attempts++;
    } while (
      attempts < 50 &&
      positions.some(
        (p) =>
          Math.abs(p.x - x) < pieceW * 0.75 &&
          Math.abs(p.y - y) < pieceH * 0.75
      )
    );

    positions.push({ x, y, rot: rand(-15, 15) });
  }

  return positions;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function organicDrift(el: HTMLElement) {
  // Horizontal drift
  const xTween = gsap.to(el, {
    x: rand(40, 100) * (Math.random() > 0.5 ? 1 : -1),
    duration: rand(8, 14),
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  xTween.progress(Math.random());

  // Vertical drift
  const yTween = gsap.to(el, {
    y: rand(30, 80) * (Math.random() > 0.5 ? 1 : -1),
    duration: rand(10, 18),
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  yTween.progress(Math.random());

  // Rotation
  const rotTween = gsap.to(el, {
    rotation: rand(8, 20) * (Math.random() > 0.5 ? 1 : -1),
    duration: rand(12, 22),
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  rotTween.progress(Math.random());

  // Scale breathing
  const scaleTween = gsap.to(el, {
    scale: Math.random() > 0.5 ? rand(1.08, 1.18) : rand(0.85, 0.95),
    duration: rand(7, 14),
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  scaleTween.progress(Math.random());
}

export default function BackgroundTextures() {
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useMemo(() => generatePositions(), []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      pieceRefs.current.forEach((el) => {
        if (!el) return;
        organicDrift(el);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {SRCS.map((src, i) => (
        <div
          key={src}
          ref={(el) => {
            pieceRefs.current[i] = el;
          }}
          className="absolute w-[90vw] h-[95vw] md:w-[55vw] md:h-[60vw]"
          style={{
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
            opacity: 0.12,
            transform: `rotate(${positions[i].rot}deg)`,
            willChange: "transform",
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 768px) 55vw, 90vw"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
