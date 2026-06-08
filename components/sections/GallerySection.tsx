"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const photos = [
  { src: "/gallery/photo-01.jpg", alt: "Candid bridal moment — bride laughing with joy" },
  { src: "/gallery/photo-02.jpg", alt: "Wedding ceremony — couple at mandap with fire ritual" },
  { src: "/gallery/photo-03.jpg", alt: "Pre-wedding shoot — couple in palace corridor at golden hour" },
  { src: "/gallery/photo-04.jpg", alt: "Cocktail party — elegant wedding reception venue" },
  { src: "/gallery/photo-05.jpg", alt: "Destination wedding — Kerala backwaters at sunset" },
  { src: "/gallery/photo-06.jpg", alt: "Housewarming ceremony — grihapravesh ritual" },
  { src: "/gallery/photo-07.jpg", alt: "Birthday celebration — sparklers and golden candlelight" },
  { src: "/gallery/photo-08.jpg", alt: "Sunset silhouette — couple at golden hour" },
  { src: "/gallery/photo-01.jpg", alt: "Bridal portrait close-up with henna" },
  { src: "/gallery/photo-03.jpg", alt: "Pre-wedding — golden light through palace arches" },
  { src: "/gallery/photo-05.jpg", alt: "Sunset couple portrait on Kerala backwaters" },
  { src: "/gallery/photo-07.jpg", alt: "Luxury birthday celebration with sparklers" },
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    dialogRef.current?.showModal();
  };

  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
    setLightboxIndex(null);
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, prev, next, closeLightbox]);

  // Light-dismiss fallback for Safari (closedby not supported)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if ("closedBy" in HTMLDialogElement.prototype) return;

    const handleClick = (e: MouseEvent) => {
      if (e.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!inside) closeLightbox();
    };
    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, [closeLightbox]);

  return (
    <section
      id="portfolio"
      aria-label="Portfolio Gallery — Stills That Speak"
      style={{
        background: "var(--obsidian)",
        padding: "120px 48px",
        borderTop: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>Portfolio</p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: "var(--cream)",
            }}
          >
            Stills That Speak
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="masonry-item"
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${photo.alt}`}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={400}
                style={{ width: "100%", height: "auto" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        className="lightbox"
        // @ts-ignore — closedby is a new attribute
        closedby="any"
        aria-label="Photo lightbox"
        onClose={closeLightbox}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        {lightboxIndex !== null && (
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <Image
              src={photos[lightboxIndex].src}
              alt={photos[lightboxIndex].alt}
              width={1200}
              height={800}
              style={{ objectFit: "contain", maxHeight: "85vh", width: "auto", borderRadius: "2px" }}
              priority
            />

            {/* Close */}
            <button
              id="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              style={{
                position: "fixed",
                top: "24px",
                right: "32px",
                background: "none",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "var(--gold)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "none",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            {/* Prev */}
            <button
              id="lightbox-prev"
              onClick={prev}
              aria-label="Previous photo"
              style={{
                position: "fixed",
                left: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "var(--gold)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                cursor: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            {/* Next */}
            <button
              id="lightbox-next"
              onClick={next}
              aria-label="Next photo"
              style={{
                position: "fixed",
                right: "24px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "var(--gold)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                cursor: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            {/* Counter */}
            <p style={{
              position: "absolute",
              bottom: "-32px",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Inter'",
              fontSize: "11px",
              color: "var(--cream-muted)",
              letterSpacing: "0.2em",
              whiteSpace: "nowrap",
            }}>
              {lightboxIndex + 1} / {photos.length}
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
