/**
 * ============================================================
 *  SIX MONTHS, ONE UNIVERSE — EDIT EVERYTHING HERE ♡
 * ============================================================
 *  Noah: every word on the site lives in this file.
 *  Change text inside the quotes, save, done. Keep the commas!
 *  See README.md → "Editing the content" for more help.
 * ============================================================
 */

import myLoveSrc from "@/assets/my-love-mine-all-mine.mp3.asset.json";
import kesariyaSrc from "@/assets/kesariya.mp3.asset.json";
import joTumSrc from "@/assets/jo-tum-mere-ho.mp3.asset.json";

export type MascotAnimal = "teddy" | "bunny";
export type MascotMood = "happy" | "sad" | "crying" | "sleepy" | "angry" | "thinking" | "love";
export type MascotProp =
  | "heart"
  | "tissue"
  | "hotWaterBottle"
  | "cloud"
  | "letter"
  | "pillow"
  | "flower"
  | "none";

export type Tone = "blush" | "lavender" | "peach" | "butter" | "mint" | "sky";

export const people = {
  her: "Khadija",
  herCute: "Khadijaaaa",
  him: "Noah",
  himCute: "NOAHHHH",
  herNicknameForHim: "husband",
  hisNicknameForHer: "baby",
  dramaticBaby: "BABBBBBYYYYYYYY",
  monthsTogether: 6,
};

export const site = {
  title: "Six Months, One Universe",
  tagline: "a tiny internet scrapbook for my favourite person",
};

/* ---------------- WELCOME ---------------- */

export const welcome = {
  kicker: "a lil scrapbook from noah ♡",
  title: "SIX MONTHSSSS!!",
  subtitle: "six months of you, me, the distance, and way too many late-night chats",
  button: "ARE YOU READY, BABYYYY?",
  hint: "psst… some stars on this site are clickable 👀",
};

/* ---------------- SECTIONS (order = progress bar order) ---------------- */

export const sections = [
  { path: "/", label: "Welcome", emoji: "🏠" },
  { path: "/quiz", label: "The quiz", emoji: "📝" },
  { path: "/machine", label: "Affection machine", emoji: "💗" },
  { path: "/teddy", label: "Your teddy", emoji: "🧸" },
  { path: "/letter", label: "The letter", emoji: "💌" },
  { path: "/surprise", label: "The surprise", emoji: "🎁" },
] as const;

export type SectionPath = (typeof sections)[number]["path"];

/** Extra pages that live outside the guided journey (always in the menu). */
export const extraPages = [
  { path: "/pods", label: "Comfort pods", emoji: "🫂" },
  { path: "/music", label: "Our soundtrack", emoji: "🎵" },
] as const;

/* ---------------- HIDDEN SURPRISES (tiny clickable stars) ---------------- */

export const secrets: string[] = [
  "you found a secret star!! ok that's it, you're officially the smartest baby ever ⭐",
  "secret note: i smiled while making this part. like a big idiot. hehe",
  "hidden fact: noah has replayed your voice notes more than he will admit 🤫",
  "SECRET UNLOCKED: one (1) free forehead kiss, redeemable whenever ✨",
  "bro how did you even find this 😭 you're too good",
  "tiny reminder hidden in a tiny star: you're doing amazing yk",
  "if you're reading this, drink some water babyyyy 💧",
  "this star belongs to you now. no refunds.",
];

/* ---------------- QUIZ ---------------- */

export type QuizQuestion = {
  question: string;
  options: string[];
  /** index of the correct option, starting at 0 */
  correct: number;
  rightReply: string;
  wrongReply: string;
};

