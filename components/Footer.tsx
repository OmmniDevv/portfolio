"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[var(--hairline)] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-bold tracking-tight">
            Omni<span className="text-gradient">Dev</span>
          </p>
          <nav aria-label={t.footer.extraNavLabel} className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-soft">
            <Link href="/now" className="hover:text-ink transition-colors">Now</Link>
            <Link href="/changelog" className="hover:text-ink transition-colors">Changelog</Link>
            <Link href="/cv" className="hover:text-ink transition-colors">CV</Link>
            <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
          </nav>
        </div>
        <p className="text-faint text-xs text-center">
          {t.footer.creditA}
          <br />
          {t.footer.creditB}
        </p>
      </div>
    </footer>
  );
}
