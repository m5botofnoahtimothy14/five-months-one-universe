import { useRef, useState } from "react";
import { toast } from "sonner";
import { secrets } from "@/content/anniversary";
import { StarDoodle } from "@/components/art/Doodles";
import { useFx } from "@/components/fx/FxProvider";
import { pickIndex } from "@/lib/random";
import { cn } from "@/lib/utils";

/** A tiny clickable star hiding a random secret note. */
export function SecretStar({ className, size = "h-6 w-6" }: { className?: string; size?: string }) {
  const { burst } = useFx();
  const ref = useRef<HTMLButtonElement>(null);
  const last = useRef(-1);
  const [found, setFound] = useState(false);
  return (
    <button
      ref={ref}
      type="button"
      aria-label="hidden surprise star"
      onClick={() => {
        const i = pickIndex(secrets.length, last.current);
        last.current = i;
        setFound(true);
        burst({ from: ref.current, items: ["⭐", "✨", "💫"], count: 10, spread: 70 });
        toast(secrets[i], { icon: "⭐" });
      }}
      className={cn(
        "inline-grid place-items-center rounded-full p-1 transition-transform hover:scale-125 focus-visible:scale-125",
        found ? "opacity-100" : "opacity-80",
        className,
      )}
    >
      <StarDoodle className={cn(size, "animate-twinkle")} />
    </button>
  );
}
