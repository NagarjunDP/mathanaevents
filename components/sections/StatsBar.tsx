"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 100, suffix: "+", label: "Weddings Filmed" },
  { end: 8, suffix: "", label: "Years of Cinema" },
  { end: 12, suffix: "+", label: "Destination Countries" },
  { end: 7450, suffix: "+", label: "Instagram Followers" },
];

function useCountUp(end: number, triggered: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [triggered, end, duration]);

  return count;
}

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(end, triggered);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ textAlign: "center", padding: "20px" }}
    >
      <div className="stat-number">
        {count.toLocaleString()}{suffix}
      </div>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px",
        fontWeight: 300,
        letterSpacing: "0.2em",
        color: "var(--cream-muted)",
        textTransform: "uppercase",
        marginTop: "12px",
      }}>
        {label}
      </p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section
      id="stats"
      aria-label="Statistics"
      style={{
        background: "var(--charcoal)",
        padding: "60px 48px",
        position: "relative",
      }}
    >
      <div className="gold-rule" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="gold-rule" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        alignItems: "center",
      }} className="stats-grid">
        {stats.map((stat, i) => (
          <StatItem key={i} {...stat} />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 400px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
