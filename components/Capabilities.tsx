"use client";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const ACCENTS = ["accent-primary", "accent-sky", "accent-amber", "accent-emerald", "accent-rose", "accent-fuchsia"];

export default function Capabilities() {
  const { t } = useLang();

  const CAPABILITIES = [
    {
      title: t.capabilities.item1.title,
      desc: t.capabilities.item1.desc,
      tags: ["Next.js", "React", "Laravel", "Tailwind"],
      span: true,
    },
    {
      title: t.capabilities.item2.title,
      desc: t.capabilities.item2.desc,
      tags: ["Baileys", "Telegram API", "Discord.js"],
      span: false,
    },
    {
      title: t.capabilities.item3.title,
      desc: t.capabilities.item3.desc,
      tags: ["Lighthouse", "SEO", "Caching"],
      span: false,
    },
  ];

  return (
    <section id="kemampuan" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.capabilities.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center max-w-2xl mx-auto leading-tight">
            {t.capabilities.title}
          </h2>
          <p className="text-soft mt-4 text-center max-w-lg mx-auto leading-relaxed">
            {t.capabilities.desc}
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className={c.span ? "md:col-span-2" : ""}>
              <div className={`glass card-interactive p-6 md:p-10 h-full ${ACCENTS[i % ACCENTS.length]}`}>
                <h3 className="font-bold text-xl md:text-2xl mb-3">{c.title}</h3>
                <p className="text-soft leading-relaxed max-w-xl">{c.desc}</p>
                <ul className="flex flex-wrap gap-2 mt-6" aria-label={`${t.capabilities.techLabel} ${c.title}`}>
                  {c.tags.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-[color-mix(in_srgb,var(--card-accent)_12%,transparent)] text-[var(--card-accent)] border border-[color-mix(in_srgb,var(--card-accent)_30%,transparent)]"
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
