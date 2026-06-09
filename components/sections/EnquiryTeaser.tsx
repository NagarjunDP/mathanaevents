"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function EnquiryTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".teaser-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{
        width: "100%",
        padding: "160px 48px",
        background: "#F7F5F0",
        color: "#1A1816",
        position: "relative",
      }}
      className="contact-editorial-layout"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="teaser-content">
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "100px" }} className="contact-header">
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8E8376", marginBottom: "24px" }}>
            The Enquiry
          </p>
          <h2
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
          </h2>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: "15px", lineHeight: 1.8, color: "#544E47", maxWidth: "640px", margin: "0 auto" }}>
            Reserve an intimate consultation for your cinematic legacy. We accept a limited number of commissions each season, devoting ourselves fully to a select number of celebrations.
          </p>
        </div>

        {/* MAIN FORM & SIDEBAR AREA */}
        <div style={{ display: "flex", gap: "100px", alignItems: "flex-start" }} className="form-split">
          
          <div style={{ flex: "1 1 65%" }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "56px" }} className="contact-form">
                
                <div style={{ display: "flex", gap: "40px" }} className="input-row name-row">
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
                    <input type="tel" required placeholder="+91 63634 78453" />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "40px" }} className="input-row">
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Event Date</label>
                    {/* Native Date Picker - Optimized for Mobile Native UI */}
                    <div className="date-wrapper">
                      <input 
                        type="date" 
                        required 
                        className="premium-date-input"
                      />
                    </div>
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                    <label>Location / Venue</label>
                    <input type="text" required placeholder="e.g. Udaipur, Rajasthan" />
                  </div>
                </div>

                <div className="input-group">
                  <label>Celebration Details</label>
                  <textarea rows={4} placeholder="Tell us about the heart of your celebration, your vision, and what draws you to our work..."></textarea>
                </div>
                
                <button type="submit" className="submit-btn-light">
                  Request Availability
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", animation: "fadeIn 800ms ease", padding: "100px 0" }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: "0 auto 40px" }}>
                  <circle cx="32" cy="32" r="31" stroke="#8E8376" strokeWidth="1" className="draw-circle" />
                  <path d="M20 32L28 40L44 24" stroke="#8E8376" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="draw-check" />
                </svg>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "40px", color: "#1A1816", marginBottom: "20px", fontWeight: 300 }}>
                  Received with Thanks
                </h3>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: "14px", lineHeight: 1.8, color: "#544E47", maxWidth: "440px", margin: "0 auto" }}>
                  We will thoughtfully review your details and respond within 48 hours to discuss availability and creative direction.
                </p>
              </div>
            )}
          </div>

          {/* CONTACT INFO SIDEBAR */}
          <div style={{ flex: "1 1 30%", position: "sticky", top: "160px" }} className="contact-sidebar">
            <div style={{ borderLeft: "1px solid rgba(43, 40, 36, 0.1)", paddingLeft: "48px", display: "flex", flexDirection: "column", gap: "48px" }} className="sidebar-inner">
              <div>
                <p className="sidebar-label">Write to the Atelier</p>
                <a href="mailto:mathanaevents@gmail.com" className="sidebar-link">mathanaevents@gmail.com</a>
              </div>
              <div>
                <p className="sidebar-label">Direct Line</p>
                <a href="tel:+916363478453" className="sidebar-link">+91 63634 78453</a>
              </div>
              <div>
                <p className="sidebar-label">The Studio</p>
                <p className="sidebar-text">Bengaluru, Karnataka<br/>India</p>
                <p style={{ fontSize: "10px", marginTop: "12px", fontStyle: "italic", color: "#8E8376" }}>By exclusive appointment</p>
              </div>
              <div>
                <p className="sidebar-label">Socials</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }} className="sidebar-socials">
                  <a href="https://instagram.com/mathanaevents" target="_blank" rel="noreferrer" className="sidebar-link">Instagram</a>
                  <a href="https://youtube.com/@mathanaevents" target="_blank" rel="noreferrer" className="sidebar-link">YouTube</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        /* Typography overrides for the light theme */
        label {
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #5C554D;
          display: block;
          margin-bottom: 16px;
        }

        .input-group {
          position: relative;
        }

        input, textarea, .premium-date-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(43, 40, 36, 0.3);
          color: #1A1816;
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-style: italic;
          padding: 8px 0 16px;
          outline: none;
          transition: border-color 500ms ease;
          appearance: none;
          border-radius: 0;
        }

        /* Prevent iOS zoom while keeping the elegant serif look */
        @media screen and (max-width: 768px) {
          input, textarea, .premium-date-input {
            font-size: 18px; /* Must be at least 16px for iOS */
          }
        }

        textarea {
          resize: vertical;
          min-height: 40px;
          line-height: 1.5;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(43, 40, 36, 0.4);
          transition: color 400ms ease;
        }
        
        input:focus::placeholder, textarea:focus::placeholder {
          color: transparent;
        }

        input:focus, textarea:focus, .premium-date-input:focus {
          border-bottom: 1px solid #2B2824;
        }

        /* Premium Date Input Styling */
        .date-wrapper {
          position: relative;
        }
        
        /* Stylize the native date picker indicator */
        .premium-date-input::-webkit-calendar-picker-indicator {
          opacity: 0.5;
          cursor: pointer;
          filter: invert(0.2); /* Make it dark for light bg */
          transition: opacity 0.3s ease;
        }
        
        .premium-date-input:hover::-webkit-calendar-picker-indicator {
          opacity: 1;
        }

        /* If value is empty, it acts like a placeholder on webkit */
        .premium-date-input:invalid::-webkit-datetime-edit {
          color: rgba(43, 40, 36, 0.4);
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
          
          .sidebar-inner {
            border-left: none !important;
            border-top: 1px solid rgba(43, 40, 36, 0.1) !important;
            padding-left: 0 !important;
            padding-top: 64px !important;
            align-items: center !important;
            text-align: center !important;
          }
          
          .sidebar-socials {
            align-items: center !important;
          }
          
          .contact-sidebar .sidebar-label {
            margin-bottom: 12px;
          }
        }

        @media (max-width: 600px) {
          .contact-editorial-layout {
            padding: 80px 24px;
          }
          
          .contact-header {
            margin-bottom: 64px;
          }
          
          .contact-header h2 {
            font-size: clamp(36px, 12vw, 56px) !important;
          }
          
          /* Centralize and simplify form on mobile */
          .contact-form {
            align-items: stretch !important;
            text-align: center !important;
          }
          
          label {
            text-align: center !important;
          }
          
          input, textarea, .premium-date-input {
            text-align: center !important;
          }
          
          .input-row {
            flex-direction: column;
            gap: 32px !important;
            width: 100%;
          }
          
          .input-row.name-row {
            flex-direction: row;
            gap: 20px !important;
          }
          
          .input-group {
            width: 100%;
          }
          
          .contact-form {
            gap: 40px !important;
          }
          
          .submit-btn-light {
            padding: 20px 0;
            margin-top: 16px;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .sidebar-inner {
            padding-top: 40px !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
