"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLE = "OmniDev";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"rune" | "text" | "pulse" | "exit">("rune");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const dismiss = () => {
    timers.current.forEach(clearTimeout);
    setPhase("exit");
    const t = setTimeout(() => {
      setVisible(false);
      if (typeof window !== "undefined") sessionStorage.setItem("splashSeen", "true");
    }, 800);
    timers.current.push(t);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      sessionStorage.getItem("splashSeen") === "true" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sessionStorage.setItem("splashSeen", "true");
      setVisible(false);
      return;
    }

    const add = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timers.current.push(t);
    };

    add(() => setPhase("text"), 2000);
    add(() => setPhase("pulse"), 3200);
    add(() => setPhase("exit"), 4000);
    add(() => {
      setVisible(false);
      sessionStorage.setItem("splashSeen", "true");
    }, 4800);
    // Hard fallback
    add(() => {
      setVisible(false);
      sessionStorage.setItem("splashSeen", "true");
    }, 6000);

    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-8%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0D1B2A" }}
        >
          {/* Rune circle */}
          <div className="relative flex items-center justify-center mb-8">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <motion.circle cx="100" cy="100" r="90" stroke="#C8A96E" strokeWidth="1.5"
                strokeDasharray="565" initial={{ strokeDashoffset: 565, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }} transition={{ duration: 1.8, ease: "easeOut" }} />
              <motion.circle cx="100" cy="100" r="70" stroke="#C8A96E" strokeWidth="0.8" opacity="0.5"
                strokeDasharray="440" initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }} />
              <motion.path d="M100 30 L170 100 L100 170 L30 100 Z" stroke="#C8A96E" strokeWidth="1"
                fill="none" opacity="0.4" strokeDasharray="283" initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }} />
              <motion.line x1="100" y1="10" x2="100" y2="190" stroke="#C8A96E" strokeWidth="0.5" opacity="0.3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
              <motion.line x1="10" y1="100" x2="190" y2="100" stroke="#C8A96E" strokeWidth="0.5" opacity="0.3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
              <motion.circle cx="100" cy="100" r="4" fill="#C8A96E"
                initial={{ scale: 0, opacity: 0 }}
                animate={phase === "pulse" ? { scale: [1, 3, 1], opacity: [1, 0.6, 1] } : { scale: 1, opacity: 1 }}
                transition={phase === "pulse" ? { duration: 0.6 } : { delay: 1.5, duration: 0.3 }} />
              {phase === "pulse" && (
                <motion.circle cx="100" cy="100" r="90" stroke="#C8A96E" strokeWidth="2" fill="none"
                  initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }} />
              )}
            </svg>
          </div>

          {/* Title */}
          <div className="flex gap-1 mb-3" aria-label="OmniDev">
            {TITLE.split("").map((char, i) => (
              <motion.span key={i} className="font-cinzel text-4xl md:text-5xl text-parchment tracking-widest"
                initial={{ opacity: 0, y: 10 }}
                animate={phase !== "rune" ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}>
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p className="font-cinzel text-sm tracking-[0.25em] uppercase text-gold/80"
            initial={{ opacity: 0 }}
            animate={phase !== "rune" ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}>
            Junior Developer &amp; Bot Architect
          </motion.p>

          {/* Skip */}
          <button
            onClick={dismiss}
            className="absolute bottom-8 right-8 font-cinzel text-xs tracking-widest uppercase text-parchment/40 hover:text-parchment/80 transition-colors border-b border-transparent hover:border-parchment/40 pb-0.5"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
