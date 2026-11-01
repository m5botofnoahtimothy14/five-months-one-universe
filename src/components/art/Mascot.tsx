import type { MascotAnimal, MascotMood, MascotProp } from "@/content/anniversary";
import { cn } from "@/lib/utils";

type Props = {
  animal?: MascotAnimal;
  mood?: MascotMood;
  prop?: MascotProp;
  className?: string;
  title?: string;
};

const INK = "var(--ink)";
const SW = 2.6;

function Eyes({ mood }: { mood: MascotMood }) {
  switch (mood) {
    case "love":
    case "happy":
      return (
        <g fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round">
          <path d="M43 50 Q48 44 53 50" />
          <path d="M67 50 Q72 44 77 50" />
        </g>
      );
    case "sleepy":
      return (
        <g fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round">
          <path d="M43 49 Q48 54 53 49" />
          <path d="M67 49 Q72 54 77 49" />
        </g>
      );
    case "angry":
      return (
        <g>
          <g stroke={INK} strokeWidth={SW} strokeLinecap="round">
            <path d="M42 41 L53 45" />
            <path d="M78 41 L67 45" />
          </g>
          <circle cx="48" cy="50" r="3.4" fill={INK} />
          <circle cx="72" cy="50" r="3.4" fill={INK} />
        </g>
      );
    case "thinking":
      return (
        <g fill={INK}>
          <circle cx="49" cy="47" r="3.4" className="animate-blink" />
          <circle cx="73" cy="47" r="3.4" className="animate-blink" />
        </g>
      );
    case "sad":
    case "crying":
      return (
        <g>
          <g stroke={INK} strokeWidth={SW} strokeLinecap="round" fill="none">
            <path d="M42 44 Q47 41 52 42" />
            <path d="M78 44 Q73 41 68 42" />
          </g>
          <circle cx="48" cy="51" r="3.6" fill={INK} />
          <circle cx="72" cy="51" r="3.6" fill={INK} />
          <circle cx="49.3" cy="49.8" r="1.2" fill="var(--paper)" />
          <circle cx="73.3" cy="49.8" r="1.2" fill="var(--paper)" />
        </g>
      );
  }
}

function Mouth({ mood, y }: { mood: MascotMood; y: number }) {
  const common = { fill: "none", stroke: INK, strokeWidth: SW, strokeLinecap: "round" as const };
  if (mood === "sad" || mood === "crying") return <path d={`M54 ${y + 4} Q60 ${y - 1} 66 ${y + 4}`} {...common} />;
  if (mood === "angry") return <path d={`M55 ${y + 2} L65 ${y + 2}`} {...common} />;
  if (mood === "thinking") return <ellipse cx="62" cy={y + 2} rx="2.6" ry="2.2" fill={INK} />;
  if (mood === "sleepy") return <ellipse cx="60" cy={y + 2} rx="2.6" ry="3" fill={INK} />;
  return <path d={`M54 ${y} Q57 ${y + 5} 60 ${y} Q63 ${y + 5} 66 ${y}`} {...common} />;
}

