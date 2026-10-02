"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { useLang } from "@/lib/i18n";

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { label: t.nav.about, href: "/#tentang" },
    { label: t.nav.skills, href: "/#kemampuan" },
    { label: t.nav.projects, href: "/#proyek" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/#kontak" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong !rounded-none border-x-0 border-t-0" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label={t.nav.mainNavLabel}>
        <Link href="/" className="font-bold text-lg tracking-tight text-ink">
          Omni<span className="text-gradient">Dev</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm text-soft hover:text-ink transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/#kontak" className="btn-primary !min-h-[44px] !px-6 text-sm">
            {t.buttons.letsTalk}
          </Link>
          <LangToggle />
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <button
          className="w-11 h-11 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        >
          <span className={`block w-6 h-0.5 bg-ink transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden glass-strong !rounded-none border-x-0 px-6 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-ink border-b border-[var(--hairline)] last:border-0"
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
