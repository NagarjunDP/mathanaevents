"use client";

export default function ServicesMarquee() {
  const text = "WEDDING FILMS \u00B7 CANDID PHOTOGRAPHY \u00B7 PRE-WEDDING \u00B7 DESTINATION WEDDINGS \u00B7 CUSTOMIZABLE WEDDINGS \u00B7 HOUSEWARMING \u00B7 SIMANTHA \u00B7 BIRTHDAY FILMS \u00B7 COCKTAIL PARTIES \u00B7 ";
  
  // We duplicate the text enough times to fill the screen twice to loop smoothly
  const repeatedText = Array(10).fill(text).join("");

  return (
    <section
      aria-hidden="true"
      style={{
        width: "100%",
        height: "48px",
        background: "#F2EDE4",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid rgba(6,6,6,0.1)",
        borderBottom: "1px solid rgba(6,6,6,0.1)",
      }}
    >
      <div className="marquee-content">
        <span
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#060606",
            whiteSpace: "nowrap",
            paddingRight: "20px", // slight buffer
          }}
        >
          {repeatedText}
        </span>
        <span
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 200,
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "#060606",
            whiteSpace: "nowrap",
          }}
        >
          {repeatedText}
        </span>
      </div>

      <style jsx>{`
        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee 80s linear infinite;
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 120s;
          }
        }
      `}</style>
    </section>
  );
}
