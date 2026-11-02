import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ImagePlus, Pause, Play, SkipBack, SkipForward, Trash2, Volume2, VolumeX } from "lucide-react";
import { music as musicContent } from "@/content/anniversary";
import { PageHeading, formatTime } from "@/components/layout/AppShell";
import { useMusic, ACCEPTED_AUDIO } from "@/components/music/MusicProvider";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Our Little Playlist · Five Months, One Universe" },
      { name: "description", content: "Our songs. Nothing plays by itself: press play when you're ready." },
      { property: "og:title", content: "Our Little Playlist" },
      { property: "og:description", content: "Press play when you're ready. Nothing plays by itself." },
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
      <section className="content-card music-card">
        <div className="music-now">
          <div className="music-cover" aria-hidden>{m.current?.cover ? <img src={m.current.cover} alt="" /> : "🎵"}</div>
          <div className="music-info">
            <span className="eyebrow">NOW PLAYING</span>
            <h2>{m.current?.title ?? (m.tracks.length ? "pick a song ♡" : "no songs yet")}</h2>
            {m.error && <p className="music-error" role="alert">{m.error}</p>}
            <input
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
          </div>
        </div>

        <label className="primary-cta music-add">
          + ADD SONGS FROM THIS DEVICE (mp3, m4a, wav, ogg)
          <input
            type="file"
            accept={ACCEPTED_AUDIO}
            multiple
            onChange={(e) => {
              if (e.target.files?.length) void m.addFiles(e.target.files);
              e.currentTarget.value = "";
            }}
          />
        </label>
        <p className="music-note">
          {m.persistent
            ? "songs you add here are saved in this browser only, on this device. they're never uploaded."
            : "this browser can't save songs, so added songs disappear when you close the tab."}{" "}
          songs bundled with the site live in public/assets/music (see README).
        </p>

        <ol className="music-queue" aria-label="Queue">
          {m.tracks.map((t, i) => (
            <li key={t.id} className={i === m.currentIndex ? "current" : ""}>
              <button className="queue-play" onClick={() => m.playAt(i)} aria-label={`Play ${t.title}`}>
                {t.cover ? <img src={t.cover} alt="" /> : <span>{i === m.currentIndex && m.isPlaying ? "♪" : i + 1}</span>}
              </button>
              {t.source === "local" ? (
                <input className="queue-title" aria-label="Song title" defaultValue={t.title} onBlur={(e) => void m.rename(t.id, e.target.value)} />
              ) : (
                <span className="queue-title">{t.title}{t.artist ? ` · ${t.artist}` : ""} <small>(bundled)</small></span>
              )}
              {t.source === "local" && (
                <span className="queue-tools">
                  <label aria-label={`Add cover for ${t.title}`} title="Add cover">
                    <ImagePlus size={15} />
                    <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) void m.setCover(t.id, f); e.currentTarget.value = ""; }} />
                  </label>
                  <button onClick={() => void m.move(t.id, -1)} aria-label={`Move ${t.title} up`}><ArrowUp size={15} /></button>
                  <button onClick={() => void m.move(t.id, 1)} aria-label={`Move ${t.title} down`}><ArrowDown size={15} /></button>
                  <button onClick={() => void m.remove(t.id)} aria-label={`Remove ${t.title}`}><Trash2 size={15} /></button>
                </span>
              )}
            </li>
          ))}
          {!m.tracks.length && <li className="queue-empty">the playlist is empty. Noah picks the songs ♡</li>}
        </ol>
      </section>
    </>
  );
}
