"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/OmmniDevv",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "#C8A96E",
  },
  {
    label: "Email",
    href: "mailto:omnidevv@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: "#EF9A9A",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6285187605007",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
    color: "#74C69D",
  },
  {
    label: "Telegram",
    href: "https://t.me/zanslord",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    color: "#4FC3F7",
  },
];

function GenshinInput({
  label,
  name,
  type = "text",
  textarea = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <label className="font-cinzel text-xs text-gold/60 tracking-widest uppercase block mb-2">
        {label}
      </label>
      <div className="relative">
        <Tag
          name={name}
          type={!textarea ? type : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={textarea ? 5 : undefined}
          required
          className={`w-full bg-navy/60 border rounded px-4 py-3 font-inter text-sm text-parchment placeholder-parchment/20 outline-none transition-all duration-300 resize-none ${
            focused ? "border-gold/60" : "border-gold/20"
          }`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {/* Animated golden underline trace */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gold rounded-full"
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function HoldButton({ onSubmit }: { onSubmit: () => void }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firedRef = useRef(false);

  const startHold = () => {
    firedRef.current = false;
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current!);
          if (!firedRef.current) {
            firedRef.current = true;
            onSubmit();
          }
          return 100;
        }
        return p + 4;
      });
    }, 40);
  };

  const endHold = () => {
    clearInterval(intervalRef.current!);
    setProgress(0);
  };

  return (
    <button
      type="submit"
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      className="relative w-full overflow-hidden border border-gold/60 font-cinzel text-sm tracking-widest uppercase py-3 text-gold transition-colors hover:border-gold"
    >
      <motion.div
        className="absolute inset-0 bg-gold/20 origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ duration: 0 }}
      />
      <span className="relative z-10">
        {progress > 0 && progress < 100
          ? `Charging... ${progress}%`
          : "Hold to Send Message"}
      </span>
    </button>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:omnidevv@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Decorative snippet */}
      <div
        className="absolute bottom-16 right-8 font-mono text-xs text-gold/8 pointer-events-none select-none hidden md:block"
        aria-hidden="true"
      >
        await sendMessage(&#123; to: &quot;OmniDev&quot; &#125;)
      </div>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="rune-divider mb-4">
            <span className="font-cinzel text-xs text-gold/50 tracking-widest uppercase">
              Send a Message
            </span>
          </div>
          <h2 className="section-heading">Contact the Traveler</h2>
          <p className="font-inter text-parchment/50 text-sm mt-3">
            Leave a message and I will respond as soon as possible
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="vision-card p-12 flex flex-col items-center gap-6 text-center"
            >
              {/* Floating wisp */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </motion.div>
              <div>
                <p className="font-cinzel text-gold text-lg tracking-wider">
                  Message Delivered to the Traveler
                </p>
                <p className="font-inter text-parchment/50 text-sm mt-2">
                  Your message has been sent. I will reply soon.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="vision-card p-8 flex flex-col gap-6"
            >
              <GenshinInput
                label="Name"
                name="name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <GenshinInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />
              <GenshinInput
                label="Message"
                name="message"
                textarea
                value={form.message}
                onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              />
              <HoldButton onSubmit={handleSubmit} />
            </motion.form>
          )}
        </AnimatePresence>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mt-10"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className="w-10 h-10 rounded-lg border border-gold/20 flex items-center justify-center transition-all duration-300 group-hover:border-opacity-60 group-hover:scale-110"
                style={{
                  color: link.color,
                  borderColor: `${link.color}30`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${link.color}50`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${link.color}80`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${link.color}30`;
                }}
              >
                {link.icon}
              </div>
              <span className="font-cinzel text-xs text-parchment/40 tracking-wider group-hover:text-parchment/70 transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
