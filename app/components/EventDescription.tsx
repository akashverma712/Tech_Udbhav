"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENT_CARDS = [
  {
    id: 1,
    tag: "Event 001",
    title: "ROBO SOCCER",
    subtitle: "MECHANIZED MADNESS",
    description:
      "The arena flickers, bots clash, and survival decides the champion. In this high-stakes soccer battle, only the most cunning and agile machines will prevail.",
    rating: null,
    genre: null,
    age: null,
    thumb: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  },
  {
    id: 2,
    tag: "Event 010",
    title: "CLOAK CODING",
    subtitle: "CODE THE UPSIDE DOWN",
    description:
      "In the shadows of the Upside Down, code becomes a weapon. Hidden minds compete in a battle where only the unseen logic survives.",
    rating: null,
    genre: null,
    age: null,
    thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
  {
    id: 3,
    tag: "Event 011",
    title: "MINEFIELD RESCUE",
    subtitle: "NAVIGATE FOR RESUCE",
    description:
      "Bots navigate a minefield to rescue hostages before traps pull them into darkness. Precision, strategy, and nerves of steel are the only way out.",
    rating: null,
    genre: null,
    age: null,
    thumb: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  },
  {
    id: 4,
    tag: "Event 100",
    title: "COMING SOON",
    subtitle: "DARK SIGNAL",
    description: "Something is coming… and it’s not from this world. The gate is weakening. Stay ready.",
    rating: null,
    genre: null,
    age: null,
    thumb: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&q=80",
  },
  {
    id: 5,
    tag: "Event 101",
    title: "COMING SOON",
    subtitle: "DARK SIGNAL",
    description: "Something is coming… and it’s not from this world. The gate is weakening. Stay ready.",
    rating: null,
    genre: null,
    age: null,
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
  },
  {
    id: 6,
    tag: "Event 110",
    title: "COMING SOON",
    subtitle: "DARK SIGNAL",
    description: "Something is coming… and it’s not from this world. The gate is weakening. Stay ready.",
    rating: null,
    genre: null,
    age: null,
    thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
];

const TIMELINE = [
  { label: "Registrations", date: "Coming Soon" },
  { label: "Coming Soon", date: "Coming Soon" },
  { label: "Coming Soo", date: "Coming Soon" },
  { label: "Coming Soon", date: "Coming Soon" },
  { label: "Coming Soon", date: "Coming Soon" },
];

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  delay: i * 0.55,
  x: `${(i / 14) * 97 + 1.5}%`,
  duration: 5 + (i % 5),
  height: 18 + (i % 4) * 14,
}));

const Particle = ({
  delay,
  x,
  duration,
  height,
}: {
  delay: number;
  x: string;
  duration: number;
  height: number;
}) => (
  <motion.div
    className="absolute w-[2px] rounded-full pointer-events-none"
    style={{
      left: x,
      bottom: "-10px",
      height: `${height}px`,
      background: "linear-gradient(to top, transparent, rgba(255,40,40,0.55))",
      filter: "blur(0.5px)",
    }}
    animate={{ y: [0, -600], opacity: [0, 0.75, 0], scaleX: [1, 1.3, 0.8] }}
    transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
  />
);

const slide = {
  enter: (d: number) => ({ x: d * 36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d * -36, opacity: 0 }),
};

