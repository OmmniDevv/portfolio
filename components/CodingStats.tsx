/**
 * "Live coding stats" — kartu statistik ngoding.
 *
 * TODO: sambungkan ke WakaTime API (https://wakatime.com/developers):
 *  1. Buat API key di https://wakatime.com/settings/api-key
 *     — JANGAN taruh API key di kode ini / di repo!
 *  2. Buat route server `app/api/wakatime/route.ts` yang membaca key dari
 *     env `WAKATIME_API_KEY` (server-only) lalu mem-proxy response WakaTime.
 *  3. Set `CONFIG.USE_LIVE_DATA = true` dan ganti PLACEHOLDER di bawah
 *     dengan fetch ke `CONFIG.ENDPOINT`.
 */
const CONFIG = {
  USE_LIVE_DATA: false,
  ENDPOINT: "/api/wakatime", // route server-side (belum diimplementasikan)
} as const;

// Data placeholder — tampil selama USE_LIVE_DATA = false.
const PLACEHOLDER = {
  weekHours: 18.5,
  dailyAvg: "2,6 jam",
  totalAllTime: "640+ jam",
  languages: [
    { name: "TypeScript", hours: 8.2, color: "#3178c6" },
    { name: "PHP", hours: 4.5, color: "#777bb4" },
    { name: "Python", hours: 3.1, color: "#3572a5" },
    { name: "CSS", hours: 2.7, color: "#a074c4" },
  ],
};

export default function CodingStats() {
  const data = PLACEHOLDER; // TODO: ganti dengan data live saat CONFIG.USE_LIVE_DATA
  const maxHours = Math.max(...data.languages.map((l) => l.hours));

  const stats = [
    { label: "Minggu ini", value: `${data.weekHours} jam` },
    { label: "Rata-rata harian", value: data.dailyAvg },
    { label: "Total", value: data.totalAllTime },
  ];

  return (
    <section aria-label="Statistik ngoding" className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow mb-4">Aktivitas</p>
        <h2 className="font-bold tracking-tight text-3xl md:text-4xl">
          Live Coding <span className="text-gradient">Stats</span>
        </h2>
        <p className="mt-3 text-soft max-w-xl">
          Jam ngoding tercatat otomatis.
          {!CONFIG.USE_LIVE_DATA && (
            <span className="text-faint"> (data contoh — hubungkan WakaTime untuk data live)</span>
          )}
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">{s.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 glass p-6">
          <h3 className="font-semibold">Bahasa teratas minggu ini</h3>
          <div className="mt-5 space-y-4">
            {data.languages.map((l) => (
              <div key={l.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-mono">{l.name}</span>
                  <span className="text-soft font-mono text-xs">{l.hours} jam</span>
                </div>
                <div
                  className="h-2.5 rounded-full bg-[var(--ink)]/10 overflow-hidden"
                  role="img"
                  aria-label={`${l.name}: ${l.hours} jam`}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(l.hours / maxHours) * 100}%`, background: l.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
