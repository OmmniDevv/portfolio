import { fetchRepos } from "@/lib/github";
import Reveal from "./Reveal";

const LANG_DOT: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  PHP: "#777BB4",
  Python: "#3776AB",
  Dart: "#00B4AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
};

export default async function Projects() {
  const repos = await fetchRepos();

  return (
    <section id="proyek" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">Karya</p>
          <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
            Proyek pilihan
          </h2>
          <p className="text-muted mt-4 max-w-lg leading-relaxed">
            Diambil langsung dari GitHub saya. Klik kartu untuk membuka repositorinya.
          </p>
        </Reveal>

        {repos.length === 0 ? (
          <div className="glass p-10 mt-10 text-center">
            <p className="text-mist font-medium mb-2">Gagal memuat proyek</p>
            <p className="text-muted text-sm">
              Coba lagi nanti, atau lihat langsung di{" "}
              <a href="https://github.com/OmmniDevv" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                GitHub
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.slice(0, 6).map((repo, i) => (
              <Reveal key={repo.id} delay={(i % 3) * 80}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-6 h-full flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1"
                >
                  <h3 className="font-display font-semibold text-mist leading-snug">
                    {repo.name}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1 line-clamp-3">
                    {repo.description ?? "Belum ada deskripsi."}
                  </p>
                  <div className="flex items-center gap-4 pt-3 border-t border-white/8 text-xs text-faint">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: LANG_DOT[repo.language] ?? "#A1A1AA" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
