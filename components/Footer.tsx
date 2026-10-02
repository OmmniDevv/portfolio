export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display font-bold">
          Omni<span className="text-accent">Dev</span>
        </p>
        <p className="text-faint text-xs">
          © 2026 Abdul Malik Rizky Nur Rahmat. Dibangun dengan Next.js.
        </p>
      </div>
    </footer>
  );
}
