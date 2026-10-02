"use client";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Pricing() {
  const { t } = useLang();

  // Harga wajar untuk junior freelancer Indonesia. Sesuaikan seperlunya.
  const PLANS = [
    { ...t.pricing.plan1, features: [t.pricing.plan1.f1, t.pricing.plan1.f2, t.pricing.plan1.f3, t.pricing.plan1.f4, t.pricing.plan1.f5], popular: false },
    { ...t.pricing.plan2, features: [t.pricing.plan2.f1, t.pricing.plan2.f2, t.pricing.plan2.f3, t.pricing.plan2.f4, t.pricing.plan2.f5], popular: true },
    { ...t.pricing.plan3, features: [t.pricing.plan3.f1, t.pricing.plan3.f2, t.pricing.plan3.f3, t.pricing.plan3.f4, t.pricing.plan3.f5], popular: false },
    { ...t.pricing.plan4, features: [t.pricing.plan4.f1, t.pricing.plan4.f2, t.pricing.plan4.f3, t.pricing.plan4.f4, t.pricing.plan4.f5], popular: false },
  ];

  return (
    <section id="harga" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.pricing.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            {t.pricing.title}
          </h2>
          <p className="text-soft mt-4 text-center max-w-lg mx-auto leading-relaxed">
            {t.pricing.desc}
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <div
                className={`glass card-interactive p-7 h-full flex flex-col relative ${
                  p.popular ? "accent-emerald" : "accent-primary"
                } ${                  p.popular ? "border-2" : ""
                }`}
                style={p.popular ? { borderColor: "var(--primary)" } : undefined}
              >
                {p.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full text-white bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] whitespace-nowrap">
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="font-bold text-lg text-ink">{p.name}</h3>
                <p className="mt-4">
                  <span className="font-mono text-xs text-faint block mb-1">{p.unit}</span>
                  <span className="font-bold tracking-tight text-3xl text-gradient">
                    {p.price}
                  </span>
                </p>
                <p className="text-soft text-sm mt-3 leading-relaxed">{p.desc}</p>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-soft leading-relaxed">
                      <span aria-hidden="true" className="text-[var(--emerald)] font-bold shrink-0">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#kontak"
                  className={`mt-7 inline-flex items-center justify-center min-h-[48px] px-6 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-95 ${
                    p.popular ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {t.pricing.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="text-faint text-xs text-center mt-8 max-w-xl mx-auto leading-relaxed">
            {t.pricing.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
