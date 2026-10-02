/**
 * Widget "Anime Favorit" — data STATIS agar tidak bergantung API eksternal.
 *
 * TODO: ganti 6 entri di bawah dengan anime favorit kamu (judul, skor, genre).
 * Kalau nanti kamu kasih username MyAnimeList, widget ini bisa di-upgrade
 * untuk fetch otomatis dari Jikan API (https://api.jikan.moe/v4/users/{username}/animelist).
 */
const FAVORITES = [
  { title: "Frieren: Beyond Journey's End", score: 9.1, genre: "Fantasy", hue: 265 },
  { title: "Steins;Gate", score: 9.0, genre: "Sci-Fi", hue: 210 },
  { title: "Violet Evergarden", score: 8.9, genre: "Drama", hue: 190 },
  { title: "Mushishi", score: 8.8, genre: "Slice of Life", hue: 150 },
  { title: "Cowboy Bebop", score: 8.7, genre: "Space Western", hue: 20 },
  { title: "March Comes in Like a Lion", score: 8.6, genre: "Drama", hue: 330 },
];

export default function AnimeWidget() {
  return (
    <section aria-label="Anime favorit" className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">Hobi</p>
        <h2 className="font-bold tracking-tight text-3xl md:text-4xl">
          Anime <span className="text-gradient">Favorit</span>
        </h2>
        <p className="mt-3 text-soft max-w-xl">
          Selain ngoding, saya juga penikmat anime. Ini daftar yang paling berkesan.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {FAVORITES.map((a) => (
            <article key={a.title} className="glass p-4 flex gap-4 items-center">
              {/* Cover placeholder gradient */}
              <div
                aria-hidden="true"
                className="w-14 h-20 rounded-lg shrink-0"
                style={{
                  background: `linear-gradient(135deg, hsl(${a.hue} 70% 55%), hsl(${(a.hue + 40) % 360} 70% 40%))`,
                }}
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm leading-snug line-clamp-2">{a.title}</h3>
                <p className="mt-1 font-mono text-xs text-faint">{a.genre}</p>
                <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[var(--primary)]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[var(--primary)]">
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
