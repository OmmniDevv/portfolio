import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "404 — Isekai! · OmniDev",
  description: "Halaman yang kamu cari sudah isekai ke dunia lain.",
};

const KAOMOJI = ["(｡•́︿•̀｡)", "(´･ω･`)", "(>_<)", "(；′⌒`)", "(。_。)"];

export default function NotFound() {
  const face = KAOMOJI[3];

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      <Reveal className="w-full max-w-lg text-center">
        <div className="glass p-10 md:p-14">
          <p className="eyebrow mb-6">Error 404</p>
          <p className="text-6xl mb-6" aria-hidden="true">
            {face}
          </p>
          <h1 className="font-display font-bold tracking-tight text-3xl md:text-4xl text-ink leading-tight">
            Halaman ini <span className="text-gradient">isekai</span> ke dunia lain~
          </h1>
          <p className="mt-5 text-soft leading-relaxed">
            Kayaknya URL yang kamu buka udah di-summon ke dimensi lain.
            Tenang, portal pulangnya masih kebuka kok.
          </p>
          <p className="mt-4 font-mono text-xs text-faint">
            {"// status: 404 — hero tidak ditemukan di party"}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary text-sm">
              ← Kembali ke beranda
            </Link>
            <Link href="/#proyek" className="btn-ghost text-sm">
              Lihat proyek
            </Link>
          </div>
        </div>
        <p className="mt-6 font-mono text-xs text-faint">
          tips: jangan ikuti truk-kun kalau dia nawarin tumpangan
        </p>
      </Reveal>
    </main>
  );
}
