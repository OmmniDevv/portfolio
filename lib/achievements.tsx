"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/* Definisi badge                                                      */
/* ------------------------------------------------------------------ */

export type BadgeId =
  | "sapa-mao"
  | "dua-sisi"
  | "ninja-keyboard"
  | "penjelajah-bawah"
  | "kode-rahasia"
  | "penulis-pesan";

export interface Badge {
  id: BadgeId;
  nama: string;
  deskripsi: string;
  /** Cara membuka — ditampilkan sebagai hint di kartu yang masih terkunci. */
  caraBuka: string;
}

export const BADGES: Badge[] = [
  {
    id: "sapa-mao",
    nama: "Sahabat Mao",
    deskripsi: "Klik Mao si karakter Live2D sebanyak 5 kali.",
    caraBuka: "Klik Mao 5x",
  },
  {
    id: "dua-sisi",
    nama: "Dua Sisi",
    deskripsi: "Ganti tema terang/gelap lewat tombol di navbar.",
    caraBuka: "Ganti tema",
  },
  {
    id: "ninja-keyboard",
    nama: "Ninja Keyboard",
    deskripsi: "Buka command palette dengan Ctrl+K / Cmd+K.",
    caraBuka: "Tekan Ctrl+K",
  },
  {
    id: "penjelajah-bawah",
    nama: "Penjelajah Bawah",
    deskripsi: "Scroll sampai mentok ke bagian paling bawah halaman.",
    caraBuka: "Scroll sampai bawah",
  },
  {
    id: "kode-rahasia",
    nama: "Kode Rahasia",
    deskripsi: "Ketik kode Konami: ↑ ↑ ↓ ↓ ← → ← → B A.",
    caraBuka: "↑↑↓↓←→←→BA",
  },
  {
    id: "penulis-pesan",
    nama: "Penulis Pesan",
    deskripsi: "Tinggalkan pesan di buku tamu.",
    caraBuka: "Isi buku tamu",
  },
];

/* ------------------------------------------------------------------ */
/* Event contract (untuk komponen lain, tanpa perlu import context)    */
/*                                                                     */
/*  window.dispatchEvent(new CustomEvent("kana:achievement",           */
/*    { detail: { id: "sapa-mao" } }))        -> unlock badge langsung  */
/*  window.dispatchEvent(new Event("kana:mao-click"))                   */
/*    -> hitung klik Mao (unlock "sapa-mao" di klik ke-5)              */
/*  window.dispatchEvent(new Event("kana:palette-open"))                */
/*    -> unlock "ninja-keyboard"                                       */
/*  window.dispatchEvent(new Event("kana:guestbook-post"))              */
/*    -> unlock "penulis-pesan"                                       */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "kana-achievements-v1";
const MAO_CLICKS_NEEDED = 5;

interface StoredState {
  unlocked: Record<string, string>; // badgeId -> ISO timestamp
  maoClicks: number;
}

function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { unlocked: {}, maoClicks: 0 };
    const parsed = JSON.parse(raw);
    return {
      unlocked: parsed.unlocked && typeof parsed.unlocked === "object" ? parsed.unlocked : {},
      maoClicks: typeof parsed.maoClicks === "number" ? parsed.maoClicks : 0,
    };
  } catch {
    return { unlocked: {}, maoClicks: 0 };
  }
}

interface AchievementsContextValue {
  unlocked: Record<string, string>;
  maoClicks: number;
  unlock: (id: BadgeId) => void;
  isUnlocked: (id: BadgeId) => boolean;
  openedCount: number;
  totalCount: number;
}

const AchievementsContext = createContext<AchievementsContextValue | null>(null);

export function useAchievements(): AchievementsContextValue {
  const ctx = useContext(AchievementsContext);
  if (!ctx) throw new Error("useAchievements harus dipakai di dalam <AchievementsProvider>");
  return ctx;
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>({ unlocked: {}, maoClicks: 0 });
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Muat dari localStorage sekali saat mount (client-only).
  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Simpan setiap ada perubahan (lewati render pertama sebelum hydrate).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateRef.current));
    } catch {}
  }, [state, hydrated]);

  const unlock = useCallback((id: BadgeId) => {
    setState((prev) => {
      if (prev.unlocked[id]) return prev;
      return { ...prev, unlocked: { ...prev.unlocked, [id]: new Date().toISOString() } };
    });
  }, []);

  const bumpMaoClicks = useCallback(() => {
    setState((prev) => {
      const next = prev.maoClicks + 1;
      const unlocked =
        next >= MAO_CLICKS_NEEDED && !prev.unlocked["sapa-mao"]
          ? { ...prev.unlocked, "sapa-mao": new Date().toISOString() }
          : prev.unlocked;
      return { ...prev, maoClicks: next, unlocked };
    });
  }, []);

  useEffect(() => {
    /* --- Custom events dari komponen lain --- */
    const onDirect = (e: Event) => {
      const id = (e as CustomEvent).detail?.id as BadgeId | undefined;
      if (id && BADGES.some((b) => b.id === id)) unlock(id);
    };
    const onMaoClick = () => bumpMaoClicks();
    const onPaletteOpen = () => unlock("ninja-keyboard");
    const onGuestbookPost = () => unlock("penulis-pesan");

    /* --- Klik Mao tanpa ubah Live2DHero: delegasi klik pada canvas-nya --- */
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.('canvas[aria-label*="Mao"]')) bumpMaoClicks();
    };

    /* --- Deteksi ganti tema via MutationObserver (tanpa ubah ThemeToggle) --- */
    let lastDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.classList.contains("dark");
      if (nowDark !== lastDark) {
        lastDark = nowDark;
        unlock("dua-sisi");
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    /* --- Kode Konami --- */
    let konamiIdx = 0;
    const onKeyDown = (e: KeyboardEvent) => {
      // Abaikan saat mengetik di input/textarea agar tidak bentrok.
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        konamiIdx = 0;
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konamiIdx = key === KONAMI[konamiIdx] ? konamiIdx + 1 : key === KONAMI[0] ? 1 : 0;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        unlock("kode-rahasia");
      }
    };

    /* --- Scroll sampai bawah --- */
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const nearBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
        if (nearBottom) unlock("penjelajah-bawah");
      });
    };

    window.addEventListener("kana:achievement", onDirect);
    window.addEventListener("kana:mao-click", onMaoClick);
    window.addEventListener("kana:palette-open", onPaletteOpen);
    window.addEventListener("kana:guestbook-post", onGuestbookPost);
    document.addEventListener("click", onDocClick);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Cek sekali saat mount (halaman pendek langsung mentok bawah).
    onScroll();

    return () => {
      window.removeEventListener("kana:achievement", onDirect);
      window.removeEventListener("kana:mao-click", onMaoClick);
      window.removeEventListener("kana:palette-open", onPaletteOpen);
      window.removeEventListener("kana:guestbook-post", onGuestbookPost);
      document.removeEventListener("click", onDocClick);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [unlock, bumpMaoClicks]);

  const value = useMemo<AchievementsContextValue>(() => {
    const openedCount = BADGES.filter((b) => state.unlocked[b.id]).length;
    return {
      unlocked: state.unlocked,
      maoClicks: state.maoClicks,
      unlock,
      isUnlocked: (id) => Boolean(state.unlocked[id]),
      openedCount,
      totalCount: BADGES.length,
    };
  }, [state, unlock]);

  return <AchievementsContext.Provider value={value}>{children}</AchievementsContext.Provider>;
}
