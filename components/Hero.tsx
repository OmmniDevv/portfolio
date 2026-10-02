import Link from "next/link";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto w-full text-center">
        <Reveal>
          <p className="eyebrow mb-6">Studio — Portfolio Pribadi</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-bold tracking-tight text-5xl md:text-7xl leading-[1.04] max-w-4xl mx-auto">
            Kami membangun <span className="text-gradient">produk digital</span> yang
            memberikan hasil nyata.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl mx-auto text-soft text-lg leading-relaxed">
            Halo, saya Abdul Malik Rizky Nur Rahmat. Junior developer dari Bandung
            yang fokus bikin website cepat dan bot automasi yang rapi.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/#proyek" className="btn-primary">
              Lihat Proyek
            </Link>
            <Link href="/#kontak" className="btn-ghost">
              Hubungi Saya
            </Link>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <dl className="mt-16 flex justify-center gap-10 md:gap-16 text-sm">
            <div>
              <dt className="eyebrow mb-1">Fokus</dt>
              <dd className="text-ink font-medium">Web & Bot</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Basis</dt>
              <dd className="text-ink font-medium">Bandung, ID</dd>
            </div>
            <div>
              <dt className="eyebrow mb-1">Status</dt>
              <dd className="text-ink font-medium">Terbuka freelance</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
