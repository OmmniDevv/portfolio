import Reveal from "./Reveal";

const MILESTONES = [
  { year: "2023", title: "Masuk SMKN 7 Baleendah", desc: "Mulai belajar programming dengan serius di bangku SMK." },
  { year: "2024", title: "Mendalami bot development", desc: "Fokus ke bot WhatsApp, Telegram, dan Discord dengan Node.js dan TypeScript." },
  { year: "2025", title: "Terjun ke freelance", desc: "Mulai mengerjakan project untuk klien: website dan bot automasi." },
  { year: "2026", title: "Portfolio & Perpus-Online", desc: "Merilis website portfolio ini dan sistem perpustakaan Laravel untuk sekolah." },
  { year: "Kini", title: "Kelas XII", desc: "Tahun terakhir SMK. Terbuka untuk freelance dan kolaborasi.", now: true },
];

export default function Journey() {
  return (
    <section id="perjalanan" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">Perjalanan</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            Dari awal sampai kini
          </h2>
        </Reveal>

        <ol className="mt-12 relative border-l-2 border-[color-mix(in_srgb,var(--primary)_25%,transparent)] ml-2 flex flex-col gap-10">
          {MILESTONES.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 60} className="relative pl-8">
              <span
                aria-hidden="true"
                className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-paper ${
                  m.now ? "bg-primary border-primary shadow-[0_0_0_4px_rgba(139,92,246,0.2)]" : "border-[color-mix(in_srgb,var(--primary)_45%,transparent)]"
                }`}
              />
              <p className="font-mono text-xs font-semibold text-primary mb-1.5">{m.year}</p>
              <h3 className="font-bold text-lg text-ink mb-1.5">{m.title}</h3>
              <p className="text-soft text-[15px] leading-relaxed">{m.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
