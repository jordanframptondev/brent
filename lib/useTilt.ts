"use client";

import {
  useMotionValue,
  useTransform,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import type { MouseEvent } from "react";

const SPRING = { stiffness: 150, damping: 20 };
const DEGREES = 4;

export function useTilt(enabled: boolean) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [DEGREES, -DEGREES]),
    SPRING
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-DEGREES, DEGREES]),
    SPRING
  );

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const style: MotionStyle = enabled
    ? { rotateX, rotateY, transformPerspective: 800 }
    : {};

  return { style, handleMouseMove, handleMouseLeave };
}