export const quiz = {
  title: "HOW WELL DO YOU KNOW YOUR HUSBANDDDD?",
  intro: "eight questions, one very smug boyfriend, and absolutely no prize except bragging rights + kisses",
  questions: [
    {
      question: "Noah says “goodnight baby” at 2am. How long until one of you sends another message?",
      options: ["Seven seconds. “wait one more thing”", "A sensible, adult eight hours", "Until the sun files a noise complaint", "He sends a calendar invite for tomorrow"],
      correct: 0,
      rightReply: "Correct: “goodnight” is a suggestion and “one more thing” is a legally binding sequel 😭",
      wrongReply: "Baby, “goodnight” is just the opening scene. The bonus episode is at least 47 minutes.",
    },
    {
      question: "What is the scientifically documented effect of Khadija calling Noah “husband”?",
      options: ["He suddenly remembers 14 errands", "Instant melting. Zero structural integrity.", "He requests a title review", "A tiny violin starts playing"],
      correct: 1,
      rightReply: "Guilty 🥹 one “husband” and I become a very happy puddle. Please continue your research.",
      wrongReply: "Nope, I melt immediately. The husband title has devastatingly cute side effects.",
    },
    {
      question: "Your girlfriend texts “BABE. I have tea ☕”. Noah's official boyfriend duty is…",
      options: ["Ask if the tea is ethically sourced", "Drop everything and say “I'M LISTENING”", "Schedule a quarterly gossip review", "Pretend the signal is bad"],
      correct: 1,
      rightReply: "Boyfriend of the year behavior. The tea is hot; my attention is hotter 🫖",
      wrongReply: "Incorrect, babe. The correct response is “I'M LISTENING” followed by immediate details.",
    },
    {
      question: "Noah's three-part plan for being the world's most annoying boyfriend is…",
      options: ["Tease you 24/7", "Sing off-key", "Yell BABYYYY", "All three, often in one voice note"],
      correct: 3,
      rightReply: "A multitasking king 👑 deeply in love, slightly off-key, and extremely loud about it.",
      wrongReply: "Trick question, baby: all of them. Sometimes in the same voice note.",
    },
    {
      question: "In the highly competitive sport of “who misses who more,” who takes home the trophy?",
      options: ["Noah (he made the trophy himself)", "Khadija, undefeated forever", "A tie, then 20 minutes of arguing", "The distance, unfortunately"],
      correct: 2,
      rightReply: "Exactly. A tie, followed by a rematch, followed by “no, I miss you more” 💗",
      wrongReply: "It's always a tie. The judges (both of us) are wildly biased and refuse to end the match.",
    },
    {
      question: "Noah says “I’ll call in five minutes.” Which unit of time is he using?",
      options: ["Actual minutes, like a responsible man", "Boyfriend minutes: an optimistic estimate", "One Khadija-sized episode of gossip", "Five business days"],
      correct: 1,
      rightReply: "You know me too well 😭 “five minutes” is a loving intention, not a calibrated instrument.",
      wrongReply: "Baby, you know my timekeeping is powered by vibes and the desire to hear your voice.",
    },
    {
      question: "What is Noah most likely to do while trying to flirt with his own girlfriend?",
      options: ["Send a voice note with a surprise chorus", "Call you cute, then immediately get shy", "Forget his sentence because you smiled", "All of the above. A professional romantic."],
      correct: 3,
      rightReply: "Certified boyfriend menace ✅ professional romantic, amateur at keeping a straight face.",
      wrongReply: "All of the above, obviously. I am very smooth until you smile at me 😭",
    },
    {
      question: "What tiny detail from the first time Noah saw Khadija is still lodged in his heart?",
      options: ["A dramatic entrance soundtrack", "Those sleepy eyes at assembly 🥹", "A secret superhero cape", "The world's smallest megaphone"],
      correct: 1,
      rightReply: "Those sleepy eyes 🥹 still one of my favorite memories, rent-free in my heart.",
      wrongReply: "Your sleepy eyes at assembly! I remember that little moment so clearly 🥹",
    },
  ] satisfies QuizQuestion[],
  /** results by percentage score (min is inclusive) */
  results: [
    { min: 100, title: "CERTIFIED WIFEY MASTERMIND 🏆", message: "PERFECT SCORE?? ok you literally know me better than i know myself. marry me (again) hehe" },
    { min: 75, title: "Husband Expert ⭐", message: "almost perfect!! you clearly pay attention to your annoying husband and i'm blushing" },
    { min: 50, title: "Cute Detective 🔍", message: "not bad baby!! we'll do a lil revision course. late-night edition ofc" },
    { min: 0, title: "Adorable Chaos Gremlin 💗", message: "ok the score is low BUT the love is high and that's what counts. you're still my favourite" },
  ],
};

/* ---------------- AFFECTION MACHINE ---------------- */

