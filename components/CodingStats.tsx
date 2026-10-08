"use client";
import { useLang } from "@/lib/i18n";
import stats from "@/lib/repo-stats.json";

/**
 * "Coding stats", dihitung dari analisis repo publik GitHub.
 * Data statis di lib/repo-stats.json, regenerate via:
 *   ~/workspace/bin/update-repo-stats
 */
type Lang = { name: string; bytes: number; percent: number; color: string };
const data = stats as {
  generated: string;
  method: string;
  totalHours: number;
  totalRepos: number;
  totalCommits: number;
  languages: Lang[];
};

const fmt = (n: number) => n.toLocaleString("id-ID");

/** Ringkasan keahlian dari distribusi bahasa, ditulis manual dari hasil analisis. */
function skillSummary(lang: string, t: any): string {
  return t.codingStats.skills[lang] ?? "";
}

export default function CodingStats() {
  const { t } = useLang();
  const top = data.languages.slice(0, 6);
  const maxPercent = Math.max(...top.map((l) => l.percent));

  const cards = [
    { label: t.codingStats.stat1, value: `${fmt(data.totalHours)} ${t.codingStats.hoursUnit}` },
    { label: t.codingStats.stat2, value: fmt(data.totalRepos) },
    { label: t.codingStats.stat3, value: fmt(data.totalCommits) },
  ];

  return (
    <section aria-label={t.codingStats.label} className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t.codingStats.eyebrow}</p>
        <h2 className="font-bold tracking-tight text-3xl md:text-4xl">
          {t.codingStats.titleA} <span className="text-gradient-cool">{t.codingStats.titleB}</span>
        </h2>
        <p className="mt-3 text-soft max-w-xl">
          {t.codingStats.desc}
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {cards.map((s) => (
            <div key={s.label} className="glass card-interactive accent-sky p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">{s.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 glass card-interactive accent-emerald p-6">
          <h3 className="font-semibold">{t.codingStats.langTitle}</h3>
          <div className="mt-5 space-y-4">
            {top.map((l) => (
              <div key={l.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-mono">{l.name}</span>
                  <span className="text-soft font-mono text-xs">{l.percent}%</span>
                </div>
                <div
                  className="h-2.5 rounded-full bg-[var(--ink)]/10 overflow-hidden"
                  role="img"
                  aria-label={`${l.name}: ${l.percent}%`}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(l.percent / maxPercent) * 100}%`, background: l.color }}
                  />
                </div>
                {skillSummary(l.name, t) && (
                  <p className="mt-1.5 text-xs text-faint leading-relaxed">{skillSummary(l.name, t)}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-faint leading-relaxed border-t border-[var(--hairline)] pt-4">
            {t.codingStats.updated}: {data.generated}
          </p>
        </div>
      </div>
    </section>
  );
}
