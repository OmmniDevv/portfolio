"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const LINES = [
  { id: "Halo! Aku Mao, asisten virtual di sini~", ja: "こんにちは！あたしはマオだよ～！" },
  { id: "Jangan lupa cek proyek-proyeknya ya!", ja: "プロジェクトもチェックしてね！" },
  { id: "OmniDev lagi sibuk ngoding~", ja: "オムニデブは今コーディング中だよ～！" },
  { id: "Ehehe~ kamu ngeliatin aku ya?", ja: "えへへ～、あたしのこと見てたでしょ？" },
  { id: "Blog-nya ada tulisan baru loh!", ja: "ブログに新しい記事があるよ！" },
  { id: "Butuh bot atau website? Om bisa bantuin!", ja: "ボットやウェブサイトが必要？お兄さんが手伝えるよ！" },
];

const EXPRESSIONS = ["exp_02", "exp_01", "exp_03", "exp_07"];

// Fit penuh tanpa crop, ukuran besar didapat dari stage yang tinggi & lebar

// Model resmi Live2D (pinned commit, sama seperti kana-hermes), tidak didistribusikan ulang.
// Sample data milik Live2D Inc., digunakan sesuai ketentuan mereka.
const MAO_MODEL_URL =
  "https://raw.githubusercontent.com/Live2D/CubismWebSamples/b1de66b0b1f1cb881d95fb6158622aeb6a2827bd/Samples/Resources/Mao/Mao.model3.json";

