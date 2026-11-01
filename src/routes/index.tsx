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
          <span className="eyebrow"><Sparkles size={14} /> A LITTLE WORLD MADE BY NOAH</span>
          <p className="script-line">for my favourite human, Khadija</p>
          <h1>FIVE<br /><em>MONTHSSSS!!</em></h1>
          <p className="hero-description">
            Five months of us. A thousand little feelings. One very annoying husband who made you an entire universe.
          </p>
          <Link to="/quiz" className="primary-cta">{welcome.button} <span>↗</span></Link>
          <div className="hero-footnote">✦ best experienced with sound on</div>
        </div>
        <div className="welcome-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="floating-note note-one">5 months ♡</span>
          <span className="floating-note note-two">you + me</span>
          <div className="home-mascot">
            <Mascot animal="teddy" mood="love" prop="heart" title="A teddy holding a heart" />
          </div>
          <span className="hero-sparkle sparkle-one">✦</span>
          <span className="hero-sparkle sparkle-two">♡</span>
          <p className="art-caption">your personal teddy is waiting</p>
        </div>
      </section>
      <section className="home-comfort">
        <div className="comfort-heading">
          <div>
            <span className="eyebrow">A SOFT PLACE TO LAND</span>
            <h2>NEED YOUR TEDDY?</h2>
            <p>These comfort corners are here whenever you need them.</p>
          </div>
          <span className="comfort-heart">♡</span>
        </div>
        <div className="pod-preview-grid">
          {pods.map((pod) => (
            <Link key={pod.id} to="/pods" className="pod-preview">
              <span>{pod.emoji}</span>
              <strong>{pod.name}</strong>
              <small>open comfort pod ↗</small>
            </Link>
          ))}
        </div>
        <Link to="/pods" className="text-link">Open all comfort pods →</Link>
      </section>
      <p className="home-signoff">
        <Star size={14} fill="currentColor" /> no pressure, no rush. just a little world made for you. <Heart size={14} fill="currentColor" />
      </p>
    </>
  );
}
