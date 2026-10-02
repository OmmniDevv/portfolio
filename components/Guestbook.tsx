"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

interface Entry {
  nama: string;
  pesan: string;
  createdAt: string;
}

function formatTanggal(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Guestbook() {
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
        setNotice({ type: "err", text: data.error ?? "Gagal mengirim pesan." });
      } else {
        const entry: Entry = data.entry ?? {
          nama: nama.trim(),
          pesan: pesan.trim(),
          createdAt: new Date().toISOString(),
        };
        setEntries((prev) => [entry, ...prev]);
        setNotice({ type: "ok", text: data.message ?? "Pesan terkirim!" });
        setNama("");
        setPesan("");
        // Beri tahu sistem achievements.
        window.dispatchEvent(new Event("kana:guestbook-post"));
      }
    } catch {
      setNotice({ type: "err", text: "Jaringan bermasalah, coba lagi ya." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="buku-tamu" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">Buku Tamu</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-4xl mb-3">
            Tinggalkan <span className="text-gradient">pesan</span>
          </h2>
          <p className="text-soft max-w-xl leading-relaxed mb-10">
            Mampir dan sapa! Pesanmu bakal tampil di sini.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Form */}
          <Reveal delay={80}>
            <form onSubmit={kirim} className="glass p-6 md:p-8" aria-label="Form buku tamu">
              <label htmlFor="gb-nama" className="block font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">
                Nama
              </label>
              <input
                id="gb-nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                maxLength={50}
                placeholder="Namamu siapa?"
                autoComplete="name"
                className="w-full mb-5 rounded-xl border border-[var(--hairline)] bg-[var(--input-bg)] px-4 py-3 text-ink placeholder:text-faint outline-none focus:border-[var(--primary)] transition-colors"
              />
              <label htmlFor="gb-pesan" className="block font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">
                Pesan
              </label>
              <textarea
                id="gb-pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Tulis pesanmu di sini… (maks 500 karakter)"
                className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--input-bg)] px-4 py-3 text-ink placeholder:text-faint outline-none focus:border-[var(--primary)] transition-colors resize-y"
              />
              <div className="flex items-center justify-between mt-5 gap-4">
                <span className="font-mono text-[11px] text-faint" aria-live="polite">
                  {pesan.length}/500
                </span>
                <button type="submit" disabled={sending} className="btn-primary !min-h-[48px] disabled:opacity-60">
                  {sending ? "Mengirim…" : "Kirim Pesan"}
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
            <div aria-live="polite" aria-label="Daftar pesan buku tamu">
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
                    Belum ada pesan. Jadilah yang pertama ninggalin jejak! ✨
                  </p>
                </div>
              ) : (
                <ul className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                  {entries.map((en, i) => (
                    <li key={`${en.createdAt}-${i}`} className="glass p-5">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <p className="font-bold text-ink text-sm break-words">{en.nama}</p>
                        <time className="font-mono text-[11px] text-faint shrink-0">
                          {formatTanggal(en.createdAt)}
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
