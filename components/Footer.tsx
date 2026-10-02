export default function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-bold tracking-tight">
          Omni<span className="text-gradient">Dev</span>
        </p>
        <p className="text-faint text-xs text-center sm:text-right">
          © 2026 Abdul Malik Rizky Nur Rahmat. Dibangun dengan Next.js.
          <br />
          Karakter Live2D: sample data © Live2D Inc.
        </p>
      </div>
    </footer>
  );
}