function Heart({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <path
          d="M0 10 C -12 2, -12 -9, -5 -9 C -2 -9, 0 -6, 0 -4 C 0 -6, 2 -9, 5 -9 C 12 -9, 12 2, 0 10 Z"
          fill="var(--primary)"
          stroke={INK}
          strokeWidth={SW / s}
          strokeLinejoin="round"
        />
        <path d="M-5 -5 Q-7 -2 -5 1" stroke="var(--paper)" strokeWidth={1.6 / s} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

function PropArt({ prop }: { prop: MascotProp }) {
  switch (prop) {
    case "heart":
      return <Heart x={60} y={96} s={1.25} className="animate-heartbeat" />;
    case "tissue":
      return (
        <g>
          <rect x="47" y="90" width="26" height="16" rx="3" fill="var(--sky)" stroke={INK} strokeWidth={SW} />
          <path d="M53 90 Q56 80 60 86 Q64 78 67 90" fill="var(--paper)" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
        </g>
      );
    case "hotWaterBottle":
      return (
        <g>
          <rect x="55" y="80" width="10" height="6" rx="1.5" fill="var(--lavender)" stroke={INK} strokeWidth={SW} />
          <rect x="45" y="85" width="30" height="24" rx="9" fill="var(--blush)" stroke={INK} strokeWidth={SW} />
          <Heart x={60} y={96} s={0.55} />
        </g>
      );
    case "letter":
      return (
        <g>
          <rect x="44" y="86" width="32" height="21" rx="3" fill="var(--paper)" stroke={INK} strokeWidth={SW} />
          <path d="M44 88 L60 99 L76 88" fill="none" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          <Heart x={60} y={100} s={0.4} />
        </g>
      );
    case "pillow":
      return (
        <g>
          <rect x="40" y="88" width="40" height="20" rx="9" fill="var(--lavender)" stroke={INK} strokeWidth={SW} />
          <path d="M50 98 h20" stroke={INK} strokeWidth={1.5} strokeDasharray="2 3" />
        </g>
      );
    case "flower":
      return (
        <g>
          <path d="M60 108 Q58 98 60 88" stroke="var(--chart-5)" strokeWidth={3} fill="none" />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="60" cy="81" rx="4" ry="6" fill="var(--butter)" stroke={INK} strokeWidth={1.8} transform={`rotate(${a} 60 87)`} />
          ))}
          <circle cx="60" cy="87" r="3.5" fill="var(--peach-deep)" stroke={INK} strokeWidth={1.6} />
        </g>
      );
    case "cloud":
      return (
        <g>
          <circle cx="94" cy="30" r="2.4" fill="var(--paper)" stroke={INK} strokeWidth={1.6} />
          <circle cx="100" cy="22" r="3.4" fill="var(--paper)" stroke={INK} strokeWidth={1.6} />
          <path d="M96 14 a6 6 0 0 1 8-6 a7 7 0 0 1 12 2 a5 5 0 0 1 -2 10 h-16 a5 5 0 0 1 -2-6 z" fill="var(--paper)" stroke={INK} strokeWidth={1.8} />
          <text x="106" y="16" fontSize="8" textAnchor="middle" fill={INK} fontFamily="var(--font-display)">?!</text>
        </g>
      );
    default:
      return null;
  }
}

