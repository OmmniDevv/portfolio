"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  const FAQS = [t.faq.q1, t.faq.q2, t.faq.q3, t.faq.q4, t.faq.q5, t.faq.q6, t.faq.q7, t.faq.q8];

  return (
    <section id="faq" className="py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.faq.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            {t.faq.title}
          </h2>
          <p className="text-soft mt-4 text-center max-w-lg mx-auto leading-relaxed">
            {t.faq.desc}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className="glass overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full min-h-[56px] flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 cursor-pointer"
                  >
                    <span className="font-bold text-ink text-[15px] md:text-base">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 md:px-6 pb-5 text-soft text-[15px] leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
