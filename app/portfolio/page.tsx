import type { Metadata } from "next";
import GallerySection from "@/components/sections/GallerySection";
import EnquirySection from "@/components/sections/EnquirySection";

export const metadata: Metadata = {
  title: "Portfolio — Mathana Events",
  description:
    "Browse our full collection of wedding photography, candid portraits, pre-wedding shoots, and celebration stills. Every frame tells a story.",
};

export default function PortfolioPage() {
  return (
    <>
      {/* Page Header */}
      <section style={{
        background: "var(--obsidian)",
        padding: "180px 48px 80px",
        textAlign: "center",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}>
        <p className="section-label" style={{ marginBottom: "16px" }}>Visual Archive</p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 300,
            color: "var(--cream)",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Portfolio
        </h1>
        <p style={{
          fontFamily: "'Inter'",
          fontSize: "13px",
          fontWeight: 300,
          color: "var(--cream-muted)",
          letterSpacing: "0.1em",
          maxWidth: "440px",
          margin: "0 auto",
          lineHeight: 1.8,
        }}>
          Still photographs carry the weight of a moment that video cannot always hold.
          These are the frames we are most proud of.
        </p>
      </section>

      <GallerySection />
      <EnquirySection />
    </>
  );
}
