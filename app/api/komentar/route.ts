import { NextResponse } from "next/server";
import { sb, supabaseSiap, validasiMasukan } from "@/lib/supabase";

type Baris = {
  id: string;
  slug: string;
  nama: string;
  pesan: string;
  parent_id: string | null;
  dibuat: string;
};

const SLUG_AMAN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** GET /api/komentar?slug=xxx — daftar komentar 1 artikel, terlama dulu. */
export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug") ?? "";
  if (!SLUG_AMAN.test(slug)) {
    return NextResponse.json({ comments: [] });
  }
  if (!supabaseSiap()) {
    return NextResponse.json({ comments: [] });
  }
  try {
    const baris = await sb<Baris[]>("komentar_blog", {
      query: `?select=id,slug,nama,pesan,parent_id,dibuat&slug=eq.${encodeURIComponent(slug)}&order=dibuat.asc&limit=500`,
    });
    return NextResponse.json({
      comments: baris.map((b) => ({
        id: b.id,
        nama: b.nama,
        pesan: b.pesan,
        parentId: b.parent_id,
        createdAt: b.dibuat,
      })),
    });
  } catch (e) {
    console.error("komentar GET:", e);
    return NextResponse.json({ comments: [] });
  }
}

/** POST /api/komentar — { slug, nama, pesan, parentId? } */
export async function POST(req: Request) {
  if (!supabaseSiap()) {
    return NextResponse.json(
      { error: "Penyimpanan belum dikonfigurasi." },
      { status: 503 }
    );
  }
  let slug = "";
  let nama = "";
  let pesan = "";
  let parentId: string | null = null;
  try {
    const body = await req.json();
    slug = String(body.slug ?? "").trim();
    nama = String(body.nama ?? "").trim();
    pesan = String(body.pesan ?? "").trim();
    parentId = body.parentId ? String(body.parentId) : null;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!SLUG_AMAN.test(slug)) {
    return NextResponse.json({ error: "Artikel tidak valid." }, { status: 400 });
  }
  const galat = validasiMasukan(nama, pesan);
  if (galat) return NextResponse.json({ error: galat }, { status: 400 });

  // Jika ini balasan, pastikan parent ada dan milik artikel yang sama.
  if (parentId) {
    try {
      const induk = await sb<Baris[]>("komentar_blog", {
        query: `?select=id,slug,parent_id&id=eq.${encodeURIComponent(parentId)}&limit=1`,
      });
      if (
        induk.length === 0 ||
        induk[0].slug !== slug ||
        induk[0].parent_id !== null // hanya 1 level balasan
      ) {
        return NextResponse.json(
          { error: "Komentar yang dibalas tidak ditemukan." },
          { status: 400 }
        );
      }
    } catch (e) {
      console.error("komentar cek parent:", e);
      return NextResponse.json(
        { error: "Gagal memverifikasi balasan, coba lagi." },
        { status: 500 }
      );
    }
  }

  try {
    const hasil = await sb<Baris[]>("komentar_blog", {
      method: "POST",
      body: { slug, nama, pesan, parent_id: parentId },
      prefer: "return=representation",
    });
    const b = hasil[0];
    return NextResponse.json({
      message: "Komentar terkirim!",
      comment: {
        id: b.id,
        nama: b.nama,
        pesan: b.pesan,
        parentId: b.parent_id,
        createdAt: b.dibuat,
      },
    });
  } catch (e) {
    console.error("komentar POST:", e);
    return NextResponse.json(
      { error: "Gagal menyimpan komentar, coba lagi." },
      { status: 500 }
    );
  }
}
