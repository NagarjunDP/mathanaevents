import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import AppClientWrapper from "@/components/layout/AppClientWrapper";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Mathana Events — Luxury Cinematic Wedding Photography & Videography",
  description:
    "Award-winning cinematographer Jagadish Gowda captures your love story with the language of cinema. Premium wedding films, candid photography, and destination weddings across India and worldwide.",
  keywords: "wedding photography Bengaluru, cinematic wedding film, luxury wedding videography India, Mathana Events, Jagadish Gowda",
  openGraph: {
    title: "Mathana Events — Where Love Becomes Cinema",
    description: "Premium cinematic wedding photography & videography by award-winning film cinematographer Jagadish Gowda. Based in Bengaluru, India.",
    type: "website",
    url: "https://mathanaevents.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppClientWrapper>
          <Preloader />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </AppClientWrapper>
      </body>
    </html>
  );
}