export const affection = {
  title: "NOAH AFFECTION MACHINE",
  subtitle: "press anything. everything works. that's the whole point.",
  generatorButton: "GENERATE AFFECTION",
  messages: [
    "BABBBBBYYYYYYYY!!",
    "you are so so special",
    "your annoying husband is cheering for you",
    "one tiny reminder: you matter a lot",
    "you're literally my favourite notification",
    "hi pretty. that's it. that's the message",
    "proud of you for today, even the boring parts",
    "you + me = best duo, no debate",
    "noah's heart status: 100% yours",
    "you make the distance feel smaller yk",
    "drink water, eat something, then come back and be cute",
    "you're doing better than you think babyyy",
  ],
  nicknames: [
    "sleepy-eyes 😴",
    "babyyyy",
    "my gossip partner ☕",
    "Khadijaaaa bear",
    "duet queen 🎤",
    "cutie patootie (sorry)",
    "my favourite human",
    "little troublemaker",
  ],
  compliments: [
    "your laugh could power a whole city fr",
    "you're cute even when you're sleepy. ESPECIALLY when you're sleepy",
    "you have the best taste in gossip. elite tea curator ☕",
    "your voice when you sing?? illegal levels of cute 🎤",
    "you make my phone the happiest place on earth",
    "you're kind in a way that makes people feel safe",
    "you're smart, funny AND you put up with me. legend",
    "you're my favourite person to annoy and my favourite person, period",
  ],
  kissLines: ["MWAAAAHHHH 💋", "mwah mwah mwah", "kiss delivered ✅", "*sends 1 virtual kiss across the distance*", "smooch!!"],
  missYou: [
    "I MISS YOU TOOOO 😭 like a normal amount. jk an illegal amount",
    "the distance is so annoying bro. but you're worth every km",
    "missing you is my daily cardio",
    "counting down to the next time i see your face fr",
    "i miss you more. no arguing. i win.",
  ],
  annoyNoah: [
    "BRO WHY 😭",
    "ok rude. still love you tho",
    "*noah has been annoyed. noah is now more in love. confusing.*",
    "BABYYYY STOPPP (don't stop)",
    "i'm telling on you. to you. hehe",
    "annoyance level: 3/10. adorableness level: 10/10",
  ],
  moreLove: [
    "LOVE REFILLED 💗",
    "here's more love. and more. and MORE.",
    "the love supply is unlimited, don't worry",
    "extra love has been shipped. express delivery.",
    "love meter overflowing, please send help",
  ],
  husbandCheck: [
    "✅ annoying: yes  ✅ loyal: yes  ✅ thinking about you: always",
    "status: misses you, hungry, smiling at phone",
    "husband is functioning normally (dramatically)",
    "scan complete: 0% bugs, 100% yours",
    "warning: husband is about to send BABBBBBYYYYYYYY",
  ],
  noahExe: [
    ["> booting noah.exe…", "> loading feelings… [██████████] 100%", "> ERROR: too much love detected", "> solution: hug Khadija ✓"],
    ["> starting noah.exe v5.0 (six months edition)", "> checking memory: sleepy eyes at assembly ✓", "> checking memory: late-night chats ✓", "> status: still obsessed"],
    ["> noah.exe running", "> tease_khadija() executed successfully", "> sing_together() queued", "> output: BABBBBBYYYYYYYY"],
    ["> noah.exe update available!", "> new features: more love, more annoying", "> installing… done", "> please restart your smile 😁"],
  ],
  squeezeBear: ["squeak!", "eeep!", "hehe that tickles", "BEAR HUG ACTIVATED", "*happy bear noises*", "more squeezes pls"],
  babySpam: ["BABY", "BABYYY", "BABBBYYY", "baby!!", "BABBBBBYYYYYYYY", "babyyyy"],
  secretUnlock: {
    tapsNeeded: 7,
    hint: "tap the lock 7 times…",
    reveals: [
      "SECRET: the first thing i think when i wake up is “text her” hehe",
      "SECRET: i saved some of our chats just to reread them on bad days",
      "SECRET: your laugh is my favourite sound. don't tell anyone (you can tell everyone)",
      "SECRET: i still remember exactly how you looked at assembly that day 🥹",
    ],
  },
  doYouLove: {
    question: "DO YOU LOVE NOAH?",
    yes: "YES OBVIOUSLY",
    no: "no",
    yesReply: "I KNEW ITTTT 🥹💗 ok i love you more, bye",
    noDodges: ["nope, try again", "wrong button bestie", "that button is broken", "hehe no", "the button ran away 🏃"],
  },
};

/* ---------------- COMFORT PODS ---------------- */

export type Pod = {
  id: string;
  name: string;
  emoji: string;
  tone: Tone;
  mascot: { animal: MascotAnimal; mood: MascotMood; prop: MascotProp };
  teaser: string;
  messages: string[];
};

