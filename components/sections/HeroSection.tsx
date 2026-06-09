"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useTextMagnet } from "@/hooks/useTextMagnet";
import Preloader from "@/components/ui/Preloader";
import LiquidButton from "@/components/ui/LiquidButton";

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

  // GSAP Entrance Animations
  useEffect(() => {
    const isShown = typeof window !== "undefined" && localStorage.getItem("preloader_shown");
    const delay = isShown ? 1.4 : 4.2;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(".hero-location-tag, .hero-location-line, .char-split, .hero-descriptor, .hero-cta-group", { opacity: 1, y: 0, width: "100%", scaleX: 1 });
        // Restore location lines
        gsap.set(".hero-location-line", { width: window.innerWidth <= 768 ? 20 : 40 });
        return;
      }

      const tl = gsap.timeline({ delay });

      // 0ms — location tag lines draw outward + text fades in
      tl.from(".hero-location-tag", { opacity: 0, duration: 0.8, ease: "power2.out" }, 0)
        .from(".hero-location-line", { width: 0, duration: 0.8, ease: "power2.out" }, 0)
        // 180ms  — "Your Love Story." chars stagger in (40ms per char)
        .from(".hero-line-a .char-split", { opacity: 0, y: 30, duration: 0.8, stagger: 0.04, ease: "power3.out" }, 0.18)
        // 420ms  — "Shot Like a Film." chars stagger in (40ms per char)  
        .from(".hero-line-b .char-split", { opacity: 0, y: 30, duration: 0.8, stagger: 0.04, ease: "power3.out" }, 0.42)
        // 680ms  — descriptor lines fade up
        .from(".hero-descriptor", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, 0.68)
        // 880ms  — CTA buttons slide up + fade in
        .from(".hero-cta-group", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, 0.88);
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  // Mobile Parallax Effect
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia('(pointer: coarse)').matches) return;

    const heroSection = heroRef.current;
    const heroMedia = document.querySelector('.hero-video-iframe') as HTMLElement;
    
    if (!heroSection || !heroMedia) return;

    let ticking = false;
    let lastScrollY = 0;

    heroMedia.style.willChange = 'transform';
    heroMedia.style.transformOrigin = 'center center';
    heroMedia.style.transform = 'translate(-50%, -50%) scale(1.15)';

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      if (scrollY < heroHeight * 1.5) {
        const parallaxOffset = scrollY * 0.4;
        heroMedia.style.transform = `translate(-50%, calc(-50% + ${parallaxOffset}px)) scale(1.15)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax();

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          window.removeEventListener('scroll', handleScroll);
          if (heroMedia) {
            heroMedia.style.transform = 'translate(-50%, -50%) scale(1.15)';
          }
        } else {
          window.addEventListener('scroll', handleScroll, { passive: true });
        }
      });
    }, { threshold: 0 });

    heroObserver.observe(heroSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      heroObserver.disconnect();
    };
  }, []);


  const scrollToFilms = () => {
    document.getElementById("featured-work")?.scrollIntoView({ behavior: "smooth" });
  };

  const lineAText = "Your Love Story.";
  const lineBText = "Shot Like a Film.";

  return (
    <section
      id="hero"
      ref={heroRef}
      className="film-grain parallax-wrap hero-section"
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
          className={!showVideo ? "hero-bg-zoom" : ""}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/p1.jpeg')",
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
          {/* Vimeo Video */}
          <iframe
            className="hero-video-iframe"
            src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&app_id=58479`}
            title="Hero Background"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
      </div>

      {/* ── Gradient Overlay ── */}
      <div className="hero-gradient" />

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
      <div ref={textRef} className="hero-content">
        <div className="hero-location-wrapper">
          <div className="hero-location-line" />
          <span className="hero-location-tag">BENGALURU &middot; EST. 2016</span>
          <div className="hero-location-line" />
        </div>

        <h1 className="magnetic-text hero-h1">
          <div className="hero-h1-line hero-line-a">
            {lineAText.split("").map((c, i) => (
              c === " " 
                ? <span key={`a-${i}`} className="char-space"> </span> 
                : <span key={`a-${i}`} className="char-split">{c}</span>
            ))}
          </div>
          <div className="hero-h1-line hero-line-b">
            {lineBText.split("").map((c, i) => (
              c === " " 
                ? <span key={`b-${i}`} className="char-space"> </span> 
                : <span key={`b-${i}`} className="char-split">{c}</span>
            ))}
          </div>
        </h1>

        <div className="hero-descriptor">
          <div>Premium Wedding Company</div>
          <div>Photography & Videography</div>
        </div>

        <div className="hero-cta-group">
          <LiquidButton href="/#contact" className="btn-primary">
            Book a Consultation
          </LiquidButton>
        </div>
      </div>



      <style jsx>{`
        /* Hero Section Base */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100dvh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Loading Zoom Animation */
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .hero-bg-zoom {
          animation: subtleZoom 8s ease-out forwards;
        }

        /* Video iframe */
        .hero-video-iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          width: max(100vw, 177.78vh);
          height: max(100vh, 56.25vw);
          transform: translate(-50%, -50%);
          border: none;
          pointer-events: none;
          z-index: 1;
        }

        /* Gradients */
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(165deg, rgba(6,6,6,0.55) 0%, rgba(6,6,6,0.3) 50%, rgba(6,6,6,0.7) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* Text Content Wrapper */
        .hero-content {
          position: absolute;
          bottom: 15%;
          left: 80px;
          max-width: 900px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Line 1 */
        .hero-location-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .hero-location-line {
          width: 40px;
          height: 1px;
          background-color: var(--gold);
        }
        .hero-location-tag {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 9px;
          letter-spacing: 0.55em;
          color: var(--gold);
          text-transform: uppercase;
        }

        /* H1 */
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(44px, 9vw, 108px);
          color: var(--cream);
          line-height: 1.25;
          margin: 0 0 24px 0;
          text-align: left;
        }
        .hero-h1-line {
          display: block;
          padding: 0.1em 0;
        }
        .char-split {
          display: inline-block;
          line-height: 1.25;
        }
        .char-space {
          display: inline;
        }

        /* Descriptor */
        .hero-descriptor {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 11px;
          letter-spacing: 0.3em;
          color: rgba(242, 237, 228, 0.6);
          line-height: 1.8;
          margin-bottom: 32px;
          text-align: left;
        }
        .hero-descriptor div {
          margin: 0;
        }

        /* CTA */
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }




        /* Mobile specific overrides */
        @media (max-width: 768px) {
          .hero-section {
            height: 100dvh;
            min-height: 600px;
          }

          .hero-gradient {
            background: linear-gradient(to top, rgba(6,6,6,0.85) 0%, rgba(6,6,6,0.3) 60%, rgba(6,6,6,0.1) 100%);
          }
          .hero-content {
            bottom: 18%;
            left: 0;
            right: 0;
            padding: 0 28px;
            max-width: 100%;
            align-items: center;
            text-align: center;
          }
          .hero-location-wrapper {
            gap: 8px;
          }
          .hero-location-tag {
            font-size: 8px;
            letter-spacing: 0.5em;
          }
          .hero-location-line {
            width: 20px;
          }
          .hero-h1 {
            font-size: clamp(32px, 9vw, 56px);
            text-align: center;
          }
          .hero-h1-line {
            padding: 0;
          }
          .hero-descriptor {
            font-size: 10px;
            letter-spacing: 0.25em;
            line-height: 1.9;
            text-align: center;
            color: rgba(242, 237, 228, 0.9); /* Highlight more on mobile */
          }
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
            gap: 16px;
            margin-top: 12px;
            align-items: center;
          }



        @media (max-width: 380px) {
          .hero-h1 {
            font-size: 38px;
          }
          .hero-content {
            padding: 0 20px;
            bottom: 16%;
          }
        }
      `}</style>
    </section>
  );
}

