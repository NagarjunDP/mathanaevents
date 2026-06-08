"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We'll use refs for the numbers to animate them
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 100+
      gsap.fromTo(numRefs.current[0], 
        { innerHTML: "0" }, 
        { innerHTML: "100", duration: 2, ease: "power2.out", 
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
          snap: { innerHTML: 1 },
          onUpdate: function() { if (numRefs.current[0]) numRefs.current[0].innerHTML = Math.round(Number(this.targets()[0].innerHTML)) + "+"; }
        }
      );
      // 8
      gsap.fromTo(numRefs.current[1], 
        { innerHTML: "0" }, 
        { innerHTML: "8", duration: 2, ease: "power2.out", 
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
          snap: { innerHTML: 1 },
          onUpdate: function() { if (numRefs.current[1]) numRefs.current[1].innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString(); }
        }
      );
      // Infinity handles itself statically, or we just fade it in
      gsap.fromTo(numRefs.current[2],
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
      // 7.4K
      gsap.fromTo(numRefs.current[3], 
        { innerHTML: "0" }, 
        { innerHTML: "7.4", duration: 2, ease: "power2.out", 
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
          snap: { innerHTML: 0.1 },
          onUpdate: function() { if (numRefs.current[3]) numRefs.current[3].innerHTML = Number(this.targets()[0].innerHTML).toFixed(1) + "K"; }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { num: "100+", label: "Weddings Filmed" },
    { num: "8", label: "Years of Cinema" },
    { num: "∞", label: "Destination Weddings" },
    { num: "7.4K", label: "Instagram Family" },
  ];

  return (
    <section
      ref={containerRef}
      style={{
        width: "100%",
        background: "var(--black)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        padding: "80px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              ref={(el) => { if (el) numRefs.current[i] = el; }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(48px, 6vw, 72px)",
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              {i === 2 ? "∞" : "0"}
            </span>
            <span
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontWeight: 200,
                fontSize: "10px",
                letterSpacing: "0.4em",
                color: "var(--cream-dim)",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 48px 24px;
          }
        }
      `}</style>
    </section>
  );
}
