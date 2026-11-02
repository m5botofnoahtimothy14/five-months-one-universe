import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { timeline } from "@/content/anniversary";
import { PageHeading, PageLinks } from "@/components/layout/AppShell";
import { useFx } from "@/components/fx/FxProvider";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Our Five Months · Five Months, One Universe" },
      { name: "description", content: "Five scrapbook chapters: sleepy eyes at assembly, late-night chats, duets, tea and missing each other." },
      { property: "og:title", content: "Our Five Months" },
      { property: "og:description", content: "Five scrapbook chapters of us." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  const { burst } = useFx();
  const [opened, setOpened] = useState<number[]>([]);
  return (
    <>
      <PageHeading
        tag="A SCRAPBOOK OF US"
        title="FIVE MONTHS, FIVE CHAPTERS"
        subtitle="tap each sticker to open the chapter. no fake dates, just the moments i actually remember."
      />
      <ol className="timeline">
        {timeline.map((m, i) => {
          const isOpen = opened.includes(m.month);
          return (
            <li key={m.month} className={`timeline-item tone-${m.tone} ${i % 2 ? "right" : "left"}`}>
              <span className="timeline-dot" aria-hidden>{m.month}</span>
              <article className="timeline-card">
                <span className="tape-strip" aria-hidden />
                <button
                  className="timeline-sticker"
                  aria-expanded={isOpen}
                  aria-controls={`chapter-${m.month}`}
                  onClick={(e) => {
                    setOpened((o) => (isOpen ? o.filter((x) => x !== m.month) : [...o, m.month]));
                    if (!isOpen) burst({ from: e.currentTarget, items: [m.sticker, "✨", "💗"], count: 8, spread: 80 });
                  }}
                >
                  <span aria-hidden>{m.sticker}</span>
                  <span className="sr-only">{isOpen ? "close" : "open"} chapter {m.month}</span>
                </button>
                <span className="eyebrow">MONTH {m.month}</span>
                <h2>{m.title}</h2>
                <p className="timeline-label">{m.label}</p>
                <div id={`chapter-${m.month}`} hidden={!isOpen} className="timeline-body">
                  <p>{m.story}</p>
                  <ul>
                    {m.moments.map((x) => (
                      <li key={x}>♡ {x}</li>
                    ))}
                  </ul>
                </div>
                {!isOpen && <p className="timeline-hint">tap the sticker ↑</p>}
              </article>
            </li>
          );
        })}
      </ol>
      <p className="timeline-next">…and chapter six is loading 💗</p>
      <PageLinks />
    </>
  );
}
