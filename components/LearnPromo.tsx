"use client";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const LEARN_URL = "https://learn.omnidevv.biz.id";

/** Banner CTA di bawah Sertifikat: ajak pengunjung belajar di learn.omnidevv.biz.id */
export default function LearnPromo() {
  const { t } = useLang();
  const c = t.learnPromo;

  return (
    <section id="belajar" className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="glass-strong relative overflow-hidden p-8 md:p-14 text-center">
            {/* ornamen gradient */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.28),transparent)] blur-2xl"
            />
            <p className="eyebrow mb-4 relative">{c.eyebrow}</p>
            <h2 className="font-display font-bold tracking-tight text-3xl md:text-5xl text-ink relative">
              {c.titleA}
              <br />
              <span className="text-gradient">{c.titleB}</span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-soft text-base md:text-lg leading-relaxed relative">
              {c.desc}
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5 relative">
              {[c.point1, c.point2, c.point3].map((p) => (
                <li key={p} className="badge badge-tech !text-[12.5px] !px-4 !py-1.5">
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap justify-center gap-4 relative">
              <a href={LEARN_URL} target="_blank" rel="noreferrer" className="btn-primary">
                {c.ctaPrimary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
              <Link href="/learn" className="btn-ghost">
                {c.ctaSecondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
