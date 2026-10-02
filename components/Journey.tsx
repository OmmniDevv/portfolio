"use client";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Journey() {
  const { t } = useLang();

  const MILESTONES = [t.journey.m1, t.journey.m2, t.journey.m3, t.journey.m4, t.journey.m5].map(
    (m, i, arr) => ({ ...m, now: i === arr.length - 1 })
  );

  return (
    <section id="perjalanan" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.journey.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            {t.journey.title}
          </h2>
        </Reveal>

        <ol className="mt-12 relative border-l-2 border-[color-mix(in_srgb,var(--primary)_25%,transparent)] ml-2 flex flex-col gap-10">
          {MILESTONES.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 60} className="relative pl-8">
              <span
                aria-hidden="true"
                className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-paper ${
                  m.now ? "bg-primary border-primary shadow-[0_0_0_4px_rgba(139,92,246,0.2)]" : "border-[color-mix(in_srgb,var(--primary)_45%,transparent)]"
                }`}
              />
              <p className="font-mono text-xs font-semibold text-primary mb-1.5">{m.year}</p>
              <h3 className="font-bold text-lg text-ink mb-1.5">{m.title}</h3>
              <p className="text-soft text-[15px] leading-relaxed">{m.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
