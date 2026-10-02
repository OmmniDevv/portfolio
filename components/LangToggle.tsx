"use client";
import { useLang, type Lang } from "@/lib/i18n";

/** Toggle bahasa pill ID|EN. Pasang manual di Navbar (desktop & mobile) nanti. */
export default function LangToggle() {
  const { lang, setLang } = useLang();
  const opts: Lang[] = ["id", "en"];

  return (
    <div
      className="glass rounded-full p-1 flex items-center gap-1"
      role="group"
      aria-label="Pilih bahasa / Choose language"
    >
      {opts.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`h-9 min-w-[44px] px-3 rounded-full font-mono text-xs font-semibold uppercase tracking-widest transition-all ${
              active
                ? "bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white shadow"
                : "text-soft hover:text-ink"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
