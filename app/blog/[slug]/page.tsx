import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost } from "@/lib/blog";
import KomentarBlog from "@/components/KomentarBlog";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: "Tidak ditemukan · OmniDev" };
  const meta: any = { title: `${post.title} · OmniDev`, description: post.excerpt };
  if (post.image) {
    meta.openGraph = { title: post.title, description: post.excerpt, images: [{ url: post.image }] };
    meta.twitter = { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.image] };
  }
  return meta;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <article className="max-w-2xl mx-auto">
        <Link href="/blog" className="text-sm text-soft hover:text-primary transition-colors">
          ← Semua tulisan
        </Link>
        <h1 className="font-display font-bold tracking-tight text-3xl md:text-4xl mt-8 leading-tight">
          {post.title}
        </h1>
        <p className="font-mono text-xs text-faint mt-4">
          {post.date} · {post.minutes} menit baca
        </p>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-3xl mt-8"
          />
        ) : null}
        <hr className="border-[var(--hairline)] my-10" />

        <div className="blog-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 className="font-display font-bold text-xl text-ink mt-10 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="font-display font-semibold text-lg text-ink mt-8 mb-3">{children}</h3>,
              p: ({ children }) => <p className="text-soft text-[16px] leading-[1.8] mb-5">{children}</p>,
              img: ({ src, alt }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt || ""} loading="lazy" className="w-full rounded-2xl my-6 object-cover" />
              ),
              a: ({ href, children }) => <a href={href} className="text-primary hover:underline">{children}</a>,
              ul: ({ children }) => <ul className="text-soft mb-5 ml-5 list-disc space-y-2 marker:text-faint">{children}</ul>,
              ol: ({ children }) => <ol className="text-soft mb-5 ml-5 list-decimal space-y-2 marker:text-faint">{children}</ol>,
              code: ({ className, children }) =>
                className?.includes("language-") ? (
                  <code className={className}>{children}</code>
                ) : (
                  <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--glass-bg)] text-ink">{children}</code>
                ),
              pre: ({ children }) => (
                <pre className="font-mono text-[13px] leading-relaxed bg-[var(--input-bg)] border border-[var(--hairline)] rounded-2xl p-5 mb-6 overflow-x-auto text-ink">{children}</pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[color-mix(in_srgb,var(--primary)_65%,transparent)] pl-5 my-6 text-soft italic">{children}</blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6"><table className="w-full text-sm text-soft border-collapse">{children}</table></div>
              ),
              th: ({ children }) => <th className="border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--primary)_6%,transparent)] px-4 py-2.5 text-left font-display text-xs text-ink">{children}</th>,
              td: ({ children }) => <td className="border border-[var(--hairline)] px-4 py-2.5">{children}</td>,
              hr: () => <hr className="border-[var(--hairline)] my-10" />,
              input: (props) => <input {...props} disabled className="accent-[#8B5CF6] mr-2" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <hr className="border-[var(--hairline)] my-10" />
        <KomentarBlog slug={post.slug} />
        <hr className="border-[var(--hairline)] my-10" />
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className="btn-ghost text-sm">Tulisan lain</Link>
          <Link href="/#kontak" className="btn-primary text-sm">Hubungi saya</Link>
        </div>
      </article>
    </main>
  );
}
