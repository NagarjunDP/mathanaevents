"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const detailedServices = [
  { title: "Custom Weddings", vimeoId: "1199405546" },
  { title: "Destination Weddings", vimeoId: "1199519472" },
  { title: "Housewarming Ceremonies", vimeoId: "1199737517" },
  { title: "Pre-Wedding Shoots", vimeoId: "1199506019" },
  { title: "Simantha (Baby Shower)", vimeoId: "1199516733" },
  { title: "Birthday Films", vimeoId: "1199508052" },
  { title: "Cocktail Parties", vimeoId: "1199515448" },
];

export default function ServicesDetailed() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".service-video-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      style={{
        padding: "120px 0",
        background: "#F2EDE4",
        position: "relative",
      }}
    >
      <div style={{ padding: "0 24px", maxWidth: "1600px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "64px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 80px)",
              color: "#060606",
              lineHeight: 1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Services from <br className="mobile-break" />
            <span style={{ fontStyle: "italic", color: "#8A6E2F" }}>Mathana Events</span>
          </h2>
        </div>

        {/* Video Grid */}
        <div ref={gridRef} className="service-video-grid">
          {detailedServices.map((svc, i) => (
            <div key={i} className="service-video-card">
              <div className="iframe-wrapper">
                <iframe
                  src={`https://player.vimeo.com/video/${svc.vimeoId}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&app_id=58479`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={svc.title}
                  className="vimeo-iframe"
                />
              </div>
              <div className="video-overlay" />
              <div className="text-wrapper">
                <h3 className="service-title">{svc.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .service-video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .service-video-card {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #000;
          cursor: pointer;
          border-radius: 4px;
        }

        /* Span the last item across the remaining columns if it's orphaned, or just let it be aligned. 
           To make the 7th item look intentional, we can make it span across columns on desktop. */
        .service-video-card:nth-child(7) {
          grid-column: span 3;
        }

        .iframe-wrapper {
          position: absolute;
          inset: 0;
          pointer-events: none; /* Crucial so it doesn't intercept clicks/hovers */
        }

        .vimeo-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          transform: scale(1.05); /* Slight scale to hide Vimeo borders/edges */
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6, 6, 6, 0.9) 0%, rgba(6, 6, 6, 0.2) 50%, rgba(6, 6, 6, 0) 100%);
          transition: background 0.5s ease;
          pointer-events: none;
        }

        .text-wrapper {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 32px;
          pointer-events: none;
        }

        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(24px, 3vw, 42px);
          color: #ffffff;
          margin: 0;
          line-height: 1.1;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-break {
          display: none;
        }

        @media (hover: hover) {
          .service-video-card:hover .vimeo-iframe {
            transform: scale(1.15);
          }
          .service-video-card:hover .video-overlay {
            background: linear-gradient(to top, rgba(6, 6, 6, 0.8) 0%, rgba(6, 6, 6, 0.4) 50%, rgba(6, 6, 6, 0.2) 100%);
          }
          .service-video-card:hover .service-title {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 1024px) {
          .service-video-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .service-video-card:nth-child(7) {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .service-video-grid {
            grid-template-columns: 1fr;
          }
          .service-video-card:nth-child(7) {
            grid-column: span 1;
          }
          .text-wrapper {
            padding: 24px;
          }
          .mobile-break {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
