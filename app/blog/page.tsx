import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog · OmniDev",
  description: "Tulisan tentang ngoding, bot, dan hal-hal lain yang sedang dipelajari.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">Blog</p>
        <h1 className="font-display font-bold tracking-tight text-4xl md:text-5xl">Tulisan</h1>
        <p className="text-soft mt-4 mb-12 max-w-md leading-relaxed">
          Catatan belajar dan eksperimen.
        </p>

        {posts.length === 0 ? (
          <div className="glass p-12 text-center">
            <p className="text-ink font-medium mb-2">Belum ada tulisan</p>
            <p className="text-soft text-sm">
              Sementara itu, intip{" "}
              <Link href="/#proyek" className="text-primary hover:underline">proyekku</Link> dulu.
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group py-7 border-b border-[var(--hairline)] first:border-t px-2 -mx-2 hover:bg-[var(--glass-bg)] transition-colors flex gap-5 items-start"
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shrink-0"
                  />
                ) : null}
                <div className="min-w-0">
                  <p className="font-mono text-xs text-faint mb-2">{p.date}</p>
                  <h2 className="font-display font-semibold text-xl text-ink group-hover:text-primary transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-soft text-sm mt-2 leading-relaxed line-clamp-2">{p.excerpt}</p>
                  <p className="text-xs text-faint mt-3">{p.minutes} menit baca</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link href="/" className="btn-ghost text-sm">Kembali ke beranda</Link>
        </div>
      </div>
    </main>
  );
}
