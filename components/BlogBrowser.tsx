"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/blog";

const ORDER = ["Semua", "AI", "Tutorial", "Tips", "Opini", "Lainnya"];

export default function BlogBrowser({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Semua");

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of posts) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, [posts]);

  const cats = useMemo(
    () => ORDER.filter((c) => c === "Semua" || counts[c]),
    [counts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (cat !== "Semua" && p.category !== cat) return false;
      if (!q) return true;
      return `${p.title} ${p.excerpt} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(q);
    });
  }, [posts, query, cat]);

  const reset = () => {
    setQuery("");
    setCat("Semua");
  };

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <span aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 text-faint">
          🔍
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari artikel..."
          aria-label="Cari artikel"
          className="w-full glass rounded-full pl-12 pr-5 py-3.5 text-[16px] text-ink placeholder:text-faint outline-none focus:border-[color-mix(in_srgb,var(--primary)_55%,transparent)] transition-colors"
        />
      </div>

      {/* Filter kategori */}
      <div
        className="mt-5 flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap"
        role="tablist"
        aria-label="Filter kategori"
      >
        {cats.map((c) => {
          const active = cat === c;
          const n = c === "Semua" ? posts.length : counts[c] || 0;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => setCat(c)}
              className={`shrink-0 font-mono text-xs px-4 py-2 rounded-full border transition-all ${
                active
                  ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white border-transparent shadow-[0_4px_16px_rgba(139,92,246,0.35)]"
                  : "glass text-soft hover:text-ink"
              }`}
            >
              {c} <span className={active ? "opacity-80" : "text-faint"}>· {n}</span>
            </button>
          );
        })}
      </div>

      {/* Hasil */}
      <p className="mt-6 mb-2 font-mono text-xs text-faint" aria-live="polite">
        {filtered.length} artikel
        {query.trim() && (
          <>
            {" "}untuk “{query.trim()}”
          </>
        )}
        {cat !== "Semua" && <> di {cat}</>}
      </p>

      {filtered.length === 0 ? (
        <div className="glass p-12 text-center">
          <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
          <p className="text-ink font-medium mb-2">Nggak ketemu</p>
          <p className="text-soft text-sm mb-6">
            Coba kata kunci lain atau ganti kategorinya.
          </p>
          <button onClick={reset} className="btn-ghost text-sm !min-h-0 !py-2.5 !px-6">
            Reset filter
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group py-7 border-b border-[var(--hairline)] first:border-t px-2 -mx-2 hover:bg-[var(--glass-bg)] transition-colors flex gap-5 items-start"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shrink-0"
                />
              ) : null}
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-mono text-xs text-faint">{p.date}</p>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-primary border border-[color-mix(in_srgb,var(--primary)_25%,transparent)]">
                    {p.category}
                  </span>
                </div>
                <h2 className="font-display font-semibold text-xl text-ink group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <p className="text-soft text-sm mt-2 leading-relaxed line-clamp-2">{p.excerpt}</p>
                <p className="text-xs text-faint mt-3">{p.minutes} menit baca</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
