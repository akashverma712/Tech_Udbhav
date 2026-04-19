"use client";

import React, { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import SocialSidebar from "./components/SocialSidebar";
import Navbar from "./components/Navbar";
import About from "./components/about";
import Description from "./components/Description";
import EventDescription from "./components/EventDescription";
import SponsorsSection from "./components/Sponsors";
import FooterSection from "./components/Footer";
import Image from "next/image";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[110]">
      <audio ref={audioRef} src="/titlesong.mp3" loop />
      <button
        onClick={toggleAudio}
        className="w-12 h-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white/10 active:scale-90"
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <AudioToggle />
          <MainPage />
        </>
      )}
    </>
  );
}

function MainPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  
  const [maxScroll, setMaxScroll] = useState(5.5);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showDefaultCursor, setShowDefaultCursor] = useState(false);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const radius = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothRadius = useSpring(radius, { damping: 30, stiffness: 150 });
  const smoothScroll = useSpring(scrollProgress, {
    damping: 50,
    stiffness: 100,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const computeMax = () => {
      if (!stackRef.current) return;
      const totalH = stackRef.current.scrollHeight;
      const viewH = window.innerHeight;
      const overflow = Math.max(0, totalH - viewH);
      const pxPerUnit = viewH; 
      const computed = overflow / pxPerUnit;
      setMaxScroll(computed + 1); 
    };

    const resizeObserver = new ResizeObserver(computeMax);
    if (stackRef.current) resizeObserver.observe(stackRef.current);
    
    computeMax();
    window.addEventListener("resize", computeMax);
    return () => {
      window.removeEventListener("resize", computeMax);
      resizeObserver.disconnect();
    };
  }, []);

  const fullStackY = useTransform(
    smoothScroll,
    [0, 1.2, 2.2, 3.2, 3.8, 4.5, 5.2, maxScroll],
    ["0vh", "0vh", "-100vh", "-100vh", "-200vh", "-300vh", "-400vh", `-${(maxScroll - 1) * 100}vh`]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.cancelable) e.preventDefault();
      const sensitivity = 0.0008;
      const next = Math.max(0, Math.min(maxScroll, scrollProgress.get() + e.deltaY * sensitivity));
      scrollProgress.set(next);
      setShowDefaultCursor(next > 1.1);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - left) / width) * 100);
      mouseY.set(((e.clientY - top) / height) * 100);
      
      const cur = scrollProgress.get();
      if (cur < 1.2) {
        radius.set(150);
      } else {
        radius.set(0);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      if (e.cancelable) e.preventDefault();
      
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;
      touchStartY.current = currentY; 
      
      const sensitivity = 0.003;
      const next = Math.max(0, Math.min(maxScroll, scrollProgress.get() + deltaY * sensitivity));
      scrollProgress.set(next);
      setShowDefaultCursor(next > 1.1);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [maxScroll, scrollProgress, mouseX, mouseY, radius]);

  const portalScale = useTransform(smoothScroll, [0.3, 1.5], [0, 5000]);
  const combinedRadius = useTransform(
    [smoothRadius, portalScale],
    ([r, p]) => (r as number) + (p as number)
  );
  const clipPath = useMotionTemplate`circle(${combinedRadius}px at ${smoothX}% ${smoothY}%)`;

  const leftX = useTransform(smoothScroll, [0, 0.3], ["-120%", "0%"]);
  const rightX = useTransform(smoothScroll, [0, 0.3], ["120%", "0%"]);
  const bottomY = useTransform(smoothScroll, [0, 0.3], ["120%", "0%"]);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden bg-black ${
        showDefaultCursor || isTouchDevice ? "cursor-default" : "cursor-none"
      }`}
    >
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[100]"
      >
        <Navbar />
      </motion.div>

      <motion.div
        initial={{ x: -70, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 h-full z-[100] flex items-center"
      >
        <SocialSidebar />
      </motion.div>

      <motion.div ref={stackRef} style={{ y: fullStackY }} className="w-full will-change-transform">
        <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/light2.png" alt="Base" fill className="object-cover" priority />
          </div>

          {!isTouchDevice && (
            <motion.div className="absolute inset-0" style={{ clipPath }}>
              <Image src="/red.png" alt="Portal" fill className="object-cover" />
            </motion.div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4 gap-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="border border-white/20 px-8 py-3 mb-4 backdrop-blur-sm rounded-2xl"
            >
              <h2 
                className="text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase text-center leading-relaxed"
                style={{ fontFamily: "stranger-font", color: "white" }}
              >
                Turn the tech world <br />
                <span style={{ WebkitTextStroke: "1px #ef4444", color: "transparent", fontSize: "1.2em" }}>Upside Down</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.88 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[75vw] max-w-[750px] h-[25vw] max-h-[250px] flex-shrink-0"
            >
              <Image
                src="/title6.png"
                alt="Title"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          <motion.div
            style={{ x: leftX }}
            className="absolute left-[-5%] portrait:left-[-20%] top-1/2 -translate-y-1/2 w-full md:w-auto h-full overflow-visible"
          >
            <Image src="/tleft.png" alt="left" width={800} height={3000} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            style={{ x: rightX }}
            className="absolute right-[-5%] portrait:right-[-20%] top-1/2 -translate-y-1/2 w-full md:w-auto h-full overflow-visible"
          >
            <Image src="/tright.png" alt="right" width={800} height={3000} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            style={{ y: bottomY }}
            className="absolute bottom-[-5%] sm:bottom-[-10%] md:bottom-[-20%] left-1/2 -translate-x-1/2 w-full h-[50vh] sm:h-[60vh] md:h-[50vh]"
          >
            <Image src="/kid.png" alt="kid" fill className="object-contain scale-[1.2] sm:scale-[1.5] md:scale-[2.2]" />
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