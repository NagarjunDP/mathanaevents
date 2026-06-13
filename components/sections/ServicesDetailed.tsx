"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const detailedServices = [
  {
    num: "01",
    title: "Custom Weddings",
    desc: "Bespoke, multi-day coverage engineered for visionary celebrations. We architect a specialized cinematic and photographic approach to match the profound scale and intimacy of your grandest event.",
  },
  {
    num: "02",
    title: "Destination Worldwide",
    desc: "From historic European chateaus to untouched tropical coastlines, we travel seamlessly. Our discrete, high-end production adapts flawlessly to any landscape, preserving your extraordinary destination.",
  },
  {
    num: "03",
    title: "Pre-Wedding Shoots",
    desc: "A highly stylized, cinematic prologue. We collaborate to conceptualize breathtaking narratives in avant-garde locations, capturing the raw, magnetic chemistry of your relationship before the vows.",
  },
  {
    num: "04",
    title: "House Ceremony",
    desc: "The quiet sanctity of a Grihapravesha or family Puja demands profound respect. We utilize an invisible, documentary ethos to honor these deeply rooted spiritual traditions within your ancestral spaces.",
  },
  {
    num: "05",
    title: "Cocktail Party",
    desc: "When formality gives way to pure electric energy. We thrive in low-light, high-style environments, capturing the clinking crystal, the designer silhouettes, and the uninhibited, joyous candids of the night.",
  },
  {
    num: "06",
    title: "Baby Shower",
    desc: "An elegant, ethereal documentation of new life. We focus on soft light and tender interactions, preserving the maternal glow and the quiet anticipation of your closest inner circle.",
  },
  {
    num: "07",
    title: "Birthday Party",
    desc: "Whether a monumental milestone gala or an exclusive private dinner, we document the atmosphere and the laughter. A vibrant, high-fidelity visual capsule of a night worth remembering.",
  },
];

export default function ServicesDetailed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Elegant line-by-line reveal for the list items
      gsap.utils.toArray<HTMLElement>(".editorial-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      style={{
        padding: "180px 0",
        background: "#F2EDE4",
        position: "relative",
        overflow: "hidden",
      }}
      className="editorial-services-section"
    >
      <div style={{ padding: "0 48px", maxWidth: "1600px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "120px" }} className="editorial-header">
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(48px, 8vw, 100px)",
                color: "#060606",
                lineHeight: 0.9,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Services from <br className="mobile-break" /><span style={{ fontStyle: "italic", color: "#8A6E2F" }}>Mathana Events</span>
            </h2>
          </div>
        </div>

        {/* Minimalist Typographic List */}
        <div className="editorial-list">
          {detailedServices.map((svc, i) => (
            <div key={svc.num} className="editorial-row">
              <div className="row-col row-num">
                <span>[ {svc.num} ]</span>
              </div>
              
              <div className="row-col row-title-wrap">
                <h3 className="row-title">
                  {svc.title}
                </h3>
              </div>
              
              <div className="row-col row-desc-wrap">
                <p className="row-desc">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      <style jsx>{`
        .editorial-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(6, 6, 6, 0.15);
        }

        .editorial-row {
          display: flex;
          align-items: center;
          padding: 80px 0;
          border-bottom: 1px solid rgba(6, 6, 6, 0.15);
          transition: background 0.6s ease;
          position: relative;
          cursor: default;
        }

        .row-num {
          width: 15%;
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 14px;
          color: rgba(6, 6, 6, 0.4);
          letter-spacing: 0.2em;
          transition: color 0.6s ease;
        }

        .row-title-wrap {
          width: 50%;
        }

        .row-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(40px, 5.5vw, 84px);
          color: #060606;
          line-height: 1;
          margin: 0;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), color 0.5s ease;
          transform-origin: left center;
        }

        .row-desc-wrap {
          width: 35%;
          padding-left: 40px;
        }

        .row-desc {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(6, 6, 6, 0.6);
          margin: 0;
          max-width: 420px;
          transition: color 0.6s ease;
        }

        /* Hover Interactions - Pure Luxury Editorial Style */
        @media (hover: hover) {
          .editorial-row:hover .row-num {
            color: #8A6E2F;
          }
          .editorial-row:hover .row-title {
            transform: translateX(30px);
            color: #8A6E2F;
          }
          .editorial-row:hover .row-desc {
            color: #060606;
          }
        }

        /* Responsive Layouts */
        @media (max-width: 1200px) {
          .row-title {
            font-size: 56px;
          }
        }

        @media (max-width: 900px) {
          .editorial-header {
            margin-bottom: 80px !important;
          }
          .mobile-break {
            display: block;
          }
          .editorial-row {
            flex-direction: column;
            align-items: flex-start;
            padding: 48px 0;
            gap: 24px;
          }
          .row-num {
            width: 100%;
          }
          .row-title-wrap {
            width: 100%;
          }
          .row-title {
            font-size: 48px;
            font-style: normal;
          }
          .row-desc-wrap {
            width: 100%;
            padding-left: 0;
          }
          .row-desc {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .editorial-services-section {
            padding: 100px 0 !important;
          }
          .editorial-services-section > div {
            padding: 0 24px !important;
          }
          .row-title {
            font-size: 40px;
          }
        }
      `}</style>
    </section>
  );
}
