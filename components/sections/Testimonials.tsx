"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: "t1",
    couple: "Priya & Arjun Sharma",
    event: "Wedding · Bengaluru",
    quote:
      "Jagadish didn't just photograph our wedding — he directed a film about our love. Every frame felt intentional, emotional, and deeply cinematic. When we watch our wedding film, we relive every emotion like it was yesterday. Mathana Events is not just a service; it's a gift you give yourself.",
  },
  {
    id: "t2",
    couple: "Kavya & Rahul Nair",
    event: "Destination Wedding · Kerala",
    quote:
      "We booked Mathana Events for our Kerala destination wedding and we are still in awe. The way Jagadish captured the backwaters, the ceremony, the quiet moments — it felt like watching a Mani Ratnam film. Worth every rupee and then some. Truly world-class work.",
  },
  {
    id: "t3",
    couple: "Deepa & Kiran Reddy",
    event: "Pre-Wedding · Mysore",
    quote:
      "Our pre-wedding shoot at Mysore palace was an experience in itself. Jagadish has an eye for light that I have never seen in any photographer. He turned an ordinary evening into something out of a fashion magazine. We cannot recommend him enough to anyone who values artistry.",
  },
];

function StarRow() {
  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startInterval();
  };

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      style={{
        background: "var(--obsidian)",
        padding: "120px 48px",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>
            Client Stories
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: "var(--cream)",
            }}
          >
            Words From the Couples
          </h2>
        </div>

        {/* Card */}
        <div
          key={testimonials[current].id}
          className="testimonial-card"
          style={{
            animation: "fadeIn 0.6s ease forwards",
            marginBottom: "40px",
          }}
        >
          <StarRow />
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(18px, 2.5vw, 22px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.7,
              marginBottom: "28px",
            }}
          >
            &ldquo;{testimonials[current].quote}&rdquo;
          </blockquote>

          <div>
            <p style={{
              fontFamily: "'Inter'",
              fontSize: "13px",
              fontWeight: 400,
              color: "var(--gold)",
              letterSpacing: "0.1em",
              marginBottom: "4px",
            }}>
              {testimonials[current].couple}
            </p>
            <p style={{
              fontFamily: "'Inter'",
              fontSize: "11px",
              fontWeight: 300,
              color: "var(--cream-muted)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              {testimonials[current].event}
            </p>
          </div>
        </div>

        {/* Dot Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              id={`testimonial-dot-${i}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background: i === current ? "var(--gold)" : "rgba(201,168,76,0.3)",
                border: "none",
                cursor: "none",
                transition: "width 0.4s ease, background 0.4s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
