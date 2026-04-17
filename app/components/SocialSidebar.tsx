"use client";

import { useState } from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const socials = [
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/ietebits/" },
  { name: "Twitter", icon: FaTwitter, href: "https://x.com/IETE_BITS" },
  { name: "Linkedin", icon: FaLinkedin, href: "https://www.linkedin.com/company/iete-students-chapter-bit-sindri123/posts/?feedView=all" },
];

function scrambleText(text: string, setText: (val: string) => void) {
  const chars = "█▓▒░<>/[]{}—=+*^?#________";
  let iterations = 0;

  const interval = setInterval(() => {
    setText(
      text
        .split("")
        .map((_, i) => {
          if (i < iterations) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("")
    );

    if (iterations >= text.length) clearInterval(interval);
    iterations += 0.5;
  }, 25);
}

export default function SocialSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");

  return (
    <div className="fixed z-50 left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6">
      {socials.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
            onMouseEnter={() => {
              setHovered(item.name);
              scrambleText(item.name, setDisplayText);
            }}
            onMouseLeave={() => {
              setHovered(null);
              setDisplayText("");
            }}
          >
            <Icon
              className="
                w-5 h-5 text-red-600
                transition-all duration-300
                group-hover:scale-125

                drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]
                group-hover:drop-shadow-[0_0_18px_rgba(255,0,0,1)]

                
              "
            />

            <div className="relative min-w-[120px] h-5 overflow-hidden">
              
              <span
                className={`
                  absolute left-0 top-0
                  text-xs sm:text-sm uppercase tracking-[0.3em]
                  font-bold text-red-500

                  transition-opacity duration-300
                  ${hovered === item.name ? "opacity-100" : "opacity-0"}
                `}
                style={{
                  textShadow:
                    "0 0 6px rgba(255,0,0,0.8), 0 0 20px rgba(255,0,0,0.6)",
                }}
              >
                {hovered === item.name ? displayText : ""}
              </span>

              <span
                className="
                  absolute left-[1px] top-0
                  text-xs sm:text-sm uppercase tracking-[0.3em]
                  font-bold text-red-700

                  opacity-0 group-hover:opacity-70
                  animate-glitch1
                "
              >
                {displayText}
              </span>

              <span
                className="
                  absolute left-[-1px] top-0
                  text-xs sm:text-sm uppercase tracking-[0.3em]
                  font-bold text-blue-500

                  opacity-0 group-hover:opacity-60
                  animate-glitch2
                "
              >
                {displayText}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}