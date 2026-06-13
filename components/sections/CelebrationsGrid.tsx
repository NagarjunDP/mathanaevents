"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

const bentoImages = [
  { src: "/bento1wed.png", alt: "Mathana Events Cinematic Wedding", className: "bento-wide-top" },
  { src: "/ben4.jpg", alt: "Mathana Events Portrait", className: "bento-tall" },
  { src: "/ben1.jpg", alt: "Mathana Events Details", className: "bento-landscape-1" },
  { src: "/ben3.jpg", alt: "Mathana Events Moments", className: "bento-square" },
  { src: "/ben2.jpg", alt: "Mathana Events Candid", className: "bento-landscape-2" },
  { src: "/bento2wed.png", alt: "Mathana Events Celebration", className: "bento-wide-bottom" },
];

export default function CelebrationsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate text reveal
      gsap.fromTo(
        ".celeb-header > *",
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

      // Bento Grid reveal
      gsap.fromTo(
        ".bento-item",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 75%",
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
        padding: "120px 24px",
        background: "var(--black)",
        position: "relative",
      }}
      className="celebrations-wrapper"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div className="celeb-header" style={{ marginBottom: "60px", textAlign: "center" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>WHAT WE CREATE</p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 72px)",
              color: "var(--cream)",
              lineHeight: 1.15,
            }}
          >
            Every Moment, A Film
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {bentoImages.map((img, i) => (
            <div key={i} className={`bento-item ${img.className}`}>
              <Image 
                src={img.src} 
                alt={img.alt} 
                fill 
                style={{ objectFit: "cover" }} 
                className="bento-img"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={i === 0}
              />
              <div className="bento-overlay" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 240px;
          gap: 16px;
          width: 100%;
        }

        .bento-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: var(--charcoal);
          border: 1px solid rgba(201,168,76,0.15);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          opacity: 0; /* Handled by GSAP */
        }

        .bento-img {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) {
          .bento-item:hover .bento-img {
            transform: scale(1.05);
          }
        }

        .bento-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,6,6,0.4) 0%, transparent 40%);
          pointer-events: none;
        }

        /* Desktop Grid Placements */
        .bento-wide-top { grid-column: 1 / 5; grid-row: 1 / 2; }
        .bento-tall { grid-column: 1 / 2; grid-row: 2 / 4; }
        .bento-landscape-1 { grid-column: 2 / 4; grid-row: 2 / 3; }
        .bento-square { grid-column: 4 / 5; grid-row: 2 / 3; }
        .bento-landscape-2 { grid-column: 2 / 5; grid-row: 3 / 4; }
        .bento-wide-bottom { grid-column: 1 / 5; grid-row: 4 / 5; }

        /* Tablet Grid Placements */
        @media (max-width: 1024px) {
          .bento-grid {
            grid-auto-rows: 200px;
          }
        }

        /* Mobile Grid Placements */
        @media (max-width: 768px) {
          .celebrations-wrapper {
            padding: 80px 16px !important;
          }
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 160px;
            gap: 12px;
          }
          .bento-wide-top { grid-column: 1 / 3; grid-row: 1 / 2; }
          .bento-tall { grid-column: 1 / 2; grid-row: 2 / 4; }
          .bento-square { grid-column: 2 / 3; grid-row: 2 / 3; }
          .bento-landscape-1 { grid-column: 2 / 3; grid-row: 3 / 4; }
          .bento-landscape-2 { grid-column: 1 / 3; grid-row: 4 / 5; }
          .bento-wide-bottom { grid-column: 1 / 3; grid-row: 5 / 6; }
        }
        
        @media (max-width: 480px) {
           .bento-grid {
             grid-auto-rows: 140px;
           }
        }
      `}</style>
    </section>
  );
}
