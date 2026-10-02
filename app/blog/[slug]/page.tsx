import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Tidak ditemukan · OmniDev" };
  return {
    title: `${post.title} · OmniDev`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <article className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="font-inter text-xs text-parchment/45 hover:text-gold transition-colors"
        >
          ← Semua tulisan
        </Link>

        <header className="mt-8 mb-10">
          <h1 className="font-cinzel text-3xl md:text-4xl text-parchment leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-5 font-inter text-xs text-parchment/40">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.minutes} menit baca</span>
            {post.tags.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="text-gold/70">#{t}</span>
                  ))}
                </span>
              </>
            )}
          </div>
          <div className="rune-divider mt-8" aria-hidden="true" />
        </header>

        <div className="blog-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="font-cinzel text-xl text-gold mt-10 mb-4 tracking-wide">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-cinzel text-lg text-parchment mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="font-inter text-parchment/75 text-[15px] leading-[1.85] mb-5">{children}</p>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-gold hover:underline" target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="font-inter text-parchment/75 text-[15px] leading-relaxed mb-5 ml-5 list-disc space-y-2 marker:text-gold/60">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="font-inter text-parchment/75 text-[15px] leading-relaxed mb-5 ml-5 list-decimal space-y-2 marker:text-gold/60">{children}</ol>
              ),
              code: ({ className, children }) => {
                const block = className?.includes("language-");
                return block ? (
                  <code className={className}>{children}</code>
                ) : (
                  <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-gold/10 text-gold/90 border border-gold/20">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="font-mono text-[13px] leading-relaxed bg-navy/70 border border-gold/20 rounded-lg p-5 mb-6 overflow-x-auto text-parchment/80">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-gold/50 pl-5 my-6 font-inter italic text-parchment/60 text-[15px]">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6">
                  <table className="w-full font-inter text-sm text-parchment/75 border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gold/20 bg-gold/5 px-4 py-2.5 text-left font-cinzel text-xs tracking-wider text-gold/80">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gold/15 px-4 py-2.5">{children}</td>
              ),
              hr: () => <div className="rune-divider my-10" aria-hidden="true" />,
              input: (props) => (
                <input {...props} disabled className="accent-[#C8A96E] mr-2" />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-14">
          <div className="rune-divider mb-8" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-inter text-sm text-parchment/45">
              Suka tulisannya? Kabari aku.
            </p>
            <div className="flex gap-3">
              <Link href="/blog" className="genshin-btn">
                Tulisan lain
              </Link>
              <Link href="/#contact" className="genshin-btn-filled">
                Hubungi aku
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
