import snapshot from "./repos-snapshot.json";

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
};

export async function fetchRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/OmmniDevv/repos?per_page=100&sort=updated",
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data: GithubRepo[] = await res.json();
      return data.slice(0, 9);
    }
  } catch {
    // GitHub API gagal (mis. rate limit 60/jam tanpa token di IP bersama Vercel)
  }
  // Fallback: snapshot lokal agar section Karya tidak pernah kosong.
  // Regenerasi berkala: ~/workspace/bin/update-repos-snapshot
  return (snapshot as GithubRepo[]).slice(0, 9);
}
