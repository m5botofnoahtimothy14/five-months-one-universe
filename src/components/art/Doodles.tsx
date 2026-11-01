import { cn } from "@/lib/utils";
import { seeded } from "@/lib/random";

type SvgProps = { className?: string; style?: React.CSSProperties };

export function StarDoodle({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        d="M12 2.5 L14.6 8.6 L21.2 9.2 L16.2 13.5 L17.7 20 L12 16.6 L6.3 20 L7.8 13.5 L2.8 9.2 L9.4 8.6 Z"
        fill="var(--butter)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleDoodle({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 1 Q13 11 23 12 Q13 13 12 23 Q11 13 1 12 Q11 11 12 1 Z" fill="var(--lavender)" stroke="var(--ink)" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartDoodle({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        d="M12 21 C 3 15, 1.5 8.5, 6.2 5.6 C 8.8 4.1, 11 5.6, 12 7.6 C 13 5.6, 15.2 4.1, 17.8 5.6 C 22.5 8.5, 21 15, 12 21 Z"
        fill="var(--blush)"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 14" className={className} aria-hidden preserveAspectRatio="none">
      <path d="M2 7 Q 10 1, 18 7 T 34 7 T 50 7 T 66 7 T 82 7 T 98 7 T 118 7" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Decorative floating hearts/stars field. Positions are seeded so SSR matches hydration. */
export function FloatingField({ count = 14, className }: { count?: number; className?: string }) {
  const items = Array.from({ length: count }, (_, i) => {
    const kind = i % 3;
    return {
      kind,
      left: seeded(i + 1) * 100,
      size: 14 + seeded(i + 11) * 22,
      delay: seeded(i + 21) * 12,
      dur: 11 + seeded(i + 31) * 10,
    };
  });
  return (
    <div aria-hidden className={cn("motion-hide pointer-events-none fixed inset-0 -z-0 overflow-hidden", className)}>
      {items.map((it, i) => {
        const style: React.CSSProperties = {
          position: "absolute",
          left: `${it.left}%`,
          bottom: "-40px",
          width: it.size,
          height: it.size,
          animation: `float-up ${it.dur}s linear ${it.delay}s infinite`,
          opacity: 0,
        };
        if (it.kind === 0) return <HeartDoodle key={i} style={style} />;
        if (it.kind === 1) return <StarDoodle key={i} style={style} />;
        return <SparkleDoodle key={i} style={style} />;
      })}
    </div>
  );
}
