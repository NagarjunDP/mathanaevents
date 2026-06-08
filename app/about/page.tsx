import type { Metadata } from "next";
import Image from "next/image";
import EnquirySection from "@/components/sections/EnquirySection";

export const metadata: Metadata = {
  title: "About — Jagadish Gowda & Mathana Events",
  description:
    "Learn about Jagadish Gowda, award-winning Kannada film cinematographer and founder of Mathana Events. 8+ years of cinematic storytelling across weddings, films, and destination celebrations.",
};

const filmCredits = [
  { title: "Maarige Daari", type: "Kannada Feature Film", role: "Cinematographer", year: "2022" },
  { title: "Preethi Premaloka", type: "Album Music Video", role: "Director of Photography", year: "2021" },
  { title: "Hridayada Hadu", type: "Album Music Video", role: "Director of Photography", year: "2020" },
  { title: "Various Wedding Films", type: "Destination Weddings", role: "Director & DOP", year: "2017–Present" },
];

const philosophy = [
  {
    title: "Cinema First",
    desc: "We treat every wedding like a feature film. Shot lists, lighting setups, color grading — the full treatment.",
  },
  {
    title: "Emotion Over Aesthetics",
    desc: "A technically perfect image that misses the feeling is worthless. We chase the soul of the moment.",
  },
  {
    title: "Restraint",
    desc: "We are present without being intrusive. Our presence on your wedding day should feel like a trusted friend, not a crew.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section style={{
        background: "var(--obsidian)",
        padding: "180px 48px 80px",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        maxWidth: "1200px",
        margin: "0 auto",
      }} className="about-hero">
        <div style={{ paddingTop: "20px" }}>
          <p className="section-label" style={{ marginBottom: "20px" }}>The Storyteller</p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.1,
              marginBottom: "12px",
            }}
          >
            Jagadish<br />Gowda
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond'",
            fontStyle: "italic",
            fontSize: "20px",
            color: "var(--gold)",
            marginBottom: "32px",
          }}>
            Cinematographer · Filmmaker · Visual Poet
          </p>
          <p style={{
            fontFamily: "'Inter'",
            fontSize: "15px",
            fontWeight: 300,
            color: "var(--cream-muted)",
            lineHeight: 1.9,
            marginBottom: "20px",
          }}>
            Born into a family that celebrated every occasion with reverence, Jagadish Gowda
            developed an early fascination with light and its ability to transform the ordinary
            into the sacred. After studying cinematography formally, he went on to work in
            Kannada cinema before redirecting his lens toward the most intimate films of all —
            the stories of families, lovers, and the milestones that define a life.
          </p>
          <p style={{
            fontFamily: "'Inter'",
            fontSize: "15px",
            fontWeight: 300,
            color: "var(--cream-muted)",
            lineHeight: 1.9,
          }}>
            Today, Mathana Events is his studio — a small, deliberate team that takes on a
            limited number of bookings each year so that every client receives the full
            weight of Jagadish&apos;s creative attention.
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: "2px", overflow: "hidden" }}>
            <Image
              src="/jagadish.jpg"
              alt="Jagadish Gowda — Founder of Mathana Events on film set"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              priority
            />
            <div style={{ position: "absolute", inset: "12px", border: "1px solid rgba(201,168,76,0.3)", pointerEvents: "none" }} />
          </div>
        </div>
      </section>

      {/* Film Credits */}
      <section style={{ background: "var(--charcoal)", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>Film Credits</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond'",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 300,
            color: "var(--cream)",
            marginBottom: "48px",
          }}>
            Behind the Camera
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {filmCredits.map((credit, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  padding: "24px 0",
                  borderBottom: "1px solid rgba(201,168,76,0.1)",
                  gap: "20px",
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: "22px", fontWeight: 400, color: "var(--cream)", marginBottom: "4px" }}>
                    {credit.title}
                  </p>
                  <p style={{ fontFamily: "'Inter'", fontSize: "12px", fontWeight: 300, color: "var(--cream-muted)", letterSpacing: "0.1em" }}>
                    {credit.type} · {credit.role}
                  </p>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: "18px", color: "var(--gold)", whiteSpace: "nowrap" }}>
                  {credit.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ background: "var(--obsidian)", padding: "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>Our Philosophy</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond'",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 300,
            color: "var(--cream)",
            marginBottom: "48px",
          }}>
            How We Work
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }} className="philosophy-grid">
            {philosophy.map((p, i) => (
              <div key={i} style={{ borderTop: "1px solid rgba(201,168,76,0.25)", paddingTop: "28px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: "24px", color: "var(--gold)", marginBottom: "16px", fontWeight: 400 }}>
                  {p.title}
                </p>
                <p style={{ fontFamily: "'Inter'", fontSize: "14px", fontWeight: 300, color: "var(--cream-muted)", lineHeight: 1.8 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
