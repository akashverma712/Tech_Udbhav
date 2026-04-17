"use client";

import React, { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import About from "./components/about";
import Description from "./components/Description";
import EventDescription from "./components/EventDescription";
import SponsorsSection from "./components/Sponsors"
import FooterSection from "./components/Footer";
import Image from "next/image";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && <MainPage />}
    </>
  );
}

function MainPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef   = useRef<NodeJS.Timeout | null>(null);
  const touchStartY  = useRef<number | null>(null);
  const lastTouchY   = useRef<number | null>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const radius = useMotionValue(0);

  const spring   = { damping: 40, stiffness: 200 };
  const smoothX  = useSpring(mouseX, spring);
  const smoothY  = useSpring(mouseY, spring);
  const smoothRadius = useSpring(radius, { damping: 30, stiffness: 150 });

  const scrollProgress = useMotionValue(0);
  const smoothScroll   = useSpring(scrollProgress, {
    damping: 40,
    stiffness: 120,
    restDelta: 0.001,
  });

  const [showDefaultCursor, setShowDefaultCursor] = useState(false);

  /**
   * Section stack:
   *  0   → Hero          (100vh)
   *  1   → About         (100vh)
   *  2   → Description   (100vh)
   *  3   → EventDesc     (100vh)
   *  4   → Sponsors      (~50vh)
   *  4.5 → Footer        (compact, ~auto)
   *
   * MAX_SCROLL 5.8 + final offset -520vh fully reveals footer on
   * all common viewport heights without over-scrolling.
   */
  const MAX_SCROLL = 5.8;

  const fullStackY = useTransform(
    smoothScroll,
    [0,     1.3,    2.0,      3.0,      3.5,      4.2,      5.0,      5.8    ],
    ["0vh", "0vh", "-100vh", "-100vh", "-200vh", "-300vh", "-400vh", "-520vh"]
  );

  useEffect(() => {
    if (!isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();

        mouseX.set(((e.clientX - left) / width) * 100);
        mouseY.set(((e.clientY - top) / height) * 100);

        const cur = scrollProgress.get();
        setShowDefaultCursor(cur > 1.2);

        if (cur < 1) {
          radius.set(120);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => radius.set(0), 100);
        } else {
          radius.set(0);
        }
      };

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * 0.0006;
        let next = scrollProgress.get() + delta;
        next = Math.max(0, Math.min(MAX_SCROLL, next));
        scrollProgress.set(next);
        setShowDefaultCursor(next > 1.2);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("wheel", handleWheel);
      };
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      lastTouchY.current  = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (lastTouchY.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY   = lastTouchY.current - currentY;
      lastTouchY.current = currentY;
      const delta = deltaY * 0.003;
      let next = scrollProgress.get() + delta;
      next = Math.max(0, Math.min(MAX_SCROLL, next));
      scrollProgress.set(next);
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
      lastTouchY.current  = null;
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove",  handleTouchMove,  { passive: false });
    document.addEventListener("touchend",   handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove",  handleTouchMove);
      document.removeEventListener("touchend",   handleTouchEnd);
    };
  }, [isTouchDevice, scrollProgress, mouseX, mouseY, radius]);

  const portalScale    = useTransform(smoothScroll, [0.9, 1.3], [0, 5000]);
  const combinedRadius = useTransform(
    [smoothRadius, portalScale],
    ([r, p]) => (r as number) + (p as number)
  );
  const clipPath = useMotionTemplate`circle(${combinedRadius}px at ${smoothX}% ${smoothY}%)`;
  const leftX    = useTransform(smoothScroll, [0, 1], ["-120%", "0%"]);
  const rightX   = useTransform(smoothScroll, [0, 1], ["120%",  "0%"]);
  const bottomY  = useTransform(smoothScroll, [0, 1], ["120%",  "0%"]);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-black transition-all duration-300 ${
        showDefaultCursor
          ? "cursor-default"
          : isTouchDevice
          ? "cursor-default"
          : "cursor-none"
      }`}
    >
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-[100]"
      >
        <Navbar />
      </motion.div>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="fixed left-0 top-0 h-full z-[100] items-center hidden md:flex"
      >
        <SocialSidebar />
      </motion.div>

      <motion.div style={{ y: fullStackY }} className="w-full">

        <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/light2.png" alt="Base" fill className="object-cover" />
          </div>
          {!isTouchDevice && (
            <motion.div className="absolute inset-0" style={{ clipPath }}>
              <Image src="/red.png" alt="Portal" fill className="object-cover" />
            </motion.div>
          )}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="relative w-[85vw] h-[40vw] sm:w-[70vw] sm:h-[30vw] md:w-[1400px] md:h-[600px] max-w-[1400px]">
              <Image src="/title1.png" alt="Title" fill className="object-contain" />
            </div>
          </div>
          <motion.div style={{ x: leftX }} className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[30vw] md:w-auto">
            <Image src="/tleft.png" alt="left" width={600} height={3000} className="w-full h-auto md:w-[600px]" />
          </motion.div>
          <motion.div style={{ x: rightX }} className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[30vw] md:w-auto">
            <Image src="/tright.png" alt="right" width={600} height={3000} className="w-full h-auto md:w-[600px]" />
          </motion.div>
          <motion.div
            style={{ y: bottomY }}
            className="absolute bottom-[-10%] sm:bottom-[-15%] md:bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[40vh] sm:h-[45vh] md:h-[50vh]"
          >
            <Image src="/kid.png" alt="kid" fill className="object-contain scale-[1.4] sm:scale-[1.8] md:scale-[2.2]" />
          </motion.div>
        </div>

        <About scrollProgress={smoothScroll} />

        <Description scrollProgress={smoothScroll} />

        <EventDescription />

        <SponsorsSection />

        <FooterSection />

      </motion.div>
    </div>
  );
}