"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhoneAlt } from "react-icons/fa";

const INSTA_LINK = "https://www.instagram.com/ietebits/";

const SOCIAL_ICONS = [FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube];

const CONTACTS = [
  { name: "Rishita Raj",  phone: "+91 95089 01018" },
  { name: "Punam Kumari", phone: "+91 93080 67069" },
  { name: "Akash Verma",  phone: "+91 7479676602"  },
];

function ContactInfo({ name, phone }: { name: string; phone: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <FaPhoneAlt size={11} className="text-gray-400" />
      </div>
      <div>
        <p className="text-xs font-bold tracking-wide text-white/90 leading-tight">{name}</p>
        <p className="text-[11px] text-gray-400 font-mono">{phone}</p>
      </div>
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="w-full bg-black text-white border-t border-white/10 px-6 py-8 md:py-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="relative w-40 h-14 md:w-52 md:h-16">
            <Image src="/tu_logo.png" alt="IETE Logo" fill className="object-contain" />
          </div>
          <div className="flex gap-3">
            {SOCIAL_ICONS.map((Icon, i) => (
              <a
                key={i}
                href={INSTA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-4">
          <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/60 border-b border-white/10 pb-1 w-full text-center md:text-left">
            Contact Info
          </h3>
          <div className="flex flex-col gap-3">
            {CONTACTS.map((c) => (
              <ContactInfo key={c.name} name={c.name} phone={c.phone} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-2 text-center">
        <p className="text-[9px] text-gray-500 uppercase tracking-[0.35em]">
          Designed &amp; Developed by
        </p>
        <p className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-semibold text-white/80">
          Crafted with <span className="text-red-500">❤</span> by Team IETE-SF, BIT Sindri
        </p>
        <p className="text-[9px] text-gray-600 tracking-widest mt-1">
          © 2026 IETE-SF, BIT SINDRI. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}