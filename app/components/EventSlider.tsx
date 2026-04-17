"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EventSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [scramble, setScramble] = useState("000");

  const events = [
    { id: 0, code: "001" },
    { id: 1, code: "010" },
    { id: 2, code: "011" },
    { id: 3, code: "100" },
    { id: 4, code: "101" },
  ];

  useEffect(() => {
    let interval: any;
    const chars = ["0", "1"];
    let iterations = 0;

    interval = setInterval(() => {
      setScramble(
        events[activeIndex].code
          .split("")
          .map((_, i) => {
            if (i < iterations) return events[activeIndex].code[i];
            return chars[Math.floor(Math.random() * 2)];
          })
          .join("")
      );

      iterations += 0.5;

      if (iterations >= events[activeIndex].code.length) {
        clearInterval(interval);
        setScramble(events[activeIndex].code);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % events.length);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <div className="relative flex items-center justify-center w-full max-w-7xl h-[450px] md:h-[550px] overflow-hidden rounded-2xl border border-white/10">
      
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/strangeBIT.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.1)",
          filter: "brightness(0.9) contrast(1.1)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.4)_75%)]" />

      <div className="relative z-10 w-full h-full flex items-center justify-center">

        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-10 p-3 rounded-full bg-black/20 border border-white/20 backdrop-blur hover:scale-110 transition z-40"
        >
          <ChevronLeft size={32} />
        </button>

        {/* SLIDER */}
        <div className="relative w-full flex items-center justify-center h-full -translate-y-4">
          {events.map((event, index) => {
            const isCenter = index === activeIndex;
            const isLeft =
              index === (activeIndex - 1 + events.length) % events.length;
            const isRight =
              index === (activeIndex + 1) % events.length;

            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={event.id}
                animate={{
                  scale: isCenter ? 1 : 0.85,
                  x: isCenter ? 0 : isLeft ? -320 : 320, // 🔥 more spacing
                  rotateY: isLeft ? 20 : isRight ? -20 : 0,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className={`absolute w-[260px] md:w-[340px] h-[380px] md:h-[460px] ${
                  isCenter ? "z-30" : "z-10"
                }`}
              >
                <div className="w-full h-full rounded-xl border border-white/10 bg-black/10 backdrop-blur-xs p-8 flex flex-col items-center text-center">

                  <span className="text-xs tracking-widest text-red-500 mb-auto font-mono">
                    EVENT {isCenter ? scramble : event.code}
                  </span>

                  <h3 className="stranger-font text-3xl md:text-4xl uppercase text-red-500 stranger-glow">
                    COMING SOON
                  </h3>

                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-10 p-3 rounded-full bg-black/20 border border-white/20 backdrop-blur hover:scale-110 transition z-40"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default EventSlider;