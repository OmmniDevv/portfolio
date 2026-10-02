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
    <section id="perjalanan" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">Perjalanan</p>
          <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
            Dari awal sampai kini
          </h2>
        </Reveal>

        <ol className="mt-12 relative border-l border-white/10 ml-2 flex flex-col gap-10">
          {MILESTONES.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 60} className="relative pl-8">
              <span
                aria-hidden="true"
                className={`absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 ${
                  m.now ? "bg-accent border-accent" : "bg-ink border-faint"
                }`}
              />
              <p className="font-mono text-xs text-accent mb-1.5">{m.year}</p>
              <h3 className="font-display font-semibold text-mist mb-1.5">{m.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{m.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
