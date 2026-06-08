"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EnquiryTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".teaser-content > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        padding: "160px 24px",
        background: "var(--black)",
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial Gold Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, rgba(6,6,6,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="teaser-content" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(48px, 6vw, 72px)",
            color: "var(--cream)",
            marginBottom: "16px",
          }}
        >
          Ready to Begin?
        </h2>
        
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "var(--cream-dim)",
            marginBottom: "48px",
            textTransform: "uppercase",
          }}
        >
          Limited dates available &middot; We respond within 24 hours
        </p>

        <Link
          href="/contact"
          className="btn-gold-outline"
        >
          Start Your Story
        </Link>
      </div>
    </section>
  );
}
