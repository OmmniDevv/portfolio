"use client";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Achievements() {
  const { t } = useLang();

  // NOTE: Data contoh — ganti dengan prestasi lomba asli.
  // Format: { juara, lomba, penyelenggara, tahun, deskripsi }
  const PRESTASI = [
    { ...t.achievements.item1, tahun: "2025" },
    { ...t.achievements.item2, tahun: "2025" },
    { ...t.achievements.item3, tahun: "2024" },
    { ...t.achievements.item4, tahun: "2024" },
    { ...t.achievements.item5, tahun: "2024" },
    { ...t.achievements.item6, tahun: "2023" },
  ];

/* Warna medali per peringkat. */
function medalClass(juara: string) {
  if (juara.includes("1") && !juara.includes("Harapan")) return "from-amber-300 to-yellow-500";
  if (juara.includes("2")) return "from-slate-200 to-slate-400";
  if (juara.includes("3")) return "from-orange-300 to-amber-600";
  return "from-[var(--primary)] to-[var(--accent)]";
}

  return (
    <section id="pencapaian" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.achievements.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            {t.achievements.titleA} <span className="text-gradient">{t.achievements.titleB}</span>
          </h2>
          <p className="text-faint mt-4 text-center max-w-lg mx-auto text-sm leading-relaxed">
            {t.achievements.desc}
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRESTASI.map((p, i) => (
            <Reveal key={`${p.lomba}-${p.tahun}`} delay={(i % 3) * 80}>
              <article className="glass p-7 h-full flex flex-col transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`font-mono text-[11px] font-bold uppercase tracking-widest text-white bg-gradient-to-br ${medalClass(p.juara)} rounded-full px-3 py-1.5`}
                  >
                    {p.juara}
                  </span>
                  <span className="font-mono text-xs text-faint">{p.tahun}</span>
                </div>
                <h3 className="font-bold text-ink text-lg leading-snug">{p.lomba}</h3>
                <p className="font-mono text-xs text-faint mt-1">{p.penyelenggara}</p>
                <p className="text-soft text-sm leading-relaxed mt-4 flex-1">{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
