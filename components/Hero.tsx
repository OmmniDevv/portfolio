import Link from "next/link";
import dynamic from "next/dynamic";
import Reveal from "./Reveal";

const Live2DHero = dynamic(() => import("./Live2DHero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] md:h-[560px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-hidden="true" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <Reveal>
            <p className="eyebrow mb-6">Studio — Portfolio Pribadi</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-bold tracking-tight text-5xl md:text-6xl xl:text-7xl leading-[1.04]">
              Kami membangun <span className="text-gradient">produk digital</span> yang
              memberikan hasil nyata.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-soft text-lg leading-relaxed">
              Halo, saya Abdul Malik Rizky Nur Rahmat. Junior developer dari Bandung
              yang fokus bikin website cepat dan bot automasi yang rapi.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
              <Link href="/#proyek" className="btn-primary">
                Lihat Proyek
              </Link>
              <Link href="/#kontak" className="btn-ghost">
                Hubungi Saya
              </Link>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-10 font-mono text-xs text-faint">
              Psst — klik Mao di sebelah kanan, dia bisa diajak interaksi!
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 blur-[100px] opacity-60 bg-gradient-to-br from-primary/30 via-accent/20 to-sky/20 rounded-full"
          />
          <Live2DHero />
        </Reveal>
      </div>
    </section>
  );
}
