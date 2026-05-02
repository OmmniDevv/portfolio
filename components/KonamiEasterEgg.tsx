"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const LIST_URL = "https://raw.githubusercontent.com/SazumiVicky/cek-khodam/refs/heads/main/khodam/list.txt";

let cachedList: string[] | null = null;

async function getList(): Promise<string[]> {
  if (cachedList) return cachedList;
  const res = await fetch(LIST_URL);
  const text = await res.text();
  cachedList = text.split("\n").map((l) => l.trim()).filter(Boolean);
  return cachedList;
}

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (Math.imul(31, h) + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function flavorText(khodam: string): string {
  const lower = khodam.toLowerCase();
  const powerful = ["singa","naga","raja","dewa","harimau","garuda","ratu","panglima","sakti","agung"];
  const funny = ["nasi","bihun","seblak","hamster","skibidi","ambatu","gemoy","kabel","bokep","toilet","gyatt"];
  if (powerful.some((w) => lower.includes(w))) return "A mighty guardian walks beside you.";
  if (funny.some((w) => lower.includes(w))) return "Interesting... fate has spoken.";
  return "Your path is now illuminated.";
}

type Phase = "input" | "loading" | "result";

function RotatingRunes() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {[120, 160, 200].map((r, i) => (
        <svg
          key={r}
          className="absolute"
          width={r * 2} height={r * 2}
          viewBox={`0 0 ${r * 2} ${r * 2}`}
          style={{
            animation: `spin-${i % 2 === 0 ? "cw" : "ccw"} ${8 + i * 4}s linear infinite`,
            opacity: 0.15,
          }}
        >
          <circle cx={r} cy={r} r={r - 2} stroke="#C8A96E" strokeWidth="0.8" fill="none" strokeDasharray="6 10" />
        </svg>
      ))}
      <style>{`
        @keyframes spin-cw { to { transform: rotate(360deg); } }
        @keyframes spin-ccw { to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}

export default function KhodamChecker() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("input");
  const [name, setName] = useState("");
  const [khodam, setKhodam] = useState("");
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Konami listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[step]) {
        const next = step + 1;
        if (next === KONAMI.length) { setStep(0); setOpen(true); setPhase("input"); setName(""); }
        else setStep(next);
      } else {
        setStep(e.key === KONAMI[0] ? 1 : 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // Mobile 7-tap trigger
  useEffect(() => {
    const onTap = () => { setOpen(true); setPhase("input"); setName(""); };
    window.addEventListener("khodam:open", onTap);
    return () => window.removeEventListener("khodam:open", onTap);
  }, []);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open && phase === "input") setTimeout(() => inputRef.current?.focus(), 100);
  }, [open, phase]);

  const close = () => { setOpen(false); setPhase("input"); setName(""); setKhodam(""); };

  const reveal = async () => {
    if (!name.trim()) return;
    setPhase("loading");
    const list = await getList();
    const idx = hashName(name.trim()) % list.length;
    await new Promise((r) => setTimeout(r, 2400));
    setKhodam(list[idx]);
    setPhase("result");
  };

  const copy = () => {
    navigator.clipboard.writeText(`My khodam is ${khodam} — checked at omnidev.vercel.app`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-cursor-dismiss="true"
          onClick={close}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
        >
          {/* Ambient runes */}
          <RotatingRunes />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
            data-cursor-dismiss="false"
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #0a1220 0%, #0d1b2a 60%, #0a1220 100%)",
              border: "1px solid rgba(200,169,110,0.4)",
              boxShadow: "0 0 60px rgba(200,169,110,0.15), inset 0 0 40px rgba(200,169,110,0.03)",
            }}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-4 text-center border-b border-gold/10">
              <p className="font-cinzel text-xs text-gold/50 tracking-[0.3em] uppercase mb-1">Mystical Divination</p>
              <h2 className="font-cinzel text-2xl text-gold tracking-wider">Khodam Checker</h2>
              <p className="font-inter text-parchment/40 text-xs mt-2">Enter your name to reveal your spiritual guardian.</p>
            </div>

            <div className="px-8 py-8 min-h-[260px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">

                {/* Input phase */}
                {phase === "input" && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full flex flex-col gap-4"
                  >
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && reveal()}
                        placeholder="Enter your name..."
                        className="w-full bg-transparent border-b-2 border-gold/30 focus:border-gold outline-none px-2 py-3 font-cinzel text-parchment text-center tracking-widest placeholder-parchment/20 transition-colors duration-300"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gold rounded-full"
                        animate={{ width: name ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <button
                      onClick={reveal}
                      disabled={!name.trim()}
                      className="genshin-btn-filled w-full disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Reveal My Khodam
                    </button>
                  </motion.div>
                )}

                {/* Loading phase */}
                {phase === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="relative w-24 h-24">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="absolute inset-0 rounded-full border border-gold/40"
                          style={{
                            animation: `spin-cw ${1.5 + i * 0.5}s linear infinite`,
                            transform: `scale(${1 - i * 0.2})`,
                          }}
                        />
                      ))}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                      </div>
                    </div>
                    <p className="font-cinzel text-gold/60 text-sm tracking-widest animate-pulse">
                      Consulting the spirits...
                    </p>
                  </motion.div>
                )}

                {/* Result phase */}
                {phase === "result" && (
                  <motion.div
                    key="result"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full flex flex-col items-center gap-4 text-center"
                  >
                    <p className="font-cinzel text-xs text-gold/50 tracking-[0.25em] uppercase">Your Khodam Is</p>

                    <p
                      className="font-cinzel text-2xl md:text-3xl text-gold leading-tight"
                      style={{ textShadow: "0 0 30px rgba(200,169,110,0.8), 0 0 60px rgba(200,169,110,0.4)" }}
                    >
                      {khodam}
                    </p>

                    {/* Ornamental divider */}
                    <svg width="200" height="12" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                      <line x1="0" y1="6" x2="80" y2="6" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5" />
                      <path d="M80 6 L88 2 L96 6 L88 10 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" opacity="0.5" />
                      <circle cx="100" cy="6" r="2" fill="#C8A96E" opacity="0.6" />
                      <path d="M104 6 L112 2 L120 6 L112 10 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" opacity="0.5" />
                      <line x1="120" y1="6" x2="200" y2="6" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5" />
                    </svg>

                    <p className="font-inter text-parchment/50 text-sm italic">{flavorText(khodam)}</p>

                    <div className="flex gap-3 mt-2 w-full">
                      <button onClick={copy} className="genshin-btn flex-1 text-xs">
                        {copied ? "Copied" : "Share"}
                      </button>
                      <button onClick={() => { setPhase("input"); setName(""); }} className="genshin-btn flex-1 text-xs">
                        Check Again
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer close */}
            <div className="px-8 pb-6 flex justify-center border-t border-gold/10 pt-4">
              <button onClick={close} className="font-cinzel text-xs text-parchment/30 hover:text-parchment/60 tracking-widest uppercase transition-colors">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
