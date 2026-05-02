"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CHARACTERS = [
  {
    name: "Hu Tao",
    slug: "hu-tao",
    element: "Pyro",
    color: "#EF9A9A",
    glow: "rgba(239,154,154,0.5)",
    weapon: "Polearm",
    quote: "Life and death are like day and night — one cannot exist without the other.",
  },
  {
    name: "Raiden Shogun",
    slug: "raiden",
    element: "Electro",
    color: "#9B72CF",
    glow: "rgba(155,114,207,0.5)",
    weapon: "Polearm",
    quote: "Eternity is not a destination — it is the journey itself.",
  },
  {
    name: "Kazuha",
    slug: "kazuha",
    element: "Anemo",
    color: "#74C69D",
    glow: "rgba(116,198,157,0.5)",
    weapon: "Sword",
    quote: "The wind carries no regrets — only the scent of distant shores.",
  },
  {
    name: "Zhongli",
    slug: "zhongli",
    element: "Geo",
    color: "#C8A96E",
    glow: "rgba(200,169,110,0.5)",
    weapon: "Polearm",
    quote: "Contracts are the foundation upon which civilization is built.",
  },
];

type Character = (typeof CHARACTERS)[0];

function CharCard({ char, onClick }: { char: Character; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const src = `https://genshin.jmp.blue/characters/${char.slug}/gacha-splash`;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-xl overflow-hidden flex-shrink-0"
      style={{
        width: 160,
        height: 280,
        border: `1px solid ${char.color}50`,
        boxShadow: `0 0 0 rgba(0,0,0,0)`,
        background: `linear-gradient(160deg, #0d1b2a 0%, ${char.color}20 100%)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${char.glow}`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${char.color}90`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        (e.currentTarget as HTMLDivElement).style.borderColor = `${char.color}50`;
      }}
    >
      {imgError ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-cinzel text-xs text-center px-2" style={{ color: char.color }}>
            {char.name}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={`${char.name} — ${char.element} character from Genshin Impact`}
          fill
          className="object-cover object-top transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      {/* Bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
      >
        <p className="font-cinzel text-xs text-parchment tracking-wide">{char.name}</p>
        <span
          className="font-inter text-[10px] tracking-widest uppercase"
          style={{ color: char.color }}
        >
          {char.element}
        </span>
      </div>
    </motion.div>
  );
}

function CharModal({ char, onClose }: { char: Character; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const src = `https://genshin.jmp.blue/characters/${char.slug}/gacha-splash`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row max-w-2xl w-full"
        style={{
          background: `linear-gradient(135deg, #0d1b2a 0%, ${char.color}15 100%)`,
          border: `1px solid ${char.color}60`,
          boxShadow: `0 0 60px ${char.glow}`,
        }}
      >
        {/* Art */}
        <div className="relative w-full md:w-64 h-80 md:h-auto flex-shrink-0">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center" style={{ background: `${char.color}20` }}>
              <span className="font-cinzel text-sm" style={{ color: char.color }}>{char.name}</span>
            </div>
          ) : (
            <Image
              src={src}
              alt={`${char.name} gacha splash art`}
              fill
              className="object-cover object-top"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-4 p-8">
          <div>
            <p className="font-cinzel text-xs tracking-widest uppercase mb-1" style={{ color: char.color }}>
              {char.element} &mdash; {char.weapon}
            </p>
            <h3 className="font-cinzel text-2xl text-parchment">{char.name}</h3>
          </div>
          <blockquote className="font-inter text-sm text-parchment/70 italic leading-relaxed border-l-2 pl-4" style={{ borderColor: char.color }}>
            &ldquo;{char.quote}&rdquo;
          </blockquote>
          <button
            onClick={onClose}
            className="font-cinzel text-xs tracking-widest uppercase self-start mt-2 transition-colors"
            style={{ color: `${char.color}80` }}
          >
            Dismiss
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PartyMembers() {
  const [selected, setSelected] = useState<Character | null>(null);

  return (
    <div className="mt-12">
      {/* Label */}
      <div className="rune-divider mb-6">
        <span className="font-cinzel text-xs text-gold/60 tracking-widest uppercase whitespace-nowrap">
          Party Members
        </span>
      </div>

      {/* Cards row */}
      <div className="flex gap-4 justify-center flex-wrap">
        {CHARACTERS.map((char) => (
          <CharCard key={char.slug} char={char} onClick={() => setSelected(char)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <CharModal char={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
