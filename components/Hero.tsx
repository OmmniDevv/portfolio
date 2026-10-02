"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => null,
});

const KATAKANA =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // skip on mobile for perf
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fontSize = 14;
    let cols: number[] = [];
    let raf: number;
    let last = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Array.from(
        { length: Math.floor(canvas.width / fontSize) },
        () => Math.random() * -canvas.height
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 66) return; // ~15fps throttle
      last = t;
      ctx.fillStyle = "rgba(13,27,42,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(200,169,110,0.08)";
      ctx.font = `${fontSize}px monospace`;
      cols.forEach((y, i) => {
        const char = KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
        ctx.fillText(char, i * fontSize, y);
        cols[i] = y > canvas.height ? -fontSize * 5 : y + fontSize;
      });
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.05 }}
      aria-hidden="true"
    />
  );
}

const SUBTITLES = [
  "Crafting digital worlds, one line of code at a time",
  "Building bots that breathe life into automation",
  "Turning ideas into elegant, functional code",
];

function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        50
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        30
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);

  const replay = useCallback(() => {
    setDisplayed("");
    setDeleting(false);
    setKey((k) => k + 1);
  }, []);

  return (
    <p
      key={key}
      onClick={replay}
      title="Click to replay"
      className="font-inter text-parchment/70 text-lg md:text-xl min-h-[2rem] cursor-pointer select-none"
    >
      {displayed}
      <span className="inline-block w-0.5 h-5 bg-gold ml-0.5 animate-pulse" />
    </p>
  );
}

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {!reducedMotion && <Hero3D />}
      <CodeRain />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy pointer-events-none" />
      <div className="absolute inset-0 bg-star-pattern pointer-events-none" />

      {/* Decorative code snippet */}
      <div
        className="absolute bottom-24 right-8 font-mono text-xs text-gold/10 pointer-events-none select-none hidden md:block"
        aria-hidden="true"
      >
        const dev = new OmniDev()
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8">
        {/* Vision Frame */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-gold/40 animate-spin-slow group-hover:border-gold/80 transition-colors duration-500" />
          {/* Inner counter-rotating ring */}
          <div className="absolute inset-2 rounded-full border border-cryo/30 animate-spin-reverse group-hover:border-cryo/60 transition-colors duration-500" />
          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(200,169,110,0.6)]" />

          {/* Corner rune marks */}
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className="absolute w-3 h-3 border-t-2 border-l-2 border-gold/70 group-hover:border-gold transition-colors duration-300"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translate(68px, -68px)`,
              }}
            />
          ))}

          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-gold/50 group-hover:border-gold transition-colors duration-300 m-4">
            <Image
              src="/images/profile.jpg"
              alt="Abdul Malik Rizky Nur Rahmat"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="font-cinzel text-3xl md:text-5xl text-parchment tracking-wide leading-tight">
            Abdul Malik Rizky
            <br />
            <span className="text-gold text-shadow-gold">Nur Rahmat</span>
          </h1>
          <p className="font-cinzel text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase">
            OmniDev &mdash; Junior Developer &amp; Bot Architect
          </p>
          <Typewriter texts={SUBTITLES} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#projects" className="genshin-btn-filled">
            View My Work
          </a>
          <a href="#contact" className="genshin-btn">
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
