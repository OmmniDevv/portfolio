"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type StatDef = {
  label: string;
  sub: string;
  value: number;
  suffix: string;
  color: string;
};

const STATIC_STATS: StatDef[] = [
  { label: "Years of Code", sub: "Writing software", value: 3, suffix: "+", color: "#C8A96E" },
  { label: "Bots Deployed", sub: "WA / Telegram / Discord", value: 10, suffix: "+", color: "#EF9A9A" },
  { label: "Cups of Coffee", sub: "Fuel for late nights", value: 999, suffix: "+", color: "#9B72CF" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-cinzel text-3xl md:text-4xl text-parchment tabular-nums">
      {n.toLocaleString()}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/OmmniDevv")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.public_repos === "number") setRepoCount(d.public_repos);
      })
      .catch(() => {});
  }, []);

  const stats: StatDef[] = [
    {
      label: "Public Repos",
      sub: "Live from GitHub",
      value: repoCount ?? 0,
      suffix: repoCount === null ? "" : "+",
      color: "#4FC3F7",
    },
    ...STATIC_STATS,
  ];

  return (
    <section aria-label="Statistics" className="relative px-6 -mt-4 mb-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="vision-card px-6 py-8 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-1 group"
            >
              <span
                className="w-2 h-2 rounded-full mb-2 transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }}
              />
              {repoCount === null && i === 0 ? (
                <span className="font-cinzel text-3xl md:text-4xl text-parchment/30 animate-pulse">
                  --
                </span>
              ) : (
                <Counter target={s.value} suffix={s.suffix} />
              )}
              <span className="font-cinzel text-xs tracking-widest uppercase text-gold/70">
                {s.label}
              </span>
              <span className="font-inter text-xs text-parchment/40">{s.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
