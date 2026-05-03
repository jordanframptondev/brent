"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";

const SWIPE_THRESHOLD = 50;

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length]
  );

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      paginate(1);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      paginate(-1);
    }
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative h-full w-full">
      {/* Image area */}
      <div className="relative h-full w-full overflow-hidden bg-rule/20">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
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
              className="pointer-events-none object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar: arrows + counter */}
      {images.length > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className="flex items-center justify-center text-ink/50 transition-colors hover:text-ink"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 12H5M5 12l6 6M5 12l6-6" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next image"
              className="flex items-center justify-center text-ink/50 transition-colors hover:text-ink"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M19 12l-6-6M19 12l-6 6" />
              </svg>
            </button>
          </div>

          <span className="text-xs tracking-wider text-ink-soft/50">
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
