"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Terminal from "./Terminal";
import PartyMembers from "./PartyMembers";

function InkUnderline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <svg className="absolute -bottom-1 left-0 w-full overflow-visible" height="6" aria-hidden="true">
        <motion.path
          d="M0,3 Q50%,0 100%,3"
          fill="none"
          stroke="#C8A96E"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

const INFO_ROWS = [
  { label: "School", value: "SMKN 7 Baleendah" },
  { label: "Class", value: "XI (Eleventh Grade)" },
  { label: "Role", value: "Junior Developer & Freelancer" },
  { label: "Focus", value: "Web Dev, Bot Development" },
  { label: "Waifu", value: "Nadeshiko Kagamihara (Yuru Camp)" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * 10,
      y: -((e.clientX - cx) / rect.width) * 10,
    });
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="rune-divider mb-4">
            <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">Character Profile</span>
          </div>
          <h2 className="section-heading">About <InkUnderline>OmniDev</InkUnderline></h2>
        </motion.div>

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.1s ease-out" }}
          className="vision-card p-8 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 items-start"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-gold/40 shadow-[0_0_20px_rgba(200,169,110,0.2)]">
              <Image src="/images/profile.jpg" alt="OmniDev portrait" fill className="object-cover" />
            </div>
            <div className="text-center">
              <p className="font-cinzel text-gold text-sm tracking-wider">OmniDev</p>
              <p className="font-inter text-parchment/50 text-xs mt-1">Junior Developer</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-cinzel text-xl text-parchment mb-3">
                Abdul Malik Rizky <InkUnderline>Nur Rahmat</InkUnderline>
              </h3>
              <p className="font-inter text-parchment/70 leading-relaxed text-sm md:text-base">
                A passionate junior developer and freelancer from Bandung, Indonesia.
                Currently studying at SMKN 7 Baleendah while building real-world projects in{" "}
                <InkUnderline>web development</InkUnderline> and{" "}
                <InkUnderline>bot automation</InkUnderline>. Driven by the belief that elegant code can solve any problem.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INFO_ROWS.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex gap-3 items-start"
                >
                  <span className="font-cinzel text-gold/60 text-xs tracking-wider uppercase min-w-[60px] pt-0.5">{row.label}</span>
                  <span className="font-inter text-parchment/80 text-sm">{row.value}</span>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-4 right-4 opacity-20">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#C8A96E" strokeWidth="1" />
                <circle cx="20" cy="20" r="10" stroke="#C8A96E" strokeWidth="0.5" />
                <line x1="20" y1="2" x2="20" y2="38" stroke="#C8A96E" strokeWidth="0.5" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#C8A96E" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8"
        >
          <Terminal />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <PartyMembers />
        </motion.div>
      </div>
    </section>
  );
}
