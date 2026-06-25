"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const categories = ["ALL", "WEDDING", "CANDID", "PRE-WEDDING", "EVENTS"];

// All Photos with exact dimensions for responsive rendering and CLS prevention
const allPhotos = [
  { id: "1", src: "/pic1.jpeg", type: "WEDDING", width: 2984, height: 4480 },
  { id: "2", src: "/pic2.jpeg", type: "CANDID", width: 3072, height: 4608 },
  { id: "3", src: "/pic3.jpeg", type: "PRE-WEDDING", width: 3072, height: 4608 },
  { id: "4", src: "/pic4.jpeg", type: "EVENTS", width: 4672, height: 7008 },
  { id: "5", src: "/pic5.jpeg", type: "WEDDING", width: 4672, height: 7008 },
  { id: "6", src: "/pic6.jpeg", type: "CANDID", width: 4672, height: 7008 },
  { id: "7", src: "/pic7.jpeg", type: "PRE-WEDDING", width: 4672, height: 7008 },
  { id: "8", src: "/pic8.jpeg", type: "EVENTS", width: 4672, height: 7008 },
  { id: "9", src: "/pic9.jpeg", type: "WEDDING", width: 4672, height: 7008 },
  { id: "10", src: "/pic10.jpeg", type: "CANDID", width: 4672, height: 7008 },
  { id: "11", src: "/pic11.jpeg", type: "PRE-WEDDING", width: 7008, height: 4672 },
  { id: "12", src: "/pic12.jpeg", type: "EVENTS", width: 4672, height: 7008 },
  { id: "13", src: "/pic13.jpeg", type: "WEDDING", width: 4082, height: 6123 },
  { id: "14", src: "/pic14.jpeg", type: "CANDID", width: 4082, height: 6123 },
  { id: "15", src: "/pic15.jpeg", type: "PRE-WEDDING", width: 3265, height: 4898 },
  { id: "16", src: "/pic16.jpeg", type: "EVENTS", width: 4082, height: 6123 },
  { id: "17", src: "/pic17.jpeg", type: "WEDDING", width: 2667, height: 4000 },
  { id: "18", src: "/pic18.jpeg", type: "CANDID", width: 3766, height: 5658 },
  { id: "19", src: "/pic19.jpeg", type: "PRE-WEDDING", width: 2666, height: 3999 },
  // Pre-wedding photos added by user (optimized and lazy loaded)
  { id: "20", src: "/1 (5).JPG.jpeg", type: "PRE-WEDDING", width: 10854, height: 6105 },
  { id: "21", src: "/1 (23).jpg.jpeg", type: "PRE-WEDDING", width: 4024, height: 6048 },
  { id: "22", src: "/1 (24).jpg.jpeg", type: "PRE-WEDDING", width: 4672, height: 7008 },
  { id: "23", src: "/1 (25).jpg.jpeg", type: "PRE-WEDDING", width: 7008, height: 4672 },
  { id: "24", src: "/1 (33).JPG.jpeg", type: "PRE-WEDDING", width: 4672, height: 7008 },
  { id: "25", src: "/1 (34).JPG.jpeg", type: "PRE-WEDDING", width: 4672, height: 7008 },
  { id: "26", src: "/1 (36).JPG.jpeg", type: "PRE-WEDDING", width: 4672, height: 7008 },
  { id: "27", src: "/1 (54).JPG.jpeg", type: "PRE-WEDDING", width: 3823, height: 5734 },
];

