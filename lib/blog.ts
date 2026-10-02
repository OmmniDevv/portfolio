import { promises as fs } from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  minutes: number;
  content: string;
};

const DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
  let body = raw;
  if (raw.startsWith("---")) {
    const end = raw.indexOf("---", 3);
    if (end > 0) {
      const block = raw.slice(3, end).trim();
      body = raw.slice(end + 3).trim();
      for (const line of block.split("\n")) {
        const i = line.indexOf(":");
        if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      }
    }
  }
  return { meta, body };
}

export async function getAllPosts(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const posts: Post[] = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(DIR, file), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    const words = body.split(/\s+/).filter(Boolean).length;
    posts.push({
      slug: file.replace(/\.md$/, ""),
      title: meta.title || file.replace(/\.md$/, ""),
      date: meta.date || "1970-01-01",
      tags: (meta.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      excerpt: meta.excerpt || body.slice(0, 160).replace(/\n/g, " ").trim(),
      minutes: Math.max(1, Math.round(words / 200)),
      content: body,
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
