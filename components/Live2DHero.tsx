"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const LINES = [
  "Halo! Aku Mao, asisten virtual di sini~",
  "Jangan lupa cek proyek-proyeknya ya!",
  "OmniDev lagi sibuk ngoding~",
  "Ehehe~ kamu ngeliatin aku ya?",
  "Blog-nya ada tulisan baru loh!",
  "Butuh bot atau website? Om bisa bantuin!",
];

const EXPRESSIONS = ["exp_02", "exp_01", "exp_03", "exp_07"];

// Model resmi Live2D (pinned commit, sama seperti kana-hermes) — tidak didistribusikan ulang.
// Sample data milik Live2D Inc., digunakan sesuai ketentuan mereka.
const MAO_MODEL_URL =
  "https://raw.githubusercontent.com/Live2D/CubismWebSamples/b1de66b0b1f1cb881d95fb6158622aeb6a2827bd/Samples/Resources/Mao/Mao.model3.json";

export default function Live2DHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<any>(null);
  const [bubble, setBubble] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineIdx = useRef(0);

  const say = useCallback((text: string, ms = 3000) => {
    setBubble(text);
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }, []);

  useEffect(() => {
    let app: any = null;
    let destroyed = false;

    (async () => {
      try {
        // 1. Load Cubism 4 runtime dulu (wajib sebelum import cubism4)
        if (!(window as any).Live2DCubismCore) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "/js/live2dcubismcore.min.js";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Gagal load live2dcubismcore.min.js"));
            document.head.appendChild(s);
          });
        }

        const PIXI = await import("pixi.js");
        // WAJIB: daftarkan PIXI ke window SEBELUM import cubism4
        (window as any).PIXI = PIXI;
        const { Live2DModel } = await import("pixi-live2d-display/cubism4");

        if (destroyed || !canvasRef.current || !wrapRef.current) return;

        const width = wrapRef.current.clientWidth || 400;
        const height = wrapRef.current.clientHeight || 560;

        app = new PIXI.Application({
          view: canvasRef.current,
          width,
          height,
          transparent: true,
          antialias: true,
          resolution: Math.min(window.devicePixelRatio, 2),
        });

        const model = await Live2DModel.from(MAO_MODEL_URL, {
          autoInteract: false,
        });
        if (destroyed) {
          model.destroy();
          return;
        }

        // Scale: model tinggi ~ full body, fit ke canvas
        const scale = Math.min(width / model.width, height / model.height) * 1.05;
        model.scale.set(scale);
        model.anchor.set(0.5, 0.5);
        model.position.set(width / 2, height / 2 + 10);

        app.stage.addChild(model);
        modelRef.current = model;
        setReady(true);

        // Idle motion loop
        model.motion("Idle", 0);

        // Sapa sekali
        setTimeout(() => say(LINES[0], 4000), 1500);
      } catch (e: any) {
        console.error("Live2D load failed:", e);
        setError(e?.message || String(e));
      }
    })();

    // Mouse follow: arahkan fokus model ke kursor
    const onMove = (e: MouseEvent) => {
      const model = modelRef.current;
      if (!model || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      try {
        model.focus(x * 2, y * 2);
      } catch {}
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Resize
    const onResize = () => {
      const model = modelRef.current;
      if (!model || !wrapRef.current || !app) return;
      const w = wrapRef.current.clientWidth;
      const h = wrapRef.current.clientHeight;
      app.renderer.resize(w, h);
      const scale = Math.min(w / model.width, h / model.height) * 1.05;
      model.scale.set(scale);
      model.position.set(w / 2, h / 2 + 10);
    };
    window.addEventListener("resize", onResize);

    return () => {
      destroyed = true;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      try {
        modelRef.current?.destroy();
        app?.destroy(true);
      } catch {}
    };
  }, [say]);

  const poke = () => {
    const model = modelRef.current;
    if (!model) return;
    lineIdx.current = (lineIdx.current + 1) % LINES.length;
    say(LINES[lineIdx.current]);
    try {
      // Random tap motion + ekspresi
      model.motion("TapBody", Math.floor(Math.random() * 3));
      const expr = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)];
      model.expression(expr);
      setTimeout(() => {
        try { model.expression("exp_01"); } catch {}
      }, 2500);
    } catch {}
  };

  return (
    <div ref={wrapRef} className="relative w-full h-[420px] md:h-[560px] select-none">
      {bubble && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 glass-strong px-4 py-2.5 max-w-[240px] text-sm text-ink leading-relaxed text-center animate-[pop_0.25s_ease] pointer-events-none">
          {bubble}
        </div>
      )}
      <canvas
        ref={canvasRef}
        onClick={poke}
        className="w-full h-full cursor-pointer"
        aria-label="Mao, karakter Live2D interaktif. Klik untuk menyapa."
        role="img"
      />
      {!ready && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-hidden="true" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8">
          <p className="text-xs text-red-600 text-center font-mono break-all">Live2D error: {error}</p>
        </div>
      )}
      <style jsx>{`
        @keyframes pop {
          from { opacity: 0; transform: translate(-50%, 8px) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
