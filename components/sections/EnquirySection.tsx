"use client";
import { useState } from "react";
import LiquidButton from "@/components/ui/LiquidButton";

const eventTypes = [
  "Wedding",
  "Pre-Wedding",
  "Birthday",
  "Cocktail / Reception",
  "Housewarming",
  "Simantha",
  "Other",
];

const hearAbout = [
  "Instagram",
  "YouTube",
  "Google Search",
  "Word of Mouth",
  "Wedding Fair",
  "Other",
];

const bokehParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  width: Math.random() * 200 + 100,
  left: Math.random() * 100,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 15,
}));

type FormData = {
  name: string;
  mobile: string;
  email: string;
  eventType: string;
  eventDate: string;
  location: string;
  source: string;
  message: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function EnquirySection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    eventType: "",
    eventDate: "",
    location: "",
    source: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.mobile.match(/^[6-9]\d{9}$/)) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address";
    if (!form.eventType) newErrors.eventType = "Please select an event type";
    if (!form.eventDate) newErrors.eventDate = "Please select a date";
    if (!form.location.trim()) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="enquiry"
      aria-label="Book a Private Consultation"
      style={{
        background: "var(--obsidian)",
        padding: "120px 48px",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      {/* Bokeh particles */}
      <div className="bokeh-container" aria-hidden="true">
        {bokehParticles.map((p) => (
          <div
            key={p.id}
            className="bokeh-particle"
            style={{
              width: p.width,
              height: p.width,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>Begin Your Story</p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: "var(--cream)",
              marginBottom: "16px",
            }}
          >
            Book a Private Consultation
          </h2>
          <p style={{
            fontFamily: "'Inter'",
            fontSize: "13px",
            fontWeight: 300,
            color: "var(--cream-muted)",
            letterSpacing: "0.05em",
          }}>
            Limited dates available each season. We respond within 24 hours.
          </p>
        </div>

        {submitted ? (
          <SuccessState />
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-grid">
              <FormField label="Full Name" id="field-name" error={errors.name}>
                <input id="field-name" type="text" className={`form-input ${errors.name ? "error" : ""}`} placeholder="Your full name" value={form.name} onChange={set("name")} autoComplete="name" />
              </FormField>
              <FormField label="Mobile Number" id="field-mobile" error={errors.mobile}>
                <input id="field-mobile" type="tel" className={`form-input ${errors.mobile ? "error" : ""}`} placeholder="+91 98765 43210" value={form.mobile} onChange={set("mobile")} autoComplete="tel" />
              </FormField>
            </div>

            <FormField label="Email Address" id="field-email" error={errors.email} style={{ marginBottom: "20px" }}>
              <input id="field-email" type="email" className={`form-input ${errors.email ? "error" : ""}`} placeholder="hello@example.com" value={form.email} onChange={set("email")} autoComplete="email" />
            </FormField>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-grid">
              <FormField label="Event Type" id="field-event-type" error={errors.eventType}>
                <select id="field-event-type" className={`form-input ${errors.eventType ? "error" : ""}`} value={form.eventType} onChange={set("eventType")}>
                  <option value="">Select event type</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </FormField>
              <FormField label="Event Date" id="field-event-date" error={errors.eventDate}>
                <input id="field-event-date" type="date" className={`form-input ${errors.eventDate ? "error" : ""}`} value={form.eventDate} onChange={set("eventDate")} min={new Date().toISOString().split("T")[0]} />
              </FormField>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-grid">
              <FormField label="Event Location" id="field-location" error={errors.location}>
                <input id="field-location" type="text" className={`form-input ${errors.location ? "error" : ""}`} placeholder="City or Venue" value={form.location} onChange={set("location")} />
              </FormField>
              <FormField label="How Did You Hear About Us?" id="field-source">
                <select id="field-source" className="form-input" value={form.source} onChange={set("source")}>
                  <option value="">Select an option</option>
                  {hearAbout.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormField>
            </div>

            <FormField label="Message / Special Note" id="field-message" style={{ marginBottom: "32px" }}>
              <textarea
                id="field-message"
                className="form-input"
                rows={4}
                placeholder="Tell us a little about your event, your vision, or anything special you'd like us to know..."
                value={form.message}
                onChange={set("message")}
                style={{ resize: "vertical", minHeight: "100px" }}
              />
            </FormField>

            <LiquidButton id="submit-enquiry" type="submit" className="btn-primary" style={{ width: "100%" }}>
              Send Enquiry
            </LiquidButton>

            {/* WhatsApp */}
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <a
                href="https://wa.me/919876543210?text=Hi%20Mathana%20Events%2C%20I'd%20like%20to%20enquire%20about%20your%20photography%20services."
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Inter'",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--cream-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#25D366")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream-muted)")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FormField({
  label, id, error, children, style
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <label htmlFor={id} className="form-label">{label}</label>
      {children}
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}

function SuccessState() {
  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="var(--gold)" strokeWidth="1.5" className="check-circle" />
          <polyline
            points="24,42 35,53 58,30"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-circle"
            style={{ animationDelay: "0.4s" }}
          />
        </svg>
      </div>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "32px",
          fontWeight: 300,
          color: "var(--cream)",
          marginBottom: "12px",
        }}
      >
        Enquiry Received
      </h3>
      <p style={{
        fontFamily: "'Inter'",
        fontSize: "14px",
        fontWeight: 300,
        color: "var(--cream-muted)",
        letterSpacing: "0.05em",
      }}>
        We&apos;ll be in touch within 24 hours.
      </p>
    </div>
  );
}