/** Original hand-drawn style teddy / bunny mascot. Pure SVG, no external assets. */
export function Mascot({ animal = "teddy", mood = "happy", prop = "none", className, title }: Props) {
  const fur = animal === "teddy" ? "var(--fur-teddy)" : "var(--fur-bunny)";
  const furLight = animal === "teddy" ? "var(--fur-teddy-light)" : "var(--paper)";
  const headY = animal === "teddy" ? 52 : 56;
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("h-auto w-full overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* ears */}
      {animal === "teddy" ? (
        <g stroke={INK} strokeWidth={SW}>
          <circle cx="33" cy="28" r="13" fill={fur} />
          <circle cx="87" cy="28" r="13" fill={fur} />
          <circle cx="33" cy="28" r="6.5" fill="var(--blush)" strokeWidth={0} />
          <circle cx="87" cy="28" r="6.5" fill="var(--blush)" strokeWidth={0} />
        </g>
      ) : (
        <g stroke={INK} strokeWidth={SW}>
          <ellipse cx="45" cy="20" rx="8.5" ry="22" fill={fur} transform={mood === "sad" || mood === "crying" || mood === "sleepy" ? "rotate(-28 45 38)" : "rotate(-8 45 38)"} />
          <ellipse cx="75" cy="20" rx="8.5" ry="22" fill={fur} transform={mood === "sad" || mood === "crying" || mood === "sleepy" ? "rotate(28 75 38)" : "rotate(8 75 38)"} />
          <ellipse cx="45" cy="22" rx="3.8" ry="14" fill="var(--blush)" strokeWidth={0} transform={mood === "sad" || mood === "crying" || mood === "sleepy" ? "rotate(-28 45 38)" : "rotate(-8 45 38)"} />
          <ellipse cx="75" cy="22" rx="3.8" ry="14" fill="var(--blush)" strokeWidth={0} transform={mood === "sad" || mood === "crying" || mood === "sleepy" ? "rotate(28 75 38)" : "rotate(8 75 38)"} />
        </g>
      )}
      {/* body */}
      <ellipse cx="60" cy="98" rx="27" ry="20" fill={fur} stroke={INK} strokeWidth={SW} />
      <ellipse cx="60" cy="101" rx="15" ry="11" fill={furLight} />
      {/* feet */}
      <ellipse cx="44" cy="114" rx="9" ry="5.5" fill={fur} stroke={INK} strokeWidth={SW} />
      <ellipse cx="76" cy="114" rx="9" ry="5.5" fill={fur} stroke={INK} strokeWidth={SW} />
      {/* head */}
      <circle cx="60" cy={headY} r={animal === "teddy" ? 31 : 28} fill={fur} stroke={INK} strokeWidth={SW} />
      {animal === "teddy" && <ellipse cx="60" cy={headY + 12} rx="13" ry="9.5" fill={furLight} />}
      {/* cheeks */}
      <ellipse cx="40" cy={headY + 8} rx="5.5" ry="3.5" fill="var(--primary)" opacity="0.45" />
      <ellipse cx="80" cy={headY + 8} rx="5.5" ry="3.5" fill="var(--primary)" opacity="0.45" />
      <Eyes mood={mood} />
      {/* nose */}
      {animal === "teddy" ? (
        <ellipse cx="60" cy={headY + 7} rx="4.6" ry="3.2" fill={INK} />
      ) : (
        <path d={`M57 ${headY + 4} h6 l-3 3.5 z`} fill="var(--primary)" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
      )}
      <Mouth mood={mood} y={headY + (animal === "teddy" ? 13 : 11)} />
      {/* mood extras */}
      {mood === "crying" && (
        <g fill="var(--tear)" stroke={INK} strokeWidth={1.2}>
          <path d="M45 57 q-3 6 0 9 q3 -3 0 -9z" className="animate-bob" />
          <path d="M75 57 q-3 6 0 9 q3 -3 0 -9z" className="animate-bob" />
        </g>
      )}
      {mood === "sleepy" && (
        <g fill={INK} fontFamily="var(--font-display)" fontWeight="700">
          <text x="92" y="30" fontSize="11" className="animate-twinkle">z</text>
          <text x="100" y="18" fontSize="14" className="animate-twinkle" style={{ animationDelay: "0.6s" }}>Z</text>
        </g>
      )}
      {mood === "angry" && (
        <g fill="var(--paper)" stroke={INK} strokeWidth={1.4} className="animate-wiggle" style={{ transformOrigin: "98px 22px" }}>
          <circle cx="96" cy="24" r="5" />
          <circle cx="103" cy="18" r="4" />
          <circle cx="104" cy="27" r="3.4" />
        </g>
      )}
      {mood === "love" && (
        <g>
          <Heart x={98} y={22} s={0.5} className="animate-twinkle" />
          <Heart x={20} y={40} s={0.38} className="animate-twinkle" />
        </g>
      )}
      {/* arms */}
      <ellipse cx="38" cy="94" rx="7" ry="10" fill={fur} stroke={INK} strokeWidth={SW} transform="rotate(-35 38 94)" />
      <PropArt prop={prop} />
      <ellipse cx="82" cy="94" rx="7" ry="10" fill={fur} stroke={INK} strokeWidth={SW} transform="rotate(35 82 94)" />
    </svg>
  );
}
