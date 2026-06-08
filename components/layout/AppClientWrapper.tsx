"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Note: You would need to add gsap and @studio-freight/lenis to dependencies if not already there.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // SplitText is a premium plugin. We will simulate it or if you have it installed it will work.
  // For now we'll write custom split text logic or assume it's available.
}

export default function AppClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);


  // Unregister lingering service workers from previous projects on localhost to prevent cache conflicts
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        if (registrations.length > 0) {
          for (const registration of registrations) {
            registration.unregister();
          }
          console.log("Unregistered lingering service workers from previous projects. Reloading to clear cache...");
          window.location.reload();
        }
      });
    }
  }, []);

  return <>{children}</>;
}

