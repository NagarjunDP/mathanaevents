"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useTextMagnet } from "@/hooks/useTextMagnet";

export default function HeroSection() {
  const [isAbbreviated, setIsAbbreviated] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [vimeoId, setVimeoId] = useState("1199405546");
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  // Apply magnetic effect to the main headings
  useTextMagnet(".magnetic-text");

  // Load video source and check preloader visits
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Randomize hero video
    const heroVideos = ["1199405546", "1199519472", "1199405543"];
    const randomVideo = heroVideos[Math.floor(Math.random() * heroVideos.length)];
    setVimeoId(randomVideo);

    // Check preloader state
    const isShown = localStorage.getItem("preloader_shown");
    const delay = isShown ? 1200 : 3800;
    if (isShown) {
      setIsAbbreviated(true);
    }

    const timer = setTimeout(() => {
      setShowVideo(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // 3-Layer Parallax + Gold Dots Orbit
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const normX = (clientX / innerWidth) * 2 - 1;
      const normY = (clientY / innerHeight) * 2 - 1;

      // 3 depth layers
      if (bgRef.current) {
        gsap.to(bgRef.current, { x: -normX * 10, y: -normY * 10, duration: 1, ease: "power2.out" });
      }
      if (textRef.current) {
        gsap.to(textRef.current, { x: -normX * 20, y: -normY * 20, duration: 1, ease: "power2.out" });
      }
      if (decorRef.current) {
        gsap.to(decorRef.current, { x: -normX * 30, y: -normY * 30, duration: 1, ease: "power2.out" });
      }

      // Gold dots
      const multipliers = [15, 25, 35, 45];
      dotsRef.current.forEach((dot, index) => {
        if (dot) {
          gsap.to(dot, { x: -normX * multipliers[index], y: -normY * multipliers[index], duration: 1, ease: "power2.out" });
        }
      });
    };

    const handleMouseLeave = () => {
      const targets = [bgRef.current, textRef.current, decorRef.current, ...dotsRef.current];
      gsap.to(targets.filter(Boolean), { x: 0, y: 0, duration: 1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Letter stagger entrance for H1
  useEffect(() => {
    const isShown = typeof window !== "undefined" && localStorage.getItem("preloader_shown");
    const delay = isShown ? 1.4 : 4.2;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title-char",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.03, ease: "power3.out", delay }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToEnquiry = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToFilms = () => {
    document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="film-grain parallax-wrap"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Background Layer ── */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-5%", // Allow room for parallax movement without showing edges
          width: "110%",
          height: "110%",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/hero-poster.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            opacity: showVideo ? 1 : 0,
            transition: "opacity 1.2s ease",
            zIndex: 1,
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&app_id=58479`}
            title="Hero Background"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "max(100vw, 177.78vh)",
              height: "max(100vh, 56.25vw)",
              transform: "translate(-50%, -50%)",
              border: "none",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ── Gradient Overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(165deg, rgba(6,6,6,0.55) 0%, rgba(6,6,6,0.3) 50%, rgba(6,6,6,0.7) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Gold Accent Dots ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        {[
          { top: "25%", left: "20%" },
          { top: "30%", left: "75%" },
          { top: "70%", left: "15%" },
          { top: "65%", left: "80%" },
        ].map((pos, i) => (
          <div
            key={i}
            ref={(el) => { if (el) dotsRef.current[i] = el; }}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "var(--gold)",
              opacity: 0.6,
              ...pos,
            }}
          />
        ))}
      </div>

      {/* ── Decorative Line Layer ── */}
      <div
        ref={decorRef}
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120%",
          height: "1px",
          background: "rgba(201,168,76,0.1)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Text Content Layer ── */}
      <div
        ref={textRef}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "1000px",
          marginTop: "10vh",
        }}
      >
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 200,
          fontSize: "10px",
          color: "var(--gold)",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          marginBottom: "32px",
          animation: "slideUpFade 800ms ease-out forwards",
          animationDelay: isAbbreviated ? "1.3s" : "4.0s",
          opacity: 0,
        }}>
          BENGALURU &middot; EST. 2016
        </p>

        <h1
          className="magnetic-text hero-h1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(52px, 8vw, 96px)",
            color: "var(--cream)",
            lineHeight: 1,
            marginBottom: "0",
          }}
        >
          {"Where Love".split("").map((c, i) => (
            <span key={i} className="hero-title-char char-split" style={{ display: c === " " ? "inline" : "inline-block" }}>{c}</span>
          ))}
        </h1>
        <h1
          className="magnetic-text hero-h1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(52px, 8vw, 96px)",
            color: "var(--cream)",
            lineHeight: 1,
            marginBottom: "40px",
          }}
        >
          {"Becomes Cinema".split("").map((c, i) => (
            <span key={i} className="hero-title-char char-split" style={{ display: c === " " ? "inline" : "inline-block" }}>{c}</span>
          ))}
        </h1>

        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 200,
          fontSize: "13px",
          letterSpacing: "0.25em",
          color: "var(--cream-dim)",
          textTransform: "uppercase",
          marginBottom: "48px",
          animation: "slideUpFade 800ms ease-out forwards",
          animationDelay: isAbbreviated ? "1.8s" : "4.6s",
          opacity: 0,
        }}>
          Premium Wedding Company &middot; Photography & Videography
        </p>

        <div style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          alignItems: "center",
          animation: "slideUpFade 800ms ease-out forwards",
          animationDelay: isAbbreviated ? "2.0s" : "4.8s",
          opacity: 0,
        }}
        className="hero-buttons cta-group">
          <button onClick={scrollToEnquiry} className="btn-gold-outline">
            Book Consultation
          </button>
          <button onClick={scrollToFilms} className="btn-text-underline" style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "var(--cream)",
            textTransform: "uppercase",
            position: "relative",
            padding: "8px 0"
          }}>
            View Films &darr;
          </button>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}>
        <div style={{
          width: "1px",
          height: "40px",
          background: "var(--gold)",
          animation: "pulseAlpha 2s infinite",
        }} />
        <span style={{
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 200,
          fontSize: "8px",
          letterSpacing: "0.5em",
          color: "var(--gold)",
          textTransform: "uppercase",
        }}>
          SCROLL
        </span>
      </div>

      <style jsx>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseAlpha {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        .btn-text-underline::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--cream);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 300ms ease;
        }
        @media (hover: hover) {
          .btn-text-underline:hover::after {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
