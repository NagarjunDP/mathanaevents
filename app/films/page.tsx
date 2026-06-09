"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

const categories = ["ALL", "WEDDING", "PRE-WEDDING", "BIRTHDAY", "CELEBRATIONS", "BABY SHOWER"];

function VimeoPlayer({
  vimeoId,
  title,
  shadowSize = "large",
}: {
  vimeoId: string;
  title: string;
  shadowSize?: "large" | "small";
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoMuted, setAutoMuted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Refs mirror state so IntersectionObserver closure is always fresh
  const isPlayingRef = useRef(false);

  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // Vimeo Player API postMessage helper
  const vimeoPost = (method: string, value?: unknown) => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ method, value }),
      "https://player.vimeo.com"
    );
  };

  // IntersectionObserver — auto-play at 50% visibility, pause when leaving
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!isPlayingRef.current) {
            // Load iframe with muted autoplay
            setAutoMuted(true);
            setIsPlaying(true);
          } else {
            // Already loaded — resume
            vimeoPost("play");
          }
        } else {
          // Scrolled out — pause
          if (isPlayingRef.current) {
            vimeoPost("pause");
          }
        }
      },
      { threshold: [0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Src builder: muted=1 for scroll-autoplay, muted=0 for manual click
  const buildSrc = (muted: boolean) =>
    `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=${muted ? 1 : 0}&title=0&byline=0&portrait=0&badge=0&autopause=0&color=C9A84C&dnt=1&api=1`;

  // Manual click — play with sound
  const handleManualPlay = () => {
    setAutoMuted(false);
    setIsPlaying(true);
  };

  // Tap to unmute pill — sends unmute via postMessage
  const handleUnmute = () => {
    setAutoMuted(false);
    vimeoPost("setVolume", 1);
    vimeoPost("setMuted", false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`video-wrapper shadow-${shadowSize}`}
      data-vimeo-id={vimeoId}
    >
      {isPlaying ? (
        <>
          <iframe
            ref={iframeRef}
            src={buildSrc(autoMuted)}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title={title}
          />
          {/* Muted pill — visible only on scroll-autoplay */}
          {autoMuted && (
            <button
              onClick={handleUnmute}
              aria-label="Tap to unmute"
              className="unmute-pill"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.95)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
              <span>Tap to unmute</span>
            </button>
          )}
        </>
      ) : (
        <>
          <img
            className="video-poster"
            src={`https://vumbnail.com/${vimeoId}.jpg`}
            alt={`${title} thumbnail`}
            loading="lazy"
          />
          <button
            className="play-btn"
            aria-label="Play video"
            onClick={handleManualPlay}
          >
            <div className="play-icon"></div>
          </button>
        </>
      )}
    </div>
  );
}


