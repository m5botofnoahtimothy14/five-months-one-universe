import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Music2, Pause, Play, Volume2 } from "lucide-react";
import { useMusic, ACCEPTED_AUDIO } from "@/components/music/MusicProvider";
import type { ReactNode } from "react";

const journey = [
  ["/", "Welcome"], ["/quiz", "The quiz"], ["/machine", "Affection machine"],
  ["/teddy", "Your teddy"], ["/letter", "The letter"], ["/surprise", "The surprise"],
] as const;

function SoundtrackDock() {
  const music = useMusic();
  return (
    <aside className="soundtrack-dock" aria-label="Website soundtrack">
      <span className={`soundtrack-disc ${music.isPlaying ? "spinning" : ""}`}><Music2 size={18}/></span>
      <span className="soundtrack-copy">
        <strong>{music.current?.title ?? "our soundtrack"}</strong>
        <small>{music.current ? (music.isPlaying ? "playing across every page" : "paused") : "Noah will add the songs"}</small>
      </span>
      {music.current ? (
        <>
          <button className="soundtrack-control" onClick={music.toggle} aria-label={music.isPlaying ? "Pause music" : "Play music"}>{music.isPlaying ? <Pause size={17}/> : <Play size={17}/>}</button>
          <label className="soundtrack-volume" title="Volume"><Volume2 size={15}/><input aria-label="Music volume" type="range" min="0" max="1" step="0.05" value={music.volume} onChange={e=>music.setVolume(Number(e.target.value))}/></label>
        </>
      ) : (
        <label className="soundtrack-add">ADD SONGS<input type="file" accept={ACCEPTED_AUDIO} multiple onChange={e=>{if(e.target.files?.length) void music.addFiles(e.target.files);e.currentTarget.value="";}}/></label>
      )}
    </aside>
  );
}

export function AppShell({children}:{children:ReactNode}) {
  const pathname=useRouterState({select:s=>s.location.pathname});
  const step=journey.findIndex(([path])=>path===pathname);
  return (
    <div className="anniversary-app">
      <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
      <header className="anniversary-header">
        <Link to="/" className="anniversary-brand"><span>♡</span> five months, one universe</Link>
        <Link to="/pods" className="comfort-link"><Heart size={15} fill="currentColor"/> need a little comfort?</Link>
      </header>
      {step>=0 && <div className="journey-progress">
        <div className="journey-meta"><span>OUR LITTLE JOURNEY</span><span>{String(step+1).padStart(2,"0")} / 06</span></div>
        <div className="journey-bar"><span style={{width:`${(step+1)/journey.length*100}%`}}/></div>
        <small>{journey[step][1]}</small>
      </div>}
      <main className="anniversary-main" key={pathname}>{children}</main>
      <footer className="anniversary-footer">made with love, by your annoying Noah <span>♡</span></footer>
      <SoundtrackDock/>
    </div>
  );
}

export function PageHeading({tag,title,subtitle}:{tag:string;title:string;subtitle:string}) {
  return <header className="page-heading"><span className="eyebrow">{tag}</span><h1>{title}</h1><p>{subtitle}</p></header>;
}
export function PageLinks({previous,next}:{previous?:[string,string];next?:[string,string]}) {
  return <nav className="page-links">{previous?<Link className="previous-link" to={previous[0] as never}>← {previous[1]}</Link>:<span/>}{next?<Link className="next-link" to={next[0] as never}>{next[1]} →</Link>:null}</nav>;
}
