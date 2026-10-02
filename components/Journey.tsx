"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  desc: string;
  color: string;
  now?: boolean;
};

const MILESTONES: Milestone[] = [
  {
    year: "2023",
    title: "Masuk SMKN 7 Baleendah",
    desc: "Mulai belajar programming dengan serius di bangku SMK. Dari sini semuanya bermula.",
    color: "#74C69D",
  },
  {
    year: "2024",
    title: "Mendalami Bot Development",
    desc: "Fokus ke bot WhatsApp, Telegram, dan Discord pakai Node.js dan TypeScript. Bot pertama yang jalan 24/7 rasanya seperti punya anak digital.",
    color: "#EF9A9A",
  },
  {
    year: "2025",
    title: "Terjun ke Freelance",
    desc: "Mulai ambil project dari klien: website company profile, dashboard, dan bot automasi untuk kebutuhan bisnis kecil.",
    color: "#4FC3F7",
  },
  {
    year: "Mei 2026",
    title: "Portfolio Website Rilis",
    desc: "Website ini lahir. Dibangun dengan Next.js bertema Genshin Impact, lengkap dengan efek 3D dan kelopak sakura.",
    color: "#9B72CF",
  },
  {
    year: "Okt 2026",
    title: "Perpus-Online",
    desc: "Sistem otomasi perpustakaan sekolah berbasis Laravel: RFID, notifikasi WhatsApp, laporan Excel, dan asisten AI.",
    color: "#C8A96E",
  },
  {
    year: "Sekarang",
    title: "Kelas XII, Siap Tempur",
    desc: "Tahun terakhir SMK. Terbuka untuk project freelance, kolaborasi, dan tantangan baru.",
    color: "#C8A96E",
    now: true,
  },
];

function Node({ m, side, index }: { m: Milestone; side: "left" | "right"; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`relative md:w-1/2 ${side === "left" ? "md:pr-12 md:text-right md:ml-0" : "md:pl-12 md:ml-auto"}`}>
      {/* node di garis tengah */}
      <span
        aria-hidden="true"
        className={`absolute top-1 w-4 h-4 rounded-full border-2 bg-navy hidden md:block ${
          side === "left" ? "-right-2" : "-left-2"
        }`}
        style={{
          borderColor: m.color,
          boxShadow: `0 0 12px ${m.color}`,
        }}
      />
      {/* node untuk mobile */}
      <span
        aria-hidden="true"
        className="absolute top-1 -left-[31px] w-3.5 h-3.5 rounded-full border-2 bg-navy md:hidden"
        style={{ borderColor: m.color, boxShadow: `0 0 10px ${m.color}` }}
      />
      <motion.div
        initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.05 }}
      >
        <p
          className="font-cinzel text-xs tracking-[0.25em] uppercase mb-2"
          style={{ color: m.color }}
        >
          {m.year}
          {m.now && (
            <span className="ml-2 font-inter normal-case tracking-normal text-[11px] px-2 py-0.5 rounded-full border border-gold/40 text-gold">
              now
            </span>
          )}
        </p>
        <h3 className="font-cinzel text-lg text-parchment mb-2">{m.title}</h3>
        <p
          className={`font-inter text-parchment/60 text-sm leading-relaxed max-w-md ${
            side === "left" ? "md:ml-auto" : ""
          }`}
        >
          {m.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="rune-divider mb-4">
            <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
              My Story <span className="font-jp text-gold/40">・物語</span>
            </span>
          </div>
          <h2 className="section-heading">Perjalanan</h2>
          <p className="font-inter text-parchment/50 text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Tiap quest punya awalnya. Ini ringkasan perjalananku sampai titik ini.
          </p>
        </motion.div>

        <div className="relative">
          {/* garis tengah */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 md:left-1/2 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
          />
          <div className="flex flex-col gap-12 md:gap-16 pl-10 md:pl-0">
            {MILESTONES.map((m, i) => (
              <Node key={m.year + m.title} m={m} index={i} side={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
