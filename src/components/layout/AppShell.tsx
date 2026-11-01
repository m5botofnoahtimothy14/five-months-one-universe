import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Menu, Pause, Play, SkipForward, Music2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { sections, site } from "@/content/anniversary";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/components/music/MusicProvider";
import { HeartDoodle } from "@/components/art/Doodles";
import { cn } from "@/lib/utils";

export function useSectionIndex() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const idx = sections.findIndex((s) => s.path === pathname);
  return Math.max(0, idx);
}

function MiniPlayer() {
  const m = useMusic();
  if (!m.current) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="paper-card mx-auto flex max-w-xl items-center gap-2 px-3 py-2">
        <Link to="/music" className="flex min-w-0 flex-1 items-center gap-2 rounded-xl" aria-label="open music player">
          <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lavender", m.isPlaying && "animate-spin-slow")}>
            {m.current.cover ? (
              <img src={m.current.cover} alt="" className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <Music2 className="h-4 w-4" />
            )}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold">{m.current.title}</span>
            <span className="block text-xs text-muted-foreground">{m.isPlaying ? "now playing ♪" : "paused"}</span>
          </span>
        </Link>
        <Button size="icon" variant="sticker" onClick={m.toggle} aria-label={m.isPlaying ? "pause" : "play"}>
          {m.isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button size="icon" variant="paper" onClick={m.next} aria-label="next song">
          <SkipForward />
        </Button>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const idx = useSectionIndex();
  const [open, setOpen] = useState(false);
  const pct = ((idx + 1) / sections.length) * 100;
  const { current } = useMusic();

  return (
    <div className="relative min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
      >
        skip to content
      </a>
      <header className="sticky top-0 z-40 px-3 pt-[max(0.6rem,env(safe-area-inset-top))]">
        <div className="paper-card mx-auto flex max-w-3xl items-center gap-2 px-2 py-1.5">
          <Button asChild size="icon" variant="ghost" aria-label="home">
            <Link to="/">
              <Home className="!size-5" />
            </Link>
          </Button>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2 px-1">
              <span className="truncate font-hand text-lg font-bold leading-none">
                {sections[idx].emoji} {sections[idx].label}
              </span>
              <span className="shrink-0 text-xs font-bold text-muted-foreground">
                {idx + 1}/{sections.length}
              </span>
            </div>
            <div
              className="mt-1 h-2.5 overflow-hidden rounded-full border-2 border-ink/20 bg-blush"
              role="progressbar"
              aria-label="scrapbook progress"
              aria-valuemin={1}
              aria-valuemax={sections.length}
              aria-valuenow={idx + 1}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="open menu">
                <Menu className="!size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-sm border-l-2 bg-paper paper-grid">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">{site.title}</SheetTitle>
                <SheetDescription className="font-hand text-lg">{site.tagline}</SheetDescription>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-2 px-4" aria-label="sections">
                {sections.map((s, i) => (
                  <Link
                    key={s.path}
                    to={s.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 px-4 py-3 font-display text-lg transition-transform hover:-translate-y-0.5",
                      i === idx ? "border-ink/70 bg-blush shadow-[var(--shadow-sticker)]" : "border-border bg-paper",
                    )}
                  >
                    <span className="text-xl" aria-hidden>
                      {s.emoji}
                    </span>
                    <span className="flex-1">{s.label}</span>
                    {i === idx && <HeartDoodle className="h-5 w-5" />}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main id="main" className={cn("relative z-10", current && "pb-24")}>
        {children}
      </main>
      <MiniPlayer />
    </div>
  );
}