export default function Live2DHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<any>(null);
  const [bubble, setBubble] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineIdx = useRef(0);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const downPos = useRef<{ x: number; y: number } | null>(null);

  const say = useCallback((text: string, ms = 3000) => {
    setBubble(text);
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  }, []);

  // Text-to-speech Bahasa Jepang dengan suara moe/kawaii
  const speakJapanese = useCallback((text: string) => {
    try {
      if (mutedRef.current) return;
      const synth = window.speechSynthesis;
      if (!synth) return;

      const doSpeak = () => {
        try {
          const utter = new SpeechSynthesisUtterance(text);
          utter.lang = "ja-JP";
          utter.pitch = 1.35; // lebih tinggi = lebih kawaii
          utter.rate = 1.05;
          utter.volume = 1;
          const voices = synth.getVoices();
          const ja = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("ja"));
          if (ja.length) {
            utter.voice =
              ja.find((v) => /female|kyoko|haruka|sayaka|mizuki|mei|google/i.test(v.name)) || ja[0];
          }
          // Selalu speak walau tanpa voice JP khusus (browser pakai default)
          synth.speak(utter);
        } catch {}
      };

      // cancel() lalu langsung speak() sering bisu di Chrome, kasih jeda
      try { synth.cancel(); } catch {}
      const voices = synth.getVoices();
      if (voices.length) {
        setTimeout(doSpeak, 60);
      } else {
        let done = false;
        const onVoices = () => {
          if (done) return;
          done = true;
          try { synth.removeEventListener("voiceschanged", onVoices); } catch {}
          setTimeout(doSpeak, 60);
        };
        try { synth.addEventListener("voiceschanged", onVoices); } catch {}
        setTimeout(() => {
          if (done) return;
          done = true;
          try { synth.removeEventListener("voiceschanged", onVoices); } catch {}
          setTimeout(doSpeak, 60);
        }, 1500);
      }
    } catch {}
  }, []);

  const toggleMute = () => {
    setMuted((m) => {
      mutedRef.current = !m;
      if (!m) {
        try { window.speechSynthesis?.cancel(); } catch {}
      }
      return !m;
    });
  };

  useEffect(() => {
    let app: any = null;
    let destroyed = false;

    // Deteksi WebGL dulu: kalau nggak ada, jangan load PIXI/Cubism sama sekali
    const webglOK = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    })();
    if (!webglOK) {
      setFailed(true);
      return;
    }

    (async () => {
      try {
        // 1. Load Cubism 4 runtime dulu (wajib sebelum import cubism4)
        // Dari CDN resmi Live2D (sama seperti kana-hermes)
        if (!(window as any).Live2DCubismCore) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Gagal load Cubism Core dari CDN Live2D"));
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

        const isMobile = window.innerWidth < 768;
        app = new PIXI.Application({
          view: canvasRef.current,
          width,
          height,
          transparent: true,
          antialias: !isMobile,
          resolution: isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2),
        });

        const model = await Live2DModel.from(MAO_MODEL_URL, {
          autoInteract: false,
        });
        if (destroyed) {
          model.destroy();
          return;
        }

        app.stage.addChild(model);

        // Warm-up 2 frame agar bounds model stabil (deformer/pose sudah apply),
        // lalu ukur bounds lokal SEKALI, jangan pakai model.width karena
        // nilainya ikut scale (feedback loop) dan bisa belum stabil.
        await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
        if (destroyed) {
          model.destroy();
          return;
        }
        const baseBounds = model.getLocalBounds();
        if (!baseBounds.width || !baseBounds.height) {
          throw new Error("Live2D bounds tidak valid");
        }
        // Pivot di tengah bounds agar model selalu ter-center sempurna
        model.pivot.set(baseBounds.x + baseBounds.width / 2, baseBounds.y + baseBounds.height / 2);

        const fitModel = () => {
          const w = wrapRef.current!.clientWidth || 400;
          const h = wrapRef.current!.clientHeight || 560;
          const scale = Math.min(w / baseBounds.width, h / baseBounds.height);
          model.scale.set(scale);
          model.position.set(w / 2, h / 2);
        };
        fitModel();
        // Simpan untuk resize handler
        (model as any)._fitModel = fitModel;

        modelRef.current = model;
        setReady(true);

        // Idle motion loop
        model.motion("Idle", 0);

        // Sapa sekali (teks saja; suara butuh gesture user, jadi bunyi pas diklik)
        setTimeout(() => say(LINES[0].id, 4000), 1500);
      } catch (e: any) {
        console.error("Live2D load failed:", e);
        setFailed(true);
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

    // Resize: pakai ulang fungsi fit yang sama (bounds sudah disimpan)
    const onResize = () => {
      const model = modelRef.current;
      if (!model || !wrapRef.current || !app) return;
      const w = wrapRef.current.clientWidth;
      const h = wrapRef.current.clientHeight;
      app.renderer.resize(w, h);
      try {
        (model as any)._fitModel?.();
      } catch {}
    };
    window.addEventListener("resize", onResize);

    // Pause ticker PIXI saat hero tidak terlihat (scroll ke bawah)
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        try {
          if (!app) return;
          if (visible) app.ticker.start();
          else app.ticker.stop();
        } catch {}
      },
      { threshold: 0 }
    );
    if (wrapRef.current) io.observe(wrapRef.current);

    return () => {
      destroyed = true;
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      try {
        modelRef.current?.destroy();
        app?.destroy(true);
      } catch {}
    };
  }, [say]);

  const onPointerDown = (e: React.PointerEvent) => {
    downPos.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = downPos.current;
    downPos.current = null;
    if (!d) return;
    // Hanya anggap tap kalau jari tidak bergeser jauh (bukan scroll)
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) < 12) poke();
  };

  const poke = () => {
    const model = modelRef.current;
    if (!model) return;
    lineIdx.current = (lineIdx.current + 1) % LINES.length;
    const line = LINES[lineIdx.current];
    say(line.id);
    speakJapanese(line.ja);
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
    <div ref={wrapRef} className="relative z-10 w-full h-[440px] md:h-[720px] select-none">
      {!failed && (
      <button
        onClick={toggleMute}
        aria-label={muted ? "Nyalakan suara Mao" : "Bisukan suara Mao"}
        title={muted ? "Nyalakan suara" : "Bisukan suara"}
        className="absolute top-2 right-2 z-20 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-transform"
      >
        {muted ? "🔇" : "🔊"}
      </button>
      )}
      {bubble && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 glass-strong px-4 py-2.5 max-w-[240px] text-sm text-ink leading-relaxed text-center animate-[pop_0.25s_ease] pointer-events-none">
          {bubble}
        </div>
      )}
      {!failed && (
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="w-full h-full cursor-pointer"
        style={{ touchAction: "manipulation" }}
        aria-label="Mao, karakter Live2D interaktif. Ketuk untuk menyapa."
        role="img"
      />
      )}
      {!ready && !failed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" aria-hidden="true" />
        </div>
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none px-8 text-center">
          <div
            aria-hidden="true"
            className="w-24 h-24 rounded-full border border-[var(--glass-border)] bg-gradient-to-br from-[var(--primary)]/25 via-[var(--accent)]/20 to-[var(--sky)]/25 flex items-center justify-center text-4xl animate-pulse"
          >
            ✦
          </div>
          <p className="text-xs text-faint font-mono max-w-[220px] leading-relaxed">
            Mao lagi ngumpet, browser ini nggak dukung WebGL
          </p>
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
