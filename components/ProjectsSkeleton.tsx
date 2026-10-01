export default function ProjectsSkeleton() {
  return (
    <section id="projects" className="py-24 px-6" aria-label="Loading projects">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="rune-divider mb-4">
            <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
              Artifact Collection
            </span>
          </div>
          <h2 className="section-heading">Projects</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="vision-card p-5 h-44 overflow-hidden relative"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
              <div className="h-4 w-2/3 rounded bg-gold/15 mb-3" />
              <div className="h-3 w-full rounded bg-parchment/10 mb-2" />
              <div className="h-3 w-5/6 rounded bg-parchment/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
