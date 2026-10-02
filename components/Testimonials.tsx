import Reveal from "./Reveal";

// PLACEHOLDER — ganti dengan testimoni asli dari klien.
// Jangan tampilkan testimoni palsu seolah-olah asli.
const TESTIMONIALS = [
  {
    name: "Klien A",
    role: "Pemilik UMKM Kuliner",
    quote:
      "Contoh: website company profile-nya rapi dan cepat. Order via WhatsApp jadi lebih gampang sejak punya web sendiri.",
  },
  {
    name: "Klien B",
    role: "Admin Toko Online",
    quote:
      "Contoh: bot WhatsApp-nya ngebantu banget buat auto-reply orderan. Kerjaan admin kepangkas setengah.",
  },
  {
    name: "Klien C",
    role: "Pengurus Organisasi Sekolah",
    quote:
      "Contoh: dashboard datanya gampang dipakai walau bukan orang IT. Revisinya juga responsif.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">Testimoni</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            Kata mereka
          </h2>
          <p className="text-faint mt-4 text-center max-w-lg mx-auto text-sm leading-relaxed">
            Testimoni di bawah ini masih contoh placeholder — akan diganti dengan
            testimoni asli dari klien.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="glass p-8 h-full flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-widest text-faint border border-[var(--hairline)] rounded-full px-3 py-1 w-fit mb-5">
                  Contoh
                </span>
                <blockquote className="text-soft leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-[var(--hairline)]">
                  <p className="font-bold text-ink">{t.name}</p>
                  <p className="font-mono text-xs text-faint mt-1">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
