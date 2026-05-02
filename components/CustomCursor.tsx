"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Burst = { id: number; x: number; y: number };
type Variant = "default" | "button" | "link" | "dismiss";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<Variant>("default");
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const id = ++trailIdRef.current;
      setTrail((t) => [...t.slice(-6), { x: e.clientX, y: e.clientY, id }]);
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now();
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 600);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      // Dismiss backdrop of easter egg
      if (el.closest("[data-cursor-dismiss]")) {
        setVariant("dismiss");
      } else if (el.closest("button") || el.closest("[role=button]")) {
        setVariant("button");
      } else if (el.closest("a")) {
        setVariant("link");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="fixed pointer-events-none rounded-full bg-gold"
          style={{
            zIndex: 99998,
            left: t.x,
            top: t.y,
            width: 4 - i * 0.4,
            height: 4 - i * 0.4,
            opacity: ((i + 1) / trail.length) * 0.4,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none"
        style={{ zIndex: 99999, translateX: "-50%", translateY: "-50%" }}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
      >
        {variant === "default" && (
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 rounded-full bg-gold/80 shadow-[0_0_12px_rgba(200,169,110,0.9)]" />
            <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping" />
          </div>
        )}
        {variant === "button" && (
          <div className="w-12 h-12 rounded-full border-2 border-white bg-white/10 shadow-[0_0_24px_rgba(255,255,255,0.7)]" />
        )}
        {variant === "link" && (
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 border border-cryo rotate-45" />
            <div className="absolute inset-1 border border-cryo/50 rotate-45" />
          </div>
        )}
        {variant === "dismiss" && (
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 border-2 border-gold/80 rotate-45" />
            <div className="absolute inset-2 border border-gold/40 rotate-45" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/60 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/60 -translate-x-1/2" />
          </div>
        )}
      </motion.div>

      {/* Click bursts */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="fixed pointer-events-none"
          style={{ zIndex: 99997, left: b.x, top: b.y, transform: "translate(-50%, -50%)" }}
        >
          <div className="w-8 h-8 rounded-full border border-gold animate-burst-ring" />
          <div className="w-4 h-4 rounded-full border border-cryo/60 animate-burst-ring" style={{ animationDelay: "0.1s" }} />
        </div>
      ))}
    </>
  );
}
