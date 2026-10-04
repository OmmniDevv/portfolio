"use client";
import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

type Komentar = {
  id: string;
  nama: string;
  pesan: string;
  parentId: string | null;
  createdAt: string;
};

function formatTanggal(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

const inputCls =
  "w-full rounded-xl border border-[var(--hairline)] bg-[var(--input-bg)] px-4 py-3 text-ink placeholder:text-faint outline-none focus:border-[var(--primary)] transition-colors";

/** Form kirim komentar / balasan. */
function FormKomentar({
  slug,
  parentId,
  parentNama,
  onTerkirim,
  onBatal,
}: {
  slug: string;
  parentId: string | null;
  parentNama?: string;
  onTerkirim: (k: Komentar) => void;
  onBatal?: () => void;
}) {
  const { t } = useLang();
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const kirim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setNotice(null);
    setSending(true);
    try {
      const res = await fetch("/api/komentar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, nama: nama.trim(), pesan: pesan.trim(), parentId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNotice({ type: "err", text: data.error ?? t.komentar.failDefault });
      } else if (data.comment) {
        onTerkirim(data.comment);
        setNama("");
        setPesan("");
        setNotice({ type: "ok", text: data.message ?? t.komentar.sentFallback });
      }
    } catch {
      setNotice({ type: "err", text: t.komentar.networkError });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={kirim} className="glass p-5 md:p-6">
      {parentId && (
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="text-faint">
            {t.komentar.replyingTo} <span className="text-primary font-semibold">{parentNama}</span>
          </span>
          {onBatal && (
            <button
              type="button"
              onClick={onBatal}
              className="text-faint hover:text-ink transition-colors"
            >
              {t.komentar.cancel} ✕
            </button>
          )}
        </div>
      )}
      <label className="block font-mono text-xs uppercase tracking-[0.15em] text-faint mb-2">
        {t.komentar.nameLabel}
      </label>
      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        maxLength={50}
        placeholder={t.komentar.namePlaceholder}
        autoComplete="name"
        className={`${inputCls} mb-4`}
      />
      <textarea
        value={pesan}
        onChange={(e) => setPesan(e.target.value)}
        maxLength={500}
        rows={parentId ? 3 : 4}
        placeholder={parentId ? t.komentar.replyPlaceholder : t.komentar.msgPlaceholder}
        className={`${inputCls} resize-y`}
      />
      <div className="flex items-center justify-between mt-4 gap-4">
        <span className="font-mono text-[11px] text-faint" aria-live="polite">
          {pesan.length}/500
        </span>
        <button type="submit" disabled={sending} className="btn-primary !min-h-[44px] !py-2.5 !px-6 text-sm disabled:opacity-60">
          {sending ? t.komentar.sending : parentId ? t.komentar.sendReply : t.komentar.send}
        </button>
      </div>
      {notice && (
        <p
          role={notice.type === "err" ? "alert" : "status"}
          className={`mt-3 text-sm ${notice.type === "err" ? "text-red-500" : "text-soft"}`}
        >
          {notice.text}
        </p>
      )}
    </form>
  );
}

export default function KomentarBlog({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const dateLocale = lang === "en" ? "en-US" : "id-ID";
  const [semua, setSemua] = useState<Komentar[]>([]);
  const [loading, setLoading] = useState(true);
  const [balasKe, setBalasKe] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/komentar?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (alive && Array.isArray(data.comments)) setSemua(data.comments);
      } catch {
        /* biarkan kosong */
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  const { induk, balasan } = useMemo(() => {
    const induk = semua.filter((k) => !k.parentId);
    const balasan = new Map<string, Komentar[]>();
    for (const k of semua) {
      if (k.parentId) {
        const list = balasan.get(k.parentId) ?? [];
        list.push(k);
        balasan.set(k.parentId, list);
      }
    }
    return { induk, balasan };
  }, [semua]);

  const tambah = (k: Komentar) => {
    setSemua((prev) => [...prev, k]);
    setBalasKe(null);
  };

  const kartu = (k: Komentar, isBalasan = false) => (
    <div className={`${isBalasan ? "" : "glass p-5"}`}>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <p className="font-bold text-ink text-sm break-words">{k.nama}</p>
        <time className="font-mono text-[11px] text-faint shrink-0">
          {formatTanggal(k.createdAt, dateLocale)}
        </time>
      </div>
      <p className="text-sm text-soft leading-relaxed break-words whitespace-pre-wrap">
        {k.pesan}
      </p>
      {!isBalasan && (
        <button
          type="button"
          onClick={() => setBalasKe(balasKe === k.id ? null : k.id)}
          className="mt-3 text-xs font-semibold text-primary hover:underline"
        >
          {t.komentar.reply}
        </button>
      )}
    </div>
  );

  return (
    <section aria-label={t.komentar.title} className="mt-4">
      <Reveal>
        <h2 className="font-display font-bold text-2xl text-ink">
          {t.komentar.title}
          {!loading && semua.length > 0 && (
            <span className="ml-2 font-mono text-sm text-faint font-normal">
              {semua.length} {t.komentar.count}
            </span>
          )}
        </h2>
        <p className="mt-2 text-sm text-soft leading-relaxed mb-6">{t.komentar.desc}</p>
      </Reveal>

      <Reveal delay={60}>
        <FormKomentar slug={slug} parentId={null} onTerkirim={tambah} />
      </Reveal>

      <div className="mt-8" aria-live="polite">
        {loading ? (
          <div className="space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="glass p-5 animate-pulse" aria-hidden="true">
                <div className="h-4 w-1/3 rounded bg-[var(--hairline)] mb-3" />
                <div className="h-3 w-full rounded bg-[var(--hairline)]" />
              </div>
            ))}
          </div>
        ) : induk.length === 0 ? (
          <p className="text-sm text-faint text-center py-6">{t.komentar.empty}</p>
        ) : (
          <ul className="space-y-5">
            {induk.map((k) => {
              const replies = balasan.get(k.id) ?? [];
              return (
                <li key={k.id}>
                  {kartu(k)}
                  {replies.length > 0 && (
                    <ul className="mt-3 ml-4 md:ml-6 pl-4 border-l-2 border-[var(--hairline)] space-y-3">
                      {replies.map((r) => (
                        <li key={r.id} className="glass p-4">
                          {kartu(r, true)}
                        </li>
                      ))}
                    </ul>
                  )}
                  {balasKe === k.id && (
                    <div className="mt-3 ml-4 md:ml-6">
                      <FormKomentar
                        slug={slug}
                        parentId={k.id}
                        parentNama={k.nama}
                        onTerkirim={tambah}
                        onBatal={() => setBalasKe(null)}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
