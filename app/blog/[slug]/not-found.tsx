import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="text-center max-w-md">
        <p className="font-jp text-gold/50 text-lg mb-4">迷子</p>
        <h1 className="font-cinzel text-3xl text-parchment mb-4">
          Tulisan tidak ditemukan
        </h1>
        <p className="font-inter text-parchment/55 text-sm leading-relaxed mb-8">
          Halaman ini isekai ke dunia lain. Mungkin URL-nya salah ketik,
          atau tulisannya sudah dihapus.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/blog" className="genshin-btn-filled">
            Semua tulisan
          </Link>
          <Link href="/#hero" className="genshin-btn">
            Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
