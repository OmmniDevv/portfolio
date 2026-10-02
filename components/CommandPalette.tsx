"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

interface PaletteItem {
  id: string;
  label: string;
  deskripsi: string;
  kategori: "Navigasi" | "Halaman" | "Aksi";
  keywords: string;
  href?: string;
  action?: () => void;
}

const ITEMS: PaletteItem[] = [
  { id: "beranda", label: "Beranda", deskripsi: "Kembali ke bagian paling atas", kategori: "Navigasi", keywords: "home atas hero awal", href: "/" },
  { id: "tentang", label: "Tentang", deskripsi: "Sedikit tentang saya", kategori: "Navigasi", keywords: "about profil saya", href: "/#tentang" },
  { id: "kemampuan", label: "Kemampuan", deskripsi: "Core capabilities", kategori: "Navigasi", keywords: "skill kemampuan bisa", href: "/#kemampuan" },
  { id: "proyek", label: "Proyek", deskripsi: "Proyek pilihan dari GitHub", kategori: "Navigasi", keywords: "project karya portfolio", href: "/#proyek" },
  { id: "perjalanan", label: "Perjalanan", deskripsi: "Timeline dari awal sampai kini", kategori: "Navigasi", keywords: "journey timeline cerita", href: "/#perjalanan" },
  { id: "kontak", label: "Kontak", deskripsi: "Punya proyek dalam pikiran?", kategori: "Navigasi", keywords: "contact hubungi email", href: "/#kontak" },
  { id: "blog", label: "Blog", deskripsi: "Tulisan tutorial & pengalaman", kategori: "Halaman", keywords: "artikel tulisan", href: "/blog" },
  { id: "now", label: "Now", deskripsi: "Lagi ngapain sekarang", kategori: "Halaman", keywords: "sekarang now update", href: "/now" },
  { id: "changelog", label: "Changelog", deskripsi: "Update apa saja di web ini", kategori: "Halaman", keywords: "perubahan update log riwayat", href: "/changelog" },
  { id: "buku-tamu", label: "Buku Tamu", deskripsi: "Tinggalkan pesan", kategori: "Navigasi", keywords: "guestbook pesan tamu", href: "/#buku-tamu" },
  { id: "pencapaian", label: "Pencapaian", deskripsi: "Badge achievements yang terbuka", kategori: "Navigasi", keywords: "achievement badge lencana", href: "/#pencapaian" },
  {
    id: "tema",
    label: "Ganti tema terang/gelap",
    deskripsi: "Toggle dark / light mode",
    kategori: "Aksi",
    keywords: "theme dark light mode gelap terang",
    action: () => {
      const el = document.documentElement;
      const next = !el.classList.contains("dark");
      el.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
    },
  },
  {
    id: "atas",
    label: "Scroll ke atas",
    deskripsi: "Kembali ke paling atas halaman",
    kategori: "Aksi",
    keywords: "scroll top atas",
    action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (item: PaletteItem) => {
      close();
      if (item.action) {
        item.action();
        return;
      }
      const href = item.href!;
      if (href.startsWith("/#")) {
        const id = href.slice(2);
        if (pathname === "/") {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          try {
            history.replaceState(null, "", href);
          } catch {}
        } else {
          router.push(href);
        }
      } else {
        router.push(href);
      }
    },
    [close, pathname, router]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((it) =>
      `${it.label} ${it.deskripsi} ${it.keywords}`.toLowerCase().includes(q)
    );
  }, [query]);

  // Reset highlight saat hasil filter berubah.
  useEffect(() => {
    setActive(0);
  }, [filtered.length]);

  // Global keydown: Ctrl/Cmd+K buka, ESC tutup.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!openRef.current) {
          setOpen(true);
          window.dispatchEvent(new Event("kana:palette-open"));
        } else {
          setOpen(false);
          setQuery("");
          setActive(0);
        }
        return;
      }
      if (e.key === "Escape" && openRef.current) {
        setOpen(false);
        setQuery("");
        setActive(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Kunci scroll body + fokus input saat dibuka.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open ]);

  // Scroll item aktif ke dalam viewport list.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (filtered.length ? (a - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (item) go(item);
    } else if (e.key === "Tab") {
      // Focus trap sederhana: tahan fokus di dalam modal.
      const modal = (e.target as HTMLElement).closest("[role=dialog]");
      const focusables = modal?.querySelectorAll<HTMLElement>(
        'input, [role="option"], button'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!open || typeof document === "undefined") return null;

  let lastKategori = "";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette — navigasi cepat"
        className="glass-strong relative w-full max-w-lg overflow-hidden !rounded-2xl"
      >
        <div className="flex items-center gap-3 border-b border-[var(--hairline)] px-5 py-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-faint shrink-0" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Ketik untuk mencari…"
            aria-label="Cari navigasi"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `palette-opt-${filtered[active].id}` : undefined}
            role="combobox"
            autoComplete="off"
            className="w-full bg-transparent text-ink placeholder:text-faint outline-none text-[15px]"
          />
          <kbd className="font-mono text-[11px] text-faint border border-[var(--hairline)] rounded px-1.5 py-0.5 shrink-0">
            ESC
          </kbd>
        </div>

        <div
          id="palette-list"
          ref={listRef}
          role="listbox"
          aria-label="Hasil navigasi"
          className="max-h-[320px] overflow-y-auto p-2"
        >
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-faint">
              Nggak ketemu… coba kata kunci lain.
            </p>
          )}
          {filtered.map((item, idx) => {
            const showKategori = item.kategori !== lastKategori;
            lastKategori = item.kategori;
            const isActive = idx === active;
            return (
              <div key={item.id}>
                {showKategori && (
                  <p className="px-3 pt-3 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                    {item.kategori}
                  </p>
                )}
                <button
                  id={`palette-opt-${item.id}`}
                  data-idx={idx}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => go(item)}
                  className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isActive ? "bg-[var(--primary)]/15" : ""
                  }`}
                >
                  <span>
                    <span className="block text-sm font-medium text-ink">{item.label}</span>
                    <span className="block text-xs text-faint">{item.deskripsi}</span>
                  </span>
                  {item.href && (
                    <span className="font-mono text-[10px] text-faint shrink-0">{item.href}</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-[var(--hairline)] px-5 py-2.5 font-mono text-[10px] text-faint">
          <span>↑↓ navigasi</span>
          <span>↵ pilih</span>
          <span>esc tutup</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
