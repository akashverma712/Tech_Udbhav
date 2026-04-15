"use client";

import React, { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

interface AboutProps {
  scrollProgress: MotionValue<number>;
}

const About: React.FC<AboutProps> = ({ scrollProgress }) => {
  const topLayerRef = useRef<HTMLDivElement>(null);
  const bottomLayerRef = useRef<HTMLDivElement>(null);
  const innerRevealRef = useRef<HTMLDivElement>(null);
  const innerTextRef = useRef<HTMLDivElement>(null);
  const crackGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value) => {
      const start = 2;
      const end = 3;

      const progress = (value - start) / (end - start);
      const localProgress = Math.min(Math.max(progress, 0), 1);

      const animationFactor = Math.sin(localProgress * Math.PI);
      const movement = animationFactor * 90;

      // 🎬 Gate cinematic split
      if (topLayerRef.current && bottomLayerRef.current) {
        topLayerRef.current.style.transform = `
          translateY(-${movement / 2}vh)
          scale(${1 + animationFactor * 0.12})
          rotateX(${animationFactor * 8}deg)
        `;

        bottomLayerRef.current.style.transform = `
          translateY(${movement / 2}vh)
          scale(${1 + animationFactor * 0.12})
          rotateX(${-animationFactor * 8}deg)
        `;
      }

      // 🔴 Portal reveal enhanced
      if (innerRevealRef.current && crackGlowRef.current) {
        if (animationFactor > 0.02) {
          innerRevealRef.current.style.opacity = `${animationFactor}`;
          innerRevealRef.current.style.height = `${animationFactor * 100}%`;

          crackGlowRef.current.style.opacity = `${Math.pow(
            animationFactor,
            2
          )}`;
          crackGlowRef.current.style.transform = `
            translateY(-50%) scaleX(${animationFactor * 2})
          `;
        } else {
          innerRevealRef.current.style.opacity = "0";
          innerRevealRef.current.style.height = "0%";
          crackGlowRef.current.style.opacity = "0";
        }
      }

      // ✨ Text reveal
      if (innerTextRef.current) {
        if (animationFactor > 0.75) {
          innerTextRef.current.style.opacity = "1";
          innerTextRef.current.style.transform = "scale(1)";
          innerTextRef.current.style.letterSpacing = `${
            0.6 + (1 - animationFactor)
          }em`;
        } else {
          innerTextRef.current.style.opacity = "0";
          innerTextRef.current.style.transform = "scale(0.85)";
        }
      }
    });

    return () => unsubscribe();
  }, [scrollProgress]);

  return (
    <section className="bg-[#050505] text-white overflow-hidden h-[200vh] relative">
      
      {/* 🎬 Cinematic vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black perspective-[1200px]">

        {/* 🔴 Portal */}
        <div
          ref={innerRevealRef}
          className="absolute top-1/2 left-1/2 w-full h-0 opacity-0 
          -translate-x-1/2 -translate-y-1/2 
          flex flex-col items-center justify-center z-[1]"
          style={{
            background:
              "radial-gradient(circle, #ff1a1a 0%, #400000 60%, #000 100%)",
            boxShadow: "inset 0 0 200px rgba(0,0,0,1)",
            filter: "contrast(120%) brightness(110%)",
            willChange: "height, opacity",
          }}
        >
          <div
            ref={innerTextRef}
            className="text-[5vw] tracking-[0.6em] font-light opacity-0 uppercase transition-all duration-500"
            style={{
              textShadow:
                "0 0 20px rgba(255,0,0,0.8), 0 0 60px rgba(255,0,0,0.6)",
              filter: "blur(0.2px)",
            }}
          >
            COMING SOON
          </div>
        </div>

        {/* ⚡ Crack energy beam */}
        <div
          ref={crackGlowRef}
          className="absolute w-full h-[14px] top-1/2 left-0 
          -translate-y-1/2 scale-x-0 opacity-0 z-[4]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #ff0000, #ff4d4d, transparent)",
            filter: "blur(12px)",
            willChange: "transform, opacity",
          }}
        />

        {/* 🔝 TOP */}
        <div
          ref={topLayerRef}
          className="absolute text-[15vw] font-black uppercase leading-[0.9] tracking-[-0.05em] text-center z-[5]"
          style={{
            clipPath: "inset(0 0 50% 0)",
            willChange: "transform",
            textShadow:
              "0 10px 40px rgba(0,0,0,0.9), 0 0 20px rgba(255,0,0,0.2)",
          }}
        >
          OUR<br />EVENTS
        </div>

        {/* 🔻 BOTTOM */}
        <div
          ref={bottomLayerRef}
          className="absolute text-[15vw] font-black uppercase leading-[0.9] tracking-[-0.05em] text-center z-[5]"
          style={{
            clipPath: "inset(50% 0 0 0)",
            willChange: "transform",
            textShadow:
              "0 -10px 40px rgba(0,0,0,0.9), 0 0 20px rgba(255,0,0,0.2)",
          }}
        >
          OUR<br />EVENTS
        </div>
      </div>
    </section>
  );
};

export default About;