"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAbbreviated, setIsAbbreviated] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isShown = localStorage.getItem("preloader_shown");
    if (isShown) {
      setIsAbbreviated(true);
      const exitTimer = setTimeout(() => {
        setExit(true);
      }, 800);
      const completeTimer = setTimeout(() => {
        setComplete(true);
      }, 1200);
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    } else {
      localStorage.setItem("preloader_shown", "true");
      const exitTimer = setTimeout(() => {
        setExit(true);
      }, 3200);
      const completeTimer = setTimeout(() => {
        setComplete(true);
      }, 3800);
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, []);

  // Generate 12 particles once with stable positions
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12 + (Math.random() - 0.5) * 15;
      const angleRad = (angle * Math.PI) / 180;
      const radiusDesktop = 65 + Math.random() * 15; // 65px to 80px loose circle
      const radiusMobile = 50 + Math.random() * 10;  // 50px to 60px loose circle
      const dxDesktop = radiusDesktop * Math.cos(angleRad);
      const dyDesktop = radiusDesktop * Math.sin(angleRad);
      const dxMobile = radiusMobile * Math.cos(angleRad);
      const dyMobile = radiusMobile * Math.sin(angleRad);
      return {
        id: i,
        dxDesktop,
        dyDesktop,
        dxMobile,
        dyMobile,
      };
    });
  }, []);

  if (!mounted || complete) return null;

  const brandName = "MATHANA EVENTS".split("");

  return (
    <div
      className={`preloader-container ${exit ? "exit" : ""} ${
        isAbbreviated ? "abbreviated-visit" : "full-visit"
      }`}
    >
      {/* PHASE 1: Center-out horizontal line */}
      {!isAbbreviated && <div className="preloader-line" />}

      {/* Main Preloader Content */}
      <div className={`preloader-content ${exit ? "exit" : ""}`}>
        {/* Particle Scatter (PHASE 5) */}
        {!isAbbreviated && (
          <div className="particles-wrapper">
            {particles.map((p, idx) => (
              <div
                key={p.id}
                className="particle"
                style={
                  {
                    "--dx-desktop": `${p.dxDesktop}px`,
                    "--dy-desktop": `${p.dyDesktop}px`,
                    "--dx-mobile": `${p.dxMobile}px`,
                    "--dy-mobile": `${p.dyMobile}px`,
                    animationDelay: `${2400 + idx * 30}ms, ${2400 + idx * 30 + 600}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}

        {/* Logo (PHASE 2) */}
        <div className="preloader-logo">
          <div className="preloader-logo-wrapper">
            <Image
              src="/logo.png"
              alt="Mathana Events"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* Brand Name (PHASE 3) */}
        <div className="brand-name-wrapper">
          {brandName.map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{
                animationDelay: isAbbreviated
                  ? `${100 + i * 30}ms`
                  : `${1000 + i * 55}ms`,
                marginRight: char === " " ? "0.4em" : "0",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Tagline & Small Line (PHASE 4) */}
        {!isAbbreviated && (
          <>
            <div className="tagline-line" />
            <div className="tagline-text">PREMIUM WEDDING COMPANY</div>
          </>
        )}
      </div>

      <style jsx>{`
        .preloader-container {
          position: fixed;
          inset: 0;
          background: #060606;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 500ms cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: all;
          width: 100vw;
          height: 100dvh;
        }

        .preloader-container.exit {
          opacity: 0;
          pointer-events: none;
        }

        .preloader-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: scale(1);
          opacity: 1;
          transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1),
            opacity 400ms cubic-bezier(0.25, 1, 0.5, 1);
        }

        .preloader-content.exit {
          transform: scale(1.08);
          opacity: 0;
        }

        /* PHASE 1 Line */
        .preloader-line {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #C9A84C 20%,
            #E8C96A 50%,
            #C9A84C 80%,
            transparent 100%
          );
          transform: scaleX(0);
          transform-origin: center;
        }

        .preloader-logo-wrapper {
          position: relative;
          height: 72px;
          width: 72px;
        }

        /* Full Visit Animations */
        .full-visit .preloader-line {
          animation: drawLine 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .full-visit .preloader-logo {
          opacity: 0;
          transform: translateY(-60px);
          animation: logoDrop 600ms cubic-bezier(0.16, 1, 0.3, 1) 600ms forwards;
        }

        .full-visit .letter {
          display: inline-block;
          font-family: 'Raleway', sans-serif;
          font-weight: 100;
          font-size: 18px;
          color: #C9A84C;
          letter-spacing: 0.6em;
          opacity: 0;
          transform: translateY(-20px);
          animation: letterDrop 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .full-visit .tagline-line {
          width: 0;
          height: 0.5px;
          background: #F2EDE4; /* cream */
          opacity: 0.5;
          margin: 12px 0 8px;
          animation: drawTaglineLine 500ms cubic-bezier(0.22, 1, 0.36, 1) 1900ms
            forwards;
        }

        .full-visit .tagline-text {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 9px;
          letter-spacing: 0.5em;
          color: #F2EDE4; /* cream */
          opacity: 0;
          animation: taglineFade 400ms ease-out 2000ms forwards;
        }

        /* Abbreviated Visit Animations */
        .abbreviated-visit .preloader-logo {
          opacity: 0;
          animation: logoFadeQuick 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .abbreviated-visit .letter {
          display: inline-block;
          font-family: 'Raleway', sans-serif;
          font-weight: 100;
          font-size: 18px;
          color: #C9A84C;
          letter-spacing: 0.6em;
          opacity: 0;
          animation: letterFadeQuick 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .brand-name-wrapper {
          display: flex;
          justify-content: center;
          margin-right: -0.6em; /* offsets last letter letter-spacing centering */
          margin-top: 16px;
        }

        /* Particle Scatter & Pulse */
        .particles-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: #C9A84C;
          border-radius: 50%;
          opacity: 0;
          --dx: var(--dx-desktop);
          --dy: var(--dy-desktop);
          animation: particleEnter 600ms cubic-bezier(0.25, 1, 0.5, 1) forwards,
            particlePulse 2000ms ease-in-out infinite;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .preloader-logo-wrapper {
            height: 56px;
            width: 56px;
          }
          .full-visit .letter,
          .abbreviated-visit .letter {
            font-size: 14px;
          }
          .particle {
            --dx: var(--dx-mobile);
            --dy: var(--dy-mobile);
          }
        }

        /* Keyframes */
        @keyframes drawLine {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes logoDrop {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes letterDrop {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawTaglineLine {
          to {
            width: 120px;
          }
        }

        @keyframes taglineFade {
          to {
            opacity: 1;
          }
        }

        @keyframes particleEnter {
          from {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          to {
            opacity: 1;
            transform: translate(var(--dx), var(--dy)) scale(1);
          }
        }

        @keyframes particlePulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes logoFadeQuick {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes letterFadeQuick {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
