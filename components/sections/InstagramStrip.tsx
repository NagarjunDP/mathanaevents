"use client";
import Image from "next/image";

const photos = [
  "/p1.jpeg",
  "/p2.jpeg",
  "/p3.jpeg",
  "/p4.jpeg",
  "/p5.jpeg",
  "/p6.jpeg",
  "/pic1.jpeg",
  "/pic2.jpeg",
  "/pic3.jpeg",
  "/pic4.jpeg",
  "/pic5.jpeg",
  "/pic6.jpeg",
];

export default function InstagramStrip() {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--cream)",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "0 24px", marginBottom: "48px" }}>
        <p className="section-label" style={{ marginBottom: "16px", color: "var(--gold-dim)" }}>FOLLOW THE JOURNEY</p>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(6, 6, 6, 0.6)",
          }}
        >
          @mathanaevents &middot; 7,450 Followers
        </p>
      </div>

      {/* Marquee Container */}
      <div
        style={{
          display: "flex",
          width: "100%",
          overflow: "hidden", // Hide the scrollbar and overflowing content
        }}
      >
        {/* The Track that animates */}
        <div className="ig-marquee-track">
          {[...photos, ...photos].map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/mathanaevents"
              target="_blank"
              rel="noreferrer"
              className="ig-photo-link"
              style={{
                position: "relative",
                flex: "0 0 auto",
                aspectRatio: "1/1",
                overflow: "hidden",
              }}
            >
              <Image 
                src={src} 
                alt={`Instagram ${i + 1}`} 
                fill 
                sizes="(max-width: 480px) 70vw, (max-width: 768px) 40vw, (max-width: 1024px) 25vw, 16vw" 
                style={{ objectFit: "cover" }} 
                className="ig-img" 
              />
              <div className="ig-overlay" />
            </a>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "48px" }}>
        <a
          href="https://instagram.com/mathanaevents"
          target="_blank"
          rel="noreferrer"
          className="btn-gold-pill ig-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
            height: "44px",
            borderRadius: "100px",
            background: "transparent",
            border: "1px solid var(--gold-dim)",
            color: "var(--gold-dim)",
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 400,
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            transition: "all 300ms ease",
          }}
        >
          Follow on Instagram
        </a>
      </div>

      <style jsx>{`
        .ig-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        /* Pause animation on hover for a premium interactive feel */
        .ig-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Slide exactly half (the first set of photos) */
        }
        
        .ig-photo-link {
          width: 25vw;
          flex-shrink: 0;
        }

        .ig-img {
          transition: transform 600ms ease;
        }

        .ig-overlay {
          position: absolute;
          inset: 0;
          background: rgba(6, 6, 6, 0);
          transition: background 600ms ease;
          z-index: 1;
        }

        @media (hover: hover) {
          .ig-photo-link:hover .ig-img {
            transform: scale(1.05);
          }
          .ig-photo-link:hover .ig-overlay {
            background: rgba(6, 6, 6, 0.15);
          }
          .ig-btn:hover {
            background: var(--gold-dim) !important;
            color: var(--cream) !important;
          }
        }

        @media (max-width: 1024px) {
          .ig-photo-link {
            width: 33.333vw;
          }
        }

        @media (max-width: 768px) {
          .ig-photo-link {
            width: 50vw;
          }
        }
        
        @media (max-width: 480px) {
          .ig-photo-link {
            width: 85vw;
          }
        }
      `}</style>
    </section>
  );
}
