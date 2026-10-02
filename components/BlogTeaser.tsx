import { getAllPosts } from "@/lib/blog";
import BlogTeaserView from "./BlogTeaserView";

export default async function BlogTeaser() {
  const posts = (await getAllPosts()).slice(0, 3);
  return <BlogTeaserView posts={posts} />;
}
