import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { quiz } from "@/content/anniversary";
import { PageHeading, PageLinks } from "@/components/layout/AppShell";
import { useFx } from "@/components/fx/FxProvider";
import { resultFor, scorePercent } from "@/lib/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "The Husband Quiz · Five Months, One Universe" },
      { name: "description", content: "How well does Khadija know her annoying husband? Eight dramatic questions." },
      { property: "og:title", content: "The Husband Quiz" },
      { property: "og:description", content: "How well does Khadija know her annoying husband?" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { burst, confetti } = useFx();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const total = quiz.questions.length;
  const q = quiz.questions[index]!;
  const result = resultFor(score, total, quiz.results);
  const isLast = index === total - 1;

  const choose = (i: number, el: HTMLElement) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correct) {
      setScore((s) => s + 1);
      burst({ from: el, count: 12 });
    } else {
      burst({ from: el, items: ["😭", "🙈", "💔"], count: 6, spread: 70 });
    }
    window.setTimeout(() => feedbackRef.current?.focus(), 50);
  };

  const advance = () => {
    if (isLast) {
      setDone(true);
      if (scorePercent(score, total) >= 75) confetti();
    } else setIndex((i) => i + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  return (
    <>
      <PageHeading tag="A VERY IMPORTANT INVESTIGATION" title={quiz.title} subtitle={quiz.intro} />
      <section className="content-card quiz-card" aria-live="polite">
        {!done ? (
          <>
            <div className="quiz-top">
              <span>QUESTION {index + 1} OF {total}</span>
              <span>{score} correct so far</span>
            </div>
            <div className="quiz-progress" aria-hidden>
              <i style={{ width: `${((index + (picked !== null ? 1 : 0)) / total) * 100}%` }} />
            </div>
            <h2>{q.question}</h2>
            <div className="quiz-options" role="group" aria-label="Answers">
              {q.options.map((option, i) => {
                const state = picked === null ? "" : i === q.correct ? " correct" : i === picked ? " incorrect" : "";
                return (
                  <button
                    key={option}
                    disabled={picked !== null}
                    aria-pressed={picked === i}
                    onClick={(e) => choose(i, e.currentTarget)}
                    className={`quiz-option${state}`}
                  >
                    <span className="quiz-letter" aria-hidden>{"ABCD"[i]}</span> {option}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div className="quiz-feedback" ref={feedbackRef} tabIndex={-1}>
                <strong>{picked === q.correct ? "THAT'S RIGHTTT ♡" : "OOPS, BABYYY!"}</strong>
                <p>{picked === q.correct ? q.rightReply : q.wrongReply}</p>
                <button className="primary-cta" onClick={advance}>
                  {isLast ? "SEE MY RESULT ✨" : "NEXT QUESTION →"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="quiz-result">
            <span className="eyebrow">YOUR OFFICIAL RESULT</span>
            <h2>{result.title}</h2>
            <strong className="quiz-score">
              {score} / {total} <small>({scorePercent(score, total)}%)</small>
            </strong>
            <p>{result.message}</p>
            <button className="secondary-cta" onClick={restart}>PLAY AGAIN ↺</button>
          </div>
        )}
      </section>
      <PageLinks hideNext={!done} />
    </>
  );
}
