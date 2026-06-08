"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    id: "wedding-films",
    title: "Wedding Films",
    desc: "Cinematic full-length films of your wedding day",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.88v6.238a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"/>
      </svg>
    ),
  },
  {
    id: "candid-photography",
    title: "Candid Photography",
    desc: "Unposed moments, raw emotion, timeless frames",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M20.447 20.452h-16.896c-1.148 0-1.86-1.266-1.266-2.25l3.498-6.247a1.5 1.5 0 0 1 2.607 0l.988 1.766 2.59-4.623a1.5 1.5 0 0 1 2.607 0L20.447 18.202a1.5 1.5 0 0 1-1.266 2.25h.266z"/>
        <path d="M8 7h.01M9 4h6l1 3H8L9 4z"/>
      </svg>
    ),
  },
  {
    id: "pre-wedding",
    title: "Pre-Wedding",
    desc: "Destination shoots that tell your unique story",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    id: "housewarming-simantha",
    title: "Housewarming & Simantha",
    desc: "Sacred ceremonies preserved with reverence",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "birthday-films",
    title: "Birthday Films",
    desc: "Milestone celebrations captured in cinematic style",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <path d="M12 1v2M5 5l1.5 1.5M19 5l-1.5 1.5"/>
      </svg>
    ),
  },
  {
    id: "cocktail-reception",
    title: "Cocktail & Reception",
    desc: "Glamour, elegance, and every spontaneous moment",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22h8M7 10h10l-2 8H9L7 10zM6 6h12l-1 4H7L6 6zM12 2l1 4"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".service-card") || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => {
      card.classList.add("scroll-fade");
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      aria-label="Services — Celebrations We Film"
      ref={sectionRef}
      style={{
        background: "var(--obsidian)",
        padding: "120px 48px",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>
            What We Capture
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.15,
            }}
          >
            Every Celebration,<br />
            <em>Told Like a Film</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
          className="services-grid"
        >
          {services.map((service) => (
            <div key={service.id} id={service.id} className="service-card">
              <div style={{ marginBottom: "24px" }}>{service.icon}</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "var(--gold)",
                  marginBottom: "10px",
                  letterSpacing: "0.02em",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--cream-muted)",
                  lineHeight: 1.7,
                  letterSpacing: "0.03em",
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
