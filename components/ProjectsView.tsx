"use client";
import type { GithubRepo } from "@/lib/github";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const LANG_DOT: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  PHP: "#777BB4",
  Python: "#3776AB",
  Dart: "#00B4AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
};

export default function ProjectsView({ repos }: { repos: GithubRepo[] }) {
  const { t } = useLang();

  return (
    <section id="proyek" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4 text-center">{t.projects.eyebrow}</p>
          <h2 className="font-bold tracking-tight text-3xl md:text-5xl text-center">
            {t.projects.title}
          </h2>
          <p className="text-soft mt-4 text-center max-w-lg mx-auto leading-relaxed">
            {t.projects.desc}
          </p>
        </Reveal>

        {repos.length === 0 ? (
          <div className="glass p-10 mt-10 text-center">
            <p className="text-ink font-medium mb-2">{t.projects.emptyTitle}</p>
            <p className="text-soft text-sm">
              {t.projects.emptyDescA}{" "}
              <a href="https://github.com/OmmniDevv" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub
              </a>
              {t.projects.emptyDescB}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.slice(0, 6).map((repo, i) => (
              <Reveal key={repo.id} delay={(i % 3) * 80}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-6 h-full flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="font-bold text-lg text-ink leading-snug">{repo.name}</h3>
                  <p className="text-soft text-sm leading-relaxed flex-1 line-clamp-3">
                    {repo.description ?? t.projects.noDesc}
                  </p>
                  <div className="flex items-center gap-4 pt-3 border-t border-[var(--hairline)] text-xs text-faint">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: LANG_DOT[repo.language] ?? "#9CA3AF" }}
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
