"use client";
import Image from "next/image";

const photos = [
  "/gallery/photo-01.jpg",
  "/gallery/photo-02.jpg",
  "/gallery/photo-03.jpg",
  "/gallery/photo-04.jpg",
  "/gallery/photo-05.jpg",
  "/gallery/photo-06.jpg",
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

      <div
        className="ig-strip"
        style={{
          display: "flex",
          width: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
      >
        {photos.map((src, i) => (
          <a
            key={i}
            href="https://instagram.com/mathanaevents"
            target="_blank"
            rel="noreferrer"
            className="ig-photo-link"
            style={{
              position: "relative",
              flexShrink: 0,
              width: "calc(100% / 6)", // 6 slots desktop
              aspectRatio: "1/1",
              overflow: "hidden",
              scrollSnapAlign: "start",
            }}
          >
            <Image src={src} alt={`Instagram ${i + 1}`} fill style={{ objectFit: "cover" }} className="ig-img" />
            <div className="ig-overlay" />
          </a>
        ))}
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
        .ig-strip::-webkit-scrollbar {
          display: none; /* hide scrollbar for clean look */
        }
        
        .ig-img {
          transition: transform 400ms ease;
        }

        .ig-overlay {
          position: absolute;
          inset: 0;
          background: rgba(201,168,76,0);
          transition: background 400ms ease;
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
            width: calc(100% / 4) !important;
          }
        }

        @media (max-width: 768px) {
          .ig-photo-link {
            width: calc(100% / 2) !important;
          }
        }
        
        @media (max-width: 480px) {
          .ig-photo-link {
            width: 80% !important; /* show part of next image to indicate scroll */
          }
        }
      `}</style>
    </section>
  );
}
