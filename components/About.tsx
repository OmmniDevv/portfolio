"use client";
import Image from "next/image";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();

  const FACTS = [
    { k: t.about.fact1k, v: t.about.fact1v },
    { k: t.about.fact2k, v: t.about.fact2v },
    { k: t.about.fact3k, v: t.about.fact3v },
    { k: t.about.fact4k, v: t.about.fact4v },
  ];

  return (
    <section id="tentang" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass p-6 md:p-12 grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-center">
          <Reveal>
            <div className="relative aspect-square rounded-2xl overflow-hidden w-44 md:w-full mx-auto shadow-lg">
              <Image
                src="/images/profile.jpg"
                alt={t.about.imgAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 176px, 220px"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-4">{t.about.eyebrow}</p>
            <h2 className="font-bold tracking-tight text-3xl md:text-4xl mb-4">
              {t.about.title}
            </h2>
            <p className="text-soft leading-relaxed text-[17px] max-w-xl">
              {t.about.desc}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 max-w-xl">
              {FACTS.map((f) => (
                <div key={f.k} className="border-b border-[var(--hairline)] pb-4">
                  <dt className="eyebrow mb-1.5">{f.k}</dt>
                  <dd className="text-ink font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
