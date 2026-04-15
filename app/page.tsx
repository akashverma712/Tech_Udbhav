"use client";

import React, { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import About from "./components/about";
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const radius = useMotionValue(0);

  const spring = { damping: 35, stiffness: 160 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);
  const smoothRadius = useSpring(radius, { damping: 25, stiffness: 120 });

  const scrollProgress = useMotionValue(0);
  const smoothScroll = useSpring(scrollProgress, {
    damping: 30,
    stiffness: 80,
  });

  const [showDefaultCursor, setShowDefaultCursor] = useState(false);

  const portalScale = useTransform(smoothScroll, [0.9, 1.3], [0, 5000]);

  const combinedRadius = useTransform(
    [smoothRadius, portalScale],
    ([r, p]) => (r as number) + (p as number)
  );

  const clipPath = useMotionTemplate`circle(${combinedRadius}px at ${smoothX}% ${smoothY}%)`;

  // ✅ HERO EXIT (Perfect sync)
  const mainContainerY = useTransform(smoothScroll, [1.3, 2.2], [
    "0vh",
    "-100vh",
  ]);

  // TEXT ANIMATIONS
  const leftX = useTransform(smoothScroll, [0, 1], ["-120%", "0%"]);
  const rightX = useTransform(smoothScroll, [0, 1], ["120%", "0%"]);
  const bottomY = useTransform(smoothScroll, [0, 1], ["120%", "0%"]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();

      mouseX.set(((e.clientX - left) / width) * 100);
      mouseY.set(((e.clientY - top) / height) * 100);

      const currentScroll = scrollProgress.get();

      setShowDefaultCursor(currentScroll > 1.2);

      if (currentScroll < 1) {
        radius.set(120);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => radius.set(0), 100);
      } else {
        radius.set(0);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY * 0.0008;
      let next = scrollProgress.get() + delta;

      // ✅ FINAL RANGE FIX
      next = Math.max(0, Math.min(3, next));

      scrollProgress.set(next);
      setShowDefaultCursor(next > 1.2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isTouchDevice, scrollProgress, mouseX, mouseY, radius]);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-black transition-all duration-300 ${
        showDefaultCursor ? "cursor-default" : "cursor-none"
      }`}
    >
      {/* NAVBAR */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="fixed top-0 left-0 w-full z-[100]"
      >
        <Navbar />
      </motion.div>

      {/* SOCIAL */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="fixed left-0 top-0 h-full z-[100] flex items-center"
      >
        <SocialSidebar />
      </motion.div>

      {/* ✅ MAIN SCROLL AREA */}
      <motion.div style={{ y: mainContainerY }} className="w-full h-[300vh]">
        
        {/* HERO */}
        <div
          ref={containerRef}
          className="relative h-screen w-full overflow-hidden bg-black"
        >
          <div className="absolute inset-0">
            <Image src="/light2.png" alt="Base" fill className="object-cover" />
          </div>

          {!isTouchDevice && (
            <motion.div className="absolute inset-0" style={{ clipPath }}>
              <Image src="/red.png" alt="Portal" fill className="object-cover" />
            </motion.div>
          )}

          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="relative w-[380px] h-[200px] md:w-[1400px] md:h-[600px]">
              <Image
                src="/title1.png"
                alt="Title"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <motion.div
            style={{ x: leftX }}
            className="absolute left-[-5%] top-1/2 -translate-y-1/2"
          >
            <Image src="/tleft.png" alt="left" width={600} height={3000} />
          </motion.div>

          <motion.div
            style={{ x: rightX }}
            className="absolute right-[-5%] top-1/2 -translate-y-1/2"
          >
            <Image src="/tright.png" alt="right" width={600} height={3000} />
          </motion.div>

          <motion.div
            style={{ y: bottomY }}
            className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[50vh]"
          >
            <Image
              src="/kid.png"
              alt="kid"
              fill
              className="object-contain scale-[2.2]"
            />
          </motion.div>
        </div>

        {/* ✅ ABOUT (PERFECTLY AFTER HERO) */}
        <About scrollProgress={smoothScroll} />
      </motion.div>
    </div>
  );
}