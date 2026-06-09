"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function AtelierPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax hero bg
    const heroBg = document.querySelector(".atelier-hero-bg");
    const handleScroll = () => {
      if (heroBg) {
        gsap.to(heroBg, { y: window.scrollY * 0.4, duration: 0.1, overwrite: "auto" });
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Fade up sections
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-up-block",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".atelier-story",
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ background: "var(--black)", minHeight: "100vh" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          className="atelier-hero-bg"
          style={{
            position: "absolute",
            inset: -50,
            backgroundImage: "url('/jb.jpg')", // Founder image
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(6,6,6,1) 0%, rgba(6,6,6,0.6) 50%, rgba(6,6,6,0.4) 100%)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
          <p className="section-label" style={{ marginBottom: "24px" }}>THE FILMMAKER BEHIND THE LENS</p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(64px, 8vw, 120px)",
              color: "var(--cream)",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            Jagadish Gowda
          </h1>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 200,
              fontSize: "14px",
              letterSpacing: "0.25em",
              color: "var(--cream-dim)",
              textTransform: "uppercase",
            }}
          >
            Cinematographer &middot; Director &middot; Storyteller
          </p>
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="atelier-story" style={{ padding: "120px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Block 1: From Films to Weddings */}
        <div className="fade-up-block" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "160px" }}>
          <div style={{ position: "relative", aspectRatio: "3/4", width: "100%", borderRadius: "4px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <Image src="/jb.jpg" alt="Jagadish Gowda - Founder of Mathana Events" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" priority />
          </div>
          <div>
            <p className="section-label" style={{ marginBottom: "24px" }}>From Films to Weddings</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "48px",
              color: "var(--cream)",
              lineHeight: 1.1,
              marginBottom: "32px",
            }}>
              A Decade of Visual Poetry
            </h2>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: 1.8,
              color: "var(--cream-dim)",
            }}>
              With over 8 years of experience as a working film cinematographer in the Kannada film industry, including credits like <em>Maarige Daari</em>, <em>Ninna Gungalli</em>, and numerous album songs, my approach to capturing moments is fundamentally different. Embarking on the <strong>Mathana Events</strong> journey, I decided to blend the grandeur of cinema with the intimacy of real life. I don't just capture events; I direct light, frame emotion, and craft a cinematic narrative that elevates your love story to the silver screen.
            </p>
          </div>
        </div>

        {/* Block 1.5: Recent Work (Video) */}
        <div className="fade-up-block" style={{ marginBottom: "160px", textAlign: "center" }}>
          <p className="section-label" style={{ marginBottom: "24px" }}>Recent Masterpiece</p>
          <div style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            height: 0,
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "4px"
          }}>
            <iframe
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/xAxuYZ1snfg?si=77gSUqcHIq--tBJG"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Block 2: The Philosophy */}
        <div className="fade-up-block" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "160px" }}>
          <div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(36px, 4vw, 52px)",
              color: "var(--gold)",
              lineHeight: 1.2,
            }}>
              &quot;A wedding is the most important film you will ever watch. It deserves a filmmaker.&quot;
            </h2>
          </div>
          <div>
            <p className="section-label" style={{ marginBottom: "24px" }}>The Philosophy</p>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontWeight: 300,
              fontSize: "16px",
              lineHeight: 1.8,
              color: "var(--cream-dim)",
            }}>
              A premium wedding film requires more than just high-end cameras. It requires an eye for the unseen moments—the slight touch of hands, the unspoken tears, the grandeur of the venue. We bring film-set discipline, cinema-grade lighting techniques, and a storytelling structure to the most important day of your life.
            </p>
          </div>
        </div>

        {/* Block 3: Film Credits */}
        <div className="fade-up-block" style={{
          background: "var(--charcoal)",
          border: "1px solid rgba(201,168,76,0.3)",
          padding: "64px",
          textAlign: "center",
          marginBottom: "120px"
        }}>
          <p className="section-label" style={{ marginBottom: "40px" }}>Selected Filmography</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", color: "var(--cream)", marginBottom: "4px" }}>Maarige Daari</p>
              <p style={{ fontFamily: "'Raleway'", fontSize: "12px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Director of Photography &middot; Kannada Feature Film</p>
            </div>
            <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", color: "var(--cream)", marginBottom: "4px" }}>Ninna Gungalli</p>
              <p style={{ fontFamily: "'Raleway'", fontSize: "12px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Cinematographer &middot; Hit Music Album</p>
            </div>
            <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", color: "var(--cream)", marginBottom: "4px" }}>Mathana Events</p>
              <p style={{ fontFamily: "'Raleway'", fontSize: "12px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Founder & Lead Filmmaker &middot; 100+ Weddings</p>
            </div>
          </div>
        </div>

      </section>

      {/* ── THE COLLECTIVE ── */}
      <section style={{ padding: "0 48px 120px", textAlign: "center" }}>
        <p className="section-label" style={{ marginBottom: "64px" }}>The Collective</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
          {/* Team Member 1 */}
          <div style={{ width: "280px" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", marginBottom: "24px" }}>
              <Image src="/gallery/photo-04.jpg" alt="Team Member" fill style={{ objectFit: "cover", filter: "grayscale(100%)" }} />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond'", fontStyle: "italic", fontSize: "28px", color: "var(--cream)", marginBottom: "8px" }}>Rahul S.</h3>
            <p style={{ fontFamily: "'Raleway'", fontSize: "10px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Lead Editor</p>
          </div>
          {/* Team Member 2 */}
          <div style={{ width: "280px" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", marginBottom: "24px" }}>
              <Image src="/gallery/photo-05.jpg" alt="Team Member" fill style={{ objectFit: "cover", filter: "grayscale(100%)" }} />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond'", fontStyle: "italic", fontSize: "28px", color: "var(--cream)", marginBottom: "8px" }}>Vikram K.</h3>
            <p style={{ fontFamily: "'Raleway'", fontSize: "10px", color: "var(--gold)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Senior Photographer</p>
          </div>
        </div>
      </section>

      {/* ── PRESS / MEDIA ── */}
      <section style={{ padding: "0 48px 120px", textAlign: "center" }}>
        <p className="section-label" style={{ marginBottom: "24px" }}>As Seen In</p>
        <a href="#" style={{ fontFamily: "'Cormorant Garamond'", fontStyle: "italic", fontSize: "36px", color: "var(--cream)", textDecoration: "underline", textDecorationColor: "var(--gold)" }}>
          The Hindu
        </a>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .fade-up-block {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            margin-bottom: 80px !important;
            text-align: center;
          }
          .atelier-story {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
