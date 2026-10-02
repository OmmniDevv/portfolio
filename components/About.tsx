import Image from "next/image";
import Reveal from "./Reveal";

const FACTS = [
  { k: "Sekolah", v: "SMKN 7 Baleendah" },
  { k: "Kelas", v: "XII" },
  { k: "Peran", v: "Junior Developer & Freelancer" },
  { k: "Minat", v: "Web Development, Bot Automasi" },
];

export default function About() {
  return (
    <section id="tentang" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">Tentang</p>
          <h2 className="font-display font-bold tracking-tight text-3xl md:text-4xl">
            Sedikit tentang saya
          </h2>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-[240px_1fr] gap-8 items-start">
          <Reveal delay={80}>
            <div className="glass p-2 w-48 md:w-full">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Foto Abdul Malik Rizky Nur Rahmat"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 240px"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-muted leading-relaxed text-[17px] max-w-xl">
              Saya pelajar SMK yang menghabiskan sebagian besar waktu untuk ngoding.
              Ketertarikan saya ada di dua hal: membangun website yang cepat dan
              membuat bot yang mengotomatisasi hal-hal membosankan. Di luar itu,
              saya suka mengeksplorasi teknologi baru dan sesekali menulis di blog.
            </p>
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 max-w-xl">
              {FACTS.map((f) => (
                <div key={f.k} className="border-b border-white/8 pb-4">
                  <dt className="eyebrow mb-1.5">{f.k}</dt>
                  <dd className="text-mist">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
