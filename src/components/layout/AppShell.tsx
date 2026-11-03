import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Music2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { sections, extraPages } from "@/content/anniversary";
import { useMusic, ACCEPTED_AUDIO } from "@/components/music/MusicProvider";

export function formatTime(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function SoundtrackDock() {
  const music = useMusic();
  const pct = music.duration ? (music.time / music.duration) * 100 : 0;
  return (
    <aside className="soundtrack-dock" aria-label="Music player">
      <span className={`soundtrack-disc ${music.isPlaying ? "spinning" : ""}`} aria-hidden>
        {music.current?.cover ? <img src={music.current.cover} alt="" /> : <Music2 size={18} />}
      </span>
      <span className="soundtrack-copy">
        <strong>{music.current?.title ?? (music.tracks.length ? "press play, babyyy" : "our soundtrack")}</strong>
        <small>
          {music.error ??
            (music.current
              ? `${formatTime(music.time)} / ${formatTime(music.duration)}`
              : music.tracks.length
                ? `${music.tracks.length} song${music.tracks.length === 1 ? "" : "s"} ready`
                : "no songs yet. add some ♡")}
        </small>
        <span className="soundtrack-progress" aria-hidden><i style={{ width: `${pct}%` }} /></span>
      </span>
      {music.tracks.length ? (
        <>
          <button className="soundtrack-control small hide-xs" onClick={music.prev} aria-label="Previous song"><SkipBack size={14} /></button>
          <button className="soundtrack-control" onClick={music.toggle} aria-label={music.isPlaying ? "Pause music" : "Play music"}>
            {music.isPlaying ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <button className="soundtrack-control small hide-xs" onClick={music.next} aria-label="Next song"><SkipForward size={14} /></button>
          <button className="soundtrack-control small hide-sm" onClick={music.toggleMute} aria-label={music.muted ? "Unmute" : "Mute"}>
            {music.muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </>
      ) : (
        <label className="soundtrack-add">
          ADD SONGS
          <input
            type="file"
            accept={ACCEPTED_AUDIO}
            multiple
            onChange={(e) => {
              if (e.target.files?.length) void music.addFiles(e.target.files);
              e.currentTarget.value = "";
            }}
          />
        </label>
      )}
      <Link to="/music" className="soundtrack-open" aria-label="Open the full playlist">≡</Link>
    </aside>
  );
}

function SiteMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <div className="site-menu">
      <button className="menu-toggle" aria-expanded={open} aria-controls="site-menu-panel" onClick={() => setOpen((o) => !o)}>
        {open ? <X size={16} /> : <Menu size={16} />} <span>menu</span>
      </button>
      {open && (
        <nav id="site-menu-panel" className="menu-panel" aria-label="All pages">
          <span className="menu-label">THE JOURNEY</span>
          {sections.map((s, i) => (
            <Link key={s.path} to={s.path} className="menu-item" activeOptions={{ exact: true }} activeProps={{ "aria-current": "page", className: "active" }}>
              <span>{String(i + 1).padStart(2, "0")}</span> {s.emoji} {s.label}
            </Link>
          ))}
          <span className="menu-label">ANYTIME</span>
          {extraPages.map((s) => (
            <Link key={s.path} to={s.path} className="menu-item" activeProps={{ "aria-current": "page", className: "active" }}>
              <span>♡</span> {s.emoji} {s.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const step = sections.findIndex((s) => s.path === clean);
  const current = step >= 0 ? sections[step] : undefined;
  return (
    <div className="anniversary-app">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-4 focus:py-3 focus:shadow-lg">Skip to main content</a>
      <div className="ambient ambient-a" aria-hidden />
      <div className="ambient ambient-b" aria-hidden />
      <header className="anniversary-header">
        <Link to="/" className="anniversary-brand" aria-label="Home: Six Months, One Universe">
          <span aria-hidden>♡</span> <b>six months, one universe</b>
        </Link>
        <div className="header-actions">
          {clean !== "/pods" && (
            <Link to="/pods" className="comfort-link">
              <Heart size={15} fill="currentColor" aria-hidden /> <span>need comfort?</span>
            </Link>
          )}
          <SiteMenu pathname={clean} />
        </div>
      </header>
      {current && (
        <div className="journey-progress">
          <div className="journey-meta">
            <span>OUR LITTLE JOURNEY</span>
            <span>
              {String(step + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
            </span>
          </div>
          <div
            className="journey-bar"
            role="progressbar"
            aria-label="Journey progress"
            aria-valuemin={1}
            aria-valuemax={sections.length}
            aria-valuenow={step + 1}
          >
            <span style={{ width: `${((step + 1) / sections.length) * 100}%` }} />
          </div>
          <small>{current.label}</small>
        </div>
      )}
      <main id="main" className="anniversary-main" key={clean}>
        {children}
      </main>
      <footer className="anniversary-footer">
        made with love, by your annoying Noah <span>♡</span>
      </footer>
      <SoundtrackDock />
    </div>
  );
}

export function PageHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <header className="page-heading">
      <span className="eyebrow">{tag}</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

/** Previous / next links that follow the journey order automatically. */
export function PageLinks({ hideNext = false }: { hideNext?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const i = sections.findIndex((s) => s.path === clean);
  const prev = i > 0 ? sections[i - 1] : undefined;
  const next = i >= 0 ? sections[i + 1] : undefined;
  return (
    <nav className="page-links" aria-label="Page navigation">
      {prev ? (
        <Link className="previous-link" to={prev.path}>← {prev.label}</Link>
      ) : (
        <Link className="previous-link" to="/">← home</Link>
      )}
      {!hideNext && next ? (
        <Link className="next-link" to={next.path}>next: {next.label} {next.emoji} →</Link>
      ) : !next ? (
        <Link className="next-link" to="/">back to the start 🏠</Link>
      ) : null}
    </nav>
  );
}
