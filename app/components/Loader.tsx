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

    loader.classList.add("st-portal-open");

    setTimeout(() => {
      loader.classList.add("st-portal-expand");
    }, 400);

    setTimeout(() => {
      loader.style.transition = "opacity 0.8s ease";
      loader.style.opacity = "0";
    }, 900);

    setTimeout(() => {
      onFinish();
    }, 1400);
  };

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 bg-black flex items-center justify-center overflow-hidden"
    >
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