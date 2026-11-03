import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { music } from "@/content/anniversary";

export type Track = {
  id: string;
  title: string;
  artist?: string | undefined;
  src: string;
  source: "bundled";
};

type MusicApi = {
  tracks: Track[];
  current: Track | null;
  currentIndex: number;
  isPlaying: boolean;
  time: number;
  duration: number;
  volume: number;
  muted: boolean;
  /** true when the browser blocked autoplay and we're waiting for a first tap */
  needsTap: boolean;
  error: string | null;
  playAt: (index: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
};

const MusicContext = createContext<MusicApi | null>(null);

export function useMusic(): MusicApi {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}

const FADE_MS = 1400;

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRefs = [useRef<HTMLAudioElement | null>(null), useRef<HTMLAudioElement | null>(null)];
  const activeRef = useRef(0);
  const rafRef = useRef(new Map<HTMLAudioElement, number>());

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.55);
  const [muted, setMuted] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wantsPlay = useRef(false);

  const tracks: Track[] = useMemo(
    () =>
      music.bundled.map((t, i) => ({
        id: `song-${i}`,
        title: t.title,
        artist: t.artist,
        src: t.src,
        source: "bundled" as const,
      })),
    [],
  );

  const currentIndex = tracks.findIndex((t) => t.id === currentId);
  const current: Track | null = currentIndex >= 0 ? (tracks[currentIndex] ?? null) : null;

  const active = () => audioRefs[activeRef.current]?.current ?? null;
  const inactive = () => audioRefs[1 - activeRef.current]?.current ?? null;

  // smooth volume ramp (used for crossfades)
  const ramp = useCallback((el: HTMLAudioElement, from: number, to: number, ms: number, done?: () => void) => {
    const previous = rafRef.current.get(el);
    if (previous !== undefined) cancelAnimationFrame(previous);
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * p));
      if (p < 1) {
        rafRef.current.set(el, requestAnimationFrame(step));
      } else {
        rafRef.current.delete(el);
        done?.();
      }
    };
    rafRef.current.set(el, requestAnimationFrame(step));
  }, []);

  const targetVolume = useCallback(() => (muted ? 0 : volume), [muted, volume]);

  const playIndex = useCallback(
    (index: number) => {
      const t = tracks[index];
      if (!t) return;
      setError(null);
      wantsPlay.current = true;

      const a = active();
      if (currentId === t.id && a) {
        a.play().catch(() => setIsPlaying(false));
        return;
      }

      const nextEl = inactive();
      const curEl = a;
      if (!nextEl) return;

      nextEl.src = t.src;
      nextEl.load();
      nextEl.volume = muted ? 0 : 0.0001;
      const p = nextEl.play();
      if (p) {
        p.then(() => setNeedsTap(false)).catch(() => {
          setNeedsTap(true);
          setIsPlaying(false);
        });
      }
      // fade the new song in, fade the old one out
      ramp(nextEl, muted ? 0 : 0.0001, targetVolume(), FADE_MS);
      if (curEl) {
        ramp(curEl, curEl.volume, 0, FADE_MS, () => {
          curEl.pause();
        });
      }
      activeRef.current = 1 - activeRef.current;
      setTime(0);
      setDuration(0);
      setCurrentId(t.id);
    },
    [tracks, currentId, muted, ramp, targetVolume],
  );

  // Try autoplay; browsers that block it can start on the visitor's first gesture.
  useEffect(() => {
    const stored = Number(localStorage.getItem("fm-volume"));
    if (!Number.isNaN(stored) && stored > 0 && stored <= 1) setVolumeState(stored);

    const a = audioRefs[0].current;
    const first = tracks[0];
    if (!a || !first) return;
    a.src = first.src;
    a.load();
    a.volume = stored > 0 && stored <= 1 ? stored : 0.55;
    a.play()
      .then(() => {
        wantsPlay.current = true;
        setCurrentId(first.id);
      })
      .catch(() => {
        setNeedsTap(true);
        setCurrentId(first.id);
      });

    const start = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      const el = active();
      if (el?.paused) {
        wantsPlay.current = true;
        el.play().then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
      }
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (const ref of audioRefs) {
      const el = ref.current;
      if (el) {
        el.muted = muted;
        if (el !== active()) el.volume = muted ? 0 : volume;
      }
    }
    try {
      localStorage.setItem("fm-volume", String(volume));
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, muted]);

  const toggle = useCallback(() => {
    const a = active();
    if (!a) return;
    if (a.paused) {
      wantsPlay.current = true;
      setNeedsTap(false);
      a.play().catch(() => setIsPlaying(false));
    } else {
      wantsPlay.current = false;
      a.pause();
    }
  }, []);

  const next = useCallback(() => {
    if (!tracks.length) return;
    playIndex((currentIndex + 1 + tracks.length) % tracks.length);
  }, [tracks.length, currentIndex, playIndex]);

  const prev = useCallback(() => {
    if (!tracks.length) return;
    const a = active();
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      return;
    }
    playIndex((currentIndex - 1 + tracks.length) % tracks.length);
  }, [tracks.length, currentIndex, playIndex]);

  const seek = useCallback((nextTime: number) => {
    const a = active();
    if (a && Number.isFinite(nextTime)) a.currentTime = Math.max(0, Math.min(nextTime, a.duration || nextTime));
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (v > 0) setMuted(false);
    const a = active();
    if (a) ramp(a, a.volume, v, 120);
  }, [ramp]);

  const api: MusicApi = {
    tracks,
    current,
    currentIndex,
    isPlaying,
    time,
    duration,
    volume,
    muted,
    needsTap,
    error,
    playAt: playIndex,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    toggleMute: () => setMuted((m) => !m),
  };

  // both <audio> elements share handlers, but only the active one reports state.
  const handlers = (idx: 0 | 1) => ({
    onPlay: () => {
      if (activeRef.current === idx) setIsPlaying(true);
    },
    onPause: () => {
      if (activeRef.current === idx) setIsPlaying(false);
    },
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => {
      if (activeRef.current === idx) setTime(e.currentTarget.currentTime);
    },
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => {
      if (activeRef.current === idx) {
        const d = e.currentTarget.duration;
        setDuration(Number.isFinite(d) ? d : 0);
        setTime(0);
      }
    },
    onEnded: () => {
      if (activeRef.current !== idx || !wantsPlay.current) return;
      if (tracks.length > 1) playIndex((currentIndex + 1) % tracks.length);
      else setIsPlaying(false);
    },
    onError: () => {
      if (activeRef.current !== idx || !current) return;
      setIsPlaying(false);
      setError(`couldn't load "${current.title}". try skipping to the next song?`);
    },
  });

  return (
    <MusicContext.Provider value={api}>
      {children}
      <audio ref={audioRefs[0]} preload="auto" {...handlers(0)} />
      <audio ref={audioRefs[1]} preload="auto" {...handlers(1)} />
    </MusicContext.Provider>
  );
}
