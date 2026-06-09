"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#F7F5F0", minHeight: "100vh", position: "relative", color: "#2B2824" }}>
      {/* Subtle top gradient to ensure the global light Navbar text remains visible before scrolling */}
      <div className="contact-hero-gradient" />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "160px 48px 120px" }} className="contact-editorial-layout">
        
        {/* EDITORIAL HEADER */}
        <div style={{ textAlign: "center", marginBottom: "100px" }} className="contact-header">
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8E8376", marginBottom: "24px" }}>
            The Enquiry
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(48px, 8vw, 88px)",
              lineHeight: 1.1,
              marginBottom: "32px",
              color: "#1A1816"
            }}
          >
            Begin Your Chapter
          </h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: 1.8, color: "#544E47", maxWidth: "640px", margin: "0 auto" }}>
            Reserve an intimate consultation for your cinematic legacy. We accept a limited number of commissions each season, devoting ourselves fully to a select number of celebrations. This ensures every frame receives the pacing, editorial depth, and quiet attention it deserves. Share your vision, and we will respond with a direction as personal as your story.
          </p>
        </div>

        {/* MAIN FORM AREA */}
        <div style={{ display: "flex", gap: "100px", alignItems: "flex-start" }} className="form-split">
          
          <div style={{ flex: "1 1 65%" }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "56px", animation: "fadeIn 800ms ease" }}>
                
                <div style={{ display: "flex", gap: "40px" }} className="input-row">
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>First Name</label>
                    <input type="text" required placeholder="e.g. Eleanor" />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Last Name</label>
                    <input type="text" required placeholder="e.g. Vance" />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "40px" }} className="input-row">
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Email Address</label>
                    <input type="email" required placeholder="hello@example.com" />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Mobile Number</label>
                    <input type="tel" required placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Event Date & Location</label>
                  <input type="text" required placeholder="e.g. November 12, 2026 — Udaipur, Rajasthan" />
                </div>

                <div className="input-group">
                  <label>Celebration Details</label>
                  <textarea rows={4} placeholder="Tell us about the heart of your celebration, your vision, and what draws you to our work..."></textarea>
                </div>
                
                <button type="submit" className="submit-btn-light">
                  Submit Enquiry
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", animation: "fadeIn 800ms ease", padding: "100px 0" }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: "0 auto 40px" }}>
                  <circle cx="32" cy="32" r="31" stroke="#8E8376" strokeWidth="1" className="draw-circle" />
                  <path d="M20 32L28 40L44 24" stroke="#8E8376" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="draw-check" />
                </svg>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "40px", color: "#1A1816", marginBottom: "20px", fontWeight: 300 }}>
                  Received with Thanks
                </h2>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.8, color: "#544E47", maxWidth: "440px", margin: "0 auto" }}>
                  We will thoughtfully review your details and respond within 48 hours to discuss availability and creative direction.
                </p>
              </div>
            )}
          </div>

          {/* CONTACT INFO SIDEBAR */}
          <div style={{ flex: "1 1 30%", position: "sticky", top: "160px" }} className="contact-sidebar">
            <div style={{ borderLeft: "1px solid rgba(43, 40, 36, 0.1)", paddingLeft: "48px", display: "flex", flexDirection: "column", gap: "48px" }}>
              <div>
                <p className="sidebar-label">Write to the Atelier</p>
                <a href="mailto:hello@mathanaevents.com" className="sidebar-link">hello@mathanaevents.com</a>
              </div>
              <div>
                <p className="sidebar-label">Direct Line</p>
                <a href="tel:+919876543210" className="sidebar-link">+91 98765 43210</a>
              </div>
              <div>
                <p className="sidebar-label">The Studio</p>
                <p className="sidebar-text">Bengaluru, Karnataka<br/>India</p>
                <p style={{ fontSize: "10px", marginTop: "12px", fontStyle: "italic", color: "#8E8376" }}>By exclusive appointment</p>
              </div>
              <div>
                <p className="sidebar-label">Socials</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <a href="https://instagram.com/mathanaevents" target="_blank" rel="noreferrer" className="sidebar-link">Instagram</a>
                  <a href="#" target="_blank" rel="noreferrer" className="sidebar-link">YouTube</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .contact-hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 140px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%);
          pointer-events: none;
          z-index: 10;
        }

        /* Typography overrides for the light theme */
        label {
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #5C554D; /* Darker taupe for better contrast */
          display: block;
          margin-bottom: 16px;
        }

        .input-group {
          position: relative;
        }

        input, textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(43, 40, 36, 0.3); /* Darker border */
          color: #1A1816; /* Near black for maximum contrast */
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-style: italic;
          padding: 8px 0 16px;
          outline: none;
          transition: all 500ms ease;
          appearance: none;
          border-radius: 0;
        }

        /* Prevent iOS zoom while keeping the elegant serif look */
        @media screen and (max-width: 768px) {
          input, textarea {
            font-size: 18px; /* Must be at least 16px */
          }
        }

        textarea {
          resize: vertical;
          min-height: 40px;
          line-height: 1.5;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(43, 40, 36, 0.4); /* Darker placeholder for visibility */
          transition: color 400ms ease;
        }
        
        input:focus::placeholder, textarea:focus::placeholder {
          color: transparent;
        }

        input:focus, textarea:focus {
          border-bottom: 1px solid #2B2824;
        }

        .submit-btn-light {
          width: 100%;
          background: transparent;
          color: #2B2824;
          font-family: 'Raleway', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 24px 0;
          margin-top: 16px;
          transition: all 500ms ease;
          cursor: pointer;
          border: 1px solid rgba(43, 40, 36, 0.2);
        }

        @media (hover: hover) {
          .submit-btn-light:hover {
            background: #2B2824;
            color: #F7F5F0;
            border-color: #2B2824;
          }
        }

        /* Sidebar Styles */
        .sidebar-label {
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #5C554D;
          margin-bottom: 12px;
        }

        .sidebar-link, .sidebar-text {
          font-family: 'Raleway', sans-serif;
          font-weight: 400;
          font-size: 15px;
          color: #1A1816;
          line-height: 1.6;
          text-decoration: none;
          transition: color 400ms ease, opacity 400ms ease;
        }
        
        @media (hover: hover) {
          .sidebar-link:hover {
            color: #8E8376;
            opacity: 0.7;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(32px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .draw-circle {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        .draw-check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.8s forwards;
        }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        /* Mobile Optimization */
        @media (max-width: 900px) {
          .form-split {
            flex-direction: column;
            gap: 100px;
          }
          
          .contact-sidebar {
            position: relative;
            top: 0;
            width: 100%;
          }
          
          .contact-sidebar > div {
            border-left: none;
            border-top: 1px solid rgba(43, 40, 36, 0.1);
            padding-left: 0;
            padding-top: 48px;
            text-align: center;
          }
          
          .contact-sidebar .sidebar-label {
            margin-bottom: 8px;
          }
        }

        @media (max-width: 600px) {
          .contact-editorial-layout {
            padding: 100px 24px 80px;
          }
          
          .contact-header {
            margin-bottom: 64px;
          }
          
          .contact-header h1 {
            font-size: clamp(36px, 12vw, 56px) !important;
          }
          
          /* Centralize and simplify form on mobile */
          form {
            text-align: center;
          }
          
          label {
            text-align: center;
          }
          
          input, textarea {
            text-align: center;
          }
          
          .input-row {
            flex-direction: column;
            gap: 48px !important;
          }
          
          form {
            gap: 48px !important;
          }
          
          .submit-btn-light {
            padding: 20px 0;
            margin-top: 0;
          }
          
          .contact-sidebar > div {
            padding-top: 32px;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}
