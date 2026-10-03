"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

/**
 * "Live coding stats" — data live dari WakAPI via route server
 * `app/api/wakapi/route.ts` (API key aman di env server).
 * Kalau WakAPI belum dikonfigurasi / error, otomatis fallback ke placeholder.
 */
type LangStat = { name: string; hours: number; color: string };
type LiveData = {
  weekHours: number;
  dailyAvgHours: number;
  totalHours: number | null;
  languages: LangStat[];
};

// Data placeholder — tampil selama data live belum tersedia.
const PLACEHOLDER: LiveData = {
  weekHours: 18.5,
  dailyAvgHours: 2.6,
  totalHours: 640,
  languages: [
    { name: "TypeScript", hours: 8.2, color: "#3178c6" },
    { name: "PHP", hours: 4.5, color: "#777bb4" },
    { name: "Python", hours: 3.1, color: "#3572a5" },
    { name: "CSS", hours: 2.7, color: "#a074c4" },
  ],
};

const fmt = (n: number) => n.toLocaleString("id-ID", { maximumFractionDigits: 1 });

export default function CodingStats() {
  const { t } = useLang();
  const [live, setLive] = useState<LiveData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/wakapi")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!cancelled && j && !j.error && typeof j.weekHours === "number") {
          setLive(j as LiveData);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const data = live ?? PLACEHOLDER;
  const maxHours = Math.max(...data.languages.map((l) => l.hours));
  const unit = t.codingStats.hoursUnit;

  const stats = [
    { label: t.codingStats.stat1, value: `${fmt(data.weekHours)} ${unit}` },
    { label: t.codingStats.stat2, value: `${fmt(data.dailyAvgHours)} ${unit}` },
    {
      label: t.codingStats.stat3,
      value: data.totalHours == null ? "–" : `${fmt(data.totalHours)} ${unit}`,
    },
  ];

  return (
    <section aria-label={t.codingStats.label} className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t.codingStats.eyebrow}</p>
        <h2 className="font-bold tracking-tight text-3xl md:text-4xl">
          {t.codingStats.titleA} <span className="text-gradient-cool">{t.codingStats.titleB}</span>
        </h2>
        <p className="mt-3 text-soft max-w-xl">
          {t.codingStats.desc}{" "}
          {live ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--emerald)_12%,transparent)] text-[var(--emerald)] border border-[color-mix(in_srgb,var(--emerald)_30%,transparent)] align-middle">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)] animate-pulse" aria-hidden="true" />
              LIVE · WakAPI
            </span>
          ) : (
            <span className="text-faint"> {t.codingStats.note}</span>
          )}
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass card-interactive accent-sky p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">{s.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 glass card-interactive accent-emerald p-6">
          <h3 className="font-semibold">{t.codingStats.langTitle}</h3>
          <div className="mt-5 space-y-4">
            {data.languages.map((l) => (
              <div key={l.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-mono">{l.name}</span>
                  <span className="text-soft font-mono text-xs">{l.hours} {unit}</span>
                </div>
                <div
                  className="h-2.5 rounded-full bg-[var(--ink)]/10 overflow-hidden"
                  role="img"
                  aria-label={`${l.name}: ${l.hours} ${unit}`}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(l.hours / maxHours) * 100}%`, background: l.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
