"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "FILMS", href: "/films", code: "films" },
  { label: "PHOTOGRAPHY", href: "/photography", code: "photo" },
  { label: "SERVICES", href: "/#services", code: "services" },
  { label: "ABOUT US", href: "/about", code: "about" },
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
          background: "transparent",
          backdropFilter: "none",
          borderBottom: "1px solid transparent",
        }}
        className={`navbar navbar-outer ${scrolled ? "is-scrolled" : ""} ${mobileMenuOpen ? "mobile-menu-is-open" : ""}`}
      >
        <Link href="/" className="navbar-logo-link relative z-[70]">
          <div className="navbar-logo-wrapper">
            <img src="/logoooo.png" alt="Mathana Events Logo" className="navbar-logo" />
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

          {/* Mobile Hamburger (Animated) */}
          <button
            className="mobile-hamburger-btn group"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <span 
              className="transition-all duration-500 origin-right mobile-hamburger-line" 
              style={{ 
                height: "2px", 
                width: mobileMenuOpen ? "32px" : "100%", 
                transform: mobileMenuOpen ? "rotate(-45deg) translateY(1px)" : "none" 
              }} 
            />
            <span 
              className="transition-all duration-500 mobile-hamburger-line" 
              style={{ 
                height: "2px", 
                width: mobileMenuOpen ? "0px" : "60%", 
                opacity: mobileMenuOpen ? 0 : 1 
              }} 
            />
            <span 
              className="transition-all duration-500 origin-right mobile-hamburger-line" 
              style={{ 
                height: "2px", 
                width: mobileMenuOpen ? "32px" : "100%", 
                transform: mobileMenuOpen ? "rotate(45deg) translateY(-1px)" : "none" 
              }} 
            />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-hud-link"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "36px",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#0E0E0E",
                textAlign: "center",
                lineHeight: "1.2",
                display: "block",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <span className="hud-link-text">
                {link.label}
              </span>
            </Link>
          ))}

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "24px", marginTop: "48px", justifyContent: "center" }}>
            <a href="https://wa.me/916363478453" target="_blank" rel="noreferrer" className="premium-social-btn" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            <a href="https://instagram.com/mathanaevents" target="_blank" rel="noreferrer" className="premium-social-btn" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

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
          filter: drop-shadow(0 0 8px rgba(168,137,58,0.2));
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
            var(--cream) 0%,
            var(--cream) 35%,
            var(--gold) 50%,
            var(--cream) 65%,
            var(--cream) 100%
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

        .mobile-hamburger-btn {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-nav-links {
            display: none !important;
          }

          .mobile-hamburger-btn {
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            width: 32px;
            height: 32px;
            gap: 6px;
            position: relative;
            z-index: 70;
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
          }
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





        /* Clean mobile menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(242, 237, 228, 0.98); /* Light Cream */
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 32px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu.is-open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        /* Links block */
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 20px;
        }

        .mobile-hud-link:hover,
        .mobile-hud-link:active {
          color: #C9A84C !important; /* Gold hover */
        }

        .premium-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(14, 14, 14, 0.2);
          color: #0E0E0E;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .premium-social-btn:hover {
          color: #C9A84C;
          border-color: #C9A84C;
          transform: translateY(-2px);
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }

        .navbar-outer.is-scrolled {
          background: rgba(6, 6, 6, 0.88) !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 1px solid rgba(168, 137, 58, 0.1) !important;
        }

        .mobile-hamburger-line {
          background: var(--gold);
        }

        .mobile-menu-is-open .mobile-hamburger-line {
          background: #0E0E0E !important;
        }

        @media (max-width: 768px) {
          .navbar-outer.is-scrolled {
            background: rgba(242, 237, 228, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            border-bottom: 1px solid rgba(14, 14, 14, 0.1) !important;
          }
          
          .navbar-outer.is-scrolled .mobile-hamburger-line {
            background: #0E0E0E;
          }

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
            padding: 32px;
          }
        }
      `}</style>
    </>
  );
}
