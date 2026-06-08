"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const hoverIn = () => cursor.classList.add("hovering");
    const hoverOut = () => cursor.classList.remove("hovering");

    document.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, select, textarea, .masonry-item, .film-card, .service-card"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", hoverIn);
      el.addEventListener("mouseleave", hoverOut);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", hoverIn);
        el.removeEventListener("mouseleave", hoverOut);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
