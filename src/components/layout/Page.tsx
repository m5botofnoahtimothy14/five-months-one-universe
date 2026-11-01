import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { sections } from "@/content/anniversary";
import { Button } from "@/components/ui/button";
import { Squiggle } from "@/components/art/Doodles";
import { SecretStar } from "@/components/SecretStar";
import { useSectionIndex } from "./AppShell";
import { cn } from "@/lib/utils";

export function PageHeader({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="relative mx-auto max-w-2xl px-4 pb-6 pt-8 text-center">
      {kicker && <p className="font-hand text-xl text-muted-foreground">{kicker}</p>}
      <h1 className="text-shadow-pop mt-1 text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h1>
      <Squiggle className="mx-auto mt-2 h-3 w-40" />
      {subtitle && <p className="mx-auto mt-3 max-w-md text-pretty font-hand text-xl leading-snug">{subtitle}</p>}
    </div>
  );
}

export function PageBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-2xl px-4 pb-10", className)}>{children}</div>;
}

export function NextSection() {
  const idx = useSectionIndex();
  const next = sections[idx + 1];
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 pb-16 pt-4 text-center">
      <SecretStar />
      {next ? (
        <Button asChild variant="sticker" size="lg">
          <Link to={next.path}>
            next: {next.label} {next.emoji}
            <ArrowRight />
          </Link>
        </Button>
      ) : (
        <Button asChild variant="lavender" size="lg">
          <Link to="/">back to the start 🏠</Link>
        </Button>
      )}
    </div>
  );
}
