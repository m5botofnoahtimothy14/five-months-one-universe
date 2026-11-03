import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { pods } from "@/content/anniversary";
import { PageHeading } from "@/components/layout/AppShell";
import { Mascot } from "@/components/art/Mascot";
import { useFx } from "@/components/fx/FxProvider";
import { bagCurrent, bagNext, newBag, type Bag } from "@/lib/cycle";

export const Route = createFileRoute("/pods")({
  head: () => ({
    meta: [
      { title: "Little Comfort Pods · Six Months, One Universe" },
      { name: "description", content: "Six soft little notes from Noah for Khadija, for whatever kind of day it is." },
      { property: "og:title", content: "Little Comfort Pods" },
      { property: "og:description", content: "Pick a feeling, babyyy. Your Noah has a little note for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PodsPage,
});

function PodsPage() {
  const { burst } = useFx();
  const [active, setActive] = useState<string | null>(null);
  const [bag, setBag] = useState<Bag | null>(null);
  const [hugs, setHugs] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pod = pods.find((p) => p.id === active);

  const open = (id: string) => {
    const p = pods.find((x) => x.id === id)!;
    setActive(id);
    setBag(newBag(p.messages.length));
    setHugs(0);
    window.setTimeout(() => headingRef.current?.focus(), 30);
  };

  return (
    <>
      <PageHeading
        tag="A SOFT PLACE TO LAND"
        title="A LITTLE POD FOR YOU"
        subtitle="pick whatever feels like you right now. no pressure, no fixing-you speech. just a little love from Noah ♡"
      />
      {pod && bag ? (
        <section className={`content-card active-pod tone-${pod.tone}`}>
          <button className="back-to-pods" onClick={() => setActive(null)}>← ALL OUR LITTLE PODS</button>
          <div className="pod-mascot animate-bob" aria-hidden>
            <Mascot animal={pod.mascot.animal} mood={pod.mascot.mood} prop={pod.mascot.prop} />
          </div>
          <span className="eyebrow">{pod.emoji} {pod.name}</span>
          <h2 ref={headingRef} tabIndex={-1}>{pod.teaser}</h2>
          <blockquote key={`${bag.pos}-${bagCurrent(bag)}`} aria-live="polite">{pod.messages[bagCurrent(bag)]}</blockquote>
          <div className="pod-controls">
            <span>{bag.pos + 1} / {pod.messages.length}</span>
            <button
              className="secondary-cta"
              onClick={(e) => {
                setHugs((h) => h + 1);
                burst({ from: e.currentTarget, items: ["🫂", "💗", "🧸"], count: 8, spread: 90 });
              }}
            >
              🫂 SEND YOUR BOYFRIEND A HUG{hugs ? ` (${hugs})` : ""}
            </button>
            <button className="primary-cta" onClick={() => setBag((b) => (b ? bagNext(b) : b))}>
              ANOTHER NOTE FROM NOAH →
            </button>
          </div>
          <p className="pod-note">take your time, babyyy. there's no wrong way to feel. i'm right here ♡</p>
        </section>
      ) : (
        <div className="pods-grid">
          {pods.map((p) => (
            <button key={p.id} className={`pod-card tone-${p.tone}`} onClick={() => open(p.id)}>
              <span className="pod-emoji" aria-hidden>{p.emoji}</span>
              <div className="pod-mascot-small" aria-hidden>
                <Mascot animal={p.mascot.animal} mood={p.mascot.mood} prop={p.mascot.prop} />
              </div>
              <strong>{p.name}</strong>
              <small>{p.teaser}</small>
              <span className="pod-open" aria-hidden>OPEN YOUR POD ↗</span>
            </button>
          ))}
        </div>
      )}
      <nav className="page-links" aria-label="Page navigation">
        <Link className="previous-link" to="/">← home</Link>
        <Link className="next-link" to="/quiz">quiz time, babyyy →</Link>
      </nav>
    </>
  );
}
