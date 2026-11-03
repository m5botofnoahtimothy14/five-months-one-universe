import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { surprise } from "@/content/anniversary";
import { PageHeading, PageLinks } from "@/components/layout/AppShell";
import { Mascot } from "@/components/art/Mascot";
import { useFx } from "@/components/fx/FxProvider";

export const Route = createFileRoute("/surprise")({
  head: () => ({
    meta: [
      { title: "The Final Surprise · Six Months, One Universe" },
      { name: "description", content: "One last wrapped-up gift with a final message inside." },
      { property: "og:title", content: "The Final Surprise" },
      { property: "og:description", content: "There is one more thing. It's wrapped up just for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SurprisePage,
});

type Stage = "gift" | "envelope" | "letter";

function SurprisePage() {
  const { burst, confetti } = useFx();
  const [taps, setTaps] = useState(0);
  const [stage, setStage] = useState<Stage>("gift");
  const [shakeKey, setShakeKey] = useState(0);
  const revealRef = useRef<HTMLHeadingElement>(null);
  const left = Math.max(0, surprise.tapsToOpen - taps);

  const tapGift = (el: HTMLElement) => {
    const n = taps + 1;
    setTaps(n);
    setShakeKey((k) => k + 1);
    burst({ from: el, items: ["✨", "🎀", "💗"], count: 6, spread: 80 });
    if (n >= surprise.tapsToOpen) {
      setStage("envelope");
      burst({ from: el, items: ["🎉", "🎀", "✨", "💖"], count: 18, spread: 180 });
    }
  };

  const openEnvelope = () => {
    setStage("letter");
    confetti();
    window.setTimeout(() => revealRef.current?.focus(), 80);
  };

  const replay = () => {
    setTaps(0);
    setStage("gift");
  };

  return (
    <>
      <PageHeading tag="THE LAST LITTLE CORNER" title={surprise.title} subtitle="There is one more thing. It is wrapped up just for you." />
      <section className="content-card surprise-card" aria-live="polite">
        {stage === "gift" && (
          <>
            <button key={shakeKey} className={`gift-box ${taps > 0 ? "gift-shake" : ""}`} onClick={(e) => tapGift(e.currentTarget)}>
              <span aria-hidden>🎁</span>
              <small>{surprise.boxHint}</small>
            </button>
            <p className="gift-hint">
              {left} more {left === 1 ? "tap" : "taps"} to unwrap it.
            </p>
          </>
        )}
        {stage === "envelope" && (
          <>
            <button className="envelope" onClick={openEnvelope}>
              <span className="envelope-flap" aria-hidden />
              <span className="envelope-heart" aria-hidden>💌</span>
              <small>{surprise.envelopeHint}</small>
            </button>
            <p className="gift-hint">the box is open!! there's an envelope inside…</p>
          </>
        )}
        {stage === "letter" && (
          <div className="surprise-reveal animate-letter-rise">
            <div className="surprise-mascots" aria-hidden>
              <div><Mascot animal="teddy" mood="love" prop="heart" /></div>
              <div><Mascot animal="bunny" mood="happy" prop="flower" /></div>
            </div>
            <span className="eyebrow">JUST FOR YOU ♡</span>
            <h2 ref={revealRef} tabIndex={-1}>{surprise.finalTitle}</h2>
            {surprise.finalMessage.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            <strong>{surprise.finalSign}</strong>
            <div className="surprise-actions">
              <button className="primary-cta" onClick={(e) => burst({ from: e.currentTarget, items: ["💋", "💗", "💖"], count: 16 })}>
                SEND NOAH A KISS BACK 💋
              </button>
              <button className="secondary-cta" onClick={() => confetti()}>MORE CONFETTI 🎉</button>
              <button className="secondary-cta" onClick={replay}>{surprise.replay} ↺</button>
            </div>
          </div>
        )}
      </section>
      <PageLinks />
    </>
  );
}
