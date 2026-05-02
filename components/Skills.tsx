"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const SKILLS = [
  {
    name: "JavaScript",
    element: "Electro",
    color: "#9B72CF",
    glow: "rgba(155,114,207,0.5)",
    level: 85,
    desc: "Dynamic scripting, DOM manipulation, async patterns, Node.js runtime.",
    snippet: `const greet = () =>\n  console.log("hello world")`,
    elementIcon: "https://rerollcdn.com/GENSHIN/Elements/Element_Electro.png",
    langIcon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    element: "Hydro",
    color: "#4FC3F7",
    glow: "rgba(79,195,247,0.5)",
    level: 80,
    desc: "Type-safe development, interfaces, generics, and scalable architecture.",
    snippet: `type Dev = {\n  name: string;\n  role: "frontend" | "bot"\n}`,
    elementIcon: "https://rerollcdn.com/GENSHIN/Elements/Element_Hydro.png",
    langIcon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
  },
  {
    name: "PHP",
    element: "Anemo",
    color: "#74C69D",
    glow: "rgba(116,198,157,0.5)",
    level: 70,
    desc: "Server-side scripting, REST APIs, Laravel basics, database integration.",
    snippet: `echo "Hello from\n  the server side";`,
    elementIcon: "https://rerollcdn.com/GENSHIN/Elements/Element_Anemo.png",
    langIcon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847 2.54 2.54 0 0 1-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.624H9.388l1.23-6.326h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.836 2.836 0 0 1-.305.847 2.54 2.54 0 0 1-.561.703c-.261.25-.575.438-.917.551-.336.108-.765.164-1.286.164h-1.18l-.327 1.681h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.418.476 1.002.331 1.752zm-2.595-.185h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995-.174-.193-.523-.29-1.047-.29z" />
      </svg>
    ),
  },
  {
    name: "Dart / Flutter",
    element: "Cryo",
    color: "#4FC3F7",
    glow: "rgba(79,195,247,0.6)",
    level: 65,
    desc: "Cross-platform mobile apps with Flutter, Dart language fundamentals.",
    snippet: `void main() =>\n  print("Flutter go brrr");`,
    elementIcon: "https://rerollcdn.com/GENSHIN/Elements/Element_Cryo.png",
    langIcon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
      </svg>
    ),
  },
  {
    name: "Web Development",
    element: "Geo",
    color: "#C8A96E",
    glow: "rgba(200,169,110,0.5)",
    level: 82,
    desc: "Full-stack web apps, REST APIs, responsive UI, Next.js, React.",
    snippet: `npx create-next-app@latest`,
    elementIcon: "https://rerollcdn.com/GENSHIN/Elements/Element_Geo.png",
    langIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    name: "Bot Development",
    element: "Pyro",
    color: "#EF9A9A",
    glow: "rgba(239,154,154,0.5)",
    level: 88,
    desc: "WhatsApp (Baileys), Telegram, Discord bots with Node.js & TypeScript.",
    snippet: `bot.on("message", ctx =>\n  ctx.reply("Nyaa~"))`,
    elementIcon: "https://rerollcdn.com/GENSHIN/Elements/Element_Pyro.png",
    langIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4M8 11V9a4 4 0 0 1 8 0v2" />
        <circle cx="8.5" cy="15.5" r="1" fill="currentColor" />
        <circle cx="15.5" cy="15.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

type BurstParticle = { id: number; x: number; y: number; color: string };

function IconSwap({
  skill,
  hovered,
}: {
  skill: (typeof SKILLS)[0];
  hovered: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-16 h-16" style={{ perspective: "400px" }}>
      {/* Element icon — visible by default, flips away on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transition: "transform 0.28s ease, opacity 0.28s ease",
          transform: hovered ? "rotateX(90deg)" : "rotateX(0deg)",
          opacity: hovered ? 0 : 1,
          backfaceVisibility: "hidden",
        }}
      >
        {imgError ? (
          <div
            className="w-14 h-14 rounded-full"
            style={{ background: `radial-gradient(circle, ${skill.color}60, ${skill.color}20)` }}
          />
        ) : (
          <div
            style={{
              filter: `drop-shadow(0 0 10px ${skill.color})`,
            }}
            className="elem-pulse-icon"
          >
            <Image
              src={skill.elementIcon}
              alt={`${skill.element} element icon`}
              width={64}
              height={64}
              onError={() => setImgError(true)}
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      {/* Language icon — hidden by default, flips in on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transition: "transform 0.28s ease 0.05s, opacity 0.28s ease 0.05s",
          transform: hovered ? "rotateX(0deg)" : "rotateX(-90deg)",
          opacity: hovered ? 1 : 0,
          backfaceVisibility: "hidden",
          color: skill.color,
        }}
      >
        {skill.langIcon}
      </div>
    </div>
  );
}

function ElementCard({ skill, index }: { skill: (typeof SKILLS)[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [bursts, setBursts] = useState<BurstParticle[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * 12,
      y: -((e.clientX - cx) / rect.width) * 12,
    });
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    // Toggle flip on click
    setFlipped((f) => !f);
    setBursts((b) => [...b, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, color: skill.color }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 700);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="perspective-1000 h-52 cursor-pointer relative"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Burst particles */}
      {bursts.map((b) => (
        <div key={b.id} className="absolute pointer-events-none" style={{ left: b.x, top: b.y }}>
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 animate-burst-ring"
            style={{ borderColor: b.color }}
          />
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: b.color }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i / 6) * Math.PI * 2) * 40,
                y: Math.sin((i / 6) * Math.PI * 2) * 40,
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}

      <div
        className="relative w-full h-full preserve-3d transition-transform duration-500"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl border flex flex-col items-center justify-center gap-3 p-4"
          style={{
            borderColor: `${skill.color}40`,
            background: `linear-gradient(135deg, #0d1b2a 0%, ${skill.color}15 100%)`,
            boxShadow: `0 0 20px ${skill.glow}`,
          }}
        >
          <IconSwap skill={skill} hovered={hovered} />
          <p className="font-cinzel text-sm tracking-wider text-parchment">
            {skill.name}
          </p>
          <span
            className="font-inter text-xs tracking-widest uppercase px-2 py-0.5 rounded"
            style={{ color: skill.color, border: `1px solid ${skill.color}40` }}
          >
            {skill.element}
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl border flex flex-col items-center justify-center gap-3 p-5"
          style={{
            borderColor: `${skill.color}60`,
            background: `linear-gradient(135deg, ${skill.color}15 0%, #0d1b2a 100%)`,
          }}
        >
          <p className="font-cinzel text-xs tracking-widest uppercase" style={{ color: "var(--color-text)", opacity: 0.6 }}>
            Proficiency
          </p>
          <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: "rgba(0,0,0,0.3)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              animate={flipped ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
          <p className="font-cinzel text-lg" style={{ color: skill.color }}>
            {skill.level}%
          </p>
          <p className="font-inter text-xs text-center leading-relaxed" style={{ color: "var(--color-text)", opacity: 0.6 }}>
            {skill.desc}
          </p>
          <pre
            className="font-mono text-[10px] leading-relaxed text-center w-full overflow-hidden"
            style={{ color: `${skill.color}99` }}
          >
            {skill.snippet}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="rune-divider mb-4">
            <span className="font-cinzel text-xs tracking-widest uppercase" style={{ color: "var(--color-primary)", opacity: 0.6 }}>
              Elemental Mastery
            </span>
          </div>
          <h2 className="section-heading">Skills &amp; Elements</h2>
          <p className="font-inter text-parchment/50 text-sm mt-3">
            Hover to reveal the language &mdash; click to flip and see proficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {SKILLS.map((skill, i) => (
            <ElementCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
