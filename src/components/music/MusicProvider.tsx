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
import { idbAvailable, idbDelete, idbGetAll, idbPut, newId } from "@/lib/localdb";

export const ACCEPTED_AUDIO = ".mp3,.m4a,.wav,.ogg,audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/ogg";

type StoredTrack = {
  id: string;
  title: string;
  artist?: string | undefined;
  order: number;
  audio: Blob;
  cover?: Blob | undefined;
  addedAt: number;
};

export type Track = {
  id: string;
  title: string;
  artist?: string | undefined;
  src: string;
  cover?: string | undefined;
  source: "bundled" | "local";
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
  error: string | null;
  ready: boolean;
  persistent: boolean;
  playAt: (index: number) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (t: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  addFiles: (files: FileList | File[]) => Promise<number>;
  setCover: (id: string, file: File) => Promise<void>;
  rename: (id: string, title: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  move: (id: string, dir: -1 | 1) => Promise<void>;
};

const MusicContext = createContext<MusicApi | null>(null);

export function useMusic(): MusicApi {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}

const AUDIO_EXT = /\.(mp3|m4a|wav|ogg|oga)$/i;

function titleFromFile(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim() || "untitled song";
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [stored, setStored] = useState<StoredTrack[]>([]);
  const urlCache = useRef(new Map<Blob, string>());
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [persistent, setPersistent] = useState(true);
  const wantPlay = useRef(false);

  // load saved songs + volume (client only)
  useEffect(() => {
    const v = Number(localStorage.getItem("fm-volume"));
    if (!Number.isNaN(v) && localStorage.getItem("fm-volume") !== null) setVolumeState(v);
    if (!idbAvailable()) {
      setPersistent(false);
      setReady(true);
      return;
    }
    idbGetAll<StoredTrack>("tracks")
      .then((rows) => setStored(rows.sort((a, b) => a.order - b.order)))
      .catch(() => setPersistent(false))
      .finally(() => setReady(true));
  }, []);

  const urlFor = useCallback((blob: Blob) => {
    let u = urlCache.current.get(blob);
    if (!u) {
      u = URL.createObjectURL(blob);
      urlCache.current.set(blob, u);
    }
    return u;
  }, []);

  const tracks: Track[] = useMemo(() => {
    const bundled: Track[] = music.bundled.map((t, i) => ({
      id: `bundled-${i}`,
      title: t.title,
      artist: t.artist,
      src: t.src,
      cover: t.cover,
      source: "bundled",
    }));
    const local: Track[] = stored.map((s) => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      src: urlFor(s.audio),
      cover: s.cover ? urlFor(s.cover) : undefined,
      source: "local",
    }));
    return [...bundled, ...local];
  }, [stored, urlFor]);

  const currentIndex = tracks.findIndex((t) => t.id === currentId);
  const current: Track | null = currentIndex >= 0 ? (tracks[currentIndex] ?? null) : null;

  // keep audio element in sync with the chosen track
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!current) {
      a.pause();
      a.removeAttribute("src");
      return;
    }
    if (a.getAttribute("src") !== current.src) {
      a.src = current.src;
      a.load();
    }
    if (wantPlay.current) {
      a.play().catch(() => setIsPlaying(false));
    }
  }, [current]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) {
      a.volume = volume;
      a.muted = muted;
    }
  }, [volume, muted]);

  const playAt = useCallback(
    (index: number) => {
      const t = tracks[index];
      if (!t) return;
      setError(null);
      wantPlay.current = true;
      if (t.id === currentId) {
        audioRef.current?.play().catch(() => setIsPlaying(false));
      } else {
        setCurrentId(t.id);
      }
    },
    [tracks, currentId],
  );

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!current) {
      if (tracks.length) playAt(0);
      return;
    }
    if (a.paused) {
      wantPlay.current = true;
      a.play().catch(() => setIsPlaying(false));
    } else {
      wantPlay.current = false;
      a.pause();
    }
  }, [current, tracks.length, playAt]);

  const next = useCallback(() => {
    if (!tracks.length) return;
    playAt((currentIndex + 1 + tracks.length) % tracks.length);
  }, [tracks.length, currentIndex, playAt]);

  const prev = useCallback(() => {
    if (!tracks.length) return;
    const a = audioRef.current;
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      return;
    }
    playAt((currentIndex - 1 + tracks.length) % tracks.length);
  }, [tracks.length, currentIndex, playAt]);

  const seek = useCallback((t: number) => {
    const a = audioRef.current;
    if (a && Number.isFinite(t)) a.currentTime = t;
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (v > 0) setMuted(false);
    try {
      localStorage.setItem("fm-volume", String(v));
    } catch {
      /* ignore */
    }
  }, []);

  const save = useCallback(
    async (row: StoredTrack) => {
      if (!persistent) return;
      try {
        await idbPut("tracks", row);
      } catch {
        setPersistent(false);
      }
    },
    [persistent],
  );

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files).filter((f) => f.type.startsWith("audio/") || AUDIO_EXT.test(f.name));
      const base = stored.length ? Math.max(...stored.map((s) => s.order)) + 1 : 0;
      const rows: StoredTrack[] = list.map((f, i) => ({
        id: newId(),
        title: titleFromFile(f.name),
        order: base + i,
        audio: f,
        addedAt: Date.now(),
      }));
      for (const r of rows) await save(r);
      setStored((s) => [...s, ...rows]);
      return rows.length;
    },
    [stored, save],
  );

  const update = useCallback(
    async (id: string, patch: Partial<StoredTrack>) => {
      const row = stored.find((s) => s.id === id);
      if (!row) return;
      const nextRow = { ...row, ...patch };
      await save(nextRow);
      setStored((s) => s.map((x) => (x.id === id ? nextRow : x)));
    },
    [stored, save],
  );

  const setCover = useCallback((id: string, file: File) => update(id, { cover: file }), [update]);
  const rename = useCallback((id: string, title: string) => update(id, { title: title.trim() || "untitled song" }), [update]);

  const remove = useCallback(
    async (id: string) => {
      const row = stored.find((s) => s.id === id);
      if (id === currentId) {
        audioRef.current?.pause();
        wantPlay.current = false;
        setCurrentId(null);
      }
      if (persistent) await idbDelete("tracks", id).catch(() => undefined);
      if (row) {
        for (const b of [row.audio, row.cover]) {
          if (!b) continue;
          const u = urlCache.current.get(b);
          if (u) URL.revokeObjectURL(u);
          urlCache.current.delete(b);
        }
      }
      setStored((s) => s.filter((x) => x.id !== id));
    },
    [stored, currentId, persistent],
  );

  const move = useCallback(
    async (id: string, dir: -1 | 1) => {
      const i = stored.findIndex((s) => s.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= stored.length) return;
      const copy = [...stored];
      const moved = copy[i]!;
      copy[i] = copy[j]!;
      copy[j] = moved;
      const reOrdered = copy.map((s, k) => ({ ...s, order: k }));
      setStored(reOrdered);
      await save(reOrdered[i]!);
      await save(reOrdered[j]!);
    },
    [stored, save],
  );

  const api: MusicApi = {
    tracks,
    current,
    currentIndex,
    isPlaying,
    time,
    duration,
    volume,
    muted,
    error,
    ready,
    persistent,
    playAt,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    toggleMute: () => setMuted((m) => !m),
    addFiles,
    setCover,
    rename,
    remove,
    move,
  };

  return (
    <MusicContext.Provider value={api}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(Number.isFinite(e.currentTarget.duration) ? e.currentTarget.duration : 0);
          setTime(0);
        }}
        onEnded={() => {
          wantPlay.current = true;
          if (tracks.length > 1) next();
          else setIsPlaying(false);
        }}
        onError={() => {
          if (!current) return;
          setIsPlaying(false);
          setError(
            current.source === "bundled"
              ? `couldn't load “${current.title}”. check the file is in public/assets/music and the path in the content file matches.`
              : `this browser couldn't play “${current.title}”. try an mp3 version?`,
          );
        }}
      />
    </MusicContext.Provider>
  );
}
