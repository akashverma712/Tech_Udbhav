"use client";

import { motion } from "framer-motion";

export default function SponsorsSection() {
  const sponsors = [
    "/sponsor1.png",
    "/sponsor2.png",
    "/sponsor3.png",
    "/sponsor4.png",
    "/sponsor5.png",
    "/sponsor6.png",
  ];


  const doubledSponsors = [...sponsors, ...sponsors];

  return (
    <section
      className="w-full bg-black text-white flex flex-col items-center justify-center border-t border-white/10 px-6 py-20 overflow-hidden"
      style={{ minHeight: "50vh" }}
    >
      <div className="flex flex-col items-center gap-3 mb-16">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gray-500">
          We are proud to have
        </p>
        <h2 className="text-2xl md:text-4xl font-bold tracking-widest uppercase text-white/90">
          Our Previous Sponsors
        </h2>
        <div className="h-px w-28 bg-white/20 mt-1" />
      </div>

      <div className="relative w-full max-w-7xl">
        
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16 items-center whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"], 
            }}
            transition={{
              ease: "linear",
              duration: 25, 
              repeat: Infinity,
            }}
          >
            {doubledSponsors.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 md:w-44 flex justify-center items-center"
              >
                <img
                  src={src}
                  alt={`Sponsor ${index}`}
                  className="max-w-full h-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}