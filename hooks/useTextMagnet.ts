"use client";
import { useEffect } from "react";
import gsap from "gsap";

/**
 * Attaches a magnetic repulsion effect to text.
 * When cursor approaches, letters push away slightly.
 */
export function useTextMagnet(selector: string, enabled = true) {
  useEffect(() => {
    // Only enable on desktop and if enabled is true
    if (!enabled || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    // A simple custom implementation since we don't have SplitText plugin.
    // It wraps characters in spans if not already wrapped.
    elements.forEach((el) => {
      // If it doesn't have child spans, split it
      if (!el.querySelector('.char-split')) {
        const text = el.textContent || "";
        el.textContent = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.className = "char-split";
          span.style.display = char === " " ? "inline" : "inline-block";
          // Maintain transition for smooth return
          span.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
          el.appendChild(span);
        });
      }
    });

    const chars = document.querySelectorAll(`${selector} .char-split`);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distX = clientX - charX;
        const distY = clientY - charY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const maxDistance = 200; // Repel radius
        if (distance < maxDistance) {
          // Calculate push strength (closer = stronger push away)
          const push = (maxDistance - distance) / maxDistance;
          const pushX = (distX / distance) * -8 * push; // Max 8px displacement
          const pushY = (distY / distance) * -8 * push;
          
          gsap.to(char, {
            x: pushX,
            y: pushY,
            duration: 0.1,
            overwrite: true,
          });
        } else {
          gsap.to(char, {
            x: 0,
            y: 0,
            duration: 0.4,
            overwrite: "auto",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      gsap.to(chars, { x: 0, y: 0, duration: 0.5 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [selector, enabled]);
}
