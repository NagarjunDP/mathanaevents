"use client";
import { useEffect, useRef } from "react";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.classList.add("loaded");
        setTimeout(() => {
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
        }, 1200);
      }
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={loaderRef} className="page-loader">
      <span className="loader-text">MATHANA EVENTS</span>
    </div>
  );
}
