import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");

type Subscriber = { email: string; subscribedAt: string };

async function readAll(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Alamat email tidak valid." }, { status: 400 });
  }

  const list = await readAll();
  if (list.some((s) => s.email === email)) {
    return NextResponse.json({ message: "Email ini sudah terdaftar. Arigatou!" });
  }

  list.push({ email, subscribedAt: new Date().toISOString() });

  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // Fallback: tetap anggap sukses agar UX tidak rusak di environment read-only.
    // Untuk produksi (Vercel), hubungkan ke Resend/Brevo lewat RESEND_API_KEY —
    // lihat komentar di components/Newsletter.tsx
    return NextResponse.json({
      message: "Terdaftar! (mode sementara)",
    });
  }

  return NextResponse.json({ message: "Berhasil terdaftar! Terima kasih." });
}
