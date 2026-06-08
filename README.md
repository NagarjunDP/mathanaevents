# Mathana Events — Premium Cinematic Wedding Website

Built with Next.js 14 App Router · Tailwind CSS · GSAP animations · Lenis smooth scroll.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 How to Replace Assets

### Logo
Replace `/public/logo.png` with your ME monogram PNG. It displays at 48px height in the Navbar.

### Founder Photo
Replace `/public/jagadish.jpg` with Jagadish's professional portrait.

### Hero Videos
Upload your hero videos to:
- `/public/videos/hero-desktop.mp4` — Landscape (16:9) for desktop
- `/public/videos/hero-mobile.mp4` — Portrait (9:16) for mobile

The `<video>` element in `HeroSection.tsx` automatically picks the right source using `<source media="(max-width: 768px)">`.

### Wedding Films
Upload your film clips to `/public/videos/`:
- `film-1.mp4` through `film-5.mp4`

Update the `films` array in `components/sections/FilmsShowcase.tsx` with correct titles and event types.

### Gallery Photos
Replace the 6 placeholder images in `/public/gallery/`:
- `photo-01.jpg` through `photo-06.jpg`

All 12 gallery slots in `GallerySection.tsx` use these 6 images (repeating). Add more unique images by extending the `photos` array.

---

## 📞 How to Update Contact Info

1. **Phone / Email**: Search for `+91 98765 43210` and `hello@mathanaevents.com` across all files and replace.
2. **WhatsApp**: The WhatsApp link in `EnquirySection.tsx` uses `wa.me/919876543210`. Replace `919876543210` with your number (country code + number, no spaces or dashes).
3. **Instagram**: Replace `@mathanaevents` in `Footer.tsx` and `Navbar.tsx`.
4. **YouTube**: Replace the YouTube URL in `Footer.tsx`.

---

## 🎨 Design Tokens

All colors are defined as CSS variables in `app/globals.css`:

| Variable | Value | Use |
|----------|-------|-----|
| `--gold` | `#C9A84C` | Primary accent |
| `--gold-light` | `#D4A843` | Hover states |
| `--gold-muted` | `#A8893A` | Subtle elements |
| `--obsidian` | `#080808` | Main background |
| `--charcoal` | `#111111` | Card backgrounds |
| `--cream` | `#F5F0E8` | Primary text |
| `--cream-muted` | `rgba(245,240,232,0.55)` | Secondary text |

---

## 📄 Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage — all 8 sections |
| `/films` | `app/films/page.tsx` | Full films grid with filters |
| `/portfolio` | `app/portfolio/page.tsx` | Full masonry photo gallery |
| `/about` | `app/about/page.tsx` | Founder bio, film credits, philosophy |
| `/contact` | `app/contact/page.tsx` | Standalone enquiry form |

---

## 🏗 Components

```
components/
├── layout/
│   ├── Navbar.tsx         — Transparent→blur nav, mobile overlay
│   └── Footer.tsx         — 3-column footer with social links
├── sections/
│   ├── HeroSection.tsx    — Full-viewport video hero with grain
│   ├── FounderSection.tsx — Split layout with parallax + film strip
│   ├── ServicesSection.tsx — 3×2 card grid with hover glow
│   ├── FilmsShowcase.tsx  — Drag-scroll carousel with video hover
│   ├── GallerySection.tsx — Masonry + native dialog lightbox
│   ├── StatsBar.tsx       — Count-up stats on scroll
│   ├── Testimonials.tsx   — Auto-slide carousel with dots
│   └── EnquirySection.tsx — Full form + bokeh + success animation
└── ui/
    ├── CustomCursor.tsx   — Gold dot cursor (desktop only)
    └── PageLoader.tsx     — Cinematic black→MATHANA EVENTS reveal
```

---

## 🛠 Technology

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS + custom CSS variables
- **Fonts**: Cormorant Garamond (headings) + Inter (body) — Google Fonts
- **Animations**: CSS keyframes + IntersectionObserver (no GSAP required for core features)
- **Images**: Next.js `<Image>` with WebP, lazy loading, fetchpriority

---

*Designed by [Webibi.tech](https://webibi.tech)*
