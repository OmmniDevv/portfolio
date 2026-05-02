"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

type Line = { type: "cmd" | "out" | "blank"; text: string };

const SEQUENCE: Line[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "OmniDev — Junior Developer & Bot Architect" },
  { type: "blank", text: "" },
  { type: "cmd", text: "cat skills.txt" },
  { type: "out", text: "JavaScript, TypeScript, PHP, Dart, Flutter" },
  { type: "blank", text: "" },
  { type: "cmd", text: "cat stack.txt" },
  { type: "out", text: "Node.js, Next.js, Express, PostgreSQL, Redis" },
  { type: "blank", text: "" },
  { type: "cmd", text: "uname -a" },
  { type: "out", text: "NyArch Linux, btw" },
  { type: "blank", text: "" },
  { type: "cmd", text: "echo $STATUS" },
  { type: "out", text: "Building cool stuff and leveling up every day" },
];

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [rendered, setRendered] = useState<{ line: Line; text: string }[]>([]);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    setRendered([]);

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    (async () => {
      for (const line of SEQUENCE) {
        if (cancelled) break;
        if (line.type === "blank") {
          setRendered((p) => [...p, { line, text: "" }]);
          await sleep(150);
          continue;
        }
        setRendered((p) => [...p, { line, text: "" }]);
        for (let i = 1; i <= line.text.length; i++) {
          if (cancelled) break;
          const partial = line.text.slice(0, i);
          setRendered((p) => {
            const next = [...p];
            next[next.length - 1] = { line, text: partial };
            return next;
          });
          await sleep(line.type === "cmd" ? 45 : 20);
        }
        await sleep(300);
      }
    })();

    return () => { cancelled = true; };
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,169,110,0.2)", boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="font-mono text-xs text-white/30 ml-2 tracking-wider">
          omnidev@nyarch ~ zsh
        </span>
      </div>

      {/* Body */}
      <div className="bg-[#0e0e0e] p-5 min-h-[280px] font-mono text-sm leading-relaxed">
        {rendered.map((entry, i) => {
          if (entry.line.type === "blank") return <div key={i} className="h-3" />;
          const isLast = i === rendered.length - 1;
          if (entry.line.type === "cmd") {
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-gold select-none">$</span>
                <span className="text-[#F5F0E8]">
                  {entry.text}
                  {isLast && (
                    <span className="inline-block w-2 h-4 bg-[#F5F0E8] ml-0.5 align-middle animate-pulse" />
                  )}
                </span>
              </div>
            );
          }
          return (
            <div key={i} className="pl-4 text-[#4FC3F7]">
              {entry.text}
              {isLast && (
                <span className="inline-block w-2 h-4 bg-[#4FC3F7] ml-0.5 align-middle animate-pulse" />
              )}
            </div>
          );
        })}
        {rendered.length === 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gold">$</span>
            <span className="inline-block w-2 h-4 bg-[#F5F0E8] animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
