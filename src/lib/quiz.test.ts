import { describe, expect, it } from "vitest";
import { resultFor, scorePercent } from "./quiz";
import { quiz } from "@/content/anniversary";

describe("anniversary quiz scoring", () => {
  it("returns a rounded percentage", () => {
    expect(scorePercent(7, 8)).toBe(88);
    expect(scorePercent(8, 8)).toBe(100);
  });

  it("handles an empty quiz safely", () => {
    expect(scorePercent(0, 0)).toBe(0);
  });

  it("clamps scores to the valid range", () => {
    expect(scorePercent(12, 8)).toBe(100);
    expect(scorePercent(-2, 8)).toBe(0);
  });

  it("selects the matching result tier", () => {
    expect(resultFor(8, 8, quiz.results).title).toContain("MASTERMIND");
    expect(resultFor(6, 8, quiz.results).min).toBe(75);
    expect(resultFor(1, 8, quiz.results).min).toBe(0);
  });

  it("keeps every correct answer index within its options", () => {
    for (const question of quiz.questions) {
      expect(question.correct).toBeGreaterThanOrEqual(0);
      expect(question.correct).toBeLessThan(question.options.length);
    }
  });
});
