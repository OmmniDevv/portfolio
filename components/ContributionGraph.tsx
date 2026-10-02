"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type DayCount = { date: string; count: number };

// Heatmap kontribusi ala GitHub, data dari public events API (tanpa auth).
// Dibangun sendiri biar nggak tergantung service pihak ketiga yang bisa mati.
const WEEKS = 20;

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildWeeks(counts: Map<string, number>): DayCount[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // mulai dari hari Minggu, WEEKS minggu ke belakang
  const start = new Date(today);
  start.setDate(start.getDate() - ((WEEKS - 1) * 7 + today.getDay()));

  const weeks: DayCount[][] = [];
  const cur = new Date(start);
  for (let w = 0; w < WEEKS; w++) {
    const week: DayCount[] = [];
    for (let d = 0; d < 7; d++) {
      const iso = toISODate(cur);
      week.push({ date: iso, count: counts.get(iso) ?? 0 });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function levelColor(count: number): string {
  if (count === 0) return "rgba(200,169,110,0.08)";
  if (count <= 2) return "rgba(200,169,110,0.3)";
  if (count <= 5) return "rgba(200,169,110,0.55)";
  if (count <= 9) return "rgba(200,169,110,0.8)";
  return "#C8A96E";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export default function ContributionGraph() {
  const [counts, setCounts] = useState<Map<string, number> | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const map = new Map<string, number>();
        let sum = 0;
        // ambil 3 halaman events publik (maks ~90 hari ke belakang)
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(
            `https://api.github.com/users/OmmniDevv/events/public?per_page=100&page=${page}`
          );
          if (!res.ok) throw new Error("fetch failed");
          const events = await res.json();
          if (!Array.isArray(events) || events.length === 0) break;
          for (const e of events) {
            const day = (e.created_at as string).slice(0, 10);
            let n = 0;
            if (e.type === "PushEvent") n = (e.payload?.commits?.length as number) || 1;
            else if (e.type === "PullRequestEvent" || e.type === "IssuesEvent") n = 2;
            else if (e.type === "CreateEvent" || e.type === "ForkEvent") n = 1;
            else continue;
            map.set(day, (map.get(day) ?? 0) + n);
            sum += n;
          }
        }
        if (!cancelled) {
          setCounts(map);
          setTotal(sum);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => (counts ? buildWeeks(counts) : null), [counts]);

  // label bulan di atas kolom minggu
  const monthLabels = useMemo(() => {
    if (!weeks) return [];
    const labels: { week: number; text: string }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const m = new Date(week[0].date).getMonth();
      if (m !== lastMonth) {
        labels.push({ week: wi, text: MONTHS[m] });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div>
      <p className="font-cinzel text-xs text-gold/50 tracking-widest uppercase text-center mb-4">
        Contribution Activity <span className="font-jp text-gold/40">・貢献</span>
      </p>
      <div className="rounded-xl border border-gold/20 bg-navy/40 p-4 md:p-6 overflow-x-auto">
        {failed ? (
          <p className="font-inter text-parchment/40 text-sm text-center py-6">
            Gagal memuat data kontribusi. Cek langsung di{" "}
            <a
              href="https://github.com/OmmniDevv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        ) : !weeks ? (
          <div className="flex gap-[3px] justify-center py-4" aria-label="Loading">
            {Array.from({ length: WEEKS }).map((_, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, d) => (
                  <div
                    key={d}
                    className="w-[10px] h-[10px] rounded-[2px] bg-gold/10 animate-pulse"
                    style={{ animationDelay: `${(w * 7 + d) * 12}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-[3px] mb-1 ml-[28px]">
              {weeks.map((_, wi) => {
                const lbl = monthLabels.find((l) => l.week === wi);
                return (
                  <span
                    key={wi}
                    className="font-inter text-[10px] text-parchment/40 w-[10px] shrink-0 overflow-visible whitespace-nowrap"
                  >
                    {lbl ? lbl.text : ""}
                  </span>
                );
              })}
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col gap-[3px] justify-between py-[1px] shrink-0">
                {["Min", "", "Rab", "", "Jum", "", ""].map((d, i) => (
                  <span key={i} className="font-inter text-[10px] text-parchment/40 h-[10px] leading-[10px]">
                    {d}
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.date}: ${day.count} kontribusi`}
                        className="w-[10px] h-[10px] rounded-[2px] transition-transform hover:scale-125 cursor-default"
                        style={{ backgroundColor: levelColor(day.count) }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="font-inter text-xs text-parchment/50">
                {total !== null ? (
                  <>
                    <span className="text-gold font-semibold">{total}</span> kontribusi (90 hari terakhir)
                  </>
                ) : (
                  "Memuat..."
                )}
              </span>
              <div className="flex items-center gap-1">
                <span className="font-inter text-[10px] text-parchment/40 mr-1">Less</span>
                {[0, 1, 4, 7, 12].map((c) => (
                  <div
                    key={c}
                    className="w-[10px] h-[10px] rounded-[2px]"
                    style={{ backgroundColor: levelColor(c) }}
                  />
                ))}
                <span className="font-inter text-[10px] text-parchment/40 ml-1">More</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
