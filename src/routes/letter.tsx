import { createFileRoute } from "@tanstack/react-router";
import { letter } from "@/content/anniversary";
import { PageHeading, PageLinks } from "@/components/layout/AppShell";
import { GifSlot, LetterSticker } from "@/components/letter/LetterBits";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "A Letter For You · Five Months, One Universe" },
      { name: "description", content: "A five-month letter from Noah to Khadija, written like one very long text." },
      { property: "og:title", content: "A Letter For You" },
      { property: "og:description", content: "Not a formal letter. Just me, talking to you. Like always." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LetterPage,
});

function LetterPage() {
  return (
    <>
      <PageHeading tag="A LITTLE NOTE FROM YOUR HUSBAND" title="A LETTER FOR YOU" subtitle="not a formal letter. just me, talking to you. like always." />
      <article className="letter-paper">
        <div className="letter-topline">✦ FIVE MONTHS, ONE UNIVERSE ✦</div>
        <h2>{letter.greeting}</h2>
        {letter.blocks.map((block, i) => {
          if (block.type === "p") return <p key={i}>{block.text}</p>;
          if (block.type === "sticker") return <LetterSticker key={i} kind={block.kind} caption={block.caption} />;
          return <GifSlot key={i} slotId={block.slotId} caption={block.caption} src={"src" in block ? block.src : undefined} fallback={block.fallback} />;
        })}
        <p className="letter-closing">{letter.closing}</p>
        <p className="letter-signature">{letter.signature}</p>
      </article>
      <PageLinks />
    </>
  );
}
