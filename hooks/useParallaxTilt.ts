"use client";
import { useEffect } from "react";
import gsap from "gsap";

/**
 * Image moves in the OPPOSITE direction of cursor movement.
 * Cursor moves right → image shifts left.
 */
export function useParallaxTilt(selector: string, multiplier: number = 10, enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize cursor position between -1 and 1
      const normX = (clientX / innerWidth) * 2 - 1;
      const normY = (clientY / innerHeight) * 2 - 1;

      // Calculate target shift (opposite direction)
      targetX = -normX * multiplier;
      targetY = -normY * multiplier;

      gsap.to(elements, {
        x: targetX,
        y: targetY,
        duration: 1, // acts like lerp smoothing for buttery lag
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(elements, { x: 0, y: 0, duration: 1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(elements);
    };
  }, [selector, multiplier, enabled]);
}
