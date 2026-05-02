"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1">
      {/* Energy bar container */}
      <div className="relative w-1 h-32 bg-gold/10 rounded-full overflow-hidden border border-gold/20">
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gold via-gold/80 to-cryo rounded-full transition-all duration-150"
          style={{ height: `${progress}%` }}
        />
        {/* Glow */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-full blur-sm opacity-60 transition-all duration-150"
          style={{
            height: `${progress}%`,
            background: "linear-gradient(to top, #C8A96E, #4FC3F7)",
          }}
        />
      </div>
      {/* Rune marks */}
      {[0, 33, 66, 100].map((mark) => (
        <div
          key={mark}
          className="absolute w-2 h-px bg-gold/30"
          style={{ bottom: `calc(50% - 64px + ${mark * 1.28}px)` }}
        />
      ))}
    </div>
  );
}
