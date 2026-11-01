export type QuizResult = { min: number; title: string; message: string };

/** Percentage (0-100, rounded) for a score. */
export function scorePercent(score: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((Math.max(0, Math.min(score, total)) / total) * 100);
}

/** Picks the result tier whose `min` is the highest one the percentage reaches. */
export function resultFor(score: number, total: number, results: QuizResult[]): QuizResult {
  const pct = scorePercent(score, total);
  const sorted = [...results].sort((a, b) => b.min - a.min);
  return sorted.find((r) => pct >= r.min) ?? sorted[sorted.length - 1];
}