function VideoCard({
  vimeoId,
  tag,
  title,
  duration,
  shadowSize = "large",
  activeTab,
  category,
}: {
  vimeoId: string;
  tag: string;
  title: string;
  duration: string;
  shadowSize?: "large" | "small";
  activeTab: string;
  category: string;
}) {
  const isVisible = activeTab === "ALL" || activeTab === category;

  return (
    <div
      className={`video-card video-card-anim ${isVisible ? "video-card-visible" : ""}`}
      style={{
        width: "100%",
        marginBottom: "40px",
        padding: "4px",
        border: shadowSize === "large"
          ? "1px solid rgba(201, 168, 76, 0.22)"
          : "1px solid rgba(201, 168, 76, 0.14)",
        borderRadius: "3px",
        boxShadow: shadowSize === "large"
          ? "0 24px 64px rgba(44, 37, 26, 0.1), 0 0 0 1px rgba(201, 168, 76, 0.06) inset"
          : "0 12px 36px rgba(44, 37, 26, 0.07), 0 0 0 1px rgba(201, 168, 76, 0.04) inset",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      <VimeoPlayer vimeoId={vimeoId} title={title} shadowSize={shadowSize} />
      
      {/* Info Bar below video */}
      <div className="video-info">
        <span className="video-tag">{tag}</span>
        <h3 className="video-title">{title}</h3>
        <span className="video-duration">{duration}</span>
      </div>
    </div>
  );
}

export default function FilmsPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const containerRef = useRef<HTMLDivElement>(null);

  // Set document title on client mount
  useEffect(() => {
    document.title = "Mathana Events — Luxury Cinematic Wedding Films";
  }, []);

  // GSAP Entrance and Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animation: Stagger H1 characters
      gsap.fromTo(
        ".hero-char",
        { opacity: 0, y: 40, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.025,
          ease: "power3.out",
          delay: 0.1,
        }
      );
      
      // Stagger other hero elements
      gsap.fromTo(
        [".hero-label", ".hero-subtext", ".hero-rule"],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // Hero badge slow fade in from right
      gsap.fromTo(
        ".hero-badge",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.6,
        }
      );

      // Parallax: hero background image moves slower than scroll
      gsap.to(".hero-header img", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-header",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 2. ScrollTrigger for Section Headers (label + H2 + divider)
      const sections = document.querySelectorAll(".video-section-animate");
      sections.forEach((sec) => {
        const headerElements = sec.querySelectorAll(".header-anim");
        if (headerElements.length > 0) {
          gsap.fromTo(
            headerElements,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // 3. ScrollTrigger for Video Cards inside each section
        const cards = sec.querySelectorAll(".video-card-anim");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filter tabs click animations and scroll trigger refresh
  useEffect(() => {
    const visibleCards = document.querySelectorAll(".video-card-visible");
    if (visibleCards.length > 0) {
      gsap.killTweensOf(visibleCards);
      gsap.fromTo(
        visibleCards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const isWeddingVisible = activeTab === "ALL" || activeTab === "WEDDING";
  const isPreWeddingVisible = activeTab === "ALL" || activeTab === "PRE-WEDDING";
  const isBirthdayVisible = activeTab === "ALL" || activeTab === "BIRTHDAY";
  const isCelebrationsVisible = activeTab === "ALL" || activeTab === "CELEBRATIONS";
  const isBabyShowerVisible = activeTab === "ALL" || activeTab === "BABY SHOWER";

  const line1 = "Every Celebration";
  const line2 = "Told Like a Film";

  return (
    <div
      ref={containerRef}
      className="film-grain" // Active luxury grain overlay
      style={{
        background: "radial-gradient(circle at 50% 0%, #FAF8F5 0%, #F5ECE0 100%)", // Backlit gold-light silk gradient
        color: "#2C251A",
        minHeight: "100vh",
        position: "relative",
        // Override local CSS variables
        ["--local-bg" as any]: "#F5ECE0",
        ["--local-text" as any]: "#2C251A",
        ["--local-text-dim" as any]: "#7A6E5D",
        ["--local-gold" as any]: "#B3923B",
      }}
    >
      
      {/* HERO HEADER — Full-bleed cinematic background image hero */}
      <header
        className="hero-header"
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          maxHeight: "900px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#F2EDE4",
        }}
      >
        {/* Background Image */}
        <img
          src="/photoo.webp"
          alt="Cinematic wedding moment"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            zIndex: 0,
            transform: "scale(1.04)",
            transformOrigin: "center",
          }}
        />

        {/* Multi-layer cinematic overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: [
            "linear-gradient(to top, rgba(5,4,3,0.97) 0%, rgba(5,4,3,0.55) 40%, rgba(5,4,3,0.15) 70%, rgba(5,4,3,0.25) 100%)",
          ].join(", "),
        }} />
        {/* Side vignette for editorial depth */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,2,1,0.55) 100%)",
        }} />
        {/* Subtle gold shimmer at the bottom edge */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6) 30%, rgba(201,168,76,0.9) 50%, rgba(201,168,76,0.6) 70%, transparent)",
          zIndex: 10,
        }} />

        {/* Top-right film counter badge */}
        <div
          className="hero-badge"
          style={{
            position: "absolute",
            top: "clamp(90px, 12vw, 120px)",
            right: "clamp(24px, 5vw, 64px)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "9px",
            letterSpacing: "0.4em",
            color: "rgba(201,168,76,0.7)",
            textTransform: "uppercase",
          }}>OUR WORK</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1,
            color: "rgba(242,237,228,0.15)",
            letterSpacing: "0.05em",
          }}>14</span>
          <div style={{ width: "32px", height: "1px", background: "rgba(201,168,76,0.5)" }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "8px",
            letterSpacing: "0.3em",
            color: "rgba(242,237,228,0.4)",
            textTransform: "uppercase",
          }}>FILMS</span>
        </div>

        {/* Bottom-left editorial text block */}
        <div
          className="hero-text-block"
          style={{
            position: "relative",
            zIndex: 10,
            padding: "clamp(32px, 6vw, 80px) clamp(24px, 6vw, 80px)",
            width: "100%",
            maxWidth: "1400px",
          }}
        >
          {/* Category pill */}
          <p
            className="hero-label"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 200,
              fontSize: "9px",
              letterSpacing: "0.55em",
              color: "rgba(201,168,76,0.9)",
              textTransform: "uppercase",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ display: "inline-block", width: "24px", height: "1px", background: "rgba(201,168,76,0.7)", flexShrink: 0 }} />
            <span style={{ whiteSpace: "nowrap" }}>Weddings · Pre-Wedding · Celebrations</span>
          </p>

          <h1
            className="hero-h1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(48px, 8.5vw, 108px)",
              lineHeight: 1.0,
              marginBottom: "28px",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ display: "block", color: "#F2EDE4", whiteSpace: "nowrap" }}>
              {line1.split("").map((char, index) => (
                <span key={index} className="hero-char" style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>
                  {char}
                </span>
              ))}
            </span>
            <span style={{ display: "block", color: "#C9A84C", whiteSpace: "nowrap" }}>
              {line2.split("").map((char, index) => (
                <span key={index} className="hero-char" style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}>
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Bottom metadata row */}
          <div
            className="hero-subtext"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "1px", height: "36px", background: "rgba(201,168,76,0.5)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 200,
                fontSize: "9px",
                letterSpacing: "0.4em",
                color: "rgba(242,237,228,0.4)",
                textTransform: "uppercase",
              }}>Mathana Events</span>
              <span style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 200,
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "rgba(242,237,228,0.7)",
              }}>14 Cinematic Films — Limited Dates Available</span>
            </div>
          </div>

          {/* Gold scroll cue */}
          <div
            className="hero-rule"
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{ width: "48px", height: "1px", background: "rgba(201,168,76,0.6)" }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 200,
              fontSize: "8px",
              letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.6)",
              textTransform: "uppercase",
            }}>Scroll</span>
          </div>
        </div>
      </header>

      {/* FILTER TABS */}
      <div className="filter-tabs-container">
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`filter-tab ${activeTab === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1 — WEDDING FILMS */}
      <section
        className="video-section video-section-animate"
        style={{
          display: isWeddingVisible ? "block" : "none",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
          borderTop: "1px solid rgba(179, 146, 59, 0.12)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 56px)" }}>
          {/* Section Header */}
          <div className="text-center mb-[48px] md:mb-[64px]">
            <p className="section-label header-anim" style={{ marginBottom: "12px" }}>
              WEDDING
            </p>
            <h2
              className="header-anim"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: "var(--local-text)",
                lineHeight: 1.2,
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Stories of Love
            </h2>
            <div
              className="header-anim"
              style={{
                width: "60px",
                height: "1px",
                background: "var(--local-gold)",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Featured Wedding Film (Film 1) */}
          <div className="video-card-anim">
            <VideoCard
              vimeoId="1199506019"
              tag="WEDDING FILM"
              title="Sushmitha Wedding"
              duration="2:40"
              shadowSize="large"
              activeTab={activeTab}
              category="WEDDING"
            />
          </div>

          {/* Wedding Films 2 & 3 (Side by Side) */}
          <div className="wedding-side-grid">
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199506018"
                tag="WEDDING FILM"
                title="Anil Babu Wedding"
                duration="3:10"
                shadowSize="small"
                activeTab={activeTab}
                category="WEDDING"
              />
            </div>
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199506017"
                tag="WEDDING CANDID"
                title="Teju Wedding Candid"
                duration="2:55"
                shadowSize="small"
                activeTab={activeTab}
                category="WEDDING"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PRE-WEDDING FILMS */}
      <section
        className="video-section video-section-animate"
        style={{
          display: isPreWeddingVisible ? "block" : "none",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
          borderTop: "1px solid rgba(179, 146, 59, 0.12)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 56px)" }}>
          {/* Section Header */}
          <div className="text-center mb-[48px] md:mb-[64px]">
            <p className="section-label header-anim" style={{ marginBottom: "12px", textAlign: "center" }}>
              PRE-WEDDING
            </p>
            <h2
              className="header-anim"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: "var(--local-text)",
                lineHeight: 1.2,
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Before the Vows
            </h2>
            <div
              className="header-anim"
              style={{
                width: "60px",
                height: "1px",
                background: "var(--local-gold)",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Featured Pre-Wedding Film (Sachin - full width) */}
          <div className="video-card-anim">
            <VideoCard
              vimeoId="1199515448"
              tag="PRE-WEDDING"
              title="Sachin Pre-Wedding"
              duration="2:30"
              shadowSize="large"
              activeTab={activeTab}
              category="PRE-WEDDING"
            />
          </div>

          {/* Nithin & Manoj side-by-side */}
          <div className="wedding-side-grid">
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199515804"
                tag="PRE-WEDDING"
                title="Nithin Pre-Wedding"
                duration="2:45"
                shadowSize="small"
                activeTab={activeTab}
                category="PRE-WEDDING"
              />
            </div>
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199516305"
                tag="PRE-WEDDING"
                title="Manoj Pre-Wedding"
                duration="2:20"
                shadowSize="small"
                activeTab={activeTab}
                category="PRE-WEDDING"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — BIRTHDAY FILMS */}
      <section
        className="video-section video-section-animate"
        style={{
          display: isBirthdayVisible ? "block" : "none",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
          borderTop: "1px solid rgba(179, 146, 59, 0.12)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 56px)" }}>
          {/* Section Header */}
          <div className="text-center mb-[48px] md:mb-[64px]">
            <p className="section-label header-anim" style={{ marginBottom: "12px", textAlign: "center" }}>
              BIRTHDAY FILMS
            </p>
            <h2
              className="header-anim"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: "var(--local-text)",
                lineHeight: 1.2,
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Moments Worth Celebrating
            </h2>
            <div
              className="header-anim"
              style={{
                width: "60px",
                height: "1px",
                background: "var(--local-gold)",
                margin: "0 auto",
              }}
            />
          </div>

          <div className="birthday-grid">
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199507099"
                tag="BIRTHDAY FILM"
                title="Jaivek Birthday"
                duration="1:55"
                shadowSize="small"
                activeTab={activeTab}
                category="BIRTHDAY"
              />
            </div>
            <div
              className="divider-line"
              style={{
                width: "1px",
                background: "var(--local-gold)",
                opacity: 0.2,
                alignSelf: "stretch",
                marginBottom: "48px",
              }}
            />
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199508052"
                tag="BIRTHDAY CANDID"
                title="Birthday Candid"
                duration="2:10"
                shadowSize="small"
                activeTab={activeTab}
                category="BIRTHDAY"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CELEBRATIONS */}
      <section
        className="video-section video-section-animate"
        style={{
          display: isCelebrationsVisible ? "block" : "none",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
          borderTop: "1px solid rgba(179, 146, 59, 0.12)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 56px)" }}>
          {/* Section Header */}
          <div className="text-center mb-[48px] md:mb-[64px]">
            <p className="section-label header-anim" style={{ marginBottom: "12px", textAlign: "center" }}>
              CELEBRATIONS
            </p>
            <h2
              className="header-anim"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: "var(--local-text)",
                lineHeight: 1.2,
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Every Occasion, Cinematic
            </h2>
            <div
              className="header-anim"
              style={{
                width: "60px",
                height: "1px",
                background: "var(--local-gold)",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Asymmetric 2-column layout */}
          <div className="celebrations-grid">
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199506013"
                tag="MOCKTAIL PARTY"
                title="Mocktail Party"
                duration="2:05"
                shadowSize="large"
                activeTab={activeTab}
                category="CELEBRATIONS"
              />
            </div>
            <div className="video-card-anim" style={{ display: "flex", flexDirection: "column" }}>
              <VideoCard
                vimeoId="1199737517"
                tag="HOUSEWARMING"
                title="VL Pooja Candid"
                duration="1:50"
                shadowSize="small"
                activeTab={activeTab}
                category="CELEBRATIONS"
              />
              <p
                className="celebrations-quote"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 1.8vw, 17px)",
                  color: "var(--local-text-dim)",
                  lineHeight: 1.6,
                  marginTop: "16px",
                  paddingLeft: "16px",
                  borderLeft: "2px solid var(--local-gold)",
                }}
              >
                "From intimate gatherings to grand celebrations — every moment deserves a film."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BABY SHOWER */}
      <section
        className="video-section video-section-animate"
        style={{
          display: isBabyShowerVisible ? "block" : "none",
          paddingTop: "clamp(80px, 10vw, 140px)",
          paddingBottom: "clamp(80px, 10vw, 140px)",
          borderTop: "1px solid rgba(179, 146, 59, 0.12)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 56px)" }}>
          {/* Section Header */}
          <div className="text-center mb-[48px] md:mb-[64px]">
            <p className="section-label header-anim" style={{ marginBottom: "12px", textAlign: "center" }}>
              BABY SHOWER
            </p>
            <h2
              className="header-anim"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(36px, 5vw, 56px)",
                color: "var(--local-text)",
                lineHeight: 1.2,
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Welcoming New Beginnings
            </h2>
            <div
              className="header-anim"
              style={{
                width: "60px",
                height: "1px",
                background: "var(--local-gold)",
                margin: "0 auto",
              }}
            />
          </div>

          <div className="birthday-grid">
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199516733"
                tag="BABY SHOWER"
                title="Baby Shower"
                duration="2:00"
                shadowSize="small"
                activeTab={activeTab}
                category="BABY SHOWER"
              />
            </div>
            <div
              className="divider-line"
              style={{
                width: "1px",
                background: "var(--local-gold)",
                opacity: 0.2,
                alignSelf: "stretch",
                marginBottom: "48px",
              }}
            />
            <div className="video-card-anim">
              <VideoCard
                vimeoId="1199517609"
                tag="BABY SHOWER"
                title="Baby Shower — Chirag"
                duration="1:50"
                shadowSize="small"
                activeTab={activeTab}
                category="BABY SHOWER"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION - Deep Warm Gold background */}
      <section
        className="cta-section"
        style={{
          background: "radial-gradient(circle at center, #FAF8F5 0%, #EDE5D7 100%)", // Richer champagne bg
          textAlign: "center",
          paddingTop: "clamp(100px, 12vw, 160px)",
          paddingBottom: "clamp(100px, 12vw, 160px)",
          borderTop: "1px solid rgba(179, 146, 59, 0.15)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "var(--local-gold)",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Ready for Your Film?
          </h2>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 200,
              fontSize: "14px",
              color: "var(--local-text-dim)",
              letterSpacing: "0.15em",
              marginBottom: "48px",
            }}
          >
            Limited dates available each season
          </p>
          
          <div className="cta-buttons">
            <Link
              href="/contact"
              className="btn-gold-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "48px",
                padding: "0 36px",
                borderRadius: "9999px",
                border: "1px solid var(--local-gold)",
                color: "var(--local-text)",
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 300,
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
            >
              Book a Consultation
            </Link>
            
            <Link
              href="/photography"
              className="btn-underline"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 300,
                fontSize: "11px",
                color: "var(--local-text)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                position: "relative",
                padding: "8px 0",
              }}
            >
              View Photography
            </Link>
          </div>
        </div>
      </section>

      {/* GLOBAL STYLES - Crucial for subcomponents scoping */}
      <style jsx global>{`
        /* Viewport-fixed dynamic film-grain to prevent performance lag on long pages */
        .film-grain::after {
          position: fixed !important;
          z-index: 9999 !important;
          opacity: 0.045 !important;
        }

        /* Desktop Grids */
        .wedding-side-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .pre-wedding-grid,
        .birthday-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 28px;
        }

        .celebrations-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 28px;
        }

        .filter-tabs-container {
          position: sticky;
          top: 72px; /* aligns below desktop navbar */
          z-index: 30 !important; /* sits below navbar (z-index 40) to prevent overlap */
          background: rgba(250, 247, 245, 0.92); /* light gold matching bg */
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(179, 146, 59, 0.12);
          width: 100%;
          transition: top 0.3s ease;
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 24px;
        }

        .filter-tab {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 10px;
          letter-spacing: 0.4em;
          color: var(--local-text-dim);
          text-transform: uppercase;
          padding: 8px 0;
          position: relative;
          transition: color 0.3s ease;
        }

        .filter-tab.active {
          color: var(--local-text);
        }

        .filter-tab::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--local-gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .filter-tab.active::after {
          transform: scaleX(1);
        }

        .video-card:hover {
          border-color: rgba(201, 168, 76, 0.38) !important;
          box-shadow: 0 32px 80px rgba(44, 37, 26, 0.13), 0 0 0 1px rgba(201, 168, 76, 0.1) inset !important;
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 ratio */
          background: #15120D; /* Keeps video player area elegant dark warm bronze */
          overflow: hidden;
          border-radius: 2px;
          border: none;
          transition: box-shadow 0.3s ease;
        }

        /* Override Lenis scroll pointer events lock so users can interact with Vimeo iframe play/controls */
        .video-wrapper iframe {
          pointer-events: auto !important;
        }

        .video-poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          z-index: 1; /* render behind play button */
        }

        .video-wrapper:hover .video-poster {
          transform: scale(1.03);
        }

        .play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: 1px solid rgba(179, 146, 59, 0.7);
          background: rgba(26, 22, 17, 0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
          z-index: 10 !important; /* render on top of poster image */
        }

        /* Scroll-autoplay muted indicator pill */
        .unmute-pill {
          position: absolute;
          bottom: 14px;
          right: 14px;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: rgba(8, 6, 4, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(201, 168, 76, 0.35);
          border-radius: 999px;
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease;
          animation: pill-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .unmute-pill span {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 9px;
          letter-spacing: 0.28em;
          color: rgba(242, 237, 228, 0.85);
          text-transform: uppercase;
          white-space: nowrap;
        }

        .unmute-pill:hover {
          border-color: rgba(201, 168, 76, 0.65);
          background: rgba(8, 6, 4, 0.88);
        }

        @keyframes pill-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .play-btn:hover {
          border-color: #B3923B;
          background: rgba(179, 146, 59, 0.2);
          transform: translate(-50%, -50%) scale(1.08);
        }

        .play-icon {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 9px 0 9px 18px;
          border-color: transparent transparent transparent #B3923B;
          margin-left: 4px;
        }

        /* Video Info bar styling */
        .video-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 4px 0;
        }

        .video-tag {
          color: var(--local-gold);
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
        }

        .video-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 22px;
          color: var(--local-text);
          margin: 0;
          text-align: center;
        }

        .video-duration {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 11px;
          color: var(--local-text-dim);
        }

        .btn-gold-pill:hover {
          background: var(--local-gold);
          color: #FAF7F2 !important; /* light gold contrasting text */
        }

        .btn-underline::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--local-gold);
          transform: scaleX(1);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .btn-underline:hover::after {
          transform: scaleX(0);
        }

        @media (hover: hover) {
          .filter-tab:hover {
            color: var(--local-gold);
          }
        }

        /* MOBILE LAYOUT & PREMIUM STYLING OVERRIDES */
        @media (max-width: 768px) {
          /* Full-bleed hero — tighten min-height for mobile */
          .hero-header {
            min-height: 520px !important;
            max-height: 700px !important;
            justify-content: flex-end !important;
            align-items: flex-start !important;
          }

          .hero-text-block {
            padding: 28px 20px !important;
          }

          .hero-badge {
            top: 88px !important;
            right: 20px !important;
          }

          .hero-h1 {
            font-size: clamp(36px, 9vw, 56px) !important;
            line-height: 1.05 !important;
            margin-bottom: 20px !important;
          }

          .hero-subtext {
            gap: 12px !important;
          }

          /* Sticky tabs under mobile navbar */
          .filter-tabs-container {
            top: 64px;
          }

          /* Scrollable filter tab row */
          .filter-tabs {
            overflow-x: auto !important;
            white-space: nowrap !important;
            padding: 20px 24px !important;
            gap: 28px !important;
            justify-content: flex-start !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .filter-tabs::-webkit-scrollbar {
            display: none;
          }

          /* Downscale large and small shadows for mobile to prevent color banding */
          .shadow-large {
            box-shadow: 0 15px 30px rgba(44, 37, 26, 0.15), 0 0 0 1px rgba(179, 146, 59, 0.08) !important;
          }

          .shadow-small {
            box-shadow: 0 10px 20px rgba(44, 37, 26, 0.1), 0 0 0 1px rgba(179, 146, 59, 0.06) !important;
          }

          /* All grids single column layout — full bleed on mobile */
          .wedding-side-grid,
          .pre-wedding-grid,
          .birthday-grid,
          .celebrations-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          /* Hide thin divider line in stack layout */
          .divider-line {
            display: none !important;
          }

          /* Section padding: vertical only — let containers handle horizontal */
          .video-section {
            padding: 48px 0 !important;
          }

          /* Full-bleed containers on mobile: NO horizontal padding */
          .video-section > div {
            padding-left: 0 !important;
            padding-right: 0 !important;
            max-width: 100% !important;
          }

          /* But keep section headings inset */
          .video-section .text-center {
            padding: 0 20px !important;
          }

          /* Re-align H2 headings size */
          h2 {
            font-size: clamp(28px, 6vw, 40px) !important;
          }

          /* Video info bar: inset on mobile so text doesn't bleed edge */
          .video-info {
            display: grid !important;
            grid-template-areas: 
              "tag duration"
              "title title" !important;
            grid-template-columns: 1fr auto !important;
            row-gap: 6px !important;
            column-gap: 12px !important;
            padding: 14px 16px 4px !important;
            align-items: center !important;
          }

          .video-tag {
            grid-area: tag;
          }

          .video-duration {
            grid-area: duration;
            text-align: right;
          }

          .video-title {
            grid-area: title;
            font-size: 20px !important;
            text-align: left !important;
            margin: 0 !important;
          }

          /* Celebrations editorial quote styling */
          .celebrations-quote {
            border-left: 2px solid var(--local-gold);
            padding-left: 16px !important;
            margin-top: 16px !important;
            font-size: 15px !important;
            line-height: 1.6 !important;
          }

          /* Tap targets for play overlay button */
          .play-btn {
            width: 56px;
            height: 56px;
            z-index: 10 !important;
          }

          .cta-buttons {
            display: flex;
            flex-direction: column !important;
            gap: 16px !important;
            width: 100% !important;
            padding: 0 24px;
          }

          .btn-gold-pill {
            width: 100% !important;
            text-align: center !important;
            display: flex !important;
            margin-bottom: 8px;
          }

          .btn-underline {
            width: auto !important;
            display: inline-block !important;
            margin: 8px auto 0 !important;
          }
        }

        @media (max-width: 480px) {
          .video-section {
            padding: 40px 0 !important;
          }
          .play-btn {
            width: 64px !important;
            height: 64px !important;
          }
        }
      `}</style>
    </div>
  );
}
