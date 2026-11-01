import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { welcome, people } from "@/content/anniversary";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/art/Mascot";
import { FloatingField, HeartDoodle, SparkleDoodle } from "@/components/art/Doodles";
import { SecretStar } from "@/components/SecretStar";
import { useFx } from "@/components/fx/FxProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIVE MONTHSSSS!! — Five Months, One Universe" },
      { name: "description", content: `A tiny internet scrapbook from ${people.him} to ${people.her} for five months together.` },
      { property: "og:title", content: "FIVE MONTHSSSS!! — Five Months, One Universe" },
      { property: "og:description", content: "A tiny internet scrapbook for a five-month anniversary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const { burst } = useFx();
  const btn = useRef<HTMLButtonElement>(null);
  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-hidden px-4 py-10 text-center">
      <FloatingField count={16} />
      <SecretStar className="absolute left-4 top-6" />
      <SecretStar className="absolute bottom-10 right-5" size="h-5 w-5" />
      <SparkleDoodle className="absolute right-8 top-16 h-8 w-8 animate-twinkle" />
      <HeartDoodle className="absolute bottom-24 left-6 h-9 w-9 animate-wiggle" />

      <p className="relative font-hand text-xl text-muted-foreground">{welcome.kicker}</p>
      <h1 className="text-shadow-pop relative mt-2 font-display text-5xl font-bold leading-none tracking-tight sm:text-7xl">
        {welcome.title}
      </h1>

      <div className="relative mx-auto mt-6 w-48 animate-bob sm:w-60">
        <Mascot animal="teddy" mood="love" prop="heart" title="a teddy bear holding a heart" />
      </div>

      <p className="relative mx-auto mt-4 max-w-sm text-pretty font-hand text-2xl leading-snug">{welcome.subtitle}</p>

      <Button
        ref={btn}
        variant="sticker"
        size="xl"
        className="relative mt-8 animate-heartbeat whitespace-normal text-center"
        onClick={() => burst({ from: btn.current, count: 22, spread: 180 })}
      >
        {welcome.button}
      </Button>
      <p className="relative mt-5 font-hand text-lg text-muted-foreground">{welcome.hint}</p>
    </section>
  );
}
