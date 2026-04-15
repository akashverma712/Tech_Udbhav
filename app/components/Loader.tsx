"use client";

import { useEffect, useRef } from "react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnd = () => {
      triggerTransition();
    };

    video.addEventListener("ended", handleEnd);

    return () => {
      video.removeEventListener("ended", handleEnd);
    };
  }, []);

  const triggerTransition = () => {
    const loader = loaderRef.current;
    if (!loader) return;

    // STEP 1: portal open (center tear)
    loader.classList.add("st-portal-open");

    // STEP 2: expand portal
    setTimeout(() => {
      loader.classList.add("st-portal-expand");
    }, 400);

    // STEP 3: fade out everything
    setTimeout(() => {
      loader.style.transition = "opacity 0.8s ease";
      loader.style.opacity = "0";
    }, 900);

    // STEP 4: finish
    setTimeout(() => {
      onFinish();
    }, 1400);
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* PORTAL EFFECT */}
      <div className="st-portal" />

      <video
        ref={videoRef}
        src="/loader.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}