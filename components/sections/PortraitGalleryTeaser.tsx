"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import LiquidButton from "@/components/ui/LiquidButton";
import { useRouter } from "next/navigation";

const teaserPhotos = [
  { id: 1, src: "/gallery/photo-01.jpg", alt: "Mathana Portrait 1" },
  { id: 2, src: "/gallery/photo-02.jpg", alt: "Mathana Portrait 2" },
  { id: 3, src: "/gallery/photo-03.jpg", alt: "Mathana Portrait 3" },
  { id: 4, src: "/gallery/photo-04.jpg", alt: "Mathana Portrait 4" },
  { id: 5, src: "/gallery/photo-05.jpg", alt: "Mathana Portrait 5" },
];

export default function PortraitGalleryTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // Pinning and horizontal scroll on all devices
      const track = trackRef.current;
      if (track) {
        // Calculate the distance to scroll horizontally
        const scrollDist = track.scrollWidth - window.innerWidth + 120; // 120 for right margin

        gsap.to(track, {
          x: -scrollDist,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDist}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
      
      // Image reveal animations
      gsap.fromTo(
        ".pgt-slide",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pgt-section"
      style={{
        background: "var(--cream)", // Premium light cream
        color: "var(--charcoal)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="pgt-header">
        <div>
          <p className="section-label dark-label">STILLS THAT SPEAK</p>
          <h2 className="magnetic-text pgt-title">
            The Gallery
          </h2>
        </div>
        <LiquidButton 
          onClick={() => router.push("/photography")} 
          className="btn-primary" 
          style={{ borderColor: "var(--charcoal)", color: "var(--charcoal)" }}
        >
          View All
        </LiquidButton>
      </div>

      {/* The Sliding Track */}
      <div className="pgt-track-wrapper">
        <div ref={trackRef} className="pgt-track">
          {teaserPhotos.map((photo, i) => (
            <div 
              key={photo.id} 
              className="pgt-slide"
              onClick={() => router.push("/photography")}
            >
              <div className="pgt-img-wrapper">
                <Image 
                  src={photo.src} 
                  alt={photo.alt} 
                  fill 
                  style={{ objectFit: "cover" }} 
                  className="pgt-img"
                  priority={i < 2}
                />
              </div>
            </div>
          ))}
          {/* A final slide to encourage clicking "View All" */}
          <div className="pgt-slide pgt-final-slide" onClick={() => router.push("/photography")}>
            <h3 className="final-slide-text">Explore the full<br/>Photography collection</h3>
            <div className="explore-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pgt-section {
          /* Setup height to at least 100vh for pinning on desktop */
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-top: 120px;
          padding-bottom: 120px;
        }

        .pgt-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 48px;
          margin-bottom: 80px;
          flex-shrink: 0;
        }

        .dark-label {
          color: var(--charcoal) !important;
          opacity: 0.6;
          margin-bottom: 16px;
          border-color: rgba(14,14,14,0.2) !important;
        }

        .pgt-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(48px, 6vw, 80px);
          color: var(--charcoal);
          line-height: 1.1;
          margin: 0;
        }

        .pgt-track-wrapper {
          padding-left: 48px;
          flex-grow: 1;
          display: flex;
          align-items: center;
          /* On mobile, we can just allow native horizontal scroll */
          overflow: visible;
        }

        .pgt-track {
          display: flex;
          gap: 4vw;
          width: max-content; /* Critical for GSAP width calculation */
          padding-right: 48px; /* Padding at the end of the scroll */
        }

        .pgt-slide {
          flex-shrink: 0;
          cursor: pointer;
        }

        .pgt-img-wrapper {
          position: relative;
          width: clamp(280px, 25vw, 420px);
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 2px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }

        .pgt-img {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pgt-slide:hover .pgt-img {
          transform: scale(1.06);
        }

        .pgt-final-slide {
          width: clamp(280px, 25vw, 420px);
          aspect-ratio: 3 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          border: 1px solid rgba(14, 14, 14, 0.1);
          border-radius: 2px;
          padding: 32px;
          transition: background 0.4s ease;
        }

        .pgt-final-slide:hover {
          background: rgba(14, 14, 14, 0.03);
        }

        .final-slide-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(24px, 2.5vw, 32px);
          color: var(--charcoal);
          margin-bottom: 32px;
        }

        .explore-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px solid var(--charcoal);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease, background 0.4s ease;
        }

        .pgt-final-slide:hover .explore-circle {
          background: var(--charcoal);
        }
        
        .pgt-final-slide:hover .explore-circle svg {
          stroke: var(--cream);
        }

        @media (max-width: 768px) {
          .pgt-section {
            padding-top: 80px;
            padding-bottom: 80px;
          }
          
          .pgt-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 0 24px;
            gap: 24px;
            margin-bottom: 48px;
          }

          .pgt-track-wrapper {
            padding-left: 24px;
            overflow: visible; /* Ensure GSAP controls the overflow */
          }
        }
      `}</style>
    </section>
  );
}
