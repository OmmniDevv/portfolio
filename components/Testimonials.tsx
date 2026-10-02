"use client";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Testimonials() {
  const { t } = useLang();

  // NOTE: Data di bawah ini contoh fiktif (disetujui user) —
  // ganti dengan testimoni asli kalau sudah ada dari klien beneran.
  const TESTIMONIALS = [t.testimonials.item1, t.testimonials.item2, t.testimonials.item3];

  return (
    <section id="testimoni" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.testimonials.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            {t.testimonials.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={i * 80}>
              <figure className="glass p-6 md:p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-5" aria-label={t.testimonials.ratingLabel}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="text-[var(--amber)] text-lg" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-soft leading-relaxed flex-1">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-[var(--hairline)]">
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="font-mono text-xs text-faint mt-1">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
