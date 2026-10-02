import Reveal from "./Reveal";

// PLACEHOLDER — ganti dengan sertifikat asli (course / lomba).
const CERTIFICATES = [
  {
    title: "Contoh: Web Development Bootcamp",
    issuer: "Contoh: Platform Course X",
    year: "2024",
    type: "Course",
  },
  {
    title: "Contoh: Lomba Web Design Tingkat Kota",
    issuer: "Contoh: Penyelenggara Y",
    year: "2024",
    type: "Lomba",
  },
  {
    title: "Contoh: JavaScript Algorithms",
    issuer: "Contoh: Platform Course Z",
    year: "2025",
    type: "Course",
  },
  {
    title: "Contoh: Hackathon Pelajar",
    issuer: "Contoh: Komunitas W",
    year: "2025",
    type: "Lomba",
  },
];

export default function Certificates() {
  return (
    <section id="sertifikat" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">Sertifikat</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            Course &amp; lomba
          </h2>
          <p className="text-faint mt-4 text-center max-w-lg mx-auto text-sm leading-relaxed">
            Daftar di bawah ini masih contoh placeholder — ganti dengan sertifikat asli.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATES.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <div className="glass p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-primary border border-[color-mix(in_srgb,var(--primary)_25%,transparent)]">
                    {c.type}
                  </span>
                  <span className="font-mono text-xs text-faint">{c.year}</span>
                </div>
                <h3 className="font-bold text-ink leading-snug flex-1">{c.title}</h3>
                <p className="text-soft text-sm mt-2">{c.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
