import { createFileRoute } from "@tanstack/react-router";
import { Music2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { music as musicContent } from "@/content/anniversary";
import { PageHeading, formatTime } from "@/components/layout/AppShell";
import { useMusic } from "@/components/music/MusicProvider";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Our Little Soundtrack · Six Months, One Universe" },
      { name: "description", content: "The songs Khadija sent Noah, playing softly through their anniversary scrapbook." },
      { property: "og:title", content: "Our Little Soundtrack" },
      { property: "og:description", content: "Three songs, picked with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MusicPage,
});

function MusicPage() {
  const m = useMusic();
  return (
    <>
      <PageHeading tag="OUR SOUNDTRACK" title={musicContent.title} subtitle={musicContent.subtitle} />
      <section className="content-card music-card" aria-label="Soundtrack player">
        <div className="music-stage">
          <div className={`music-disc${m.isPlaying ? " playing" : ""}`} aria-hidden>
            <Music2 size={35} />
          </div>
          <div className="music-copy">
            <span className="eyebrow">{m.isPlaying ? "PLAYING FOR YOU" : "A LITTLE MUSIC"}</span>
            <h2>{m.current?.title ?? "Our songs"}</h2>
            <p>{m.current?.artist ?? "Khadija + Noah"}</p>
            {m.error && <p className="music-error" role="alert">{m.error}</p>}
            {m.needsTap && <p className="music-note" role="status">Tap play once to let the music start ♡</p>}
          </div>
        </div>
        <input
          className="music-seek"
          type="range"
          aria-label="Song progress"
          min={0}
          max={m.duration || 0}
          step={0.5}
          value={Math.min(m.time, m.duration || 0)}
          disabled={!m.current}
          onChange={(e) => m.seek(Number(e.target.value))}
        />
        <div className="music-times"><span>{formatTime(m.time)}</span><span>{formatTime(m.duration)}</span></div>
        <div className="music-controls">
          <button onClick={m.prev} disabled={!m.tracks.length} aria-label="Previous song"><SkipBack size={18} /></button>
          <button className="play" onClick={m.toggle} disabled={!m.tracks.length} aria-label={m.isPlaying ? "Pause" : "Play"}>
            {m.isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button onClick={m.next} disabled={!m.tracks.length} aria-label="Next song"><SkipForward size={18} /></button>
          <button onClick={m.toggleMute} aria-label={m.muted ? "Unmute" : "Mute"}>{m.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
          <input type="range" aria-label="Volume" min={0} max={1} step={0.05} value={m.muted ? 0 : m.volume} onChange={(e) => m.setVolume(Number(e.target.value))} />
        </div>
        <ol className="music-queue" aria-label="Our songs">
          {m.tracks.map((t, i) => (
            <li key={t.id} className={i === m.currentIndex ? "current" : ""}>
              <button className="track-select" onClick={() => m.playAt(i)} aria-current={i === m.currentIndex ? "true" : undefined}>
                <span className="track-number">{i === m.currentIndex && m.isPlaying ? "♪" : String(i + 1).padStart(2, "0")}</span>
                <span className="track-name">{t.title}<small>{t.artist}</small></span>
                <span className="track-action" aria-hidden>{i === m.currentIndex && m.isPlaying ? <Pause size={15} /> : <Play size={15} />}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
