"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LiquidButton from "@/components/ui/LiquidButton";
import gsap from "gsap";

export default function EnquiryTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".teaser-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        padding: "160px 24px",
        background: "#F7F5F0", /* Matching light luxury aesthetic */
        color: "#1A1816",
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="teaser-content" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "600px" }}>
        
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#5C554D", marginBottom: "24px" }}>
          The Atelier
        </p>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(44px, 7vw, 72px)",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Begin Your Chapter
        </h2>
        
        <p
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: 1.8,
            color: "#544E47",
            marginBottom: "56px",
          }}
        >
          We accept a limited number of commissions each season to ensure every frame receives the editorial depth it deserves. Let us shape your story together.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "40px" }} className="teaser-form">
            <div className="input-group">
              <input type="text" required placeholder="Names (e.g. Eleanor & Theo)" />
            </div>
            <div className="input-group">
              <input type="email" required placeholder="Email Address" />
            </div>
            <LiquidButton type="submit" className="submit-btn-teaser" style={{ width: "100%" }}>
              Request Availability
            </LiquidButton>
            <Link href="/contact" style={{ marginTop: "16px", fontFamily: "'Raleway', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5C554D", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              Or view full enquiry form
            </Link>
          </form>
        ) : (
          <div style={{ animation: "fadeIn 800ms ease", padding: "40px 0" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "32px", marginBottom: "16px" }}>Received with Thanks</h3>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "13px", color: "#5C554D" }}>We will be in touch within 48 hours.</p>
          </div>
        )}

      </div>

      <style jsx>{`
        .input-group {
          position: relative;
          width: 100%;
        }

        input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(43, 40, 36, 0.3);
          color: #1A1816;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-style: italic;
          padding: 8px 0 16px;
          text-align: center;
          outline: none;
          transition: all 500ms ease;
          appearance: none;
          border-radius: 0;
        }

        input::placeholder {
          color: rgba(43, 40, 36, 0.4);
          transition: color 400ms ease;
        }

        input:focus::placeholder {
          color: transparent;
        }

        input:focus {
          border-bottom: 1px solid #1A1816;
        }

        .submit-btn-teaser {
          width: 100%;
          background: #1A1816;
          color: #F7F5F0;
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 20px 0;
          transition: all 500ms ease;
          cursor: pointer;
          border: none;
        }

        @media (hover: hover) {
          .submit-btn-teaser:hover {
            background: #4A453F;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          input {
            font-size: 18px; /* Prevent iOS zoom */
          }
        }
      `}</style>
    </section>
  );
}
