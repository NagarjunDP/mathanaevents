"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const services = [
  { num: "01", title: "Wedding Films", img: "/gallery/photo-01.jpg", href: "/films" },
  { num: "02", title: "Candid Photography", img: "/gallery/photo-02.jpg", href: "/photography" },
  { num: "03", title: "Pre-Wedding", img: "/gallery/photo-03.jpg", href: "/films" },
  { num: "04", title: "Housewarming & Simantha", img: "/gallery/photo-04.jpg", href: "/photography" },
  { num: "05", title: "Birthday Films", img: "/gallery/photo-05.jpg", href: "/films" },
  { num: "06", title: "Cocktail & Reception", img: "/gallery/photo-06.jpg", href: "/photography" },
];

export default function CelebrationsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".celebration-card");

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

      // Card Stacking Parallax Effect
      cards.forEach((card, i) => {
        // The card sticks at top: 120px (set in CSS)
        // We animate it scaling down slightly and darkening as the next card scrolls over it
        if (i !== cards.length - 1) { // don't animate the last card as nothing overlaps it
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 120px", // when it hits the sticky point
              end: "bottom 120px", // when the bottom of this card hits the sticky point
              scrub: true,
            },
          });
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
        background: "var(--black)",
        position: "relative",
      }}
      className="celebrations-wrapper"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div className="celeb-header" style={{ marginBottom: "80px", textAlign: "center" }}>
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

        {/* Stacking Cards */}
        <div className="celeb-stack">
          {services.map((svc, i) => (
            <Link 
              key={svc.num} 
              href={svc.href} 
              className="celebration-card"
              style={{ zIndex: i + 1 }}
            >
              <div className="card-inner">
                {/* Background Image - Wider panoramic feel */}
                <div className="bg-img-wrap">
                  <Image src={svc.img} alt={svc.title} fill style={{ objectFit: "cover" }} className="bg-img" />
                </div>
                {/* Dark Overlay for text legibility */}
                <div className="card-overlay" />
                
                <div className="card-content">
                  {/* Number */}
                  <span className="card-num">
                    {svc.num} &middot;
                  </span>

                  {/* Title */}
                  <h3 className="card-title">
                    {svc.title}
                  </h3>
                </div>

                {/* Arrow Icon */}
                <div className="card-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .celeb-stack {
          display: flex;
          flex-direction: column;
          /* Space between cards before they stack */
          gap: 60px; 
          padding-bottom: 60px;
        }

        .celebration-card {
          position: sticky;
          top: 120px; /* The point where they stack */
          width: 100%;
          height: clamp(400px, 60vh, 600px);
          display: block;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.8);
          transform-origin: top center;
          border: 1px solid rgba(201,168,76,0.1);
          background: var(--charcoal);
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          padding: clamp(24px, 4vw, 48px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .bg-img-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        
        .bg-img {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6,6,6,0.9) 0%, rgba(6,6,6,0.3) 50%, rgba(6,6,6,0.1) 100%);
          z-index: 1;
          transition: background 0.6s ease;
        }

        .card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          margin-top: auto;
        }

        .card-num {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 11px;
          color: var(--gold);
          letter-spacing: 0.3em;
          margin-bottom: 8px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(32px, 5vw, 56px);
          color: var(--cream);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateY(0);
        }

        .card-arrow {
          position: absolute;
          bottom: clamp(24px, 4vw, 48px);
          right: clamp(24px, 4vw, 48px);
          z-index: 2;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px solid rgba(242, 237, 228, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cream);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(0);
        }

        @media (hover: hover) {
          .celebration-card:hover .bg-img {
            transform: scale(1.05);
          }
          .celebration-card:hover .card-overlay {
            background: linear-gradient(to top, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.4) 50%, rgba(6,6,6,0.2) 100%);
          }
          .celebration-card:hover .card-title {
            transform: translateY(-8px);
          }
          .celebration-card:hover .card-arrow {
            background: var(--cream);
            color: var(--charcoal);
            transform: translateX(8px);
          }
        }

        @media (max-width: 768px) {
          .celebrations-wrapper {
            padding: 80px 16px !important;
          }
          .card-arrow {
            width: 48px;
            height: 48px;
          }
          .celebration-card {
            top: 120px; /* Kept the same as desktop to perfectly sync with ScrollTrigger start point */
          }
        }
      `}</style>
    </section>
  );
}