export const pods: Pod[] = [
  {
    id: "sad",
    name: "Sad Pod",
    emoji: "🌧️",
    tone: "sky",
    mascot: { animal: "teddy", mood: "sad", prop: "heart" },
    teaser: "for when the day feels heavy",
    messages: [
      "Hey, my love. You don't have to solve the whole day right now. Take one slow breath; your boyfriend is in your corner, no pep talk required.",
      "Who upset my favorite person? I am preparing one stern long-distance glare 😤 But really, I'm here to listen whenever you want.",
      "Sending the biggest screen-sized hug 🫂 Squeeze your pillow for me; I promise to make the real version much better when we're together.",
      "A hard day doesn't change how wonderful you are. You can be sad and still be my favorite person, all at once.",
    ],
  },
  {
    id: "crying",
    name: "Crying Pod",
    emoji: "😢",
    tone: "lavender",
    mascot: { animal: "bunny", mood: "crying", prop: "tissue" },
    teaser: "tissues + tiny hugs included",
    messages: [
      "Cry if you need to, baby. You never have to make your feelings smaller for me. I love your soft heart, even on the soggy days 🥺",
      "One virtual tissue 🧻, then the whole box. Take all the time you need; there is no timer on being okay.",
      "I wish I could sit beside you and hold your hand. For now, imagine me being quiet and very carefully not making a terrible joke.",
      "When you're ready, have a little water. Text me if company would help; quiet is okay too. I'm still right here.",
    ],
  },
  {
    id: "period",
    name: "Period Comfort Pod",
    emoji: "🌸",
    tone: "blush",
    mascot: { animal: "teddy", mood: "love", prop: "hotWaterBottle" },
    teaser: "cosy mode activated",
    messages: [
      "Cosy mode, girlfriend edition 🌸 If it feels good: blanket, warm bottle, comfy clothes. You deserve to be looked after, especially by yourself.",
      "No productivity points today, okay? Rest counts. Your boyfriend is proud of you for taking care of you.",
      "Want a distraction? I'm one text away with memes, gossip, or an aggressively dramatic BABYYYY voice note.",
      "A snack, warm drink, and comfort show could be a soft landing. And if you need extra support, please reach out to someone you trust too 💗",
    ],
  },
  {
    id: "overthinking",
    name: "Overthinking Pod",
    emoji: "🌀",
    tone: "butter",
    mascot: { animal: "bunny", mood: "thinking", prop: "cloud" },
    teaser: "for the 2am brain spirals",
    messages: [
      "Hey love, pause with me 🌀 A thought can be loud without being a fact. Let's give your brain a moment to unclench.",
      "Tiny reset together: name three things you can see, then one thing you can hear. I'm doing it too, from my side of the screen.",
      "If this is about us, let's talk it through when you're ready. You don't have to guess what I'm thinking; I'm on your team.",
      "Write the worry down and let tomorrow-you revisit it. The 2am brain is a very dramatic screenwriter, not the director.",
    ],
  },
  {
    id: "missing",
    name: "Missing Noah Pod",
    emoji: "💌",
    tone: "peach",
    mascot: { animal: "teddy", mood: "love", prop: "letter" },
    teaser: "open when the distance feels long",
    messages: [
      "I miss you too, baby 😭 The distance is hard, but you don't have to pretend it isn't. I'm here with you in it.",
      "Imagine one very loud BABYYYY and one proper hug saved up for when I see you. That is my official delivery promise.",
      "If it helps, revisit one of our favorite chats. Every silly message is a little reminder that we're still making this work together.",
      "We can miss each other and still have a good day. One day closer to the next hello, my love 💌",
    ],
  },
  {
    id: "sleepy",
    name: "Sleepy Pod",
    emoji: "🌙",
    tone: "lavender",
    mascot: { animal: "bunny", mood: "sleepy", prop: "pillow" },
    teaser: "for my sleepy-eyed baby",
    messages: [
      "Those sleepy eyes from assembly deserve a soft pillow and a full night's rest 🥹 Go get cosy, my love.",
      "One last goodnight (this time I mean it): sleep well, dream sweetly, and wake up knowing your boyfriend adores you.",
      "Phone down, blanket up. No solving tomorrow tonight; your very unofficial husband says so 🫡",
      "Sleep tight, baby. I'll be here for tomorrow's gossip and your first sleepy hello ☕🌙",
    ],
  },
  {
    id: "angry",
    name: "Angry Pod",
    emoji: "😤",
    tone: "mint",
    mascot: { animal: "teddy", mood: "angry", prop: "flower" },
    teaser: "space respected. snacks offered.",
    messages: [
      "You're allowed to be angry, love. Take the space you need; I won't rush you into being okay 🌿",
      "Angry girlfriend detected 😤 Flower delivery initiated 🌼 I can listen when you're ready; no pressure to answer now.",
      "If I hurt you, I'm sorry. I want to understand and make it right, not win an argument. If it's something else, I'm still on your side.",
      "One breath at a time. You don't have to stop being mad for me to love you; grumpy Khadija is still my Khadija.",
    ],
  },
];

