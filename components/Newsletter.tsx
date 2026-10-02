"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function Newsletter() {
  const { t } = useLang();
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
      if (!res.ok) throw new Error(data.error || t.newsletter.failDefault);
      setMsg(data.message || "Berhasil terdaftar!");
      setStatus("done");
      setEmail("");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t.newsletter.unknownError);
      setStatus("error");
    }
  };

  return (
    <section className="pb-20 md:pb-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="glass p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h2 className="font-display font-bold tracking-tight text-2xl">
                {t.newsletter.title}
              </h2>
              <p className="text-soft text-sm mt-2 leading-relaxed">
                {t.newsletter.desc}
              </p>
            </div>
            {status === "done" ? (
              <p className="text-sm text-ink md:text-right" role="status">{msg}</p>
            ) : (
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <label htmlFor="nl-email" className="sr-only">{t.newsletter.emailLabel}</label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  disabled={status === "loading"}
                  className="flex-1 md:w-64 bg-[var(--input-bg)] border border-[var(--hairline)] rounded-full px-5 h-12 text-base md:text-sm text-ink placeholder:text-faint outline-none focus:border-[color-mix(in_srgb,var(--primary)_65%,transparent)] transition-colors disabled:opacity-50"
                />
                <button type="submit" disabled={status === "loading" || !email} className="btn-primary !min-h-[48px] shrink-0 disabled:opacity-50">
                  {status === "loading" ? "..." : t.newsletter.subscribe}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 md:text-right" role="alert">{msg}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
