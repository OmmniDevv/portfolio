import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogBrowser from "@/components/BlogBrowser";

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
          <BlogBrowser posts={posts} />
        )}

        <div className="mt-12">
          <Link href="/" className="btn-ghost text-sm">Kembali ke beranda</Link>
        </div>
      </div>
    </main>
  );
}
