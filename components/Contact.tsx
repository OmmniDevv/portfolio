"use client";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/OmmniDevv" },
  { label: "Email", href: "mailto:omnidevv@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/6285187605007" },
  { label: "Telegram", href: "https://t.me/zanslord" },
];

export default function Contact() {
  const { t } = useLang();
  return (
    <section id="kontak" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="glass-strong p-10 md:p-16 text-center relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[36rem] h-64 rounded-full bg-gradient-to-r from-primary/25 to-accent/25 blur-[100px] pointer-events-none"
            />
            <p className="eyebrow mb-4 relative">{t.contact.eyebrow}</p>
            <h2 className="font-bold tracking-tight text-3xl md:text-5xl relative max-w-2xl mx-auto leading-tight">
              {t.contact.titleA} <span className="text-gradient">{t.contact.titleB}</span>
            </h2>
            <p className="text-soft mt-4 max-w-md mx-auto leading-relaxed relative">
              {t.contact.desc}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !min-h-[48px] !px-7 text-sm"
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
