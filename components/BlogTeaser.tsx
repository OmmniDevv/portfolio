import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Reveal from "./Reveal";

export default async function BlogTeaser() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <section id="blog" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">Blog</p>
              <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
                Tulisan terbaru
              </h2>
            </div>
            <Link href="/blog" className="text-sm text-accent hover:underline shrink-0">
              Semua tulisan
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col">
          {posts.length === 0 ? (
            <div className="glass p-10 text-center">
              <p className="text-muted text-sm">Belum ada tulisan. Segera hadir.</p>
            </div>
          ) : (
            posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-baseline gap-6 py-6 border-b border-white/8 first:border-t px-2 -mx-2 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-mono text-xs text-faint shrink-0 w-24 hidden sm:block">
                    {p.date}
                  </span>
                  <span className="flex-1">
                    <span className="font-display font-semibold text-mist group-hover:text-accent transition-colors">
                      {p.title}
                    </span>
                    <span className="block text-muted text-sm mt-1 line-clamp-1">{p.excerpt}</span>
                  </span>
                  <span className="text-xs text-faint shrink-0">{p.minutes} mnt</span>
                </Link>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
