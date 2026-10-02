import Reveal from "./Reveal";

const CAPABILITIES = [
  {
    title: "Web Development",
    desc: "Website company profile, dashboard, dan aplikasi web full-stack. Next.js, React, Laravel. Cepat, responsif, dan SEO-friendly.",
    tags: ["Next.js", "React", "Laravel", "Tailwind"],
    span: true,
  },
  {
    title: "Bot & Automasi",
    desc: "Bot WhatsApp, Telegram, dan Discord untuk automasi bisnis. Notifikasi, auto-reply, integrasi API.",
    tags: ["Baileys", "Telegram API", "Discord.js"],
    span: false,
  },
  {
    title: "Optimasi & Performa",
    desc: "Audit kecepatan, optimasi bundle, dan best practice. Website yang ringan itu website yang dihormati pengunjungnya.",
    tags: ["Lighthouse", "SEO", "Caching"],
    span: false,
  },
];

export default function Capabilities() {
  return (
    <section id="kemampuan" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">Core Capabilities</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center max-w-2xl mx-auto leading-tight">
            Kami menolak hasil yang biasa-biasa saja.
          </h2>
          <p className="text-soft mt-4 text-center max-w-lg mx-auto leading-relaxed">
            Setiap piksel direkayasa untuk performa mutlak. Ini yang bisa saya kerjakan untukmu.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className={c.span ? "md:col-span-2" : ""}>
              <div className="glass p-8 md:p-10 h-full">
                <h3 className="font-bold text-xl md:text-2xl mb-3">{c.title}</h3>
                <p className="text-soft leading-relaxed max-w-xl">{c.desc}</p>
                <ul className="flex flex-wrap gap-2 mt-6" aria-label={`Teknologi ${c.title}`}>
                  {c.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
