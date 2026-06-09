"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const categories = ["ALL", "WEDDING", "CANDID", "PRE-WEDDING", "EVENTS"];

// Dummy data for 20 slots
const allPhotos = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  // We'll map to our dummy photos 1-8 repeatedly for the placeholder
  src: `/gallery/photo-0${(i % 8) + 1}.jpg`,
  type: categories[(i % 4) + 1], // distribute across categories
  // Strict portrait aspect ratio for all 20 photos as requested
  aspectRatio: "3/4",
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
    <div style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "160px" }}>
      
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

      {/* MASONRY GRID (CSS Columns approximation) */}
      <section style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 48px 120px" }}>
        <div ref={gridRef} className="masonry-grid">
          {filteredPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="photo-item"
              onClick={() => setLightboxIndex(i)}
              style={{
                position: "relative",
                aspectRatio: photo.aspectRatio,
                overflow: "hidden",
                marginBottom: "24px",
                cursor: "pointer",
                borderRadius: "4px",
                breakInside: "avoid",
              }}
            >
              <Image src={photo.src} alt={`Photography ${i}`} fill style={{ objectFit: "cover" }} className="photo-img" />
              <div className="photo-overlay" />
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

        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        
        .photo-item {
          display: block;
          width: 100%;
        }

        .photo-img {
          transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
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
          alignItems: center;
          justifyContent: center;
          background: rgba(6,6,6,0.5);
          border-radius: 50%;
          transition: background 300ms ease;
        }
        .lightbox-nav.left { left: 32px; }
        .lightbox-nav.right { right: 32px; }

        @media (hover: hover) {
          .filter-tab:hover {
            color: var(--gold) !important;
          }
          .photo-item:hover .photo-img {
            transform: scale(1.04);
          }
          .photo-item:hover .photo-overlay {
            background: rgba(201,168,76,0.12);
          }
          .lightbox-nav:hover {
            background: rgba(201,168,76,0.2);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .masonry-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .masonry-grid {
            grid-template-columns: 1fr;
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
