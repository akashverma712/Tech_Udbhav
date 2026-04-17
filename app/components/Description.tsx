"use client";

import React from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

interface DescriptionProps {
  scrollProgress: MotionValue<number>;
}

// 🔴 Enhanced Red floating particles
const Particle = ({
  delay,
  x,
  duration,
}: {
  delay: number;
  x: string;
  duration: number;
}) => {
  const size = Math.random() * 2 + 1; 
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        bottom: "-10%",
        width: `${size}px`,
        height: `${Math.random() * 60 + 20}px`,
        background: "linear-gradient(to top, transparent, rgba(255,10,10,0.8), rgba(255,255,255,0.4))",
        filter: `blur(${size * 0.4}px)`,
        boxShadow: "0 0 8px rgba(255,0,0,0.6)",
      }}
      animate={{
        y: [0, -1100],
        opacity: [0, 1, 0.8, 0],
        scaleX: [1, 1.5, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const Description: React.FC<DescriptionProps> = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [2.8, 3.4], [0, 1]);
  const y = useTransform(scrollProgress, [2.8, 3.4], ["80px", "0px"]);

  const rawY = useTransform(scrollProgress, [2.8, 3.4], [-20, 20]);
  const bgY = useSpring(rawY, { stiffness: 120, damping: 20 });

  const particles = Array.from({ length: 60 }, (_, i) => ({
    delay: Math.random() * 10,
    x: `${Math.random() * 100}%`,
    duration: 6 + Math.random() * 6,
  }));

  return (
    <motion.section
      style={{ opacity, y }}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black py-20"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500"
          className="absolute w-[250px] top-[5%] left-[-2%] rotate-[-15deg] opacity-[0.15] grayscale hover:grayscale-0 transition-all duration-700"
          alt="circuit-board"
        />
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500"
          className="absolute w-[300px] bottom-[10%] left-[5%] rotate-[10deg] opacity-[0.1] grayscale"
          alt="cyber-security"
        />
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500"
          className="absolute w-[280px] top-[15%] right-[2%] rotate-[15deg] opacity-[0.12] grayscale"
          alt="digital-world"
        />
        <img
          src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=500"
          className="absolute w-[220px] bottom-[5%] right-[8%] rotate-[-12deg] opacity-[0.15] grayscale"
          alt="vr-tech"
        />
        
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[8]">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      <div className="absolute inset-0 z-10 bg-black/80" />
      
      <div className="absolute top-0 left-0 w-full h-1/2 z-10 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,0,0,0.2),transparent_70%)]" />
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-[10]" 
        style={{
            background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,0,0,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-30 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start">
          <h2
            className="text-5xl md:text-7xl font-black uppercase mb-2 tracking-tighter"
            style={{
              backgroundImage: "url('/red.png')", 
              backgroundSize: "cover",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,0,0,0.3)",
            }}
          >
            About Us
          </h2>

          <div className="h-[3px] w-32 mb-8 bg-gradient-to-r from-red-600 via-red-400 to-transparent" />

          <div className="space-y-6 text-center lg:text-left">
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Tech Udbhav 2026, the flagship technical fest presented by the IETE Students Forum, is on the horizon!
              Get ready to immerse yourself in a world where creativity knows no bounds and innovation takes center stage. 
              Tech Udbhav is more than just a fest; it is an experience that will leave you inspired and awestruck. 
              Stay tuned as we reveal more about our lineup of events, attractions and surprises in store.
            </p>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                alt="Tech Udbhav Poster"
                className="rounded-lg shadow-2xl w-full max-w-[450px] object-cover border border-white/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
            </div>

            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-red-500" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-red-500" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Description;