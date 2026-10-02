"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

/**
 * Kamus string UI utama. Cakupan saat ini: Navbar, Hero, tombol-tombol utama.
 *
 * TODO: konten panjang (About, Capabilities, Projects, Journey, Blog, Contact,
 * Newsletter, Footer) masih Bahasa Indonesia dulu — terjemahkan bertahap per section
 * dengan menambah key di bawah lalu memakainya lewat `const { t } = useLang()`.
 */
const STRINGS = {
  id: {
    nav: {
      about: "Tentang",
      skills: "Kemampuan",
      projects: "Proyek",
      blog: "Blog",
      contact: "Kontak",
      cta: "Mari Bicara",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      mainNavLabel: "Navigasi utama",
    },
    hero: {
      eyebrow: "Studio — Portfolio Pribadi",
      titleA: "Kami membangun",
      titleHighlight: "produk digital",
      titleB: "yang memberikan hasil nyata.",
      intro:
        "Halo, saya Abdul Malik Rizky Nur Rahmat. Junior developer dari Bandung yang fokus bikin website cepat dan bot automasi yang rapi.",
      viewProjects: "Lihat Proyek",
      contactMe: "Hubungi Saya",
      hint: "Psst — klik Mao di sebelah kanan, dia bisa diajak interaksi!",
    },
    buttons: {
      viewProjects: "Lihat Proyek",
      contactMe: "Hubungi Saya",
      letsTalk: "Mari Bicara",
      send: "Kirim",
      subscribe: "Berlangganan",
      downloadCv: "Download CV",
      printCv: "Print / Simpan PDF",
      readMore: "Baca Selengkapnya",
      backHome: "Kembali ke Beranda",
      back: "Kembali",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      cta: "Let's Talk",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mainNavLabel: "Main navigation",
    },
    hero: {
      eyebrow: "Studio — Personal Portfolio",
      titleA: "We build",
      titleHighlight: "digital products",
      titleB: "that deliver real results.",
      intro:
        "Hi, I'm Abdul Malik Rizky Nur Rahmat. A junior developer from Bandung focused on fast websites and tidy automation bots.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      hint: "Psst — click Mao on the right, she's interactive!",
    },
    buttons: {
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      letsTalk: "Let's Talk",
      send: "Send",
      subscribe: "Subscribe",
      downloadCv: "Download CV",
      printCv: "Print / Save PDF",
      readMore: "Read More",
      backHome: "Back to Home",
      back: "Back",
    },
  },
} as const;

type _RawStrings = typeof STRINGS.id;
/** Tipe kamus: struktur dari ID, nilai sebagai string umum (bukan literal). */
export type Strings = { [K in keyof _RawStrings]: _RawStrings[K] extends object ? { [K2 in keyof _RawStrings[K]]: _RawStrings[K][K2] extends object ? { [K3 in keyof _RawStrings[K][K2]]: string } : string } : string };

const TYPED_STRINGS: Record<Lang, Strings> = STRINGS;

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "id" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* abaikan — pakai default 'id' */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* abaikan */
    }
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: TYPED_STRINGS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

/** Ambil bahasa aktif + kamus string. Harus dipakai di dalam <LangProvider>. */
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang harus dipakai di dalam <LangProvider>");
  return ctx;
}
