import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { affection } from "@/content/anniversary";
import { PageHeading, PageLinks } from "@/components/layout/AppShell";
import { Mascot } from "@/components/art/Mascot";
import { useFx } from "@/components/fx/FxProvider";
import { pickIndex, prefersReducedMotion } from "@/lib/random";

export const Route = createFileRoute("/machine")({
  head: () => ({
    meta: [
      { title: "Noah Affection Machine · Five Months, One Universe" },
      { name: "description", content: "Press any button for kisses, compliments, secrets and a very dramatic NOAH.exe." },
      { property: "og:title", content: "Noah Affection Machine" },
      { property: "og:description", content: "Press any button. Everything works. That's the whole point." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MachinePage,
});

type Key =
  | "compliment" | "kiss" | "baby" | "miss" | "annoy" | "love"
  | "doYouLove" | "husband" | "exe" | "bear" | "spam" | "secret";

const BUTTONS: { key: Key; label: string; featured?: boolean }[] = [
  { key: "compliment", label: affection.generatorButton + " ✨", featured: true },
  { key: "kiss", label: "PRESS FOR KISS 💋", featured: true },
  { key: "baby", label: "PRESS FOR BABY 🍼" },
  { key: "miss", label: "I MISS YOU 🥺" },
  { key: "annoy", label: "ANNOY NOAH 😤" },
  { key: "love", label: "MORE LOVE PLEASE 💗" },
  { key: "doYouLove", label: "DO YOU LOVE NOAH? 💭" },
  { key: "husband", label: "HUSBAND CHECK 🫡" },
  { key: "exe", label: "NOAH.exe 💻" },
  { key: "bear", label: "SQUEEZE THE BEAR 🧸" },
  { key: "spam", label: "BABY SPAM 📢" },
  { key: "secret", label: "UNLOCK SECRET 🔒" },
];

const LISTS: Partial<Record<Key, readonly string[]>> = {
  compliment: [...affection.messages, ...affection.compliments],
  kiss: affection.kissLines,
  baby: affection.nicknames.map((n) => `hi ${n}!! that's you btw`),
  miss: affection.missYou,
  annoy: affection.annoyNoah,
  love: affection.moreLove,
  husband: affection.husbandCheck,
  bear: affection.squeezeBear,
};

const BURST: Partial<Record<Key, string[]>> = {
  kiss: ["💋", "😘", "💋", "💗"],
  miss: ["🥺", "💌", "🌍", "💗"],
  annoy: ["😤", "💢", "🙄", "💗"],
  love: ["💗", "💖", "💕", "🩷", "❤️"],
  bear: ["🧸", "💗", "✨"],
  husband: ["✅", "🫡", "💍"],
};

function MachinePage() {
  const { burst } = useFx();
  const [message, setMessage] = useState("choose a button, babyyyy. your husband is fully operational.");
  const [count, setCount] = useState(0);
  const [kisses, setKisses] = useState(0);
  const [loveMeter, setLoveMeter] = useState(40);
  const [secretTaps, setSecretTaps] = useState(0);
  const [exeLines, setExeLines] = useState<string[] | null>(null);
  const [exeShown, setExeShown] = useState(0);
  const [askLove, setAskLove] = useState(false);
  const [noIndex, setNoIndex] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [squish, setSquish] = useState(0);
  const [mood, setMood] = useState<"happy" | "love" | "angry" | "sad">("happy");
  const last = useRef<Partial<Record<Key, number>>>({});
  const lastExe = useRef(-1);

  // typewriter for NOAH.exe
  useEffect(() => {
    if (!exeLines || exeShown >= exeLines.length) return;
    const t = window.setTimeout(() => setExeShown((n) => n + 1), prefersReducedMotion() ? 0 : 450);
    return () => window.clearTimeout(t);
  }, [exeLines, exeShown]);

  const say = (text: string) => {
    setExeLines(null);
    setMessage(text);
  };

  const fromList = (key: Key) => {
    const list = LISTS[key]!;
    const i = pickIndex(list.length, last.current[key] ?? -1);
    last.current[key] = i;
    return list[i]!;
  };

  const press = (key: Key, el: HTMLElement) => {
    setCount((c) => c + 1);
    if (key !== "doYouLove") setAskLove(false);
    const items = BURST[key];
    switch (key) {
      case "kiss": {
        const n = kisses + 1;
        setKisses(n);
        say(`${fromList("kiss")}  (kiss #${n} delivered)`);
        setMood("love");
        break;
      }
      case "love":
        setLoveMeter((m) => Math.min(100, m + 15));
        say(fromList("love"));
        setMood("love");
        break;
      case "annoy":
        say(fromList("annoy"));
        setMood("angry");
        break;
      case "miss":
        say(fromList("miss"));
        setMood("sad");
        break;
      case "bear":
        setSquish((s) => s + 1);
        say(fromList("bear"));
        setMood("happy");
        break;
      case "exe": {
        const i = pickIndex(affection.noahExe.length, lastExe.current);
        lastExe.current = i;
        setMessage("");
        setExeShown(0);
        setExeLines(affection.noahExe[i]!);
        break;
      }
      case "spam": {
        const words = Array.from({ length: 6 }, () => affection.babySpam[Math.floor(Math.random() * affection.babySpam.length)]!);
        say(words.join(" "));
        burst({ from: el, items: affection.babySpam, count: 12, spread: 200 });
        break;
      }
      case "secret": {
        const n = secretTaps + 1;
        setSecretTaps(n >= affection.secretUnlock.tapsNeeded ? 0 : n);
        if (n >= affection.secretUnlock.tapsNeeded) {
          say("🔓 " + affection.secretUnlock.reveals[pickIndex(affection.secretUnlock.reveals.length)]!);
          burst({ from: el, items: ["🔓", "✨", "⭐", "💗"], count: 16 });
        } else {
          say(`🔒 secret lock: ${n}/${affection.secretUnlock.tapsNeeded}. ${affection.secretUnlock.hint}`);
        }
        break;
      }
      case "doYouLove":
        setAskLove(true);
        setNoIndex(0);
        setNoPos({ x: 0, y: 0 });
        say(affection.doYouLove.question);
        break;
      default:
        say(fromList(key));
        setMood("happy");
    }
    if (items) burst({ from: el, items, count: 10 });
  };

  const dodgeNo = () => {
    setNoIndex((i) => i + 1);
    setNoPos({ x: Math.round((Math.random() - 0.5) * 160), y: Math.round((Math.random() - 0.5) * 50) });
    setMessage(affection.doYouLove.noDodges[noIndex % affection.doYouLove.noDodges.length]!);
  };

  return (
    <>
      <PageHeading tag="NOAH INDUSTRIES · LOVE DIVISION" title={affection.title} subtitle={affection.subtitle} />
      <section className="content-card machine-card">
        <div className="machine-top">
          <div
            className={`machine-mascot ${squish ? "squish" : ""}`}
            key={squish}
            aria-hidden
          >
            <Mascot animal="teddy" mood={mood} prop={mood === "love" ? "heart" : "none"} />
          </div>
          <div className="machine-screen">
            <span>NOAH.EXE // STATUS: ONLINE</span>
            <div aria-live="polite" className="machine-output">
              {exeLines ? (
                <pre>{exeLines.slice(0, exeShown).join("\n")}<i className="cursor">▌</i></pre>
              ) : (
                <p>{message}</p>
              )}
            </div>
            {askLove && (
              <div className="love-ask">
                <button
                  className="primary-cta"
                  onClick={(e) => {
                    setAskLove(false);
                    setLoveMeter(100);
                    setMood("love");
                    say(affection.doYouLove.yesReply);
                    burst({ from: e.currentTarget, count: 24, spread: 220 });
                  }}
                >
                  {affection.doYouLove.yes}
                </button>
                <button
                  className="no-button"
                  style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                  onClick={dodgeNo}
                  onPointerEnter={(e) => e.pointerType === "mouse" && dodgeNo()}
                >
                  {affection.doYouLove.no}
                </button>
              </div>
            )}
            <div className="machine-stats">
              <small>{count} commands</small>
              <small>💋 {kisses} kisses</small>
              <small>🔒 {secretTaps}/{affection.secretUnlock.tapsNeeded}</small>
            </div>
            <div className="love-meter" role="meter" aria-label="Love meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={loveMeter}>
              <i style={{ width: `${loveMeter}%` }} />
              <span>love meter {loveMeter}%{loveMeter >= 100 ? " · OVERFLOWING" : ""}</span>
            </div>
          </div>
        </div>
        <div className="machine-grid">
          {BUTTONS.map((b) => (
            <button key={b.key} onClick={(e) => press(b.key, e.currentTarget)} className={b.featured ? "machine-button featured" : "machine-button"}>
              {b.label}
            </button>
          ))}
        </div>
      </section>
      <PageLinks />
    </>
  );
}
