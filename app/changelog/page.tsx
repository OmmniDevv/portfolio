import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Changelog · OmniDev",
  description: "Riwayat update website portfolio ini — bukti web-nya hidup.",
};

/* ————————————————————————————————
   EDIT DI SINI: tambah entri baru di ATAS
   tiap kali ada update yang layak dicatat.
   Format tanggal: YYYY-MM-DD
———————————————————————————————— */
type Entry = {
  date: string;
  title: string;
  detail: string;
  tag: "fitur" | "perbaikan" | "desain" | "konten";
};

const ENTRIES: Entry[] = [
  {
    date: "2026-10-02",
    title: "Live2D Mao full-body di hero",
    detail:
      "Karakter 2D statis diganti model Live2D Cubism asli (Mao, official sample). Full-body, idle motion, mata ngikutin kursor, bisa diklik buat interaksi + speech bubble.",
    tag: "fitur",
  },
  {
    date: "2026-10-02",
    title: "Dark / light mode",
    detail:
      "Toggle tema di navbar (desktop & mobile). Pilihan tersimpan di localStorage, default ngikutin preferensi sistem, anti-flash saat load.",
    tag: "fitur",
  },
  {
    date: "2026-10-02",
    title: "Background ilustrasi kamar di hero",
    detail:
      "Hero section pakai ilustrasi kamar lo-fi sebagai background — cuma di bagian paling atas, section bawah tetap bersih.",
    tag: "desain",
  },
  {
    date: "2026-10-02",
    title: "Glassmorphism lebih tegas",
    detail:
      "Border kaca di light mode di-tint ungu biar edge-nya kelihatan, opacity dark mode dinaikkan, tambah inner highlight ala frosted glass.",
    tag: "desain",
  },
  {
    date: "2026-10-02",
    title: "Fix scale Live2D yang suka nge-zoom",
    detail:
      "Perhitungan scale model kadang ngaco (ke-zoom ke torso). Sekarang pakai getLocalBounds + warm-up 2 frame sebelum fit.",
    tag: "perbaikan",
  },
  {
    date: "2026-10-01",
    title: "Journey timeline",
    detail:
      "Section perjalanan: dari masuk SMK sampai kelas XII, format timeline vertikal responsif.",
    tag: "konten",
  },
  {
    date: "2026-10-01",
    title: "Rebuild: light glassmorphism studio",
    detail:
      "Rombak total dari tema lama: 3D Three.js dicabut, ganti layout studio terang (Inter + JetBrains Mono), bento Core Capabilities, blog & newsletter dibawa.",
    tag: "desain",
  },
  {
    date: "2026-09-28",
    title: "Blog markdown + newsletter",
    detail:
      "Halaman /blog dengan render Markdown (GFM), halaman 404 blog, dan API newsletter sederhana.",
    tag: "fitur",
  },
];

const TAG_STYLE: Record<Entry["tag"], string> = {
  fitur: "text-primary border-[color-mix(in_srgb,var(--primary)_40%,transparent)]",
  perbaikan: "text-faint border-[var(--hairline)]",
  desain: "text-accent border-[color-mix(in_srgb,var(--accent)_40%,transparent)]",
  konten: "text-soft border-[var(--hairline)]",
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-6">Changelog</p>
          <h1 className="font-display font-bold tracking-tight text-4xl md:text-5xl text-ink leading-tight">
            Web ini <span className="text-gradient">hidup</span>, bukan pajangan.
          </h1>
          <p className="mt-4 text-soft leading-relaxed">
            Semua update yang masuk ke website ini, dicatat rapi biar kelihatan progresnya.
          </p>
        </Reveal>

        <div className="mt-12 relative">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--hairline)]"
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {ENTRIES.map((e, i) => (
              <Reveal as="li" key={`${e.date}-${i}`} delay={Math.min(i * 60, 300)} className="relative pl-10">
                <span
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[var(--primary)] bg-[var(--bg)]"
                  aria-hidden="true"
                />
                <div className="glass p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-faint">{e.date}</span>
                    <span
                      className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${TAG_STYLE[e.tag]}`}
                    >
                      {e.tag}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-ink leading-snug">{e.title}</h2>
                  <p className="mt-2 text-sm text-soft leading-relaxed">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/" className="btn-ghost text-sm">← Beranda</Link>
            <Link href="/now" className="btn-primary text-sm">Lagi ngapain?</Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
