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
  return { title: `${post.title} · OmniDev`, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <article className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-sm text-muted hover:text-accent transition-colors">
          ← Semua tulisan
        </Link>
        <h1 className="font-display font-bold tracking-tight text-3xl md:text-4xl mt-8 leading-tight">
          {post.title}
        </h1>
        <p className="font-mono text-xs text-faint mt-4">
          {post.date} · {post.minutes} menit baca
        </p>
        <hr className="border-white/8 my-10" />

        <div className="blog-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 className="font-display font-bold text-xl text-mist mt-10 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="font-display font-semibold text-lg text-mist mt-8 mb-3">{children}</h3>,
              p: ({ children }) => <p className="text-muted text-[16px] leading-[1.8] mb-5">{children}</p>,
              a: ({ href, children }) => <a href={href} className="text-accent hover:underline">{children}</a>,
              ul: ({ children }) => <ul className="text-muted mb-5 ml-5 list-disc space-y-2 marker:text-faint">{children}</ul>,
              ol: ({ children }) => <ol className="text-muted mb-5 ml-5 list-decimal space-y-2 marker:text-faint">{children}</ol>,
              code: ({ className, children }) =>
                className?.includes("language-") ? (
                  <code className={className}>{children}</code>
                ) : (
                  <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-white/8 text-mist">{children}</code>
                ),
              pre: ({ children }) => (
                <pre className="font-mono text-[13px] leading-relaxed bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-6 overflow-x-auto text-mist/90">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-accent/60 pl-5 my-6 text-muted italic">{children}</blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6"><table className="w-full text-sm text-muted border-collapse">{children}</table></div>
              ),
              th: ({ children }) => <th className="border border-white/10 bg-white/[0.04] px-4 py-2.5 text-left font-display text-xs text-mist">{children}</th>,
              td: ({ children }) => <td className="border border-white/10 px-4 py-2.5">{children}</td>,
              hr: () => <hr className="border-white/8 my-10" />,
              input: (props) => <input {...props} disabled className="accent-[#38BDF8] mr-2" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <hr className="border-white/8 my-10" />
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="btn-ghost text-sm">Tulisan lain</Link>
          <Link href="/#kontak" className="btn-primary text-sm">Hubungi saya</Link>
        </div>
      </article>
    </main>
  );
}
