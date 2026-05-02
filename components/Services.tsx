"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SERVICES = [
  {
    title: "Web Development",
    desc: "Custom websites, landing pages, and dashboards built with modern frameworks. Responsive, fast, and production-ready.",
    color: "#C8A96E",
    element: "Geo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    sigil: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <polygon points="40,5 75,62 5,62" stroke="#C8A96E" strokeWidth="1" opacity="0.3" />
        <polygon points="40,20 62,55 18,55" stroke="#C8A96E" strokeWidth="0.5" opacity="0.2" />
        <circle cx="40" cy="40" r="8" stroke="#C8A96E" strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),
  },
  {
    title: "Telegram Bot",
    desc: "Feature-rich Telegram bots with Node.js and TypeScript. Inline keyboards, webhooks, and custom command handlers.",
    color: "#4FC3F7",
    element: "Hydro",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    sigil: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <circle cx="40" cy="40" r="30" stroke="#4FC3F7" strokeWidth="1" opacity="0.2" />
        <circle cx="40" cy="40" r="20" stroke="#4FC3F7" strokeWidth="0.5" opacity="0.15" />
        <path d="M40 10 Q70 40 40 70 Q10 40 40 10" stroke="#4FC3F7" strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),
  },
  {
    title: "WhatsApp Bot",
    desc: "Baileys-based WhatsApp automation bots. Multi-session support, media handling, and custom command systems.",
    color: "#74C69D",
    element: "Anemo",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    sigil: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <path d="M40 10 C60 10 70 30 70 40 C70 50 60 70 40 70 C20 70 10 50 10 40 C10 30 20 10 40 10" stroke="#74C69D" strokeWidth="1" opacity="0.2" />
        <path d="M40 20 C55 20 60 32 60 40 C60 48 55 60 40 60 C25 60 20 48 20 40 C20 32 25 20 40 20" stroke="#74C69D" strokeWidth="0.5" opacity="0.15" />
      </svg>
    ),
  },
  {
    title: "Discord Bot",
    desc: "Discord.js bots with slash commands, role management, music, moderation, and custom event handlers.",
    color: "#9B72CF",
    element: "Electro",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.132 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    ),
    sigil: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        <path d="M20 20 L60 20 L60 60 L20 60 Z" stroke="#9B72CF" strokeWidth="1" opacity="0.2" />
        <path d="M30 30 L50 30 L50 50 L30 50 Z" stroke="#9B72CF" strokeWidth="0.5" opacity="0.15" />
        <line x1="20" y1="40" x2="60" y2="40" stroke="#9B72CF" strokeWidth="0.5" opacity="0.15" />
        <line x1="40" y1="20" x2="40" y2="60" stroke="#9B72CF" strokeWidth="0.5" opacity="0.15" />
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: (typeof SERVICES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="vision-card p-6 relative overflow-hidden group"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px ${service.color}25` : undefined,
        borderColor: hovered ? `${service.color}60` : undefined,
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Animated sigil background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transform: hovered ? "rotate(30deg) scale(1.1)" : "rotate(0deg) scale(1)",
          transition: "transform 1.5s ease",
          opacity: hovered ? 0.6 : 0.3,
        }}
      >
        {service.sigil}
      </div>

      {/* Glowing border pulse on hover */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none animate-pulse-glow"
          style={{ boxShadow: `inset 0 0 20px ${service.color}20` }}
        />
      )}

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div style={{ color: service.color }}>{service.icon}</div>
          <span
            className="font-cinzel text-xs tracking-widest uppercase px-2 py-0.5 rounded border"
            style={{ color: service.color, borderColor: `${service.color}40` }}
          >
            Commission
          </span>
        </div>

        <div>
          <h3 className="font-cinzel text-base text-parchment mb-2 group-hover:text-gold transition-colors">
            {service.title}
          </h3>
          <p className="font-inter text-parchment/60 text-sm leading-relaxed">
            {service.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: service.color }}
          />
          <span
            className="font-cinzel text-xs tracking-wider"
            style={{ color: service.color }}
          >
            {service.element} Element
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="rune-divider mb-4">
            <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
              Commission Board
            </span>
          </div>
          <h2 className="section-heading">Services</h2>
          <p className="font-inter text-parchment/50 text-sm mt-3">
            Available for freelance commissions &mdash; open to new quests
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
