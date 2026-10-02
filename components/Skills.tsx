import Reveal from "./Reveal";

const GROUPS = [
  {
    title: "Bahasa",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "Dart"],
  },
  {
    title: "Web",
    items: ["Next.js", "React", "Laravel", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Bot & Automasi",
    items: ["Baileys (WA)", "Telegram Bot API", "Discord.js"],
  },
  {
    title: "Lainnya",
    items: ["MySQL", "SQLite", "Git", "Docker", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skill" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">Kemampuan</p>
          <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
            Teknologi yang saya pakai
          </h2>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="glass p-6 h-full">
                <h3 className="font-display font-semibold text-mist mb-4">{g.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {g.items.map((s) => (
                    <li key={s} className="text-muted text-[15px] flex items-center gap-2.5">
                      <span aria-hidden="true" className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
