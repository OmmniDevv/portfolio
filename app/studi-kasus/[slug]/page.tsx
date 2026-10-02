import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getAllCaseStudies, getCaseStudy } from "@/lib/case-studies";

export async function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) return { title: "Tidak ditemukan · OmniDev" };
  return { title: `${cs.judul} · Studi Kasus · OmniDev`, description: cs.ringkasan };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const others = getAllCaseStudies().filter((c) => c.slug !== cs.slug).slice(0, 2);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <article className="max-w-2xl mx-auto">
        <Reveal>
          <Link href="/#proyek" className="text-sm text-soft hover:text-primary transition-colors">
            ← Semua proyek
          </Link>
          <p className="eyebrow mt-8 mb-4">Studi kasus</p>
          <h1 className="font-display font-bold tracking-tight text-3xl md:text-4xl text-ink leading-tight">
            {cs.judul}
          </h1>
          <p className="mt-4 text-soft leading-relaxed">{cs.ringkasan}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="font-mono text-xs px-3 py-1.5 rounded-full border border-[var(--hairline)] text-faint">
              ⏱ {cs.durasi}
            </span>
            <span className="font-mono text-xs px-3 py-1.5 rounded-full border border-[var(--hairline)] text-faint">
              👤 {cs.peran}
            </span>
          </div>
        </Reveal>

        <hr className="border-[var(--hairline)] my-10" />

        <Reveal delay={80}>
          <section aria-label="Masalah">
            <h2 className="font-display font-bold text-xl text-ink mb-4">
              😖 Masalahnya
            </h2>
            <ul className="space-y-3">
              {cs.masalah.map((m, i) => (
                <li key={i} className="flex gap-3 text-soft leading-relaxed">
                  <span className="text-faint shrink-0 font-mono text-sm mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  {m}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={120}>
          <section aria-label="Solusi" className="mt-10">
            <h2 className="font-display font-bold text-xl text-ink mb-4">
              💡 Solusinya
            </h2>
            <ul className="space-y-3">
              {cs.solusi.map((s, i) => (
                <li key={i} className="flex gap-3 text-soft leading-relaxed">
                  <span className="text-primary shrink-0" aria-hidden="true">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={160}>
          <section aria-label="Tech stack" className="mt-10">
            <h2 className="font-display font-bold text-xl text-ink mb-4">
              🧰 Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {cs.techStack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1.5 rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <section aria-label="Hasil" className="mt-10">
            <h2 className="font-display font-bold text-xl text-ink mb-4">
              🏆 Hasilnya
            </h2>
            <div className="glass p-6 space-y-3">
              {cs.hasil.map((h, i) => (
                <p key={i} className="flex gap-3 text-soft leading-relaxed">
                  <span className="text-gradient font-bold shrink-0" aria-hidden="true">→</span>
                  {h}
                </p>
              ))}
            </div>
          </section>
        </Reveal>

        {others.length > 0 && (
          <Reveal delay={240}>
            <section aria-label="Studi kasus lain" className="mt-12">
              <h2 className="font-display font-bold text-lg text-ink mb-4">Studi kasus lain</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/studi-kasus/${o.slug}`}
                    className="glass p-5 hover:border-[color-mix(in_srgb,var(--primary)_45%,transparent)] transition-colors"
                  >
                    <p className="font-display font-semibold text-ink leading-snug">{o.judul}</p>
                    <p className="mt-2 text-sm text-faint line-clamp-2">{o.ringkasan}</p>
                    <span className="mt-3 inline-block text-sm text-primary">Baca →</span>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <hr className="border-[var(--hairline)] my-10" />
        <Reveal delay={280}>
          <div className="glass p-6 md:p-8 text-center">
            <p className="font-display font-bold text-lg text-ink">Punya project mirip?</p>
            <p className="mt-2 text-sm text-soft">Ceritain kebutuhanmu, Kana bantuin wujudin.</p>
            <Link href="/#kontak" className="btn-primary text-sm mt-5 inline-flex">
              Diskusi project →
            </Link>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
