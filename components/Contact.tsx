import Reveal from "./Reveal";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/OmmniDevv" },
  { label: "Email", href: "mailto:omnidevv@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/6285187605007" },
  { label: "Telegram", href: "https://t.me/zanslord" },
];

export default function Contact() {
  return (
    <section id="kontak" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="glass-strong p-10 md:p-14 text-center relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-accent/10 blur-[80px] pointer-events-none"
            />
            <p className="eyebrow mb-4 relative">Kontak</p>
            <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl relative">
              Punya proyek dalam pikiran?
            </h2>
            <p className="text-muted mt-4 max-w-md mx-auto leading-relaxed relative">
              Ceritakan kebutuhanmu. Saya akan membalas secepat mungkin,
              biasanya dalam 1x24 jam.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !min-h-[44px] !px-6 text-sm"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
