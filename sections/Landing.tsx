"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <section className="relative z-10 flex h-dvh w-full items-center justify-center">
      <div className="flex flex-col items-center px-6 text-center">
        <Image
          src="/logo/jbd-logo-no-tagline-clean-hero-720w_light.png"
          alt="JB|D Custom Home Design"
          width={280}
          height={93}
          className="h-auto w-45 sm:w-60"
          priority
        />

        <h1 className="max-w-3xl text-4xl text-ink">
          Custom Home Design
        </h1>

        <p className="mt-6 max-w-xl text-base text-ink-soft sm:text-lg">
          Architecture | Design | Plan
        </p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: [0.45, 0, 0.55, 1],
        }}
      >
        <span className="text-xs tracking-widest text-ink-soft">
          [contact]
        </span>
        <svg
          width="24"
          height="14"
          viewBox="0 0 24 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink/30"
        >
          <path d="M2 2l10 10L22 2" />
        </svg>
      </motion.div>
    </section>
  );
}
