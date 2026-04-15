"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const Navbar = () => {
  const [hoverLabel, setHoverLabel] = useState("");

  const items = [
    { icon: <AiFillHome size={20} />, label: "HOME", route: "/" },
    { icon: <FaUserAlt size={20} />, label: "ABOUT US", route: "/about" },
    { icon: <MdEvent size={20} />, label: "EVENTS", route: "/events" },
  ];

  return (
    
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      
      <div
        className="
          relative flex items-center gap-4
          px-5 py-3 rounded-2xl
          border border-red-900/40
          bg-black/60 backdrop-blur-2xl
          shadow-[0_0_25px_rgba(255,0,0,0.25)]
        "
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="
            w-10 h-10 rounded-xl object-contain
            border border-red-800/50
            p-1 bg-black
            shadow-[0_0_15px_rgba(255,0,0,0.4)]
            animate-pulse
          "
        />

        <div
          className={`
            absolute -bottom-7 left-1/2 -translate-x-1/2
            text-[0.65rem] tracking-[0.3em] text-red-400
            font-semibold
            transition-all duration-300
            ${hoverLabel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
          `}
        >
          {hoverLabel}
        </div>

        <div className="flex items-center gap-3">
          {items.map((item, index) => (
            <Link key={index} href={item.route}>
              <button
                onMouseEnter={() => setHoverLabel(item.label)}
                onMouseLeave={() => setHoverLabel("")}
                className="
                  relative flex items-center justify-center
                  w-10 h-10 rounded-xl
                  border border-red-900/40 text-red-400
                  bg-black/50
                  transition-all duration-300
                  hover:scale-110
                  hover:text-red-300
                  hover:border-red-500
                  hover:shadow-[0_0_20px_rgba(255,0,0,0.7)]
                  before:absolute before:inset-0 before:rounded-xl
                  before:bg-red-600/10 before:opacity-0
                  hover:before:opacity-100
                  before:transition-opacity before:duration-300
                "
              >
                {item.icon}
              </button>
            </Link>
          ))}
        </div>

        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-red-500/10" />
      </div>
    </header>
  );
};

export default Navbar;