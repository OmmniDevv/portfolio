export default function Footer() {
  return (
    <footer className="py-12 px-6 text-center">
      {/* Ornamental divider */}
      <div className="flex items-center justify-center mb-8">
        <svg
          width="320"
          height="24"
          viewBox="0 0 320 24"
          fill="none"
          aria-hidden="true"
          className="opacity-50"
        >
          <line x1="0" y1="12" x2="120" y2="12" stroke="#C8A96E" strokeWidth="0.5" />
          <path d="M120 12 L130 6 L140 12 L130 18 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" />
          <circle cx="160" cy="12" r="6" stroke="#C8A96E" strokeWidth="0.5" />
          <circle cx="160" cy="12" r="2" fill="#C8A96E" />
          <path d="M180 12 L190 6 L200 12 L190 18 Z" stroke="#C8A96E" strokeWidth="0.5" fill="none" />
          <line x1="200" y1="12" x2="320" y2="12" stroke="#C8A96E" strokeWidth="0.5" />
          {/* Small rune marks */}
          <line x1="148" y1="8" x2="148" y2="16" stroke="#C8A96E" strokeWidth="0.5" />
          <line x1="172" y1="8" x2="172" y2="16" stroke="#C8A96E" strokeWidth="0.5" />
        </svg>
      </div>

      <blockquote className="font-cinzel text-parchment/50 text-sm italic tracking-wide max-w-md mx-auto mb-4">
        &ldquo;Even in the darkest night, a developer&rsquo;s code illuminates the world.&rdquo;
      </blockquote>

      <p className="font-inter text-parchment/30 text-xs tracking-widest">
        &copy; 2026 OmniDev &mdash; Abdul Malik Rizky Nur Rahmat
      </p>
    </footer>
  );
}
