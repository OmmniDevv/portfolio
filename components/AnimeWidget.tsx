"use client";
import { useLang } from "@/lib/i18n";

/**
 * Widget "Anime Favorit" — data STATIS agar tidak bergantung API eksternal.
 *
 * TODO: ganti 6 entri di bawah dengan anime favorit kamu (judul, skor, genre).
 * Kalau nanti kamu kasih username MyAnimeList, widget ini bisa di-upgrade
 * untuk fetch otomatis dari Jikan API (https://api.jikan.moe/v4/users/{username}/animelist).
 */
export default function AnimeWidget() {
  const { t } = useLang();

  const FAVORITES = [
    { ...t.anime.item1, score: 9.1, hue: 265, cover: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg" },
    { ...t.anime.item2, score: 9.0, hue: 210, cover: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg" },
    { ...t.anime.item3, score: 8.9, hue: 190, cover: "https://cdn.myanimelist.net/images/anime/1795/95088.jpg" },
    { ...t.anime.item4, score: 8.8, hue: 150, cover: "https://cdn.myanimelist.net/images/anime/2/73862.jpg" },
    { ...t.anime.item5, score: 8.7, hue: 20, cover: "https://cdn.myanimelist.net/images/anime/4/19644.jpg" },
    { ...t.anime.item6, score: 8.6, hue: 330, cover: "https://cdn.myanimelist.net/images/anime/1590/154000.jpg" },
  ];

  return (
    <section aria-label={t.anime.label} className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">{t.anime.eyebrow}</p>
        <h2 className="font-bold tracking-tight text-3xl md:text-4xl">
          {t.anime.titleA} <span className="text-gradient-warm">{t.anime.titleB}</span>
        </h2>
        <p className="mt-3 text-soft max-w-xl">
          {t.anime.desc}
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {FAVORITES.map((a) => (
            <article key={a.title} className="glass card-interactive accent-rose p-4 flex gap-4 items-center">
              <div
                aria-hidden="true"
                className="w-14 h-20 rounded-lg shrink-0 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, hsl(${a.hue} 70% 55%), hsl(${(a.hue + 40) % 360} 70% 40%))`,
                }}
              >
                <img
                  src={a.cover}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2">{a.title}</h3>
                <p className="mt-1 font-mono text-xs text-faint">{a.genre}</p>
                <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[var(--rose)]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[var(--rose)]">
                  ★ {a.score.toFixed(1)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
