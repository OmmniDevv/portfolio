import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "guestbook.json");

type Entry = { nama: string; pesan: string; createdAt: string };

async function readAll(): Promise<Entry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET() {
  const list = await readAll();
  // Terbaru dulu.
  const sorted = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ entries: sorted });
}

export async function POST(req: Request) {
  let nama = "";
  let pesan = "";
  try {
    const body = await req.json();
    nama = String(body.nama ?? "").trim();
    pesan = String(body.pesan ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (nama.length < 1 || nama.length > 50) {
    return NextResponse.json(
      { error: "Nama wajib diisi (maksimal 50 karakter)." },
      { status: 400 }
    );
  }
  if (pesan.length < 1 || pesan.length > 500) {
    return NextResponse.json(
      { error: "Pesan wajib diisi (maksimal 500 karakter)." },
      { status: 400 }
    );
  }

  const entry: Entry = { nama, pesan, createdAt: new Date().toISOString() };
  const list = await readAll();
  list.push(entry);

  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // Fallback: tetap anggap sukses agar UX tidak rusak di environment read-only.
    // Catatan: di Vercel filesystem tidak persisten — untuk produksi yang
    // durable, pindahkan ke database/KV (mis. Vercel KV, Supabase, dsb).
    return NextResponse.json({
      message: "Pesan terkirim! (mode sementara)",
      entry,
    });
  }

  return NextResponse.json({ message: "Pesan terkirim! Terima kasih.", entry });
}