export default function PhotographyPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

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

  // Subtle Parallax for the hero image
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    const handleScroll = () => {
      if (heroImgRef.current) {
        const scrollY = window.scrollY;
        gsap.to(heroImgRef.current, { y: scrollY * 0.3, duration: 0, ease: "none" });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) setLightboxIndex(lightboxIndex - 1);
  };
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < filteredPhotos.length - 1) setLightboxIndex(lightboxIndex + 1);
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      
      {/* HERO SECTION WITH PIC11.JPEG AND FADE */}
      <section style={{ position: "relative", width: "100%", height: "80vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {/* Background Parallax Image */}
        <div style={{ position: "absolute", inset: "-10%", zIndex: 0 }}>
          <Image 
            ref={heroImgRef as any}
            src="/pic11.jpeg" 
            alt="Mathana Events Premium Photography" 
            fill
            priority
            sizes="120vw"
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>

        {/* Premium Vignette / Fade into Cream background */}
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            zIndex: 1,
            background: "linear-gradient(to bottom, rgba(242, 237, 228, 0.2) 0%, rgba(242, 237, 228, 0.7) 60%, var(--cream) 100%)"
          }} 
        />

        {/* Text Overlay */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginTop: "120px" }}>
          <p className="section-label" style={{ marginBottom: "24px", color: "var(--charcoal)", fontWeight: 500 }}>THE GALLERY</p>
          <h1
            className="magnetic-text"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(56px, 8vw, 100px)",
              color: "var(--charcoal)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textShadow: "0 10px 30px rgba(242, 237, 228, 0.5)"
            }}
          >
            Frames That Last Forever
          </h1>
        </div>
      </section>

      {/* FILTER TABS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", padding: "40px 24px 80px", position: "relative", zIndex: 10 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`filter-tab ${activeTab === cat ? "active" : ""}`}
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "var(--charcoal)",
              textTransform: "uppercase",
              paddingBottom: "8px",
              position: "relative",
              opacity: activeTab === cat ? 1 : 0.6,
              transition: "opacity 300ms ease"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TRUE MASONRY GRID */}
      <section style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 48px 120px", position: "relative", zIndex: 10 }}>
        <div ref={gridRef} className="masonry-grid">
          {filteredPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className="photo-item"
              onClick={() => setLightboxIndex(i)}
            >
              <div className="photo-wrapper">
                <Image 
                  src={photo.src} 
                  alt={`Photography ${i}`} 
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="photo-img"
                  style={{ width: "100%", height: "auto" }}
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
            background: "rgba(14, 14, 14, 0.98)", // dark charcoal background for lightbox
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 300ms ease",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            style={{ position: "absolute", top: "32px", right: "48px", width: "40px", height: "40px", zIndex: 101, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ position: "absolute", width: "24px", height: "2px", background: "var(--cream)", transform: "rotate(45deg)", transition: "background 300ms ease" }} className="close-line" />
            <div style={{ position: "absolute", width: "24px", height: "2px", background: "var(--cream)", transform: "rotate(-45deg)", transition: "background 300ms ease" }} className="close-line" />
          </button>
          
          <div style={{ position: "relative", width: "90vw", height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={(e) => e.stopPropagation()}>
            <Image 
              src={filteredPhotos[lightboxIndex].src} 
              alt="Lightbox View" 
              fill 
              sizes="90vw"
              style={{ objectFit: "contain" }} 
              priority
            />
          </div>

          {/* Controls */}
          {lightboxIndex > 0 && (
            <button onClick={handlePrev} className="lightbox-nav left">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          )}
          {lightboxIndex < filteredPhotos.length - 1 && (
            <button onClick={handleNext} className="lightbox-nav right">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
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
          background: var(--charcoal);
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
          background: rgba(14, 14, 14, 0.03); /* super subtle placeholder */
          box-shadow: 0 10px 30px -10px rgba(14,14,14,0.1);
        }

        .photo-img {
          display: block;
          width: 100%;
          height: auto;
          transition: transform 600ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .photo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(14,14,14,0);
          transition: background 400ms ease;
          z-index: 1;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(242, 237, 228, 0.1);
          border: 1px solid rgba(242, 237, 228, 0.2);
          border-radius: 50%;
          transition: all 300ms ease;
          z-index: 101;
          backdrop-filter: blur(8px);
        }
        .lightbox-nav.left { left: 48px; }
        .lightbox-nav.right { right: 48px; }

        @media (hover: hover) {
          .filter-tab:hover {
            opacity: 1 !important;
          }
          .photo-wrapper:hover .photo-img {
            transform: scale(1.05);
          }
          .photo-wrapper:hover .photo-overlay {
            background: rgba(14,14,14,0.15);
          }
          .lightbox-nav:hover {
            background: rgba(242, 237, 228, 0.25);
            transform: translateY(-50%) scale(1.05);
          }
          button:hover .close-line {
            background: var(--gold) !important;
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
          .lightbox-nav.left { left: 24px; }
          .lightbox-nav.right { right: 24px; }
        }
        
        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
          }
          section[style*="height: 80vh"] {
            height: 60vh !important;
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
