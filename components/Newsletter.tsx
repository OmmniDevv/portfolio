"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Untuk kirim email beneran (bukan sekadar simpan), daftar gratis di
// https://resend.com — lalu di app/api/newsletter/route.ts kirim via
// fetch("https://api.resend.com/emails", { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` } })
export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mendaftar.");
      setMsg(data.message || "Berhasil terdaftar!");
      setStatus("done");
      setEmail("");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setStatus("error");
    }
  };

  return (
    <section id="newsletter" ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* glow latar */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[280px] rounded-full bg-[#EF9A9A]/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto vision-card p-8 md:p-10 text-center relative"
      >
        <div className="rune-divider mb-4">
          <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
            Newsletter <span className="font-jp text-gold/40">・ニュースレター</span>
          </span>
        </div>
        <h2 className="section-heading !text-2xl md:!text-3xl mb-3">
          Dapat Kabar Terbaru
        </h2>
        <p className="font-inter text-parchment/55 text-sm leading-relaxed mb-8 max-w-md mx-auto">
          Daftarkan email-mu buat dapet update project terbaru, rilis bot,
          dan tulisan-tulisan seru. Tanpa spam — janji! 🌸
        </p>

        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full bg-[#74C69D]/15 border border-[#74C69D]/40 flex items-center justify-center"
              >
                <svg className="w-7 h-7 text-[#74C69D]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <p className="font-cinzel text-[#74C69D] tracking-wider">{msg}</p>
              <button
                onClick={() => setStatus("idle")}
                className="font-inter text-xs text-parchment/40 hover:text-gold transition-colors underline underline-offset-4"
              >
                Daftarkan email lain
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={submit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                disabled={status === "loading"}
                className="flex-1 bg-navy/60 border border-gold/25 rounded px-4 py-3 font-inter text-sm text-parchment placeholder-parchment/25 outline-none focus:border-gold/60 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="genshin-btn-filled whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Mengirim..." : "Berlangganan 🌸"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-inter text-sm text-[#EF9A9A] mt-4"
          >
            {msg}
          </motion.p>
        )}

        <p className="font-inter text-[11px] text-parchment/30 mt-6">
          {status === "idle" && "Yoroshiku onegaishimasu~ 🙏"}
        </p>
      </motion.div>
    </section>
  );
}
