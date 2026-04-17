"use client";

import React, { useEffect, useRef } from "react";
import { MotionValue, motion } from "framer-motion";
import EventSlider from "./EventSlider";

interface AboutProps {
  scrollProgress: MotionValue<number>;
}

const Particle = ({
  delay,
  x,
  duration,
}: {
  delay: number;
  x: string;
  duration: number;
}) => (
  <motion.div
    className="absolute w-[2px] rounded-full pointer-events-none"
    style={{
      left: x,
      bottom: "-10px",
      height: `${Math.random() * 40 + 10}px`,
      background:
        "linear-gradient(to top, transparent, rgba(255,40,40,0.7))",
      filter: "blur(0.5px)",
    }}
    animate={{
      y: [0, -800],
      opacity: [0, 0.9, 0],
      scaleX: [1, 1.4, 0.8],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

const About: React.FC<AboutProps> = ({ scrollProgress }) => {
  const topLayerRef = useRef<HTMLDivElement>(null);
  const bottomLayerRef = useRef<HTMLDivElement>(null);
  const innerRevealRef = useRef<HTMLDivElement>(null);
  const crackGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (value) => {
      const start = 2;
      const end = 3;
      const progress = (value - start) / (end - start);
      const localProgress = Math.min(Math.max(progress, 0), 1);

      const animationFactor = Math.sin(localProgress * Math.PI);
      const snapFactor = Math.pow(animationFactor, 1.2);
      const movement = snapFactor * 98;

      if (topLayerRef.current && bottomLayerRef.current) {
        topLayerRef.current.style.transform = `translateY(-${
          movement / 2
        }vh) scale(${1 + snapFactor * 0.08}) rotateX(${
          snapFactor * 10
        }deg)`;

        bottomLayerRef.current.style.transform = `translateY(${
          movement / 2
        }vh) scale(${1 + snapFactor * 0.08}) rotateX(${
          -snapFactor * 10
        }deg)`;

        const textOpacity = 1 - Math.pow(localProgress, 4);
        topLayerRef.current.style.opacity = `${Math.max(
          textOpacity,
          0.4
        )}`;
        bottomLayerRef.current.style.opacity = `${Math.max(
          textOpacity,
          0.4
        )}`;
      }

      if (innerRevealRef.current && crackGlowRef.current) {
        innerRevealRef.current.style.opacity = `${snapFactor}`;
        innerRevealRef.current.style.height = `${snapFactor * 105}%`;

        crackGlowRef.current.style.opacity = `${animationFactor}`;
        crackGlowRef.current.style.transform = `translateY(-50%) scaleX(${
          animationFactor * 3
        })`;
        crackGlowRef.current.style.boxShadow = `0 0 ${
          animationFactor * 60
        }px #ff0000`;
      }
    });

    return () => unsubscribe();
  }, [scrollProgress]);

  const particles = Array.from({ length: 16 }, (_, i) => ({
    delay: i * 0.5,
    x: `${(i / 16) * 100 + Math.random() * 5}%`,
    duration: 5 + Math.random() * 5,
  }));

  const textClassName =
    "absolute text-[15vw] font-black uppercase leading-[0.9] tracking-[-0.05em] text-center select-none pointer-events-none transition-opacity duration-300";

  return (
    <section className="bg-black text-white overflow-hidden h-screen relative">

      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,0,0,0.35) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[6]">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[10] bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_80%,black_100%)]" />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black perspective-[2000px]">

        <div
          ref={innerRevealRef}
          className="absolute top-1/2 left-1/2 w-full h-0 opacity-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-[1] overflow-hidden"
          style={{
            background:
              "radial-gradient(circle, rgba(60,0,0,0.6) 0%, #000 80%)",
          }}
        >
          <EventSlider />
        </div>

        <div
          ref={crackGlowRef}
          className="absolute w-full h-[2px] top-1/2 left-0 -translate-y-1/2 scale-x-0 opacity-0 z-[15] bg-red-600"
        />

        <div
          ref={topLayerRef}
          className={textClassName}
          style={{
            clipPath: "inset(0 0 50% 0)",
            backgroundImage: "url('/red.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          OUR
          <br />
          EVENTS
        </div>

        {/* BOTTOM */}
        <div
          ref={bottomLayerRef}
          className={textClassName}
          style={{
            clipPath: "inset(50% 0 0 0)",
            backgroundImage: "url('/red.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 75%",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          OUR
          <br />
          EVENTS
        </div>
      </div>
    </section>
  );
};

export default About;