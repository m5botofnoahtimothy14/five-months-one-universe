import { useEffect, useRef, useState } from "react";
import type { StickerKind } from "@/content/anniversary";
import { Mascot } from "@/components/art/Mascot";
import { useFx } from "@/components/fx/FxProvider";
import { idbAvailable, idbDelete, idbGet, idbPut } from "@/lib/localdb";

const STICKER_TEXT: Record<StickerKind, string> = {
  mwah: "MWAAAAHHHH 💋💋",
  teddyHug: "*teddy hug*",
  bunnyHop: "hop hop!!",
  hearts: "♡ ♡ ♡",
  reaction: "BRO 😭",
  singing: "la la laaa 🎤",
  tea: "spill it ☕",
  sleepy: "sleepy eyes 😴",
};

/** Original CSS/emoji sticker moments. "mwah" is an animated tap-for-kiss sticker. */
export function LetterSticker({ kind, caption }: { kind: StickerKind; caption?: string }) {
  const { burst } = useFx();
  const ref = useRef<HTMLButtonElement>(null);
  const [kisses, setKisses] = useState(0);
  const text = caption ?? STICKER_TEXT[kind];

  if (kind === "mwah") {
    return (
      <div className="letter-sticker-row">
        <button
          ref={ref}
          key={kisses}
          className="letter-sticker mwah-sticker"
          onClick={() => {
            setKisses((k) => k + 1);
            burst({ from: ref.current, items: ["💋", "💋", "😘", "💗"], count: 14, spread: 160 });
          }}
          aria-label={`${text} — tap to send a virtual kiss`}
        >
          <span className="mwah-lips" aria-hidden>💋</span>
          <span>{text}</span>
          {kisses > 0 && <small>{kisses} kiss{kisses === 1 ? "" : "es"} sent</small>}
        </button>
      </div>
    );
  }

  const mascot =
    kind === "teddyHug" ? <Mascot animal="teddy" mood="love" prop="heart" /> :
    kind === "bunnyHop" ? <Mascot animal="bunny" mood="happy" /> :
    kind === "sleepy" ? <Mascot animal="bunny" mood="sleepy" prop="pillow" /> :
    null;

  return (
    <div className="letter-sticker-row" aria-hidden={!caption}>
      <div className={`letter-sticker sticker-${kind}`}>
        {mascot && <span className="sticker-mascot">{mascot}</span>}
        {kind === "hearts" && <span className="sticker-hearts">💗 💖 💕</span>}
        {kind === "singing" && <span className="sticker-big">🎤🎶</span>}
        {kind === "tea" && <span className="sticker-big">🫖☕</span>}
        {kind === "reaction" && <span className="sticker-big">😭</span>}
        <span>{text}</span>
      </div>
    </div>
  );
}

type StoredGif = { id: string; blob: Blob; name: string };

/**
 * Optional GIF/image slot.
 * 1. If `src` is set in the content file (e.g. "/assets/gifs/us.gif"), that local file is shown.
 * 2. Otherwise Noah can add a picture that is saved in THIS browser only.
 * 3. Otherwise an original CSS sticker is shown as the fallback.
 */
export function GifSlot({ slotId, caption, src, fallback }: { slotId: string; caption: string; src?: string; fallback: StickerKind }) {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    if (src || !idbAvailable()) return;
    let url: string | null = null;
    idbGet<StoredGif>("gifs", slotId)
      .then((row) => {
        if (row) {
          url = URL.createObjectURL(row.blob);
          setLocalUrl(url);
        }
      })
      .catch(() => undefined);
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [slotId, src]);

  const shown = src && !broken ? src : localUrl;

  return (
    <figure className="gif-slot">
      {shown ? (
        <img src={shown} alt={caption} loading="lazy" onError={() => src && setBroken(true)} />
      ) : (
        <LetterSticker kind={fallback} caption={caption} />
      )}
      <figcaption>
        {shown && <span>{caption}</span>}
        {!src && idbAvailable() && (
          <span className="gif-tools">
            <label className="gif-add">
              {localUrl ? "change picture" : "+ add a gif/picture (this device only)"}
              <input
                type="file"
                accept="image/gif,image/png,image/jpeg,image/webp"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  e.currentTarget.value = "";
                  if (!f) return;
                  await idbPut<StoredGif>("gifs", { id: slotId, blob: f, name: f.name }).catch(() => undefined);
                  if (localUrl) URL.revokeObjectURL(localUrl);
                  setLocalUrl(URL.createObjectURL(f));
                }}
              />
            </label>
            {localUrl && (
              <button
                className="gif-remove"
                onClick={async () => {
                  await idbDelete("gifs", slotId).catch(() => undefined);
                  URL.revokeObjectURL(localUrl);
                  setLocalUrl(null);
                }}
              >
                remove
              </button>
            )}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
