import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Learn · OmniDev",
  description:
    "learn.omnidevv.biz.id — web tutorial, dokumentasi, dan troubleshooting ngoding dari OmniDev: HTML/CSS, JavaScript, Next.js, Laravel, Flutter. Gratis, dengan playground interaktif.",
};

const LEARN_URL = "https://learn.omnidevv.biz.id";
const REPO_URL = "https://github.com/OmmniDevv/OmniCode";

/* Ikon SVG inline — portfolio tidak pakai icon library */
function Icon({ d }: { d: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-primary"
    >
      <path d={d} />
    </svg>
  );
}

const FITUR = [
  {
    d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
    judul: "10 Modul Tutorial",
    deskripsi:
      "HTML/CSS, JavaScript, Next.js + TypeScript, Laravel + PHP, sampai Flutter + Dart — tersusun dari dasar sampai praktik.",
  },
  {
    d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
    judul: "Troubleshooting & Error",
    deskripsi:
      "Artikel bedah error: gejala/log, akar penyebab, dan solusi langkah demi langkah — mis. CORS Laravel, hydration mismatch.",
  },
  {
    d: "M6 3h12l4 6-4 6H6l-4-6 4-6zM12 9v6M9 12h6",
    judul: "Playground Sandbox",
    deskripsi:
      "Coba kode langsung di browser: editor Sandpack untuk web, DartPad embed untuk Flutter. Tanpa install apa pun.",
  },
  {
    d: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
    judul: "Pencarian Instan",
    deskripsi:
      "Tekan Ctrl/⌘ + K untuk mencari semua tutorial dan artikel dalam sekejap — ala command palette.",
  },
  {
    d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z",
    judul: "Mode Gelap & Terang",
    deskripsi:
      "Ganti tema kapan pun dari navbar. Pilihanmu tersimpan otomatis di browser.",
  },
  {
    d: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    judul: "Open Source",
    deskripsi:
      "Seluruh source terbuka di GitHub. Temu yang kurang tepat? Kirim PR, Kana review dengan senang hati.",
  },
];

const MODUL = [
  "HTML & CSS",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "PHP & Laravel",
  "Dart & Flutter",
  "Git",
  "REST API",
];

const STATS = [
  { angka: "10", label: "Modul tutorial" },
  { angka: "3+", label: "Artikel troubleshooting" },
  { angka: "2", label: "Playground interaktif" },
  { angka: "100%", label: "Gratis selamanya" },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <Reveal>
          <p className="eyebrow mb-6">learn.omnidevv.biz.id</p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            Belajar ngoding,
            <br />
            <span className="text-gradient">langsung praktik.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-soft">
            OmniCode adalah web dokumentasi, tutorial interaktif, dan basis pengetahuan
            troubleshooting yang kubangun dari pengalaman ngoding sehari-hari — HTML/CSS,
            JavaScript, Next.js, Laravel, sampai Flutter. Semua gratis, semua bisa dicoba
            langsung di browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={LEARN_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Buka Learn
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              Lihat Source di GitHub
            </a>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={100}>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass p-5 text-center">
                <p className="font-display text-3xl font-bold text-gradient">{s.angka}</p>
                <p className="mt-1 text-sm text-soft">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Fitur */}
        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Yang ada di <span className="text-gradient">dalamnya</span>
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FITUR.map((f, i) => (
            <Reveal key={f.judul} delay={i * 60}>
              <div className="glass card-interactive h-full p-6">
                <Icon d={f.d} />
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{f.judul}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-soft">{f.deskripsi}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Modul */}
        <Reveal>
          <h2 className="mt-20 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Topik yang <span className="text-gradient">dibahas</span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {MODUL.map((m) => (
              <span key={m} className="badge badge-tech !text-[13px] !px-4 !py-2">
                {m}
              </span>
            ))}
          </div>
        </Reveal>

        {/* CTA akhir */}
        <Reveal>
          <div className="glass-strong mt-20 p-8 text-center md:p-12">
            <p className="eyebrow mb-4">Mulai sekarang</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
              Error hari ini, <span className="text-gradient">bisa jadi ilmu</span> besok.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-soft">
              Setiap error yang pernah bikin pusing, kudokumentasikan biar kamu nggak perlu
              pusing dua kali.
            </p>
            <a
              href={LEARN_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-8"
            >
              Jelajahi learn.omnidevv.biz.id
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
            <p className="mt-6 text-sm text-faint">
              Atau kembali ke <Link href="/" className="text-primary hover:underline">beranda portfolio</Link>
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
