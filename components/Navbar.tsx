"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Tentang", href: "/#tentang" },
  { label: "Skill", href: "/#skill" },
  { label: "Proyek", href: "/#proyek" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/#kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong !rounded-none border-x-0 border-t-0" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Navigasi utama">
        <Link href="/" className="font-display font-700 text-lg tracking-tight font-bold">
          Omni<span className="text-accent">Dev</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-muted hover:text-mist transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          <span className={`block w-6 h-0.5 bg-mist transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-mist transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-mist transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden glass-strong !rounded-none border-x-0 px-6 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-mist border-b border-white/5 last:border-0"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
