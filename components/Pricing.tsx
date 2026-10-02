import Link from "next/link";
import Reveal from "./Reveal";

// Harga wajar untuk junior freelancer Indonesia. Sesuaikan seperlunya.
const PLANS = [
  {
    name: "Web Company Profile",
    price: "Rp 1,5 jt",
    unit: "mulai dari",
    desc: "Website profil usaha yang rapi, cepat, dan SEO-friendly.",
    features: [
      "5–7 halaman (home, tentang, layanan, galeri, kontak)",
      "Desain responsif (HP & desktop)",
      "Form kontak via WhatsApp",
      "SEO dasar + Google Maps",
      "Gratis domain .com tahun pertama*",
    ],
    popular: false,
  },
  {
    name: "Web App / Dashboard",
    price: "Rp 4 jt",
    unit: "mulai dari",
    desc: "Aplikasi web atau dashboard admin sesuai kebutuhan bisnis.",
    features: [
      "Login & hak akses user",
      "CRUD data + laporan",
      "Database MySQL",
      "Export Excel/PDF",
      "Deploy + training singkat",
    ],
    popular: true,
  },
  {
    name: "Bot WhatsApp / Telegram",
    price: "Rp 1 jt",
    unit: "mulai dari",
    desc: "Bot automasi untuk order, notifikasi, atau auto-reply.",
    features: [
      "Auto-reply & menu interaktif",
      "Notifikasi otomatis",
      "Integrasi API / spreadsheet",
      "Multi-device (WhatsApp)",
      "Panduan instalasi",
    ],
    popular: false,
  },
  {
    name: "Maintenance",
    price: "Rp 300 rb",
    unit: "/bulan",
    desc: "Web tetap aman, update, dan backup rutin.",
    features: [
      "Update konten ringan",
      "Backup database berkala",
      "Monitoring uptime",
      "Fix bug minor",
      "Laporan bulanan singkat",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="harga" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">Harga Jasa</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            Transparan sejak awal
          </h2>
          <p className="text-soft mt-4 text-center max-w-lg mx-auto leading-relaxed">
            Estimasi harga untuk project freelance. Harga final menyesuaikan
            kompleksitas — diskusi dulu gratis.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div
                className={`glass p-7 h-full flex flex-col relative ${
                  p.popular ? "border-2" : ""
                }`}
                style={p.popular ? { borderColor: "var(--primary)" } : undefined}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] whitespace-nowrap">
                    Populer
                  </span>
                )}
                <h3 className="font-bold text-lg text-ink">{p.name}</h3>
                <p className="mt-4">
                  <span className="font-mono text-xs text-faint block mb-1">{p.unit}</span>
                  <span className="font-bold tracking-tight text-3xl text-gradient">
                    {p.price}
                  </span>
                </p>
                <p className="text-soft text-sm mt-3 leading-relaxed">{p.desc}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-soft leading-relaxed">
                      <span aria-hidden="true" className="text-primary font-bold shrink-0">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#kontak"
                  className={`mt-7 inline-flex items-center justify-center min-h-[48px] px-6 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 ${
                    p.popular ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  Tanya Dulu
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="text-faint text-xs text-center mt-8 max-w-xl mx-auto leading-relaxed">
            *Syarat &amp; ketentuan berlaku. Butuh yang custom? Ceritakan kebutuhanmu —
            estimasi detail diberikan sebelum project mulai, tanpa biaya.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
