"use client";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "FILMS", href: "/films" },
  { label: "PHOTOGRAPHY", href: "/photography" },
  { label: "VIDEOGRAPHY", href: "/videography" },
  { label: "ATELIER", href: "/atelier" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--black)",
        position: "relative",
        paddingTop: "80px",
        paddingBottom: "32px",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px" }} className="footer-inner">
        
        {/* Main 3 Columns */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "48px", marginBottom: "80px" }} className="footer-grid">
          
          {/* Left: Logo & Tagline */}
          <div style={{ flex: "1" }}>
            <div style={{ position: "relative", height: "48px", width: "50px", marginBottom: "24px" }}>
              <Image src="/logo.png" alt="Mathana Events Logo" fill sizes="120px" style={{ objectFit: "contain" }} />
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "24px",
                color: "var(--cream)",
                lineHeight: 1.2,
                maxWidth: "280px",
              }}
            >
              Crafted with Cinema.<br />Delivered as Memory.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }} className="footer-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="footer-link"
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontWeight: 200,
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  color: "var(--cream)",
                  textTransform: "uppercase",
                  transition: "color 300ms ease",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Socials */}
          <div style={{ flex: "1", display: "flex", justifyContent: "flex-end", gap: "24px", alignItems: "flex-start" }} className="footer-social">
            <a href="https://instagram.com/mathanaevents" target="_blank" rel="noreferrer" className="social-icon">
              {/* Simple Instagram SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://youtube.com/@mathanaevents" target="_blank" rel="noreferrer" className="social-icon">
              {/* Simple YouTube SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="social-icon">
              {/* WhatsApp SVG (simplified stroke version for consistency) */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.15)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="footer-bottom"
        >
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: "9px", color: "var(--cream-dim)" }}>
            &copy; 2025 Mathana Events &middot; All Rights Reserved
          </span>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: "9px", color: "var(--cream-dim)" }}>
            Designed & Developed by <a href="https://webibi.tech" target="_blank" rel="noreferrer" style={{ color: "var(--gold)" }}>Webibi.tech</a>
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (hover: hover) {
          .footer-link:hover {
            color: var(--gold) !important;
          }
          .social-icon {
            transition: transform 300ms ease, filter 300ms ease;
          }
          .social-icon:hover {
            transform: translateY(-2px);
            filter: brightness(1.3);
          }
        }

        @media (max-width: 768px) {
          .footer-inner {
            padding: 0 24px !important;
          }
          .footer-grid {
            flex-direction: column !important;
            gap: 40px !important;
            margin-bottom: 48px !important;
          }
          .footer-nav {
            align-items: flex-start !important;
          }
          .footer-social {
            justify-content: flex-start !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}
