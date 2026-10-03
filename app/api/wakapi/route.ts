import { NextResponse } from "next/server";

// Proxy server-side ke WakAPI (kompatibel API WakaTime).
// API key TIDAK PERNAH ke client — hanya dibaca dari env di sini.
export const revalidate = 1800; // cache 30 menit

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  PHP: "#777bb4",
  CSS: "#a074c4",
  HTML: "#e34c26",
  Vue: "#41b883",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  Blade: "#f7523f",
  Dart: "#00b4ab",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Shell: "#89e051",
  JSON: "#cbcb41",
  Markdown: "#083fa1",
};

export async function GET() {
  const base = (process.env.WAKAPI_URL || "").replace(/\/$/, "");
  const apiPath = (process.env.WAKAPI_API_PATH || "/api/compat/wakatime/v1").replace(/\/$/, "");
  const key = process.env.WAKAPI_API_KEY || "";

  if (!base || !key) {
    return NextResponse.json(
      { error: "WakAPI belum dikonfigurasi (WAKAPI_URL / WAKAPI_API_KEY)" },
      { status: 503 }
    );
  }

  // Konvensi auth WakaTime: Basic base64(api_key)
  const headers = {
    Authorization: "Basic " + Buffer.from(key).toString("base64"),
  };

  try {
    const [statsRes, allTimeRes] = await Promise.all([
      fetch(`${base}${apiPath}/users/current/stats/last_7_days`, {
        headers,
      }),
      fetch(`${base}${apiPath}/users/current/all_time_since_today`, {
        headers,
      }),
    ]);

    if (!statsRes.ok) {
      throw new Error(`WakAPI stats error: ${statsRes.status}`);
    }

    const stats = await statsRes.json();
    const d = stats.data || {};
    const totalSec = d.total_seconds || 0;

    const languages = ((d.languages || []) as any[])
      .slice(0, 6)
      .map((l) => ({
        name: l.name as string,
        hours: Math.round(((l.total_seconds || 0) / 3600) * 10) / 10,
        color: LANG_COLORS[l.name as string] || "#8b5cf6",
      }));

    const weekHours = Math.round((totalSec / 3600) * 10) / 10;

    // all_time tidak wajib — beberapa instance (mis. Hackatime) tidak menyediakannya
    let totalHours: number | null = null;
    if (allTimeRes.ok) {
      try {
        const at = await allTimeRes.json();
        const sec = at.data?.total_seconds;
        if (typeof sec === "number") {
          totalHours = Math.round((sec / 3600) * 10) / 10;
        }
      } catch {}
    }

    return NextResponse.json({
      weekHours,
      dailyAvgHours: Math.round((weekHours / 7) * 10) / 10,
      totalHours,
      languages,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Gagal mengambil data WakAPI" },
      { status: 502 }
    );
  }
}
