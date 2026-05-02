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
  const res = await fetch(
    "https://api.github.com/users/OmmniDevv/repos?per_page=100&sort=updated",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data: GithubRepo[] = await res.json();
  return data.slice(0, 9);
}
