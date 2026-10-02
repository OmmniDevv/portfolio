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
    <section id="tentang" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass p-8 md:p-12 grid md:grid-cols-[220px_1fr] gap-10 items-center">
          <Reveal>
            <div className="relative aspect-square rounded-2xl overflow-hidden w-44 md:w-full mx-auto shadow-lg">
              <Image
                src="/images/profile.jpg"
                alt="Foto Abdul Malik Rizky Nur Rahmat"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 176px, 220px"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-4">Tentang</p>
            <h2 className="font-bold tracking-tight text-3xl md:text-4xl mb-4">
              Sedikit tentang saya
            </h2>
            <p className="text-soft leading-relaxed text-[17px] max-w-xl">
              Saya pelajar SMK yang menghabiskan sebagian besar waktu untuk ngoding.
              Ketertarikan saya ada di dua hal: membangun website yang cepat dan
              membuat bot yang mengotomatisasi hal-hal membosankan.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 max-w-xl">
              {FACTS.map((f) => (
                <div key={f.k} className="border-b border-ink/10 pb-4">
                  <dt className="eyebrow mb-1.5">{f.k}</dt>
                  <dd className="text-ink font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
