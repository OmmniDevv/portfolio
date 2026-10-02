import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog · OmniDev",
  description: "Tulisan tentang ngoding, bot, dan hal-hal lain yang sedang dipelajari.",
};

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function TagRow({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((t) => (
        <span
          key={t}
          className="font-inter text-[11px] px-2 py-0.5 rounded border border-gold/25 text-gold/70"
        >
          #{t}
        </span>
      ))}
    </div>
  );
}

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="rune-divider mb-4">
          <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
            Tulisan <span className="font-jp text-gold/40">・記事</span>
          </span>
        </div>
        <h1 className="section-heading text-center">Blog</h1>
        <p className="font-inter text-parchment/55 text-sm text-center mt-4 mb-14 max-w-md mx-auto leading-relaxed">
          Catatan belajar, eksperimen, dan hal-hal yang menurutku layak ditulis.
        </p>

        {posts.length === 0 ? (
          <div className="vision-card p-12 text-center">
            <p className="font-cinzel text-parchment/70 tracking-wider mb-2">
              Belum ada tulisan
            </p>
            <p className="font-inter text-parchment/45 text-sm leading-relaxed">
              Sabar ya, tulisan pertama lagi dimasak. Sementara itu, intip{" "}
              <Link href="/#projects" className="text-gold hover:underline">
                projectku
              </Link>{" "}
              dulu.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="block vision-card p-8 md:p-10 mb-8 group hover:border-gold/50 transition-colors"
              >
                <p className="font-cinzel text-[11px] text-gold/60 tracking-[0.25em] uppercase mb-3">
                  Terbaru
                </p>
                <h2 className="font-cinzel text-2xl md:text-3xl text-parchment group-hover:text-gold transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="font-inter text-parchment/55 text-sm leading-relaxed mt-4">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-5 font-inter text-xs text-parchment/40">
                  <span>{formatDate(featured.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.minutes} menit baca</span>
                </div>
                <TagRow tags={featured.tags} />
              </Link>
            )}

            <div className="flex flex-col">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group py-6 border-b border-gold/10 first:border-t hover:bg-gold/[0.03] transition-colors px-2 -mx-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="font-inter text-xs text-parchment/40 tabular-nums shrink-0 sm:w-28">
                      {formatDate(post.date)}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-cinzel text-lg text-parchment group-hover:text-gold transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="font-inter text-parchment/50 text-sm mt-1.5 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="font-inter text-xs text-parchment/35 mt-2">
                        {post.minutes} menit baca
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="mt-14 text-center">
          <Link href="/#hero" className="genshin-btn">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
