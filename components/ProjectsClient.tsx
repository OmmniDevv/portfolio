"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { GithubRepo } from "@/lib/github";

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  PHP: "#777BB4",
  Dart: "#00B4AB",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89E051",
};

function ArtifactCard({
  repo,
  index,
  onClick,
}: {
  repo: GithubRepo;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / rect.height) * 8,
      y: -((e.clientX - cx) / rect.width) * 8,
    });
  };

  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#C8A96E") : "#C8A96E";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="vision-card p-5 cursor-pointer group relative overflow-hidden hover:border-gold/60 hover:shadow-[0_0_30px_rgba(200,169,110,0.2)]"
    >
      {/* Shimmer scan line */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "linear" }}
            className="absolute left-0 right-0 h-8 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(200,169,110,0.08), transparent)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-r-[32px] border-t-transparent border-r-gold/20" />
      </div>

      <div className="flex flex-col gap-3 h-full">
        <h3 className="font-cinzel text-sm text-parchment group-hover:text-gold transition-colors leading-tight">
          {repo.name}
        </h3>
        <p className="font-inter text-parchment/50 text-xs leading-relaxed flex-1 line-clamp-3">
          {repo.description ?? "No description provided."}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gold/10">
          {repo.language && (
            <span
              className="font-inter text-xs px-2 py-0.5 rounded-full"
              style={{
                color: langColor,
                border: `1px solid ${langColor}40`,
                background: `${langColor}10`,
              }}
            >
              {repo.language}
            </span>
          )}
          <div className="flex items-center gap-3 ml-auto">
            <span className="font-inter text-parchment/40 text-xs flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {repo.stargazers_count}
            </span>
            <span className="font-inter text-parchment/40 text-xs flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 5C7 3.9 7.9 3 9 3s2 .9 2 2-.9 2-2 2-2-.9-2-2zM15 19c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM9 7v10M9 17l6-6" />
              </svg>
              {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RepoModal({ repo, onClose }: { repo: GithubRepo; onClose: () => void }) {
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#C8A96E") : "#C8A96E";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="vision-card max-w-lg w-full p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-parchment/40 hover:text-gold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-4">
          <div>
            <p className="font-cinzel text-gold/60 text-xs tracking-widest uppercase mb-1">
              Artifact
            </p>
            <h3 className="font-cinzel text-xl text-parchment">{repo.name}</h3>
          </div>

          <p className="font-inter text-parchment/70 text-sm leading-relaxed">
            {repo.description ?? "No description provided."}
          </p>

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {repo.topics.map((t) => (
                <span
                  key={t}
                  className="font-inter text-xs px-2 py-0.5 rounded border border-gold/20 text-gold/60"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            {repo.language && (
              <div>
                <p className="font-cinzel text-parchment/40 text-xs tracking-wider mb-1">Language</p>
                <span style={{ color: langColor }}>{repo.language}</span>
              </div>
            )}
            <div>
              <p className="font-cinzel text-parchment/40 text-xs tracking-wider mb-1">Last Updated</p>
              <span className="font-inter text-parchment/70 text-xs">
                {new Date(repo.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div>
              <p className="font-cinzel text-parchment/40 text-xs tracking-wider mb-1">Stars</p>
              <span className="font-inter text-parchment/70">{repo.stargazers_count}</span>
            </div>
            <div>
              <p className="font-cinzel text-parchment/40 text-xs tracking-wider mb-1">Forks</p>
              <span className="font-inter text-parchment/70">{repo.forks_count}</span>
            </div>
          </div>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="genshin-btn-filled text-center mt-2"
          >
            Open on GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsClient({ repos }: { repos: GithubRepo[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<GithubRepo | null>(null);

  const languages = [
    "All",
    ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[])),
  ];

  const filtered =
    filter === "All" ? repos : repos.filter((r) => r.language === filter);

  return (
    <section id="projects" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Decorative snippet */}
      <div
        className="absolute top-12 right-8 font-mono text-xs text-gold/8 pointer-events-none select-none hidden md:block"
        aria-hidden="true"
      >
        git commit -m &quot;ship it&quot;
      </div>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="rune-divider mb-4">
            <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
              Artifact Collection
            </span>
          </div>
          <h2 className="section-heading">Projects</h2>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilter(lang)}
              className={`font-cinzel text-xs tracking-wider px-4 py-1.5 rounded border transition-all duration-200 ${
                filter === lang
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-gold/20 text-parchment/50 hover:border-gold/40 hover:text-parchment/80"
              }`}
            >
              {lang}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((repo, i) => (
            <ArtifactCard
              key={repo.id}
              repo={repo}
              index={i}
              onClick={() => setSelected(repo)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-inter text-parchment/40 text-sm mt-8">
            No repositories found for this filter.
          </p>
        )}

        {/* GitHub Activity Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-14"
        >
          <p className="font-cinzel text-xs text-gold/50 tracking-widest uppercase text-center mb-4">
            Contribution Activity
          </p>
          <div className="rounded-xl overflow-hidden border border-gold/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=OmmniDevv&bg_color=0D1B2A&color=C8A96E&line=4FC3F7&point=EF9A9A&area=true&hide_border=true"
              alt="GitHub contribution activity graph"
              className="w-full"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Visitor Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-6"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://komarev.com/ghpvc/?username=OmmniDevv&style=for-the-badge&color=0D1B2A&label=VISITORS"
            alt="Visitor count"
            className="opacity-60 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <RepoModal repo={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
