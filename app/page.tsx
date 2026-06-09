import HeroSection from "@/components/sections/HeroSection";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import FeaturedFilm from "@/components/sections/FeaturedFilm";
import StatsSection from "@/components/sections/StatsSection";
import CelebrationsGrid from "@/components/sections/CelebrationsGrid";
import PortraitGalleryTeaser from "@/components/sections/PortraitGalleryTeaser";
import InstagramStrip from "@/components/sections/InstagramStrip";
import EnquiryTeaser from "@/components/sections/EnquiryTeaser";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesMarquee />
      <FeaturedFilm />
      <StatsSection />
      <CelebrationsGrid />
      <PortraitGalleryTeaser />
      <InstagramStrip />
      <EnquiryTeaser />
    </>
  );
}
