import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Now · OmniDev",
  description: "Lagi ngapain sekarang: project aktif, fokus belajar, dan tontonan.",
};

/* ================================
   EDIT DI SINI: semua data halaman Now.
   Update tiap beberapa minggu biar tetap fresh.
================================ */
const NOW = {
  updated: "Oktober 2026",
  status: "Kelas XII · terbuka untuk freelance",
  fokus: [
    "Menyelesaikan portfolio ini (Live2D, dark mode, case study)",
    "Persiapan TKA & Ujian Sekolah",
    "Belajar TypeScript lebih dalam via project bot",
  ],
  projectAktif: [
    {
      nama: "Portfolio v3",
      deskripsi: "Rebuild total: glassmorphism, Live2D Mao, dark/light mode.",
      status: "90%",
    },
    {
      nama: "Perpus-Online",
      deskripsi: "Sistem perpustakaan Laravel untuk sekolah: notifikasi WA, export Excel.",
      status: "Maintenance",
    },
  ],
  belajar: ["Next.js App Router", "Live2D Cubism SDK", "Bahasa Jepang (N5)"],
  anime: [
    { judul: "Frieren: Beyond Journey's End", catatan: "rewatch santai" },
    { judul: "Apothecary Diaries S2", catatan: "ongoing" },
  ],
  musik: "Playlist lo-fi + LiSA buat nemenin ngoding",
  catatan:
    "Lagi di fase sibuk-sibuknya: sekolah, freelance, dan ngoprek. Balasan chat mungkin agak lama, tapi project tetap jalan.",
};

export default function NowPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Now</p>
          <h1 className="font-display font-bold tracking-tight text-4xl md:text-5xl text-ink leading-tight">
            Lagi <span className="text-gradient">ngapain</span> sekarang?
          </h1>
          <p className="mt-4 text-soft leading-relaxed">
            Halaman ini update manual. Snapshot singkat kesibukanku saat ini.
          </p>
          <p className="mt-3 font-mono text-xs text-faint">
            terakhir update: {NOW.updated} · {NOW.status}
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          <Reveal delay={80}>
            <section className="glass p-6 md:p-8" aria-label="Fokus saat ini">
              <h2 className="font-display font-bold text-lg text-ink mb-4">🎯 Fokus</h2>
              <ul className="space-y-3">
                {NOW.fokus.map((f) => (
                  <li key={f} className="flex gap-3 text-soft leading-relaxed">
                    <span className="text-primary shrink-0" aria-hidden="true">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={120}>
            <section className="glass p-6 md:p-8" aria-label="Project aktif">
              <h2 className="font-display font-bold text-lg text-ink mb-4">🛠️ Project aktif</h2>
              <div className="space-y-4">
                {NOW.projectAktif.map((p) => (
                  <div key={p.nama} className="border border-[var(--hairline)] rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display font-semibold text-ink">{p.nama}</p>
                      <span className="font-mono text-xs text-faint shrink-0">{p.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-soft leading-relaxed">{p.deskripsi}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={160}>
            <section className="glass p-6 md:p-8" aria-label="Sedang dipelajari">
              <h2 className="font-display font-bold text-lg text-ink mb-4">📚 Lagi dipelajari</h2>
              <div className="flex flex-wrap gap-2">
                {NOW.belajar.map((b) => (
                  <span
                    key={b}
                    className="font-mono text-xs px-3 py-1.5 rounded-full border border-[var(--hairline)] text-soft"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={200}>
            <section className="glass p-6 md:p-8" aria-label="Tontonan">
              <h2 className="font-display font-bold text-lg text-ink mb-4">📺 Tontonan</h2>
              <ul className="space-y-3">
                {NOW.anime.map((a) => (
                  <li key={a.judul} className="flex items-baseline justify-between gap-3">
                    <span className="text-soft">{a.judul}</span>
                    <span className="font-mono text-xs text-faint shrink-0">{a.catatan}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-faint">🎧 {NOW.musik}</p>
            </section>
          </Reveal>

          <Reveal delay={240}>
            <p className="text-soft leading-relaxed border-l-2 border-[color-mix(in_srgb,var(--primary)_65%,transparent)] pl-5 italic">
              {NOW.catatan}
            </p>
          </Reveal>
        </div>

        <Reveal delay={280}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/" className="btn-ghost text-sm">← Beranda</Link>
            <Link href="/#kontak" className="btn-primary text-sm">Hubungi saya</Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
