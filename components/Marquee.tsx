"use client";
import { useLang } from "@/lib/i18n";

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "Node.js",
  "Python",
  "Docker",
  "PostgreSQL",
  "MySQL",
  "Git",
  "Linux",
  "Baileys",
  "REST API",
  "Figma",
];

/** Strip marquee tech stack — animasi CSS infinite, pause saat hover. */
export default function Marquee() {
  const { t } = useLang();
  // Duplikat 2x agar translateX(-50%) loop mulus tanpa lompatan.
  const items = [...STACK, ...STACK];

  return (
    <section aria-label={t.marquee.label} className="py-8 overflow-hidden border-y border-[var(--hairline)]">
      <div className="marquee-track flex w-max">
        {items.map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= STACK.length}
            className="glass rounded-full px-6 py-3 mr-4 font-mono text-sm text-soft whitespace-nowrap shrink-0"
          >
            {s}
          </span>
        ))}
      </div>
      <style jsx>{`
        .marquee-track {
          animation: marquee 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
