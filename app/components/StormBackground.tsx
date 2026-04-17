"use client";

import { useEffect, useRef } from "react";

export default function StormBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;

    let stars: any[] = [];
    let clouds: any[] = [];
    let bolts: any[] = [];

    let lightningTimer = 0;
    let globalFlash = 0;

    class Star {
      x!: number;
      y!: number;
      size!: number;
      speed!: number;
      phase!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2;
        this.speed = 0.005 + Math.random() * 0.01;
        this.phase = Math.random() * Math.PI * 2;
      }

      draw() {
        this.phase += this.speed;
        const opacity = (Math.sin(this.phase) + 1) / 2 * 0.4;
        ctx!.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class Cloud {
      angle!: number;
      distance!: number;
      size!: number;
      speed!: number;
      opacity!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * (width * 0.6);
        this.size = 150 + Math.random() * 300;
        this.speed =
          (0.0005 + Math.random() * 0.001) *
          (Math.random() > 0.5 ? 1 : -1);
        this.opacity = 0.1 + Math.random() * 0.2;
      }

      update() {
        this.angle += this.speed;
      }

      draw() {
        const x = width / 2 + Math.cos(this.angle) * this.distance;
        const y = -100 + Math.sin(this.angle * 0.5) * (this.distance * 0.2);

        const grad = ctx!.createRadialGradient(x, y, 0, x, y, this.size);
        grad.addColorStop(0, `rgba(150,0,0,${this.opacity})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(x, y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    class Lightning {
      segments: any[] = [];
      opacity = 1;

      constructor() {
        let x = width * Math.random();
        let y = Math.random() * 80;

        for (let i = 0; i < 18; i++) {
          const nx = x + (Math.random() - 0.5) * 120;
          const ny = y + Math.random() * 70;

          this.segments.push({ x1: x, y1: y, x2: nx, y2: ny });

          x = nx;
          y = ny;
          if (y > height) break;
        }
      }

      draw() {
        this.opacity -= 0.05;
        if (this.opacity <= 0) return false;

        ctx!.strokeStyle = `rgba(255,30,30,${this.opacity})`;
        ctx!.lineWidth = 3;
        ctx!.shadowBlur = 20;
        ctx!.shadowColor = "red";

        ctx!.beginPath();
        this.segments.forEach((s) => {
          ctx!.moveTo(s.x1, s.y1);
          ctx!.lineTo(s.x2, s.y2);
        });
        ctx!.stroke();

        return true;
      }
    }

    function init() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      stars = Array.from({ length: 150 }, () => new Star());
      clouds = Array.from({ length: 40 }, () => new Cloud());
    }

    function animate() {
      ctx!.fillStyle = "black";
      ctx!.fillRect(0, 0, width, height);

      stars.forEach((s) => s.draw());

      ctx!.globalCompositeOperation = "screen";
      clouds.forEach((c) => {
        c.update();
        c.draw();
      });
      ctx!.globalCompositeOperation = "source-over";

      if (globalFlash > 0) globalFlash -= 0.05;

      lightningTimer--;
      if (lightningTimer <= 0) {
        bolts.push(new Lightning());
        globalFlash = 1;
        lightningTimer = 80 + Math.random() * 200;
      }

      bolts = bolts.filter((b) => b.draw());

      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* grain */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E')] z-10" />

      {/* glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[70%] bg-[radial-gradient(circle_at_center_top,rgba(120,0,0,0.3),transparent_80%)] blur-[80px] animate-pulse z-[1]" />
    </>
  );
}