/**
 * A very calm layer of tiny hearts drifting up behind the content.
 * Fully decorative: fixed position, pointer-events none, low opacity,
 * and it switches off entirely when the visitor prefers reduced motion.
 */

const EMOJI = ["🩷", "💗", "💖", "🤍", "💞"];

// deterministic values (no Math.random) so SSR and client render identically
const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 37 + 9) % 100,
  delay: (i * 2.7) % 16,
  duration: 18 + ((i * 1.9) % 12),
  size: 13 + ((i * 7) % 12),
  drift: ((i % 2) * 2 - 1) * (10 + i * 2),
  emoji: EMOJI[i % EMOJI.length]!,
}));

export function HeartField() {
  return (
    <div className="heart-field motion-hide" aria-hidden>
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="heart-drift"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            ["--drift" as string]: `${h.drift}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
