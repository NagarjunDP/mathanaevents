"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";

// ──────────────────────────────────────────────────────
//  Add more Vimeo film entries here.
//  On each page refresh the order is randomly shuffled.
// ──────────────────────────────────────────────────────
const VIMEO_FILMS = [
  {
    id: "vf-1",
    vimeoId: "1199405546",
    title: "Highlight Reel",
    couple: "Priya & Arjun",
    type: "Wedding Film",
    thumb: "/gallery/photo-01.jpg",
  },
  {
    id: "vf-2",
    vimeoId: "1199405543",
    title: "S & S Muhurtham",
    couple: "Sunitha & Sanjay",
    type: "Wedding Film",
    thumb: "/gallery/photo-02.jpg",
  },
  {
    id: "vf-3",
    vimeoId: "1199405546",    // ← swap for real ID when available
    title: "Mysore Palace",
    couple: "Deepa & Kiran",
    type: "Pre-Wedding",
    thumb: "/gallery/photo-03.jpg",
  },
  {
    id: "vf-4",
    vimeoId: "1199405543",    // ← swap for real ID when available
    title: "The Grand Reception",
    couple: "Kavya & Rahul",
    type: "Cocktail & Reception",
    thumb: "/gallery/photo-04.jpg",
  },
  {
    id: "vf-5",
    vimeoId: "1199405546",    // ← swap for real ID when available
    title: "Kerala Backwaters",
    couple: "Ananya & Vikram",
    type: "Destination Wedding",
    thumb: "/gallery/photo-05.jpg",
  },
];

/** Fisher-Yates shuffle — new random order every render */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FilmsShowcase() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Randomly shuffle films on every page load (client-only to avoid hydration mismatch)
  const [films, setFilms] = useState(VIMEO_FILMS);
  useEffect(() => {
    setFilms(shuffle(VIMEO_FILMS));
  }, []);

  // ── Drag-to-scroll (mouse) ──
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      el.classList.add("dragging");
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };
    const onLeave = () => { isDragging.current = false; el.classList.remove("dragging"); };
    const onUp    = () => { isDragging.current = false; el.classList.remove("dragging"); };
    const onMove  = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove, { passive: false });

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="films"
      aria-label="Featured Films"
      style={{
        background: "var(--charcoal)",
        padding: "120px 0",
        borderTop: "1px solid rgba(201,168,76,0.08)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ padding: "0 48px", marginBottom: "56px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>Featured Films</p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.15,
            }}
          >
            Stories That Stay Forever
          </h2>
        </div>
      </div>

      {/* Gold fade edges */}
      <div style={{ position: "relative" }}>
        <div aria-hidden="true" style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(to right, var(--charcoal), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(to left, var(--charcoal), transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="films-carousel"
          style={{ display: "flex", gap: "20px", padding: "0 48px 24px" }}
        >
          {films.map((film) => (
            <VimeoFilmCard key={film.id} film={film} />
          ))}
        </div>
      </div>

      {/* Hint */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <span style={{
          fontFamily: "'Inter'",
          fontSize: "9px",
          letterSpacing: "0.35em",
          color: "var(--cream-muted)",
          textTransform: "uppercase",
        }}>
          ← Drag to Explore →
        </span>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────
//  VimeoFilmCard
//  – Shows poster immediately (zero network cost)
//  – Loads the Vimeo iframe ONLY when the card enters
//    the viewport (IntersectionObserver, rootMargin 300px)
//  – On mobile: tap once to reveal player, tap again to play
//  – On desktop: hover reveals player
// ──────────────────────────────────────────────────────
type Film = typeof VIMEO_FILMS[0];

function VimeoFilmCard({ film }: { film: Film }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);  // triggers iframe creation
  const [active, setActive]             = useState(false);  // controls player visibility

  // Load iframe when card is within 300px of viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setNearViewport(true); observer.disconnect(); } },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Vimeo embed URL: standard player (not background) so user can play/pause
  // autoplay=0 — user must tap/click (avoids surprise autoplay on mobile)
  const vimeoSrc = `https://player.vimeo.com/video/${film.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&playsinline=1&app_id=58479`;

  return (
    <div
      ref={cardRef}
      id={film.id}
      className="film-card"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}  // mobile tap toggle
      style={{
        width: "clamp(280px, 32vw, 440px)",
        aspectRatio: "16/9",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        borderRadius: "4px",
        border: `1px solid ${active ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}`,
        scrollSnapAlign: "start",
        transition: "border-color 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* ── Poster image (always present, instant) ── */}
      <Image
        src={film.thumb}
        alt={`${film.couple} — ${film.type}`}
        fill
        style={{
          objectFit: "cover",
          transition: "opacity 0.4s ease",
          opacity: active ? 0 : 1,
        }}
        loading="lazy"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 32vw"
      />

      {/* ── Vimeo iframe (lazy — only rendered when near viewport) ── */}
      {nearViewport && (
        <iframe
          src={vimeoSrc}
          title={`${film.couple} — ${film.title}`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            opacity: active ? 1 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 1,
          }}
        />
      )}

      {/* ── Gradient + info (fades when player is active) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
          zIndex: 2,
          transition: "opacity 0.4s ease",
          opacity: active ? 0 : 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          zIndex: 3,
          transition: "opacity 0.4s ease",
          opacity: active ? 0 : 1,
          pointerEvents: "none",
        }}
      >
        <p style={{
          fontFamily: "'Inter'",
          fontSize: "9px",
          letterSpacing: "0.25em",
          color: "var(--gold)",
          marginBottom: "4px",
          textTransform: "uppercase",
        }}>
          {film.type}
        </p>
        <p style={{
          fontFamily: "'Cormorant Garamond'",
          fontStyle: "italic",
          fontSize: "18px",
          color: "var(--cream)",
          fontWeight: 300,
        }}>
          {film.couple}
        </p>
      </div>

      {/* ── Play hint icon (shown when poster is visible) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: active ? 0 : 0.8,
          pointerEvents: "none",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="var(--gold)" strokeWidth="1" fill="rgba(0,0,0,0.5)" />
          <polygon points="20,16 34,24 20,32" fill="var(--gold)" />
        </svg>
      </div>
    </div>
  );
}
