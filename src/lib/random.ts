/** Random index in [0, length) that differs from `prev` when possible. */
export function pickIndex(length: number, prev = -1): number {
  if (length <= 1) return 0;
  let i = Math.floor(Math.random() * length);
  if (i === prev) i = (i + 1 + Math.floor(Math.random() * (length - 1))) % length;
  return i;
}

export function pick<T>(list: readonly T[], prev?: T): T {
  const prevIndex = prev === undefined ? -1 : list.indexOf(prev);
  return list[pickIndex(list.length, prevIndex)];
}

/** Deterministic pseudo-random for stable SSR/hydration decorations. */
export function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