/* ---------------- LETTER ---------------- */

export type StickerKind = "mwah" | "teddyHug" | "bunnyHop" | "hearts" | "reaction" | "singing" | "tea" | "sleepy";

export type LetterBlock =
  | { type: "p"; text: string }
  | { type: "sticker"; kind: StickerKind; caption?: string }
  /** a GIF slot Noah can upload into (or point `src` at /assets/gifs/your-file.gif) */
  | { type: "gif"; slotId: string; caption: string; src?: string; fallback: StickerKind };

export const letter = {
  title: "a letter (but make it texting)",
  greeting: "HEYYYYYYYY BABYYYYYYYY!! SIX MONTHSSSS?????",
  blocks: [
    { type: "p", text: "like BRO. six whole months?? how did that even happen. it feels like yesterday and also like i've known you forever yk. idk how to write proper letters so i'm just gonna text you this but longer hehe" },
    { type: "p", text: "okay so. remember assembly? that first time i saw you?? you had the SLEEPIEST eyes ever 😭 and i was just standing there like… who is she. i still think about that moment sooo much. like randomly. in the middle of the day. it just pops up and i smile like an idiot" },
    { type: "p", text: "and then the late-night conversations started and honestly they're my favourite part of every day. the “ok last message” that turns into another hour. the random deep talks. the stupid jokes at 2am. i love all of it" },
    { type: "p", text: "also our singing?? elite. off-key sometimes, but elite. and the TEA. sharing gossip with you is genuinely one of my top hobbies now. you're my gossip partner for life, no takebacks ☕" },
    { type: "p", text: "and yes i know i tease you a lot. like A LOT. but it's only because you're cute when you're annoyed hehe. and when you call me “husband”… bro. i melt. every time. don't tell anyone" },
    { type: "p", text: "and you know my favourite word is “baby”. i say it like 400 times a day. and i know you secretly (not secretly) love when i go full dramatic BABBBBBYYYYYYYY. so here it is, officially, in a letter: BABBBBBYYYYYYYY!!" },
    { type: "p", text: "the distance is hard sometimes, i won't lie. i miss you so much it's kinda annoying. but even from far away you make my days better, and i'm really grateful for you. i just want to keep making more memories with you, the silly ones, the late-night ones, all of them" },
    { type: "p", text: "thank you for being you. for the patience, the laughs, the sleepy goodnights. you're so so special to me yk. here's to month six and way, way more" },
  ] satisfies LetterBlock[],
  closing: "HAPPY SIX MONTHSSSS, MY KHADIJAAAA BABYYYYYYYY!!",
  signature: "YOUR ANNOYING HUSBAND, NOAHHHH ♡",
};

/* ---------------- MUSIC ---------------- */

export type BundledTrack = {
  title: string;
  artist?: string;
  /** file inside /public/assets/music, e.g. "/assets/music/our-song.mp3" */
  src: string;
  /** optional image inside /public/assets/music, e.g. "/assets/music/our-song.jpg" */
  cover?: string;
};

export const music = {
  title: "OUR LITTLE SOUNDTRACK",
  subtitle: "three songs you sent me, ready to keep us company ♡",
  bundled: [
    { title: "My Love Mine All Mine", artist: "Mitski", src: myLoveSrc.url },
    { title: "Kesariya", artist: "Arijit Singh", src: kesariyaSrc.url },
    { title: "Jo Tum Mere Ho", artist: "Anuv Jain", src: joTumSrc.url },
  ] as BundledTrack[],
};

/* ---------------- FINAL SURPRISE ---------------- */

export const surprise = {
  title: "ONE LAST THING…",
  boxHint: "tap the gift to shake it",
  tapsToOpen: 3,
  envelopeHint: "a letter fell out!! tap to open",
  finalTitle: "Six months, one universe 🌍💗",
  finalMessage: [
    "out of everyone in this whole entire universe, i'm so lucky it's you.",
    "six months down. so many more memories to go. late nights, duets, tea, teasing, all of it.",
    "thank you for being my baby. i'm always cheering for you, even from far away.",
  ],
  finalSign: "— your annoying husband, noahhhh ♡",
  replay: "open it again",
};
