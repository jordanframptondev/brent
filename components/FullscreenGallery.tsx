"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const SWIPE_THRESHOLD = 50;

interface FullscreenGalleryProps {
  images: string[];
  alt: string;
  onClose: () => void;
}

export default function FullscreenGallery({
  images,
  alt,
  onClose,
}: FullscreenGalleryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, paginate]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/80 backdrop-blur-md"
    >
      {/* Top bar with close */}
      <div className="relative z-30 flex justify-end px-5 pt-5">
        <button
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close gallery"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image area */}
      <div className="relative flex flex-1 items-center justify-center px-16 py-8">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
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
            className="absolute inset-x-20 inset-y-4 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[index]}
              alt={`${alt} — ${index + 1} of ${images.length}`}
              fill
              sizes="100vw"
              className="pointer-events-none object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onClick={() => paginate(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M19 12l-7-7M19 12l-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom bar — counter + instructions */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm text-white/60">
          {alt}
        </span>
        <span className="text-sm tracking-[0.2em] text-white/40">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <span className="hidden text-xs text-white/30 sm:block">
          ESC to close &middot; arrow keys to navigate
        </span>
      </div>
    </motion.div>
  );
}
