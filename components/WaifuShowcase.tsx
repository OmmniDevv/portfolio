"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const NADESHIKO_IMG = "https://s4.anilist.co/file/anilistcdn/character/large/b124576-daumBIJ4lOwq.png";
const RIN_IMG = "https://s4.anilist.co/file/anilistcdn/character/large/b124586-9lGoHg1zZkFr.png";
const GANYU_IMG = "https://genshin.jmp.blue/characters/ganyu/gacha-splash";

function DriftParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,169,110,${p.alpha})`;
        ctx.fill();
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) { p.y = -4; p.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

function FlankCard({ src, label, alt }: { src: string; label: string; alt: string }) {
  const [err, setErr] = useState(false);
  return (
    <div className="relative rounded-xl overflow-hidden flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-300"
      style={{ width: 180, height: 300, border: "1px solid rgba(200,169,110,0.25)", background: "rgba(200,169,110,0.05)" }}>
      {err ? (
        <div className="w-full h-full flex items-center justify-center p-4">
          <span className="font-cinzel text-xs text-gold/60 text-center">{label}</span>
        </div>
      ) : (
        <Image src={src} alt={alt} fill className="object-cover object-top" loading="lazy" onError={() => setErr(true)} />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
        <p className="font-cinzel text-[11px] text-parchment/80 leading-tight">{label}</p>
      </div>
    </div>
  );
}

function FeaturedCard() {
  const [err, setErr] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
      style={{
        width: 300,
        height: 480,
        border: "1px solid rgba(200,169,110,0.5)",
        boxShadow: hovered
          ? "0 0 60px rgba(239,154,100,0.5), 0 0 120px rgba(200,169,110,0.2)"
          : "0 0 30px rgba(200,169,110,0.2)",
        transition: "box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Holographic shimmer overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(200,169,110,0.12) 40%, rgba(79,195,247,0.08) 70%, transparent 100%)"
            : "transparent",
          transition: "background 0.4s ease",
        }}
      />

      {err ? (
        <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(160deg, #1a1228, #2a1a0a)" }}>
          <span className="font-cinzel text-gold text-center px-4">Nadeshiko Kagamihara</span>
        </div>
      ) : (
        <Image
          src={NADESHIKO_IMG}
          alt="Nadeshiko Kagamihara from Yuru Camp (Laid-Back Camp)"
          fill
          className="object-cover object-top"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.4s ease" }}
          loading="lazy"
          onError={() => setErr(true)}
        />
      )}

      {/* Bottom info overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 p-5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }}
      >
        <p className="font-cinzel text-gold text-base tracking-wide">Nadeshiko Kagamihara</p>
        <p className="font-inter text-parchment/60 text-xs mt-0.5">Yuru Camp (Laid-Back Camp)</p>
        <p className="font-inter text-parchment/50 text-xs italic mt-2 leading-relaxed">
          &ldquo;The best meals are the ones shared under an open sky.&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function WaifuShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="waifu"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#0a1628" }}
    >
      {/* Drift particles */}
      <DriftParticles />

      {/* Top ornamental divider */}
      <div className="flex items-center justify-center mb-16">
        <svg width="400" height="20" viewBox="0 0 400 20" fill="none" aria-hidden="true" className="opacity-40">
          <line x1="0" y1="10" x2="160" y2="10" stroke="#C8A96E" strokeWidth="0.5" />
          <path d="M160 10 L172 4 L184 10 L172 16 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="10" r="5" stroke="#C8A96E" strokeWidth="0.5" />
          <circle cx="200" cy="10" r="2" fill="#C8A96E" />
          <path d="M216 10 L228 4 L240 10 L228 16 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" />
          <line x1="240" y1="10" x2="400" y2="10" stroke="#C8A96E" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="section-heading">Waifu</h2>
          <p className="font-cinzel text-xs text-gold/50 tracking-[0.3em] uppercase mt-2">
            The one who deserves the world
          </p>
        </motion.div>

        {/* Cards row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-6 flex-wrap"
        >
          {/* Left flank */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="hidden sm:block"
          >
            <FlankCard
              src={RIN_IMG}
              label="Rin Shima — Yuru Camp"
              alt="Rin Shima from Yuru Camp (Laid-Back Camp)"
            />
          </motion.div>

          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FeaturedCard />
          </motion.div>

          {/* Right flank */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35 }}
            className="hidden sm:block"
          >
            <FlankCard
              src={GANYU_IMG}
              label="Ganyu — Genshin Impact"
              alt="Ganyu from Genshin Impact"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom ornamental divider */}
      <div className="flex items-center justify-center mt-16">
        <svg width="400" height="20" viewBox="0 0 400 20" fill="none" aria-hidden="true" className="opacity-40">
          <line x1="0" y1="10" x2="160" y2="10" stroke="#C8A96E" strokeWidth="0.5" />
          <path d="M160 10 L172 4 L184 10 L172 16 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="10" r="5" stroke="#C8A96E" strokeWidth="0.5" />
          <circle cx="200" cy="10" r="2" fill="#C8A96E" />
          <path d="M216 10 L228 4 L240 10 L228 16 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" />
          <line x1="240" y1="10" x2="400" y2="10" stroke="#C8A96E" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
}
