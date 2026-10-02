import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-accent text-sm mb-4">404</p>
        <h1 className="font-display font-bold text-3xl mb-4">Halaman tidak ditemukan</h1>
        <p className="text-muted text-sm mb-8">Tulisan yang kamu cari tidak ada atau sudah dihapus.</p>
        <Link href="/blog" className="btn-primary text-sm">Semua tulisan</Link>
      </div>
    </main>
  );
}
