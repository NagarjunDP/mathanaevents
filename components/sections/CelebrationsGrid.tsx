"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".celebration-card",
        { y: 80, opacity: 0 },
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
        padding: "120px 48px",
        background: "var(--charcoal)",
        position: "relative",
      }}
      className="celebrations-wrapper"
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "64px", textAlign: "center" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>WHAT WE CREATE</p>
          <h2
            className="magnetic-text"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(36px, 5vw, 60px)",
              color: "var(--cream)",
              lineHeight: 1.15,
            }}
          >
            Every Moment, A Film
          </h2>
        </div>

        <div className="celeb-grid">
          {services.map((svc) => (
            <Link key={svc.num} href={svc.href} className="celebration-card">
              <div className="card-inner">
                {/* Background Image */}
                <div className="bg-img-wrap">
                  <Image src={svc.img} alt={svc.title} fill style={{ objectFit: "cover" }} className="bg-img" />
                </div>
                {/* Dark Overlay */}
                <div className="card-overlay" />
                
                {/* Number */}
                <span className="card-num">
                  {svc.num} &middot;
                </span>

                {/* Title */}
                <h3 className="card-title">
                  {svc.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .celeb-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .celebration-card {
          position: relative;
          width: 100%;
          height: 420px;
          display: block;
          overflow: hidden;
          border-radius: 4px;
        }

        .card-inner {
          position: absolute;
          inset: 0;
          padding: 32px;
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
          transition: transform 600ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%);
          z-index: 1;
          transition: background 400ms ease;
        }

        .card-num {
          position: relative;
          z-index: 2;
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 9px;
          color: var(--gold);
          letter-spacing: 0.3em;
        }

        .card-title {
          position: relative;
          z-index: 2;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 28px;
          color: var(--cream);
          transition: transform 400ms ease;
          transform: translateY(0);
        }

        @media (hover: hover) {
          .celebration-card:hover .bg-img {
            transform: scale(1.08);
          }
          .celebration-card:hover .card-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%);
          }
          .celebration-card:hover .card-title {
            transform: translateY(-8px);
          }
        }

        @media (max-width: 1024px) {
          .celeb-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .celebrations-wrapper {
            padding: 80px 24px !important;
          }
          .celeb-grid {
            grid-template-columns: 1fr;
          }
          .celebration-card {
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
