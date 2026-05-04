"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  current: number;
  total: number;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const [clickCount, setClickCount] = useState(0);

  function handleClick() {
    setClickCount((c) => c + 1);
    onClick();
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className="relative flex h-12 w-12 cursor-pointer items-center justify-center text-ink-soft/40 transition-colors hover:text-ink"
    >
      {/* Ripple */}
      <motion.span
        key={clickCount}
        initial={{ scale: 0, opacity: 0.3 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute inset-0 rounded-full bg-ink/10"
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "prev" ? (
          <path d="M19 12H5M5 12l7 7M5 12l7-7" />
        ) : (
          <path d="M5 12h14M19 12l-7-7M19 12l-7 7" />
        )}
      </svg>
    </motion.button>
  );
}

export default function CarouselArrows({
  onPrev,
  onNext,
  current,
  total,
}: CarouselArrowsProps) {
  const display = String(current).padStart(2, "0");
  const totalDisplay = String(total).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <ArrowButton direction="prev" onClick={onPrev} />
      <span className="text-sm tracking-[0.2em] text-ink-soft/40">
        {display} / {totalDisplay}
      </span>
      <ArrowButton direction="next" onClick={onNext} />
    </div>
  );
}
