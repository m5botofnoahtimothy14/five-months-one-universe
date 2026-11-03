import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Star } from "lucide-react";
import { welcome, pods } from "@/content/anniversary";
import { Mascot } from "@/components/art/Mascot";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <section className="welcome-hero">
        <div className="welcome-copy">
          <span className="eyebrow"><Sparkles size={14} /> A LITTLE WORLD MADE FOR KHADIJA BY NOAH</span>
          <p className="script-line">for my favorite human (that's you, Khadija)</p>
          <h1>SIX<br /><em>MONTHSSSS!!</em></h1>
          <p className="hero-description">
            six months already?? bro how did we get here 😭 i made this tiny corner for you with our silly little lore, too much tea, and a LOT of BABYYYYs.
          </p>
          <Link to="/quiz" className="primary-cta">{welcome.button} <span>↗</span></Link>
          <div className="hero-footnote">✦ sound on for our songs (only if you feel like it, babyyy)</div>
        </div>
        <div className="welcome-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="floating-note note-one">6 months ♡</span>
          <span className="floating-note note-two">you + me</span>
          <div className="home-mascot">
            <Mascot animal="teddy" mood="love" prop="heart" title="A teddy holding a heart" />
          </div>
          <span className="hero-sparkle sparkle-one">✦</span>
          <span className="hero-sparkle sparkle-two">♡</span>
          <p className="art-caption">your Noah-sized teddy is on hug duty</p>
        </div>
      </section>
      <section className="home-comfort">
        <div className="comfort-heading">
          <div>
            <span className="eyebrow">A SOFT PLACE TO LAND</span>
            <h2>NEED A LITTLE LOVE?</h2>
            <p>little comfort corners from your boyfriend, for whenever you need one.</p>
          </div>
          <span className="comfort-heart">♡</span>
        </div>
        <div className="pod-preview-grid">
          {pods.map((pod) => (
            <Link key={pod.id} to="/pods" className="pod-preview">
              <span>{pod.emoji}</span>
              <strong>{pod.name}</strong>
              <small>open your little pod ↗</small>
            </Link>
          ))}
        </div>
        <Link to="/pods" className="text-link">open all the cozy pods, babyyy →</Link>
      </section>
      <p className="home-signoff">
        <Star size={14} fill="currentColor" /> no pressure, no rush. just me loving you from over here, okay? <Heart size={14} fill="currentColor" />
      </p>
    </>
  );
}
