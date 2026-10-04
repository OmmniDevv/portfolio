import { NextResponse } from "next/server";
import { sb, supabaseSiap, validasiMasukan } from "@/lib/supabase";

type Baris = { id: string; nama: string; pesan: string; dibuat: string };

const KE_BENTUK_LAMA = (b: Baris) => ({
  nama: b.nama,
  pesan: b.pesan,
  createdAt: b.dibuat,
});

export async function GET() {
  if (!supabaseSiap()) {
    return NextResponse.json({ entries: [] });
  }
  try {
    const baris = await sb<Baris[]>("buku_tamu", {
      query: "?select=id,nama,pesan,dibuat&order=dibuat.desc&limit=100",
    });
    return NextResponse.json({ entries: baris.map(KE_BENTUK_LAMA) });
  } catch (e) {
    console.error("guestbook GET:", e);
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(req: Request) {
  if (!supabaseSiap()) {
    return NextResponse.json(
      { error: "Penyimpanan belum dikonfigurasi." },
      { status: 503 }
    );
  }
  let nama = "";
  let pesan = "";
  try {
    const body = await req.json();
    nama = String(body.nama ?? "").trim();
    pesan = String(body.pesan ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const galat = validasiMasukan(nama, pesan);
  if (galat) return NextResponse.json({ error: galat }, { status: 400 });

  try {
    const hasil = await sb<Baris[]>("buku_tamu", {
      method: "POST",
      body: { nama, pesan },
      prefer: "return=representation",
    });
    const tersimpan = hasil[0];
    return NextResponse.json({
      message: "Pesan terkirim! Terima kasih.",
      entry: KE_BENTUK_LAMA(tersimpan),
    });
  } catch (e) {
    console.error("guestbook POST:", e);
    return NextResponse.json(
      { error: "Gagal menyimpan pesan, coba lagi." },
      { status: 500 }
    );
  }
}
