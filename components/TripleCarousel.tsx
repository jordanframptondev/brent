"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import CarouselArrows from "./CarouselArrows";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const SWIPE_THRESHOLD = 50;

interface CarouselProps {
  images: string[];
  alt: string;
  projectKey: string;
  onOpenFullscreen: () => void;
}

export default function ProjectCarousel({
  images,
  alt,
  projectKey,
  onOpenFullscreen,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [bw, setBw] = useState(true);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => {
        const n = i + dir;
        if (n < 0) return images.length - 1;
        if (n >= images.length) return 0;
        return n;
      });
    },
    [images.length]
  );

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "80%" : "-80%", scale: 0.8, opacity: 0 }),
    center: { x: 0, scale: 1, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-80%" : "80%", scale: 0.8, opacity: 0 }),
  };

  return (
    <div className="flex flex-col">
      {/* Main image — max width 535px, aspect ratio determines height */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`${projectKey}-${index}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[index]}
              alt={`${alt} — ${index + 1} of ${images.length}`}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className={`pointer-events-none object-cover transition-[filter] duration-500 ${bw ? "grayscale" : "grayscale-0"}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar: fullscreen link + arrows */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenFullscreen}
            className="text-xs tracking-[0.15em] text-ink transition-colors hover:text-ink cursor-pointer"
          >
            [full screen]
          </button>
          <button
            onClick={() => setBw((v) => !v)}
            className="text-xs tracking-[0.15em] text-ink transition-colors hover:text-ink cursor-pointer"
          >
            [{bw ? "color" : "b&w"}]
          </button>
        </div>

        {images.length > 1 && (
          <CarouselArrows
            onPrev={() => paginate(-1)}
            onNext={() => paginate(1)}
            current={index + 1}
            total={images.length}
          />
        )}
      </div>
    </div>
  );
}
