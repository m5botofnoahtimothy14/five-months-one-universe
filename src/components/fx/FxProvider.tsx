import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/random";

type Particle = {
  id: number;
  x: number;
  y: number;
  content: string;
  dx: number;
  dy: number;
  r: number;
  s: number;
  dur: number;
  text: boolean;
};

export type BurstOptions = {
  x?: number;
  y?: number;
  /** element to burst from (center) */
  from?: Element | null;
  items?: string[];
  count?: number;
  spread?: number;
};

type FxApi = {
  burst: (o?: BurstOptions) => void;
  confetti: () => void;
};

const FxContext = createContext<FxApi | null>(null);

export function useFx(): FxApi {
  const ctx = useContext(FxContext);
  if (!ctx) throw new Error("useFx must be used inside FxProvider");
  return ctx;
}

const DEFAULT_ITEMS = ["💗", "💖", "✨", "💕", "⭐", "🩷"];

export function FxProvider({ children }: { children: ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const burst = useCallback((o: BurstOptions = {}) => {
    const reduced = prefersReducedMotion();
    let x = o.x ?? window.innerWidth / 2;
    let y = o.y ?? window.innerHeight / 2;
    if (o.from) {
      const r = o.from.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    const items = o.items ?? DEFAULT_ITEMS;
    const count = reduced ? Math.min(3, o.count ?? 14) : (o.count ?? 14);
    const spread = reduced ? 30 : (o.spread ?? 140);
    const fresh: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = spread * (0.45 + Math.random() * 0.75);
      return {
        id: nextId.current++,
        x,
        y,
        content: items[Math.floor(Math.random() * items.length)] ?? "💗",
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - (reduced ? 0 : 40),
        r: (Math.random() - 0.5) * 90,
        s: 0.8 + Math.random() * 0.8,
        dur: reduced ? 600 : 800 + Math.random() * 700,
        text: content.length > 2,
      };
    });
    setParticles((p) => [...p, ...fresh].slice(-160));
    const ids = new Set(fresh.map((f) => f.id));
    window.setTimeout(() => setParticles((p) => p.filter((q) => !ids.has(q.id))), 1700);
  }, []);

  const confetti = useCallback(() => {
    const w = window.innerWidth;
    const items = ["💗", "🎉", "✨", "💖", "⭐", "🎀", "🌸", "💕"];
    const reduced = prefersReducedMotion();
    const points = reduced ? 1 : 6;
    for (let i = 0; i < points; i++) {
      window.setTimeout(() => {
        burst({ x: (w / (points + 1)) * (i + 1), y: window.innerHeight * 0.35, items, count: 16, spread: 220 });
      }, i * 120);
    }
  }, [burst]);

  return (
    <FxContext.Provider value={{ burst, confetti }}>
      {children}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className={p.text ? "absolute font-display text-lg font-bold text-primary text-stroke" : "absolute text-2xl"}
            style={
              {
                left: p.x,
                top: p.y,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--r": `${p.r}deg`,
                "--s": p.s,
                animation: `particle ${p.dur}ms cubic-bezier(0.2, 0.7, 0.3, 1) forwards`,
              } as React.CSSProperties
            }
          >
            {p.content}
          </span>
        ))}
      </div>
    </FxContext.Provider>
  );
}
