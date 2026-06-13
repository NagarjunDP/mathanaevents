"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutTeaser() {
  const [bgImage, setBgImage] = useState("/pic1.jpeg");

  useEffect(() => {
    const images = ["/pic5.jpeg", "/pic2.jpeg", "/pic1.jpeg", "/p1.jpeg", "/pic8.jpeg", "/pic9.jpeg"];
    const randomImg = images[Math.floor(Math.random() * images.length)];
    setBgImage(randomImg);
  }, []);

  return (
    <section className="about-teaser-section" style={{
      background: "#F2EDE4",
      borderTop: "1px solid rgba(6,6,6,0.05)",
      borderBottom: "1px solid rgba(6,6,6,0.05)",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center"
      }} className="about-teaser-grid">
        <div>
          <p className="section-label" style={{ marginBottom: "24px" }}>About Mathana Events</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            fontWeight: 300,
            color: "#060606",
            lineHeight: 1.2,
            marginBottom: "32px",
          }}>
            Crafting Cinematic Memories of Your Most Important Day
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            color: "rgba(6, 6, 6, 0.75)",
            lineHeight: 1.8,
            marginBottom: "40px",
          }}>
            Mathana Events is a boutique wedding company born from a passion for cinematic storytelling. We blend the grandeur of film with the intimacy of real-life celebrations. Our approach is discreet yet comprehensive, ensuring every fleeting glance, joyous tear, and unscripted laugh is beautifully preserved.
          </p>
          <Link href="/about" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 300,
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: "var(--gold)",
            textTransform: "uppercase",
            textDecoration: "none",
            borderBottom: "1px solid var(--gold)",
            paddingBottom: "4px",
            transition: "all 0.3s ease"
          }} className="about-teaser-link">
            Discover Our Story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div style={{ position: "relative", width: "100%", aspectRatio: "4/5" }}>
          <div style={{ position: "absolute", inset: "0", background: "var(--charcoal)", borderRadius: "2px", overflow: "hidden" }}>
             <Image src={bgImage} alt="Mathana Events" fill style={{ objectFit: "cover", opacity: 0.8 }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          {/* Decorative frame */}
          <div style={{ position: "absolute", inset: "-16px", border: "1px solid rgba(201,168,76,0.3)", zIndex: -1 }} className="decorative-frame" />
        </div>
      </div>
      <style jsx>{`
        .about-teaser-section {
          padding: 120px 48px;
        }
        @media (max-width: 900px) {
          .about-teaser-section {
            padding: 48px 24px;
          }
          .about-teaser-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .decorative-frame {
            display: none;
          }
        }
        .about-teaser-link:hover {
          color: #060606 !important;
          border-color: #060606 !important;
        }
      `}</style>
    </section>
  );
}
