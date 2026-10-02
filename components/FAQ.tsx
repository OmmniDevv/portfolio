"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Berapa lama pengerjaan project?",
    a: "Company profile biasanya 1–2 minggu, web app/dashboard 3–6 minggu, dan bot 1–3 minggu — tergantung kompleksitas dan kelengkapan materi (teks, foto, logo) dari kamu. Timeline pasti dikasih sebelum project mulai.",
  },
  {
    q: "Sistem pembayarannya bagaimana?",
    a: "DP 50% di awal sebagai tanda jadi, pelunasan 50% setelah website/bot live dan kamu setuju hasil akhirnya. Pembayaran via transfer bank atau e-wallet.",
  },
  {
    q: "Apakah dapat revisi?",
    a: "Dapat. Setiap paket termasuk 2x revisi mayor selama masa pengerjaan. Revisi kecil (typo, ganti foto/teks) gratis selama project berjalan.",
  },
  {
    q: "Bagaimana kalau ada bug setelah serah terima?",
    a: "Ada garansi bug-fixing 30 hari setelah serah terima untuk bug yang berasal dari pengerjaan saya. Setelah itu bisa ambil paket maintenance bulanan.",
  },
  {
    q: "Teknologi apa yang dipakai?",
    a: "Website pakai Next.js/React + Tailwind (cepat & SEO-friendly), backend bisa Laravel + MySQL kalau butuh dashboard. Bot WhatsApp pakai Baileys, bot Telegram pakai Telegram Bot API.",
  },
  {
    q: "Apakah saya dapat akses penuh ke source code?",
    a: "Ya. Setelah pelunasan, semua source code, akses hosting/domain, dan dokumentasi singkat diserahkan penuh ke kamu. Tidak ada yang disandera.",
  },
  {
    q: "Bagaimana cara mulai order?",
    a: "Hubungi saya via halaman kontak / WhatsApp, ceritakan kebutuhanmu, lalu kita diskusi gratis sampai dapat estimasi harga & timeline yang jelas. Deal → DP → project jalan.",
  },
  {
    q: "Apakah melayani di luar Bandung / luar negeri?",
    a: "Bisa. Semua komunikasi via WhatsApp/Zoom dan serah terima online, jadi lokasi bukan masalah.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">FAQ</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            Sering ditanyakan
          </h2>
          <p className="text-soft mt-4 text-center max-w-lg mx-auto leading-relaxed">
            Masih ragu? Ini jawaban untuk pertanyaan yang paling sering masuk.
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
                    className="w-full min-h-[56px] flex items-center justify-between gap-4 text-left px-6 py-4 cursor-pointer"
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
                      <p className="px-6 pb-5 text-soft text-[15px] leading-relaxed">
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
