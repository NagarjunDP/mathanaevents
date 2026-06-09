"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LiquidButton from "@/components/ui/LiquidButton";

const VIMEO_ID = "1199519472";

export default function FeaturedFilm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Vimeo postMessage helper
  const vimeoPost = (method: string, value?: unknown) => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ method, value }),
      "https://player.vimeo.com"
    );
  };

  const handleUnmute = () => {
    setIsMuted(false);
    vimeoPost("setVolume", 1);
    vimeoPost("setMuted", false);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section label + title stagger in
      gsap.fromTo(
        ".ff-label, .ff-title, .ff-subtitle",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Video frame rises up
      gsap.fromTo(
        videoRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-play muted on load: Vimeo URL with autoplay=1&muted=1
  const src = `https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&badge=0&autopause=0&color=C9A84C&dnt=1&api=1`;

  return (
    <section
      id="featured-film"
      ref={containerRef}
      style={{
        background: "#0A0806",
        padding: "clamp(80px, 10vw, 140px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gold radial glow behind video */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "60%",
        background: "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 56px)" }}>

        {/* Section header */}
        <div style={{ marginBottom: "48px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <p className="ff-label" style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "9px",
            letterSpacing: "0.55em",
            color: "rgba(201,168,76,0.8)",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "rgba(201,168,76,0.6)", flexShrink: 0 }} />
            Featured Film
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "rgba(201,168,76,0.6)", flexShrink: 0 }} />
          </p>
          <h2 className="ff-title" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 56px)",
            color: "#F2EDE4",
            lineHeight: 1.1,
            textAlign: "center",
            margin: 0,
          }}>
            Cinematic Stories
          </h2>
          <div style={{ width: "48px", height: "1px", background: "rgba(201,168,76,0.5)" }} />
        </div>

        {/* Video frame */}
        <div
          ref={videoRef}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            padding: "4px",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "3px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.06) inset",
            background: "#0D0B08",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", borderRadius: "1px" }}>
            <iframe
              ref={iframeRef}
              src={src}
              allow="autoplay; fullscreen; picture-in-picture"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Featured Film — Mathana Events"
            />

            {/* Tap to unmute pill */}
            {isMuted && (
              <button
                onClick={handleUnmute}
                aria-label="Tap to unmute"
                style={{
                  position: "absolute",
                  bottom: "14px",
                  right: "14px",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  background: "rgba(8, 6, 4, 0.78)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(201,168,76,0.38)",
                  borderRadius: "999px",
                  cursor: "pointer",
                  animation: "ff-pill-in 0.5s 0.8s cubic-bezier(0.16,1,0.3,1) both",
                  transition: "border-color 0.25s ease",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.95)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
                <span style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 200,
                  fontSize: "9px",
                  letterSpacing: "0.28em",
                  color: "rgba(242,237,228,0.85)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}>Tap to unmute</span>
              </button>
            )}
          </div>
        </div>

        {/* Info + CTA below video */}
        <div style={{
          marginTop: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          padding: "0 4px",
        }}>
          <div>
            <p className="ff-subtitle" style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 200,
              fontSize: "9px",
              letterSpacing: "0.45em",
              color: "rgba(201,168,76,0.75)",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}>Mathana Events</p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "#F2EDE4",
              margin: 0,
            }}>Every Celebration, Told Like a Film</h3>
          </div>
          <LiquidButton
            href="/films"
            className="btn-primary"
          >
            View All Films
          </LiquidButton>
        </div>
      </div>

      <style jsx>{`
        @keyframes ff-pill-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          #featured-film > div > div:last-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
