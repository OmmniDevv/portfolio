"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

interface Entry {
  nama: string;
  pesan: string;
  createdAt: string;
}

function formatTanggal(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Guestbook() {
  const { t, lang } = useLang();
  const dateLocale = lang === "en" ? "en-US" : "id-ID";
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/guestbook");
        const data = await res.json();
        if (alive && Array.isArray(data.entries)) setEntries(data.entries);
      } catch {
        /* biarkan kosong */
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const kirim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setNotice(null);
    setSending(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, pesan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNotice({ type: "err", text: data.error ?? t.guestbook.failDefault });
      } else {
        const entry: Entry = data.entry ?? {
          nama: nama.trim(),
          pesan: pesan.trim(),
          createdAt: new Date().toISOString(),
        };
        setEntries((prev) => [entry, ...prev]);
        setNotice({ type: "ok", text: data.message ?? t.guestbook.sentFallback });
        setNama("");
        setPesan("");
        // Beri tahu sistem achievements.
        window.dispatchEvent(new Event("kana:guestbook-post"));
      }
    } catch {
      setNotice({ type: "err", text: t.guestbook.networkError });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="buku-tamu" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">{t.guestbook.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-4xl mb-3">
            {t.guestbook.titleA} <span className="text-gradient">{t.guestbook.titleB}</span>
          </h2>
          <p className="text-soft max-w-xl leading-relaxed mb-10">
            {t.guestbook.desc}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <Reveal delay={80}>
            <form onSubmit={kirim} className="glass p-6 md:p-8" aria-label={t.guestbook.formLabel}>
              <label htmlFor="gb-nama" className="block font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">
                {t.guestbook.nameLabel}
              </label>
              <input
                id="gb-nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                maxLength={50}
                placeholder={t.guestbook.namePlaceholder}
                autoComplete="name"
                className="w-full mb-5 rounded-xl border border-[var(--hairline)] bg-[var(--input-bg)] px-4 py-3 text-ink placeholder:text-faint outline-none focus:border-[var(--primary)] transition-colors"
              />
              <label htmlFor="gb-pesan" className="block font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">
                {t.guestbook.msgLabel}
              </label>
              <textarea
                id="gb-pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                maxLength={500}
                rows={4}
                placeholder={t.guestbook.msgPlaceholder}
                className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--input-bg)] px-4 py-3 text-ink placeholder:text-faint outline-none focus:border-[var(--primary)] transition-colors resize-y"
              />
              <div className="flex items-center justify-between mt-5 gap-4">
                <span className="font-mono text-[11px] text-faint" aria-live="polite">
                  {pesan.length}/500
                </span>
                <button type="submit" disabled={sending} className="btn-primary !min-h-[48px] disabled:opacity-60">
                  {sending ? t.guestbook.sending : t.guestbook.send}
                </button>
              </div>
              {notice && (
                <p
                  role={notice.type === "err" ? "alert" : "status"}
                  className={`mt-4 text-sm ${notice.type === "err" ? "text-red-500" : "text-soft"}`}
                >
                  {notice.text}
                </p>
              )}
            </form>
          </Reveal>

          {/* Daftar pesan */}
          <Reveal delay={160}>
            <div aria-live="polite" aria-label={t.guestbook.listLabel}>
              {loading ? (
                <div className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="glass p-5 animate-pulse" aria-hidden="true">
                      <div className="h-4 w-1/3 rounded bg-[var(--hairline)] mb-3" />
                      <div className="h-3 w-full rounded bg-[var(--hairline)] mb-2" />
                      <div className="h-3 w-2/3 rounded bg-[var(--hairline)]" />
                    </div>
                  ))}
                </div>
              ) : entries.length === 0 ? (
                <div className="glass p-8 text-center">
                  <p className="text-soft text-sm leading-relaxed">
                    {t.guestbook.empty}
                  </p>
                </div>
              ) : (
                <ul className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                  {entries.map((en, i) => (
                    <li key={`${en.createdAt}-${i}`} className="glass p-5">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <p className="font-bold text-ink text-sm break-words">{en.nama}</p>
                        <time className="font-mono text-[11px] text-faint shrink-0">
                          {formatTanggal(en.createdAt, dateLocale)}
                        </time>
                      </div>
                      <p className="text-sm text-soft leading-relaxed break-words whitespace-pre-wrap">
                        {en.pesan}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
