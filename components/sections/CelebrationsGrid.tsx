"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

const bentoImages = [
  { src: "/wedban1.png", alt: "Mathana Events Wedding Banner 1", className: "img-wedban1" },
  { src: "/ben3.jpg", alt: "Mathana Events Moments", className: "img-ben3" },
  { src: "/haldiban2.png", alt: "Mathana Events Haldiban 2", className: "img-haldiban2" },
  { src: "/haldiban.png", alt: "Mathana Events Haldiban", className: "img-haldiban" },
  { src: "/marrban2.png", alt: "Mathana Events Wedding Portrait 2", className: "img-marrban2" },
  { src: "/ben1.jpg", alt: "Mathana Events Details", className: "img-ben1" },
  { src: "/marrban1.png", alt: "Mathana Events Wedding Portrait 1", className: "img-marrban1" },
  { src: "/ben2.jpg", alt: "Mathana Events Candid", className: "img-ben2" },
  { src: "/marrban3.png", alt: "Mathana Events Wedding Portrait 3", className: "img-marrban3" },
  { src: "/marrban4.png", alt: "Mathana Events Wedding Portrait 4", className: "img-marrban4" },
  { src: "/ben4.jpg", alt: "Mathana Events Portrait", className: "img-ben4" },
  { src: "/wedban2.png", alt: "Mathana Events Wedding Banner 2", className: "img-wedban2" },
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

      // Bento Grid items reveal and parallax image animations
      const items = gsap.utils.toArray<HTMLElement>(".bento-item");
      items.forEach((item) => {
        // Entrance animation for each card as it scrolls into view
        gsap.fromTo(
          item,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        // Smooth scroll-driven vertical parallax for the image inside the card
        const img = item.querySelector(".bento-img");
        if (img) {
          gsap.set(img, { scale: 1.15, transformOrigin: "center center" });
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        padding: "120px 24px",
        background: "#F2EDE4",
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
              color: "#060606",
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
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          will-change: transform;
        }

        @media (hover: hover) {
          .bento-item:hover {
            transform: translateY(-8px) scale(1.01) !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.7);
            border-color: rgba(201,168,76,0.45);
          }
        }

        .bento-img {
          will-change: transform;
        }

        .bento-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,6,6,0.4) 0%, transparent 40%);
          pointer-events: none;
        }

        /* Desktop Grid Placements */
        .img-wedban1 { grid-column: 1 / 4; grid-row: 1 / 2; }
        .img-ben3 { grid-column: 4 / 5; grid-row: 1 / 2; }
        .img-haldiban2 { grid-column: 1 / 2; grid-row: 2 / 4; }
        .img-haldiban { grid-column: 2 / 3; grid-row: 2 / 3; }
        .img-marrban2 { grid-column: 3 / 5; grid-row: 2 / 3; }
        .img-ben1 { grid-column: 2 / 4; grid-row: 3 / 4; }
        .img-marrban1 { grid-column: 4 / 5; grid-row: 3 / 5; }
        .img-ben2 { grid-column: 1 / 3; grid-row: 4 / 5; }
        .img-marrban3 { grid-column: 3 / 4; grid-row: 4 / 6; }
        .img-marrban4 { grid-column: 1 / 3; grid-row: 5 / 6; }
        .img-ben4 { grid-column: 4 / 5; grid-row: 5 / 7; }
        .img-wedban2 { grid-column: 1 / 4; grid-row: 6 / 7; }

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
          .img-wedban1 { grid-column: 1 / 3; grid-row: 1 / 2; }
          .img-haldiban2 { grid-column: 1 / 2; grid-row: 2 / 4; }
          .img-marrban1 { grid-column: 2 / 3; grid-row: 2 / 4; }
          .img-ben3 { grid-column: 1 / 2; grid-row: 4 / 5; }
          .img-haldiban { grid-column: 2 / 3; grid-row: 4 / 5; }
          .img-marrban2 { grid-column: 1 / 3; grid-row: 5 / 6; }
          .img-ben1 { grid-column: 1 / 3; grid-row: 6 / 7; }
          .img-marrban3 { grid-column: 1 / 2; grid-row: 7 / 9; }
          .img-ben4 { grid-column: 2 / 3; grid-row: 7 / 9; }
          .img-ben2 { grid-column: 1 / 3; grid-row: 9 / 10; }
          .img-marrban4 { grid-column: 1 / 3; grid-row: 10 / 11; }
          .img-wedban2 { grid-column: 1 / 3; grid-row: 11 / 12; }
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
