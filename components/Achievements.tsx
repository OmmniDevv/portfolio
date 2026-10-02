"use client";
import { BADGES, useAchievements, type BadgeId } from "@/lib/achievements";
import Reveal from "./Reveal";

/* Ikon SVG minimal per badge. */
function BadgeIcon({ id, locked }: { id: BadgeId; locked: boolean }) {
  const cls = locked ? "text-faint" : "text-white";
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: cls,
    "aria-hidden": true,
  } as const;
  switch (id) {
    case "sapa-mao":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "dua-sisi":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
    case "ninja-keyboard":
      return (
        <svg {...common}>
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M18 14h.01M9 14h6" />
        </svg>
      );
    case "penjelajah-bawah":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      );
    case "kode-rahasia":
      return (
        <svg {...common}>
          <path d="M12 2l2.4 5.3 5.6.7-4.1 3.9 1 5.6-4.9-2.7-4.9 2.7 1-5.6L4 7.9l5.6-.7L12 2z" />
        </svg>
      );
    case "penulis-pesan":
      return (
        <svg {...common}>
          <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
        </svg>
      );
  }
}

export default function Achievements() {
  const { unlocked, openedCount, totalCount, maoClicks } = useAchievements();

  return (
    <section id="pencapaian" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">Pencapaian</p>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="font-bold tracking-tight text-3xl md:text-4xl">
              Badge <span className="text-gradient">penjelajah</span>
            </h2>
            <p className="font-mono text-sm text-soft" aria-live="polite">
              <span className="text-gradient font-bold">{openedCount}/{totalCount}</span> badge terbuka
            </p>
          </div>
        </Reveal>

        {/* Progress bar */}
        <Reveal delay={80}>
          <div
            className="h-2 rounded-full bg-[var(--hairline)] overflow-hidden mb-10"
            role="progressbar"
            aria-valuenow={openedCount}
            aria-valuemin={0}
            aria-valuemax={totalCount}
            aria-label={`Progress badge: ${openedCount} dari ${totalCount} terbuka`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-700"
              style={{ width: `${(openedCount / totalCount) * 100}%` }}
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {BADGES.map((badge, i) => {
            const isOpen = Boolean(unlocked[badge.id]);
            const date = unlocked[badge.id]
              ? new Date(unlocked[badge.id]).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : null;
            return (
              <Reveal key={badge.id} delay={i * 60}>
                <div
                  className={`glass relative overflow-hidden p-5 md:p-6 text-center transition-transform hover:-translate-y-1 ${
                    isOpen ? "" : "opacity-70"
                  }`}
                >
                  <div
                    className={`mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center ${
                      isOpen
                        ? "bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[0_8px_24px_rgba(139,92,246,0.4)]"
                        : "bg-[var(--hairline)]"
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <BadgeIcon id={badge.id} locked={false} />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-faint" aria-hidden="true">
                        <rect x="4" y="10" width="16" height="10" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-bold text-ink text-sm md:text-base mb-1">
                    {isOpen ? badge.nama : "???"}
                  </h3>
                  <p className="text-xs text-soft leading-relaxed min-h-[36px]">
                    {isOpen ? badge.deskripsi : `Cara buka: ${badge.caraBuka}`}
                  </p>
                  {isOpen && date ? (
                    <p className="mt-2 font-mono text-[10px] text-faint">Terbuka {date}</p>
                  ) : badge.id === "sapa-mao" && maoClicks > 0 && maoClicks < 5 ? (
                    <p className="mt-2 font-mono text-[10px] text-faint" aria-live="polite">
                      {maoClicks}/5 klik
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
