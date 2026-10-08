"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import dynamic from "next/dynamic";
import Reveal from "./Reveal";

const Live2DHero = dynamic(() => import("./Live2DHero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[440px] md:h-[720px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-hidden="true" />
    </div>
  ),
});

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 md:pt-24 pb-12 md:pb-16 px-6 overflow-hidden">
      {/* Background ilustrasi kamar, hanya di hero ini */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/hero-room.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay: teks tetap terbaca, ruangan terlihat di sisi Mao */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/75 to-[var(--bg)]/25" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>
      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_1.25fr] gap-6 md:gap-8 items-center">
        <div className="text-center md:text-left">
          <Reveal>
            <p className="eyebrow mb-6">{t.hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-bold tracking-tight text-4xl md:text-6xl xl:text-7xl leading-[1.08]">
              {t.hero.titleA} <span className="text-gradient">{t.hero.titleHighlight}</span>{" "}
              {t.hero.titleB}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-soft text-lg leading-relaxed">
              {t.hero.intro}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 md:mt-10 flex flex-wrap justify-center md:justify-start gap-4">
              <Link href="/#proyek" className="btn-primary">
                {t.hero.viewProjects}
              </Link>
              <Link href="/#kontak" className="btn-ghost">
                {t.hero.contactMe}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 md:mt-10 font-mono text-xs text-faint">
              {t.hero.hint}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <Live2DHero />
        </Reveal>
      </div>
    </section>
  );
}
