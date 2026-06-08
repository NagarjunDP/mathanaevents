"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function FounderSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="founder"
      aria-label="Founder — Jagadish Gowda"
      style={{
        background: "var(--obsidian)",
        padding: "120px 48px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="founder-grid"
      >
        {/* Image */}
        <div
          ref={imgRef}
          className="scroll-fade"
          style={{ position: "relative", borderRadius: "2px", overflow: "hidden" }}
        >
          <div style={{ position: "relative", aspectRatio: "3/4" }}>
            <Image
              src="/jagadish.jpg"
              alt="Jagadish Gowda — Award-winning cinematographer and founder of Mathana Events"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              fetchPriority="low"
              loading="lazy"
            />
            {/* Gold frame accent */}
            <div style={{
              position: "absolute",
              inset: "12px",
              border: "1px solid rgba(201,168,76,0.3)",
              pointerEvents: "none",
              zIndex: 2,
            }} />
          </div>
          {/* Film credit badge */}
          <div style={{
            position: "absolute",
            bottom: "28px",
            left: "-16px",
            background: "var(--charcoal)",
            border: "1px solid rgba(201,168,76,0.3)",
            padding: "12px 20px",
          }}>
            <p style={{ fontFamily: "'Inter'", fontSize: "9px", letterSpacing: "0.25em", color: "var(--gold)", marginBottom: "4px" }}>FILM CREDIT</p>
            <p style={{ fontFamily: "'Cormorant Garamond'", fontStyle: "italic", fontSize: "15px", color: "var(--cream)" }}>Maarige Daari</p>
            <p style={{ fontFamily: "'Inter'", fontSize: "9px", color: "var(--cream-muted)", letterSpacing: "0.1em" }}>Kannada Cinema</p>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="scroll-fade" style={{ transitionDelay: "0.2s" }}>
          <div className="gold-rule" style={{ marginBottom: "20px", width: "60px" }} />
          <p className="section-label" style={{ marginBottom: "20px" }}>
            The Vision Behind the Lens
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            Jagadish Gowda
          </h2>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "18px",
              color: "var(--gold)",
              marginBottom: "32px",
              lineHeight: 1.5,
            }}
          >
            Award-Winning Cinematographer · Kannada Cinema · 8 Years
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.9,
              color: "var(--cream-muted)",
              marginBottom: "24px",
            }}
          >
            Jagadish Gowda is not just a wedding cinematographer — he is a storyteller
            trained in the language of cinema. With credits spanning Kannada feature films,
            album music videos, and destination weddings across the world, every frame he
            captures carries the weight of a film set and the warmth of a personal memory.
          </p>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: "15px",
              lineHeight: 1.9,
              color: "var(--cream-muted)",
              marginBottom: "40px",
            }}
          >
            When you book Mathana Events, you're not booking a vendor — you're
            commissioning a film about your love.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { num: "100+", label: "Weddings" },
              { num: "8", label: "Years" },
              { num: "∞", label: "Stories" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "'Cormorant Garamond'",
                  fontSize: "36px",
                  fontWeight: 300,
                  color: "var(--gold)",
                  lineHeight: 1,
                  marginBottom: "4px"
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'Inter'",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "var(--cream-muted)",
                  textTransform: "uppercase"
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Film Strip Divider */}
      <div style={{ maxWidth: "1200px", margin: "80px auto 0" }}>
        <div className="film-strip">
          <div className="film-strip-perfs">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="film-strip-perf" />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .founder-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
