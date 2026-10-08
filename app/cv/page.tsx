"use client";

/**
 * Halaman CV, rapi untuk dibaca di layar & di-print ke PDF via tombol di bawah
 * (File > Print > Save as PDF). Tidak ada file cv.pdf statis; halaman ini penggantinya.
 *
 * TODO: sesuaikan isi (email, nomor HP, pengalaman, proyek) dengan data asli kamu.
 */
const CV = {
  name: "Abdul Malik Rizky Nur Rahmat",
  title: "Junior Web Developer",
  location: "Bandung, Indonesia",
  email: "halo@omnidevv.vercel.app", // TODO: ganti email asli
  phone: "+62 8xx-xxxx-xxxx", // TODO: ganti nomor asli
  website: "omnidevv.vercel.app",
  github: "github.com/OmmniDevv",
  summary:
    "Pelajar SMK kelas XII yang fokus pada pengembangan web dan bot automasi. Berpengalaman membangun website company profile, dashboard, serta bot WhatsApp/Telegram/Discord untuk automasi bisnis. Terbiasa bekerja cepat, rapi, dan terbiasa dengan alur deploy modern.",
  education: [
    {
      school: "SMKN 7 Baleendah",
      period: "2023–2026",
      detail: "Kelas XII, mulai programming serius sejak masuk SMK.",
    },
  ],
  skills: [
    { group: "Frontend", items: "Next.js, React, TypeScript, Tailwind CSS" },
    { group: "Backend", items: "Node.js, Laravel, PHP, REST API" },
    { group: "Bot & Automasi", items: "Baileys (WhatsApp), Telegram Bot API, Discord.js" },
    { group: "Tools", items: "Git, Docker, Linux, PostgreSQL, MySQL" },
  ],
  experience: [
    {
      role: "Freelance Web & Bot Developer",
      period: "2025–Sekarang",
      points: [
        "Mengerjakan project website dan bot automasi untuk klien.",
        "Membangun bot WhatsApp (Baileys) dengan fitur notifikasi & auto-reply.",
      ],
    },
    {
      role: "Perpus-Online: Sistem Perpustakaan Sekolah",
      period: "2026",
      points: [
        "Aplikasi Laravel untuk sirkulasi, denda, dan laporan perpustakaan.",
        "Fitur: notifikasi WhatsApp H-0, audit log, backup otomatis, export Excel.",
      ],
    },
  ],
  projects: [
    "Portfolio pribadi (Next.js + Live2D), omnidevv.vercel.app",
    "Perpus-Online, sistem perpustakaan Laravel (github.com/OmmniDevv/Perpus-Online)",
  ],
};

export default function CvPage() {
  return (
    <div className="min-h-screen px-6 pt-28 pb-16">
      <style jsx global>{`
        @media print {
          header,
          .ground,
          .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        <div className="no-print mb-8 flex flex-wrap gap-3">
          <button onClick={() => window.print()} className="btn-primary !min-h-[44px] !px-6 text-sm">
            Print / Simpan PDF
          </button>
          <a href="/" className="btn-ghost !min-h-[44px] !px-6 text-sm">
            Kembali
          </a>
        </div>

        <article className="glass p-6 md:p-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{CV.name}</h1>
            <p className="mt-1 text-gradient font-semibold">{CV.title}</p>
            <p className="mt-4 font-mono text-xs text-soft leading-relaxed">
              {CV.location} · {CV.email} · {CV.phone}
              <br />
              {CV.website} · {CV.github}
            </p>
          </div>

          <section className="mt-8">
            <h2 className="eyebrow mb-3">Ringkasan</h2>
            <p className="text-soft leading-relaxed">{CV.summary}</p>
          </section>

          <section className="mt-8">
            <h2 className="eyebrow mb-3">Pendidikan</h2>
            {CV.education.map((e) => (
              <div key={e.school} className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-semibold">{e.school}</p>
                  <p className="text-soft text-sm mt-1">{e.detail}</p>
                </div>
                <p className="font-mono text-xs text-faint">{e.period}</p>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="eyebrow mb-3">Keahlian</h2>
            <dl className="space-y-2">
              {CV.skills.map((s) => (
                <div key={s.group} className="flex gap-3 text-sm">
                  <dt className="w-28 shrink-0 font-semibold">{s.group}</dt>
                  <dd className="text-soft">{s.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-8">
            <h2 className="eyebrow mb-3">Pengalaman</h2>
            <div className="space-y-6">
              {CV.experience.map((x) => (
                <div key={x.role}>
                  <div className="flex flex-wrap justify-between gap-2">
                    <p className="font-semibold">{x.role}</p>
                    <p className="font-mono text-xs text-faint">{x.period}</p>
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-soft space-y-1">
                    {x.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="eyebrow mb-3">Proyek Pilihan</h2>
            <ul className="list-disc pl-5 text-sm text-soft space-y-1">
              {CV.projects.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
