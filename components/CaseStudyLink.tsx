import Link from "next/link";

/**
 * Link "Lihat case study", siap dipasang di kartu project
 * (mis. di dalam components/Projects.tsx) tanpa mengubah file lain.
 *
 * Contoh pakai:
 *   <CaseStudyLink slug="company-profile-umkm-kuliner" />
 */
export default function CaseStudyLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/studi-kasus/${slug}`}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
    >
      Lihat case study
      <span aria-hidden="true">→</span>
    </Link>
  );
}
