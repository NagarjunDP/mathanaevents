"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh", paddingTop: "120px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px", display: "flex", gap: "80px", minHeight: "calc(100vh - 120px)" }} className="contact-layout">
        
        {/* LEFT HALF */}
        <div style={{ flex: 1, paddingTop: "80px" }}>
          <h1
            className="magnetic-text"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(48px, 6vw, 80px)",
              color: "var(--cream)",
              lineHeight: 1.1,
              marginBottom: "64px",
            }}
          >
            Let&apos;s Create<br />Something Eternal
          </h1>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
              <p className="contact-label">Email</p>
              <a href="mailto:hello@mathanaevents.com" className="contact-value">hello@mathanaevents.com</a>
            </div>
            <div>
              <p className="contact-label">Phone & WhatsApp</p>
              <a href="tel:+919876543210" className="contact-value">+91 98765 43210</a>
            </div>
            <div>
              <p className="contact-label">Studio</p>
              <p className="contact-value">Bengaluru, Karnataka, India<br />(By Appointment Only)</p>
            </div>
            <div>
              <p className="contact-label">Social</p>
              <a href="https://instagram.com/mathanaevents" target="_blank" rel="noreferrer" className="contact-value">@mathanaevents</a>
            </div>
          </div>
        </div>

        {/* RIGHT HALF - FORM */}
        <div style={{ flex: 1, background: "var(--charcoal)", padding: "80px", borderLeft: "1px solid rgba(201,168,76,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }} className="form-container">
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "32px", animation: "fadeIn 600ms ease" }}>
              <div className="input-group">
                <input type="text" required placeholder="Full Name *" />
              </div>
              <div className="input-group">
                <input type="tel" required placeholder="Mobile Number (+91) *" />
              </div>
              <div className="input-group">
                <input type="email" required placeholder="Email Address *" />
              </div>
              <div className="input-group">
                <select required defaultValue="">
                  <option value="" disabled hidden>Event Type *</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Pre-Wedding">Pre-Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Cocktail">Cocktail</option>
                  <option value="Housewarming">Housewarming</option>
                  <option value="Simantha">Simantha</option>
                  <option value="Destination">Destination</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <input type="date" required placeholder="Event Date *" className="date-input" />
              </div>
              <div className="input-group">
                <input type="text" required placeholder="Event Location / Venue *" />
              </div>
              <div className="input-group">
                <select required defaultValue="">
                  <option value="" disabled hidden>How did you find us? *</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google">Google</option>
                  <option value="Referral">Referral</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <textarea rows={4} placeholder="Tell us about your story..."></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Enquiry
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center", animation: "fadeIn 800ms ease" }}>
              {/* Success Checkmark SVG Animation */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ margin: "0 auto 32px" }}>
                <circle cx="40" cy="40" r="38" stroke="var(--gold)" strokeWidth="2" className="draw-circle" />
                <path d="M24 40L36 52L56 28" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="draw-check" />
              </svg>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "40px", color: "var(--cream)", marginBottom: "16px" }}>Thank You</h2>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: "12px", letterSpacing: "0.2em", color: "var(--cream-dim)", textTransform: "uppercase" }}>
                We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          )}
        </div>

      </div>

      <style jsx>{`
        .contact-label {
          font-family: 'Raleway', sans-serif;
          font-weight: 200;
          font-size: 9px;
          color: var(--gold);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .contact-value {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 16px;
          color: var(--cream);
          line-height: 1.5;
          text-decoration: none;
          transition: color 300ms ease;
        }
        @media (hover: hover) {
          a.contact-value:hover {
            color: var(--gold);
          }
        }

        .input-group {
          position: relative;
        }

        input, select, textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(242,237,228,0.2);
          color: var(--cream);
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 14px;
          padding: 12px 0;
          outline: none;
          transition: border-color 300ms ease;
          appearance: none;
        }

        input::placeholder, textarea::placeholder {
          color: rgba(242,237,228,0.4);
        }
        
        select:invalid {
          color: rgba(242,237,228,0.4);
        }

        option {
          background: var(--charcoal);
          color: var(--cream);
        }

        input:focus, select:focus, textarea:focus {
          border-bottom: 1px solid var(--gold);
        }

        /* Custom select arrow */
        select {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23C9A84C' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right center;
          background-size: 16px;
        }

        /* Date input placeholder fix for webkit */
        .date-input::-webkit-calendar-picker-indicator {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(10deg);
          cursor: pointer;
        }

        .submit-btn {
          width: 100%;
          background: var(--gold);
          color: var(--black);
          font-family: 'Raleway', sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 20px 0;
          margin-top: 16px;
          transition: filter 300ms ease;
        }

        @media (hover: hover) {
          .submit-btn:hover {
            filter: brightness(1.1);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .draw-circle {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: draw 1s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        .draw-check {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: draw 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
        }

        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        @media (max-width: 1024px) {
          .contact-layout {
            flex-direction: column;
            gap: 0;
          }
          .form-container {
            border-left: none;
            padding: 80px 0;
          }
        }
      `}</style>
    </div>
  );
}
