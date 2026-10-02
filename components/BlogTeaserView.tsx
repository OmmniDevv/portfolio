"use client";
import Link from "next/link";
import type { Post } from "@/lib/blog";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

export default function BlogTeaserView({ posts }: { posts: Post[] }) {
  const { t } = useLang();

  return (
    <section id="blog" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">{t.blogTeaser.eyebrow}</p>
              <h2 className="font-bold tracking-tight text-3xl md:text-5xl">{t.blogTeaser.title}</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline shrink-0">
              {t.blogTeaser.allPosts}
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {posts.length === 0 ? (
            <div className="glass p-10 text-center md:col-span-3">
              <p className="text-soft text-sm">{t.blogTeaser.empty}</p>
            </div>
          ) : (
            posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="glass p-6 h-full flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group"
                >
                  <p className="font-mono text-xs text-faint">{p.date}</p>
                  <h3 className="font-bold text-lg text-ink group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-soft text-sm leading-relaxed flex-1 line-clamp-2">{p.excerpt}</p>
                  <p className="text-xs text-faint">{p.minutes} {t.blogTeaser.minRead}</p>
                </Link>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
