"use client";
import Image from "next/image";

const photos = [
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
        background: "var(--black)",
        textAlign: "center",
      }}
    >
      <div style={{ padding: "0 24px", marginBottom: "48px" }}>
        <p className="section-label" style={{ marginBottom: "16px" }}>FOLLOW THE JOURNEY</p>
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 300,
            fontSize: "14px",
            color: "var(--cream-dim)",
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
                flexShrink: 0,
                aspectRatio: "1/1",
                overflow: "hidden",
              }}
            >
              <Image src={src} alt={`Instagram ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 20vw" style={{ objectFit: "cover" }} className="ig-img" />
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
          className="btn-gold-pill"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 32px",
            height: "44px",
            borderRadius: "100px",
            background: "transparent",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
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
          animation: marquee 35s linear infinite;
        }

        /* Pause animation on hover for a premium interactive feel */
        .ig-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Translate exactly half the track (which is the original 6 items) */
        }
        
        .ig-photo-link {
          width: calc(100vw / 6);
        }

        .ig-img {
          transition: transform 600ms ease;
        }

        .ig-overlay {
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0);
          transition: background 600ms ease;
          z-index: 1;
        }

        @media (hover: hover) {
          .ig-photo-link:hover .ig-img {
            transform: scale(1.05);
          }
          .ig-photo-link:hover .ig-overlay {
            background: rgba(201,168,76,0.15);
          }
          .btn-gold-pill:hover {
            background: var(--gold) !important;
            color: var(--black) !important;
          }
        }

        @media (max-width: 1024px) {
          .ig-photo-link {
            width: calc(100vw / 4);
          }
        }

        @media (max-width: 768px) {
          .ig-photo-link {
            width: calc(100vw / 2.5); /* Show partial next image */
          }
        }
        
        @media (max-width: 480px) {
          .ig-photo-link {
            width: calc(100vw / 1.5); /* Mobile layout */
          }
        }
      `}</style>
    </section>
  );
}
