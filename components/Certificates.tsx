"use client";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Certificates() {
  const { t } = useLang();

  // PLACEHOLDER — ganti dengan sertifikat asli (course / lomba).
  const CERTIFICATES = [
    t.certificates.item1,
    t.certificates.item2,
    t.certificates.item3,
    t.certificates.item4,
  ];

  return (
    <section id="sertifikat" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.certificates.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            {t.certificates.title}
          </h2>
          <p className="text-faint mt-4 text-center max-w-lg mx-auto text-sm leading-relaxed">
            {t.certificates.note}
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
