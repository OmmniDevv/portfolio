"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Reveal from "./Reveal";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* 3D di kanan pada desktop, jadi latar samar di mobile */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%] opacity-40 md:opacity-100 pointer-events-none">
        <HeroScene />
      </div>
      {/* scrim agar teks tetap terbaca di atas 3D */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/20"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-24 pb-16">
        <Reveal>
          <p className="eyebrow mb-6">Halo, saya</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display font-bold tracking-tight text-5xl md:text-7xl leading-[1.05]">
            Abdul Malik Rizky
            <br />
            Nur Rahmat
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-md text-muted text-lg leading-relaxed">
            Junior developer dari Bandung. Saya bikin website dan bot automasi
            yang rapi, cepat, dan enak dipakai.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/#proyek" className="btn-primary">
              Lihat Proyek
            </Link>
            <Link href="/#kontak" className="btn-ghost">
              Hubungi Saya
            </Link>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <dl className="mt-14 flex gap-10 text-sm">
            <div>
              <dt className="eyebrow mb-1">Fokus</dt>
              <dd className="text-mist">Web & Bot</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Basis</dt>
              <dd className="text-mist">Bandung, ID</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Status</dt>
              <dd className="text-mist">Terbuka freelance</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
