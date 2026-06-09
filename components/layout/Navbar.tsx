"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, Zap } from "lucide-react";

const navLinks = [
  { label: "FILMS", href: "/films", code: "films" },
  { label: "PHOTOGRAPHY", href: "/photography", code: "photo" },
  { label: "ATELIER", href: "/atelier", code: "atelier" },
  { label: "CONTACT", href: "/#contact", code: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    // Trigger shutter flash animation
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
    }, 300);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: mobileMenuOpen ? 10002 : 40,
          height: "var(--nav-height, 72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          transition: "all 400ms ease",
          background: scrolled ? "rgba(6,6,6,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.05)" : "1px solid transparent",
        }}
        className="navbar navbar-outer"
      >
        {/* LEFT SIDE: Big Brand Logo */}
        <Link href="/" className="navbar-logo-link">
          <div className="navbar-logo-wrapper">
            <img src="/logo.png" alt="Mathana Events Logo" className="navbar-logo" />
          </div>
        </Link>

        {/* CENTER SIDE: Absolutely Centered Brand Text */}
        <div className="navbar-brand-center">
          <span className="navbar-name">MATHANA EVENTS</span>
          <span className="navbar-tagline">Premium Wedding Company</span>
        </div>

        {/* RIGHT SIDE: Nav Links & Mobile Toggle */}
        <div className="nav-links-right" style={{ display: "flex", alignItems: "center" }}>
          {/* Desktop links only */}
          <div className="desktop-nav-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link-desktop"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 200,
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  color: "var(--cream)",
                  textTransform: "uppercase",
                  position: "relative",
                  padding: "8px 0",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* MOBILE CAMERA/FLASH TOGGLE */}
          <button
            className={`hamburger-camera ${mobileMenuOpen ? "is-open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {mobileMenuOpen ? (
                /* STATE A: MENU OPEN (LUCIDE ZAP ICON WITH PREMIUM NEON BLOOM) */
                <div className="text-amber-400 scale-110 rotate-[15deg] drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] transition-all duration-500 flex items-center justify-center">
                  <Zap 
                    size={18} 
                    strokeWidth={2.5} 
                    fill="currentColor"
                  />
                </div>
              ) : (
                /* STATE B: MENU CLOSED (LUCIDE CAMERA ICON AS HAMBURGER TOGGLE) */
                <div className="text-zinc-400 group-hover:text-zinc-100 transition-colors duration-300 flex items-center justify-center">
                  <Camera 
                    size={18} 
                    strokeWidth={1.5}
                  />
                </div>
              )}

              {/* Outer micro-interaction ring that gently pulses when flash is live */}
              <span className={`absolute inset-0 rounded-full border border-amber-500/30 transition-all duration-700 scale-125 ${
                mobileMenuOpen ? 'opacity-100 animate-pulse' : 'opacity-0 scale-75'
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* BACKGROUND DIM OVERLAY for tap-to-close */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-backdrop" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* MOBILE MENU OVERLAY (Viewfinder style centered SQUARE HUD) */}
      <div className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}>
        {/* Viewfinder focus brackets */}
        <div className="viewfinder-corner corner-tl" />
        <div className="viewfinder-corner corner-tr" />
        <div className="viewfinder-corner corner-bl" />
        <div className="viewfinder-corner corner-br" />

        {/* HUD Info Header */}
        <div className="mobile-menu-hud-header">
          <div className="hud-left">
            <span className="hud-dot">●</span> REC
          </div>
          <div className="hud-right">AF-S [•]</div>
        </div>

        {/* Navigation links (Sleek HUD layout) */}
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-hud-link"
            >
              <span className="hud-link-text">
                {link.label}
              </span>
              <span className="hud-link-bracket">[ ]</span>
            </Link>
          ))}

          {/* Rich Social Icons below Contact */}
          <div style={{ display: "flex", gap: "20px", marginTop: "16px", paddingLeft: "12px" }}>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="hud-social-icon" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            <a href="https://instagram.com/mathanaevents" target="_blank" rel="noreferrer" className="hud-social-icon" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* HUD Info Footer */}
        <div className="mobile-menu-hud-footer">
          <div className="hud-settings">
            <span>F/1.2</span>
            <span>1/160s</span>
            <span>ISO 100</span>
            <span>AWB</span>
          </div>
          <div className="hud-socials">
            {/* Moved to links section */}
          </div>
        </div>
      </div>

      {/* SHUTTER FLASH EFFECT */}
      {showFlash && (
        <div className="shutter-flash-overlay" />
      )}

      <style jsx>{`
        .navbar-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          z-index: 10;
        }

        .navbar-logo {
          height: 72px; /* Base height */
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(201,168,76,0.3));
          flex-shrink: 0;
          transition: height 0.3s ease;
        }

        .navbar-logo-wrapper {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(1.4); /* Scaled up to visually bypass empty padding */
          transform-origin: left center;
        }

        .navbar-brand-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
          z-index: 5;
          pointer-events: auto;
        }

        /* Cinematic spacing sweep reveal animation */
        @keyframes letter-reveal {
          0% {
            letter-spacing: 0.1em;
            opacity: 0;
            filter: blur(4px);
          }
          100% {
            letter-spacing: 0.35em;
            opacity: 1;
            filter: blur(0);
          }
        }

        /* Looping gold highlight shimmer */
        @keyframes shimmer-loop {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes tagline-reveal {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-name {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 18px; /* Bigger size */
          letter-spacing: 0.35em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
          background: linear-gradient(
            90deg,
            #F2EDE4 0%,
            #F2EDE4 35%,
            #C9A84C 50%,
            #F2EDE4 65%,
            #F2EDE4 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: letter-reveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     shimmer-loop 8s linear infinite;
        }

        .navbar-tagline {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 8px;
          letter-spacing: 0.2em;
          color: #C9A84C;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
          opacity: 0;
          animation: tagline-reveal 1.6s ease-out 0.4s forwards;
        }

        .nav-link-desktop::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 300ms ease;
        }
        
        @media (hover: hover) {
          .nav-link-desktop:hover {
            color: var(--gold) !important;
          }
          .nav-link-desktop:hover::after {
            transform: scaleX(1);
          }
        }

        /* Mobile Camera/Flash Toggle Button styling */
        .hamburger-camera {
          display: none; /* Hidden on desktop */
        }

        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }

          .hamburger-camera {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: rgba(9, 9, 11, 0.4); /* bg-zinc-955/40 */
            border: 1px solid #27272a; /* border-zinc-800 */
            border-radius: 50%;
            position: relative;
            z-index: 10002;
            cursor: pointer;
            padding: 0;
            transition: border-color 0.5s ease, transform 0.2s ease, background-color 0.5s ease;
          }

          .hamburger-camera:hover {
            border-color: rgba(245, 158, 11, 0.4); /* hover:border-amber-500/40 */
          }

          .hamburger-camera:active {
            transform: scale(0.75);
          }
          
          .hamburger-camera.is-open {
            border-color: rgba(245, 158, 11, 0.3);
            background: rgba(9, 9, 11, 0.7);
          }
        }

        /* Background Dim Overlay */
        .mobile-menu-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 9999;
          animation: fade-in-backdrop 400ms ease;
        }

        @keyframes fade-in-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Viewfinder style compact mobile menu - SQUARE centered */
        .mobile-menu {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: rgba(8, 8, 10, 0.82);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(201, 168, 76, 0.15);
          border-radius: 12px;
          padding: 24px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: translate(-50%, -48%) scale(0.95);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
                      visibility 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu.is-open {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        /* Viewfinder focus brackets styling */
        .viewfinder-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: rgba(201, 168, 76, 0.45); /* gold brackets */
          border-style: solid;
          pointer-events: none;
        }
        .corner-tl { top: 8px; left: 8px; border-width: 1px 0 0 1px; }
        .corner-tr { top: 8px; right: 8px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: 8px; left: 8px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: 8px; right: 8px; border-width: 0 1px 1px 0; }

        /* HUD Header styles */
        .mobile-menu-hud-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.15em;
          color: rgba(161, 161, 170, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
        }

        .hud-left {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .hud-dot {
          color: #ef4444;
          animation: pulse-dot 1.5s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Links block */
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-hud-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          font-family: 'Raleway', sans-serif;
          font-size: 16px; /* Increased font size */
          letter-spacing: 0.15em;
          color: #a1a1aa;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hud-link-text {
          font-weight: 200;
          text-transform: uppercase;
        }

        .hud-link-bracket {
          font-family: monospace;
          font-size: 9px;
          opacity: 0;
          color: #C9A84C;
          transition: opacity 0.3s ease, transform 0.3s ease;
          transform: scale(0.8);
        }

        .mobile-hud-link:hover,
        .mobile-hud-link:active {
          color: #F2EDE4; /* cream */
          background: rgba(201, 168, 76, 0.08);
          padding-left: 16px;
          padding-right: 16px;
        }

        .mobile-hud-link:hover .hud-link-bracket,
        .mobile-hud-link:active .hud-link-bracket {
          opacity: 1;
          transform: scale(1);
        }

        /* HUD Footer styles */
        .mobile-menu-hud-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          color: rgba(161, 161, 170, 0.5);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 8px;
        }

        .hud-settings {
          display: flex;
          gap: 12px;
        }

        .hud-socials {
          display: flex;
          gap: 6px;
        }

        .hud-socials a {
          color: rgba(161, 161, 170, 0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .hud-social-icon {
          color: #a1a1aa;
          transition: color 0.3s ease, transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hud-social-icon:hover {
          color: #C9A84C;
          transform: scale(1.1);
        }

        /* SHUTTER FLASH SCREEN OVERLAY */
        .shutter-flash-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          z-index: 100005;
          pointer-events: none;
          animation: flash-animation 300ms ease-out forwards;
        }

        @keyframes flash-animation {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .navbar-logo {
            height: 60px;
          }
          .navbar-logo-wrapper {
            transform: scale(1.45);
          }
          .navbar-name {
            font-size: 13px !important;
          }
          .navbar-tagline {
            font-size: 7px !important;
            display: block !important;
            opacity: 0;
          }
        }

        @media (max-width: 480px) {
          .navbar-logo {
            height: 52px;
          }
          .navbar-logo-wrapper {
            transform: scale(1.5);
          }
          .navbar-name {
            font-size: 11px !important;
          }
          .navbar-tagline {
            display: none !important;
          }
          .mobile-menu {
            width: 280px;
            height: 280px;
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}
