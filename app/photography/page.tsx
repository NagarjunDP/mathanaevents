"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const categories = ["ALL", "WEDDING", "CANDID", "PRE-WEDDING", "EVENTS"];

// Client's 19 Portrait Photos
const allPhotos = Array.from({ length: 19 }, (_, i) => ({
  id: String(i + 1),
  src: `/pic${i + 1}.jpeg`,
  type: categories[(i % 4) + 1], // distribute across categories
}));

export default function PhotographyPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = activeTab === "ALL"
    ? allPhotos
    : allPhotos.filter(p => p.type === activeTab);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".photo-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" }
    );
  }, [activeTab]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
  };
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < filteredPhotos.length - 1) setLightboxIndex(lightboxIndex + 1);
  };

  return (
    <div style={{ background: "var(--charcoal)", minHeight: "100vh", paddingTop: "160px" }}>
      
      {/* HEADER */}
      <section style={{ textAlign: "center", marginBottom: "80px", padding: "0 24px" }}>
        <p className="section-label" style={{ marginBottom: "16px" }}>PHOTOGRAPHY</p>
        <h1
          className="magnetic-text"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(48px, 6vw, 80px)",
            color: "var(--cream)",
            lineHeight: 1.1,
          }}
        >
          Frames That Last Forever
        </h1>
      </section>

      {/* FILTER TABS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", padding: "0 24px", marginBottom: "64px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`filter-tab ${activeTab === cat ? "active" : ""}`}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 200,
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "var(--cream)",
              textTransform: "uppercase",
              paddingBottom: "8px",
              position: "relative",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TRUE MASONRY GRID */}
      <section style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 48px 120px" }}>
        <div ref={gridRef} className="masonry-grid">
          {filteredPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="photo-item"
              onClick={() => setLightboxIndex(i)}
            >
              <div className="photo-wrapper">
                {/* Using standard img for perfect masonry height without hardcoded aspect ratios */}
                <img 
                  src={photo.src} 
                  alt={`Photography ${i}`} 
                  className="photo-img" 
                  loading="lazy"
                />
                <div className="photo-overlay" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(6,6,6,0.98)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 300ms ease",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            style={{ position: "absolute", top: "32px", right: "48px", width: "40px", height: "40px", zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ position: "absolute", width: "24px", height: "2px", background: "var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ position: "absolute", width: "24px", height: "2px", background: "var(--gold)", transform: "rotate(-45deg)" }} />
          </button>
          
          <div style={{ position: "relative", width: "90vw", height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={(e) => e.stopPropagation()}>
            <Image 
              src={filteredPhotos[lightboxIndex].src} 
              alt="Lightbox View" 
              fill 
              style={{ objectFit: "contain" }} 
            />
          </div>

          {/* Controls */}
          {lightboxIndex > 0 && (
            <button onClick={handlePrev} className="lightbox-nav left">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
          {lightboxIndex < filteredPhotos.length - 1 && (
            <button onClick={handleNext} className="lightbox-nav right">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .filter-tab::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transition: transform 300ms ease;
        }
        .filter-tab:not(.active):after {
          transform: scaleX(0);
        }

        /* True Masonry CSS Columns */
        .masonry-grid {
          column-count: 4;
          column-gap: 24px;
        }
        
        .photo-item {
          display: inline-block;
          width: 100%;
          margin-bottom: 24px;
          break-inside: avoid;
          cursor: pointer;
        }

        .photo-wrapper {
          position: relative;
          width: 100%;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(242, 237, 228, 0.05); /* very subtle placeholder background */
        }

        .photo-img {
          display: block;
          width: 100%;
          height: auto;
          transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .photo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0);
          transition: background 300ms ease;
          z-index: 1;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center; /* FIXED SYNTAX ERROR */
          justify-content: center;
          background: rgba(6,6,6,0.6);
          border-radius: 50%;
          transition: background 300ms ease;
          z-index: 101;
          backdrop-filter: blur(4px);
        }
        .lightbox-nav.left { left: 32px; }
        .lightbox-nav.right { right: 32px; }

        @media (hover: hover) {
          .filter-tab:hover {
            color: var(--gold) !important;
          }
          .photo-wrapper:hover .photo-img {
            transform: scale(1.04);
          }
          .photo-wrapper:hover .photo-overlay {
            background: rgba(201,168,76,0.12);
          }
          .lightbox-nav:hover {
            background: rgba(201,168,76,0.3);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 3;
          }
        }
        
        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        
        @media (max-width: 480px) {
          .masonry-grid {
            column-count: 1;
          }
          .lightbox-nav {
            width: 48px;
            height: 48px;
          }
          .lightbox-nav.left { left: 16px; }
          .lightbox-nav.right { right: 16px; }
        }
      `}</style>
    </div>
  );
}
