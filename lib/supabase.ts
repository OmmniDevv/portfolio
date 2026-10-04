/**
 * Helper server-only untuk Supabase PostgREST (anon key + RLS).
 * Dipakai API routes buku tamu & komentar blog agar data tersimpan permanen.
 * Env yang dibutuhkan (di Vercel): SUPABASE_URL, SUPABASE_ANON_KEY.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

export function supabaseSiap(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

type Opsi = {
  method?: string;
  query?: string;
  body?: unknown;
  prefer?: string;
};

/** Panggil PostgREST. Melempar Error jika gagal. */
export async function sb<T = any>(
  tabel: string,
  { method = "GET", query = "", body, prefer }: Opsi = {}
): Promise<T> {
  if (!supabaseSiap()) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY belum dikonfigurasi.");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${tabel}${query}`, {
    method,
    cache: "no-store",
    headers: {
      apikey: SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const teks = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${teks.slice(0, 200)}`);
  }
  const teks = await res.text();
  return (teks ? JSON.parse(teks) : null) as T;
}

/** Validasi nama & pesan untuk input publik. Mengembalikan pesan error atau null. */
export function validasiMasukan(nama: string, pesan: string): string | null {
  if (nama.length < 1 || nama.length > 50)
    return "Nama wajib diisi (maksimal 50 karakter).";
  if (pesan.length < 1 || pesan.length > 500)
    return "Pesan wajib diisi (maksimal 500 karakter).";
  return null;
}
