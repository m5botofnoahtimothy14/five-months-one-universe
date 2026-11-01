import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  people,
  welcome,
  quiz,
  affection,
  pods,
  timeline,
  letter,
  music,
  surprise,
} from "@/content/anniversary";
import { Mascot } from "@/components/art/Mascot";
import { FloatingField, HeartDoodle, SparkleDoodle } from "@/components/art/Doodles";
import { SecretStar } from "@/components/SecretStar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIVE MONTHSSSS!! — Five Months, One Universe" },
      { name: "description", content: "A tiny scrapbook for a five-month anniversary." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Anniversary,
});
const nav = [
  ["quiz", "Husband quiz", "📝"],
  ["machine", "Affection machine", "💗"],
  ["pods", "Comfort pods", "🫧"],
  ["timeline", "Our five months", "📅"],
  ["letter", "The letter", "💌"],
  ["music", "Our songs", "🎧"],
  ["surprise", "Final surprise", "🎁"],
] as const;
const art: Record<string, string> = {
  mwah: "💋",
  teddyHug: "🧸",
  bunnyHop: "🐰",
  hearts: "💗💞💕",
  reaction: "🥹",
  singing: "🎤",
  tea: "☕",
  sleepy: "😴",
};
const card =
  "rounded-3xl border-2 border-border bg-paper p-5 shadow-[var(--shadow-sticker),var(--shadow-soft)] sm:p-7";
const btn =
  "rounded-full border-2 border-border bg-paper px-4 py-3 font-display font-semibold shadow-[var(--shadow-stick���q�^