export default function EventDescription() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = (idx: number) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };

  const card = EVENT_CARDS[active];

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ background: "#080808", minHeight: "100svh" }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-0"
        style={{
          height: "200px",
          background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,0,0,0.16) 0%, transparent 75%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0"
        style={{
          height: "200px",
          background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,0,0,0.2) 0%, transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 120% 110% at 50% 50%, transparent 42%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        {PARTICLES.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 md:px-12 pt-8 pb-16 md:pt-12 md:pb-16">
        <div className="mb-8 md:mb-10 flex flex-col items-start select-none">
          <h2
            className="font-black uppercase mb-4 tracking-[-0.02em]"
            style={{
              backgroundImage: "url('/red.png')",
              backgroundSize: "cover",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontFamily: "'Georgia', serif",
            }}
          >
            Event Overview
          </h2>
          <div
            className="h-[2px] w-24"
            style={{
              background: "#dc2626",
              boxShadow: "0 0 10px rgba(220,38,38,0.5)",
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="flex-1 min-w-0 flex flex-col gap-4 select-none order-2 md:order-1 md:pt-2">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={card.id + "b"} custom={dir} variants={slide}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: "easeOut" }}>
                <span
                  className="inline-block font-bold tracking-[0.28em] uppercase rounded-full"
                  style={{
                    fontSize: "clamp(9px,2.2vw,11px)",
                    padding: "3px 12px",
                    border: "1px solid rgba(220,38,38,0.45)",
                    color: "#ef4444",
                    background: "rgba(220,38,38,0.07)",
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  {card.tag}
                </span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={card.id + "t"} custom={dir} variants={slide}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.04 }}>
                <h1
                  className="font-black leading-none text-white"
                  style={{
                    fontFamily: "'Georgia', serif",
                    letterSpacing: "-0.01em",
                    fontSize: "clamp(1.7rem, 7vw, 3.6rem)",
                    textShadow: "0 0 24px rgba(220,38,38,0.28), 0 2px 6px rgba(0,0,0,0.9)",
                  }}
                >
                  {card.title}
                </h1>
                <p
                  className="font-bold tracking-[0.18em] uppercase mt-1"
                  style={{
                    color: "#ef4444",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "clamp(0.6rem, 2.2vw, 0.82rem)",
                  }}
                >
                  {card.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.p key={card.id + "d"} custom={dir} variants={slide}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.08 }}
                style={{
                  color: "rgba(255,255,255,0.52)",
                  fontFamily: "'Georgia', serif",
                  fontSize: "clamp(0.78rem, 2.3vw, 0.92rem)",
                  lineHeight: 1.65,
                  maxWidth: "420px",
                }}
              >
                {card.description}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={card.id + "c"} custom={dir} variants={slide}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.12 }}
                className="flex items-center gap-3 flex-wrap">
                <button
                  className="flex items-center gap-2 rounded font-bold uppercase tracking-widest text-white transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{
                    background: "#dc2626",
                    fontFamily: "'Courier New', monospace",
                    boxShadow: "0 0 10px rgba(220,38,38,0.25)",
                    fontSize: "clamp(0.58rem, 1.8vw, 0.7rem)",
                    padding: "clamp(8px,2vw,11px) clamp(14px,3vw,20px)",
                  }}
                >
                  <span>▶</span> Register Now
                </button>
                <button
                  className="flex items-center gap-2 rounded font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.13)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "clamp(0.58rem, 1.8vw, 0.7rem)",
                    padding: "clamp(8px,2vw,11px) clamp(14px,3vw,20px)",
                  }}
                >
                  Rule Book
                </button>
              </motion.div>
            </AnimatePresence>

            {(card.genre || card.age || card.rating) && (
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={card.id + "m"} custom={dir} variants={slide}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.16 }}
                  className="flex items-center gap-3 flex-wrap"
                  style={{
                    color: "rgba(255,255,255,0.32)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "clamp(0.58rem, 1.6vw, 0.68rem)",
                  }}>
                  {card.genre && <span>{card.genre}</span>}
                  {card.genre && card.age && <span className="w-px h-3 bg-white/15" />}
                  {card.age && <span>{card.age}</span>}
                  {(card.genre || card.age) && card.rating && <span className="w-px h-3 bg-white/15" />}
                  {card.rating && (
                    <span className="flex items-center gap-1">
                      <span style={{ color: "#facc15" }}>★</span> {card.rating}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="flex-shrink-0 order-1 md:order-2 w-full md:w-auto">
            <div
              className="hidden md:flex gap-3 items-stretch"
              style={{ height: "390px" }}
            >
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: "290px",
                  flexShrink: 0,
                  background: "#000",
                  boxShadow: "0 0 20px rgba(220,38,38,0.12), 0 16px 44px rgba(0,0,0,0.85)",
                }}
              >
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={card.id + "pi"}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.36, ease: "easeOut" }}
                    className="absolute inset-0">
                    <img
                      src="/comingsoon.png"
                      alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.5) saturate(0.65)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "rgba(70,0,0,0.3)", mixBlendMode: "multiply" }} />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none z-10"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82), transparent)" }} />
                <div className="absolute bottom-3 left-4 z-20 text-[10px] font-bold"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Courier New', monospace" }}>
                  {String(active + 1).padStart(2, "0")} / {String(EVENT_CARDS.length).padStart(2, "0")}
                </div>
              </div>

              <div className="flex flex-col gap-1.5" style={{ width: "88px", flexShrink: 0 }}>
                {EVENT_CARDS.map((c, i) => (
                  <button key={c.id} onClick={() => go(i)}
                    className="relative flex-1 rounded-xl overflow-hidden transition-all duration-300"
                    style={{
                      background: "#000",
                      border: i === active ? "1.5px solid rgba(220,38,38,0.7)" : "1.5px solid rgba(255,255,255,0.06)",
                      boxShadow: i === active ? "0 0 7px rgba(220,38,38,0.22)" : "none",
                      opacity: i === active ? 1 : 0.4,
                      transform: i === active ? "scale(1)" : "scale(0.96)",
                    }}>
                    <img src="/tu_logo.png" alt={c.title} className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.38) saturate(0.45)" }} />
                    {i === active && (
                      <div className="absolute inset-0" style={{ background: "rgba(220,38,38,0.08)" }} />
                    )}
                    <div className="absolute bottom-0.5 right-1 text-[7px] font-bold z-10"
                      style={{
                        color: i === active ? "#ef4444" : "rgba(255,255,255,0.16)",
                        fontFamily: "'Courier New', monospace",
                      }}>
                      {String(c.id).padStart(2, "0")}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 md:hidden">
              <div
                className="relative w-full rounded-xl overflow-hidden"
                style={{
                  paddingTop: "56.25%",
                  background: "#000",
                  boxShadow: "0 0 16px rgba(220,38,38,0.1), 0 10px 30px rgba(0,0,0,0.8)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <img
                    src="/tu_logo.png"
                    alt="TU Logo"
                    className="w-14 h-14 object-contain opacity-75"
                    style={{ filter: "drop-shadow(0 0 8px rgba(220,38,38,0.4))" }}
                  />
                </div>

                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div key={card.id + "mi"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="absolute inset-0">
                    <img src="/comingsoon.png" alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.48) saturate(0.6)" }} />
                    <div className="absolute inset-0" style={{ background: "rgba(70,0,0,0.28)", mixBlendMode: "multiply" }} />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none z-10"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), transparent)" }} />
                <div className="absolute bottom-2 left-3 z-20 text-[9px] font-bold"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Courier New', monospace" }}>
                  {String(active + 1).padStart(2, "0")} / {String(EVENT_CARDS.length).padStart(2, "0")}
                </div>
              </div>

              <div
                className="flex gap-2"
                style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
              >
                {EVENT_CARDS.map((c, i) => (
                  <button key={c.id} onClick={() => go(i)}
                    className="relative rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300"
                    style={{
                      width: "68px",
                      height: "46px",
                      background: "#000",
                      border: i === active ? "1.5px solid rgba(220,38,38,0.7)" : "1.5px solid rgba(255,255,255,0.07)",
                      boxShadow: i === active ? "0 0 6px rgba(220,38,38,0.2)" : "none",
                      opacity: i === active ? 1 : 0.38,
                    }}>
                    <img src="/comingsoon.png" alt={c.title} className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.36) saturate(0.45)" }} />
                    {i === active && (
                      <div className="absolute inset-0" style={{ background: "rgba(220,38,38,0.09)" }} />
                    )}
                    <div className="absolute bottom-0.5 right-1 text-[6px] font-bold z-10"
                      style={{
                        color: i === active ? "#ef4444" : "rgba(255,255,255,0.16)",
                        fontFamily: "'Courier New', monospace",
                      }}>
                      {String(c.id).padStart(2, "0")}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-1.5 mt-1">
                {EVENT_CARDS.map((_, i) => (
                  <button key={i} onClick={() => go(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "18px" : "5px",
                      height: "5px",
                      background: i === active ? "#dc2626" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p
            className="font-bold tracking-[0.3em] uppercase mb-5"
            style={{
              color: "rgba(255,255,255,0.26)",
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(8px,1.8vw,10px)",
            }}
          >
            ── Event Timeline
          </p>

          <div className="relative">
            <div
              className="absolute left-0 right-0 z-0"
              style={{ top: "9px", height: "1px", background: "rgba(255,255,255,0.07)" }}
            />

            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${TIMELINE.length}, 1fr)` }}
            >
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1 relative z-10">
                  <div
                    className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "#0a0a0a",
                      border: "1.5px solid rgba(220,38,38,0.42)",
                      boxShadow: "0 0 5px rgba(220,38,38,0.15)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(220,38,38,0.6)" }} />
                  </div>

                  <span
                    className="font-bold text-center"
                    style={{
                      color: "rgba(220,38,38,0.7)",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "clamp(6px,1.6vw,9px)",
                    }}
                  >
                    {item.date}
                  </span>

                  <span
                    className="text-center leading-tight hidden sm:block"
                    style={{
                      color: "rgba(255,255,255,0.28)",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "clamp(5px,1.3vw,7.5px)",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <span
              className="inline-flex items-center gap-2 font-bold tracking-[0.16em] uppercase rounded-full"
              style={{
                background: "rgba(220,38,38,0.06)",
                border: "1px solid rgba(220,38,38,0.25)",
                color: "rgba(220,38,38,0.78)",
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(7px,1.8vw,9px)",
                padding: "5px 12px",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: "#ef4444" }} />
              Coming Soon — More Events Dropping
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}