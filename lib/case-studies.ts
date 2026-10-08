export type CaseStudy = {
  slug: string;
  judul: string;
  ringkasan: string;
  durasi: string;
  peran: string;
  masalah: string[];
  solusi: string[];
  techStack: string[];
  hasil: string[];
};

/* ================================
   EDIT DI SINI: tambah/edit case study.
   slug dipakai untuk URL /studi-kasus/[slug]
================================ */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "company-profile-umkm-kuliner",
    judul: "Website Company Profile UMKM Kuliner",
    ringkasan:
      "Website company profile untuk usaha kuliner lokal: katalog menu, lokasi, dan tombol order via WhatsApp.",
    durasi: "3 minggu",
    peran: "Solo developer, desain sampai deploy",
    masalah: [
      "Usaha hanya mengandalkan Instagram; calon pembeli kesulitan melihat daftar menu lengkap dan harga.",
      "Tidak ada kehadiran di Google, pencarian nama usaha tidak menampilkan info resmi.",
      "Pemilik gaptek: butuh cara update menu tanpa ngoding.",
    ],
    solusi: [
      "Bangun company profile Next.js dengan halaman menu yang datanya diambil dari file konten sederhana.",
      "Tambah SEO dasar (metadata, sitemap) + Google Business Profile biar muncul di pencarian.",
      "Tombol 'Pesan via WhatsApp' dengan pesan otomatis berisi daftar pesanan.",
      "Panduan update menu via edit file teks + deploy otomatis dari GitHub.",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    hasil: [
      "Halaman 1 Google untuk nama usaha dalam 2 minggu",
      "80% pesanan masuk lewat tombol WhatsApp di website",
      "Pemilik bisa update menu sendiri tanpa bantuan",
    ],
  },
  {
    slug: "bot-whatsapp-notifikasi-toko",
    judul: "Bot WhatsApp Notifikasi & Auto-Reply Toko",
    ringkasan:
      "Bot WhatsApp untuk toko online: notifikasi pesanan otomatis, auto-reply FAQ, dan rekap harian ke owner.",
    durasi: "4 minggu",
    peran: "Backend developer",
    masalah: [
      "Owner kewalahan balas chat yang itu-itu aja (jam buka, ongkir, stok) sampai larut malam.",
      "Pesanan dari marketplace harus dicek manual satu per satu, sering kelewat.",
      "Tidak ada rekap penjualan harian yang rapi.",
    ],
    solusi: [
      "Bangun bot Baileys (Node.js) dengan auto-reply berbasis keyword untuk FAQ.",
      "Webhook dari marketplace → notifikasi WhatsApp real-time ke owner tiap ada pesanan baru.",
      "Perintah !rekap untuk laporan penjualan harian otomatis jam 21:00.",
      "Rate limit + antispam biar nomor bot aman dari banned.",
    ],
    techStack: ["Node.js", "TypeScript", "Baileys", "MySQL"],
    hasil: [
      "Waktu balas chat turun dari jam-an ke detik",
      "Zero pesanan kelewat sejak bot jalan",
      "Owner dapat rekap otomatis tiap malam tanpa buka laptop",
    ],
  },
  {
    slug: "dashboard-monitoring-sekolah",
    judul: "Dashboard Monitoring Kegiatan Sekolah",
    ringkasan:
      "Dashboard internal untuk sekolah: monitoring presensi, grafik 6 bulan, dan export laporan Excel.",
    durasi: "6 minggu",
    peran: "Full-stack developer",
    masalah: [
      "Data presensi dan sirkulasi masih di Excel terpisah, rekap bulanan makan waktu berhari-hari.",
      "Kepala sekolah tidak punya gambaran tren: buku populer, jam ramai, denda menunggak.",
      "Laporan harus diketik ulang manual untuk rapat.",
    ],
    solusi: [
      "Bangun aplikasi Laravel + MySQL sebagai sumber data tunggal.",
      "Dashboard dengan grafik tren 6 bulan (Chart.js): kunjungan & peminjaman.",
      "Export laporan ke Excel satu klik (per kategori: sirkulasi, denda, buku populer).",
      "Role admin/petugas dengan audit log tiap perubahan data.",
    ],
    techStack: ["Laravel", "MySQL", "Chart.js", "Tailwind CSS"],
    hasil: [
      "Rekap bulanan dari 3 hari jadi 10 menit",
      "Kepala sekolah pantau tren real-time dari HP",
      "Audit log bikin data lebih akuntabel",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES;
}
