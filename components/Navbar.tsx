"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (activeEl) {
      indicatorRef.current.style.left = `${activeEl.offsetLeft}px`;
      indicatorRef.current.style.width = `${activeEl.offsetWidth}px`;
    }
  }, [active]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy/90 backdrop-blur-md border-b border-gold/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-cinzel text-gold text-lg tracking-widest hover:text-shadow-gold transition-all">
          OmniDev
        </a>

        <ul ref={navRef} className="hidden md:flex items-center gap-1 relative">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-gold transition-all duration-300 rounded-full"
            style={{ left: 0, width: 0 }}
          />
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-section={link.href.slice(1)}
                className={`relative px-4 py-2 font-cinzel text-xs tracking-widest uppercase transition-all duration-200 block ${
                  active === link.href.slice(1) ? "text-gold" : "text-parchment/60 hover:text-parchment"
                }`}
              >
                {active === link.href.slice(1) && (
                  <motion.span layoutId="nav-dot" className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden fixed inset-0 top-16 bg-navy/95 backdrop-blur-md border-l border-gold/20 z-40"
          >
            <ul className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`font-cinzel text-xl tracking-widest uppercase transition-colors ${
                      active === link.href.slice(1) ? "text-gold text-shadow-gold" : "text-parchment/70"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
