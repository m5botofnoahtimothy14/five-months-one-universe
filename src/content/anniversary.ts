/**
 * ============================================================
 *  SIX MONTHS, ONE UNIVERSE — EDIT EVERYTHING HERE ♡
 * ============================================================
 *  Noah: every word on the site lives in this file.
 *  Change text inside the quotes, save, done. Keep the commas!
 *  See README.md → "Editing the content" for more help.
 * ============================================================
 */

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
  { path: "/timeline", label: "Our six months", emoji: "📸" },
  { path: "/teddy", label: "Your teddy", emoji: "🧸" },
  { path: "/letter", label: "The letter", emoji: "💌" },
  { path: "/surprise", label: "The surprise", emoji: "🎁" },
] as const;

export type SectionPath = (typeof sections)[number]["path"];

/** Extra pages that live outside the guided journey (always in the menu). */
export const extraPages = [
  { path: "/pods", label: "Comfort pods", emoji: "🫂" },
  { path: "/music", label: "Our playlist", emoji: "🎵" },
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
  intro: "no pressure. ok a little pressure. jk jk there's literally no wrong way to love me hehe",
  questions: [
    {
      question: "How does Noah say your name when he's being DRAMATIC?",
      options: ["“Khadija.”", "“BABBBBBYYYYYYYY”", "“hello madam”", "he just sends a thumbs up 👍"],
      correct: 1,
      rightReply: "YESSSS the full dramatic version, with extra Y's. you know me too well 😭",
      wrongReply: "noooo it's “BABBBBBYYYYYYYY”!! with at least 8 Y's. minimum.",
    },
    {
      question: "What's Noah's favourite hobby (that you pretend to hate)?",
      options: ["Gardening", "Teasing you", "Tax returns", "Silent meditation"],
      correct: 1,
      rightReply: "correct!! teasing you is my full-time job and i'm employee of the month 😌",
      wrongReply: "close but no, it's teasing you hehe. every. single. day.",
    },
    {
      question: "When do our BEST conversations happen?",
      options: ["9am sharp", "During lunch only", "Late at night when we should be sleeping", "Never, we're very serious people"],
      correct: 2,
      rightReply: "YUPPP. 2am thoughts with you >>> everything else",
      wrongReply: "babyyy it's the late-night ones!! the “ok last message” × 47 ones 🌙",
    },
    {
      question: "What do we do together that makes Noah weirdly happy?",
      options: ["Singing together", "Doing maths", "Filing paperwork", "Arguing about the weather"],
      correct: 0,
      rightReply: "SINGINGGG!! even when we're off-key. ESPECIALLY when we're off-key 🎤",
      wrongReply: "it's singing together!! our concerts are elite, don't argue",
    },
    {
      question: "Someone says “I have tea ☕”. What happens next?",
      options: ["We ignore it", "We drop EVERYTHING and gossip", "We make actual tea", "We report it to the authorities"],
      correct: 1,
      rightReply: "obviously. tea time with you is sacred. spill it ALL 🫖",
      wrongReply: "BRO we drop everything!! gossip partners forever 🫖",
    },
    {
      question: "What does Khadija call Noah?",
      options: ["Mr. Noah sir", "Husband", "That guy", "Customer service"],
      correct: 1,
      rightReply: "husband reporting for duty 🫡 (annoying edition)",
      wrongReply: "it's “husband”!! and he melts every time, don't tell him",
    },
    {
      question: "Noah's honest job description is:",
      options: ["Professional chef", "Annoying husband", "Astronaut", "Quiet and mysterious"],
      correct: 1,
      rightReply: "ANNOYING HUSBAND, certified ✅ i take my job very seriously",
      wrongReply: "the answer was annoying husband hehe. it's literally on my business card",
    },
    {
      question: "The first time Noah saw you, you had…",
      options: ["Sunglasses on", "Sleepy eyes at assembly", "A clown nose", "A megaphone"],
      correct: 1,
      rightReply: "sleepy eyes at assembly 🥹 i still think about that moment fr",
      wrongReply: "it was your sleepy eyes at assembly!! i remember it sooo clearly",
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
      "heyyy babyyy. it's okay to be sad, you don't have to fix it right now yk. just breathe a lil. i'm right here (in your phone, but still)",
      "BRO who made my baby sad. tell me. i'll fight them. or at least glare very aggressively from far away 😤 but fr, you can tell me anything, whenever you want",
      "sending you the biggest hug through the screen rn 🫂 squeeze your pillow and pretend it's me. it's a very handsome pillow now",
      "sad days are allowed. you're still the same amazing Khadija even on the grey ones. i'll be here when the sun comes back, and before that too",
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
      "awww babyyy cry it out, it's okay. crying isn't weak, it just means you feel a lot, and that's one of my favourite things about you 🥺",
      "here's a virtual tissue 🧻 and another one. and the whole box. take your time okayyy",
      "i wish i could wipe your tears myself rn. the distance is so annoying. but imagine me sitting next to you being quiet (for once) hehe",
      "after you're done crying, drink some water okay? and then text me if you want. or don't. i'm not going anywhere",
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
      "hiii babyyy, cosy mode ON 🌸 if you feel like it: blanket, something warm to hold, your comfiest clothes. you deserve the softest day",
      "you don't have to be productive today yk. resting counts as doing something. i'm proud of you anyway hehe",
      "if you want a distraction i'm literally one text away. i'll send memes, gossip, dramatic BABBBBBYYYYYYYY's, whatever helps",
      "snack + warm drink + a comfort show sounds like a vibe, only if you want tho. and if it gets really bad, please check in with someone you trust okayyy 💗",
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
      "BABYYY pause. your brain is doing the spinny thing again 🌀 most of those thoughts are just loud, not true. you're okay",
      "let's do this: name 3 things you can see rn. ok now tell me one. see? you're here, you're safe, and i still like you a normal amount (a LOT)",
      "if you're overthinking about us: don't. i'm not going anywhere. i'm annoyingly here. permanently. hehe",
      "write the worry down, close the note, and come back to it tomorrow. 2am brain is not allowed to make decisions, that's the rule",
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
      "I MISS YOU TOOOOO 😭 like so much it's actually rude. the distance is temporary babyyy, us is not",
      "close your eyes and imagine me saying BABBBBBYYYYYYYY really loudly. ok i'm basically there now",
      "go reread our chats, the late-night ones. that's me, still here, still annoying, still yours hehe",
      "every day we miss each other is one day closer to the next time we see each other yk. that's maths. i'm good at maths now",
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
      "SLEEPY EYES. omg the same ones from assembly 🥹 go sleep babyyy, i'll still be here in the morning",
      "ok last message (it's never the last message) — goodnight, sleep well, dream about something nice. like me. hehe",
      "phone down, blanket up, and no overthinking allowed. husband's orders 🫡",
      "sleep tight babyyy. tomorrow we gossip again ☕🌙",
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
      "okay you're angry, that's valid. take your space, i'll be right here when you're ready. no rush at all 🌿",
      "angry baby detected 😤 i'm putting a flower here 🌼 and slowly backing away. hehe. talk whenever you want",
      "if i'm the reason, i'm sorry and i want to understand. if i'm not, i'm on your side, always. either way you're allowed to feel this",
      "breathe in… breathe out… ok you can still be mad, i just wanted you to have oxygen hehe. love you even when you're grumpy",
    ],
  },
];

/* ---------------- TIMELINE ---------------- */

export type TimelineMonth = {
  month: number;
  title: string;
  /** editable: add your own date or feeling, e.g. "the start of everything" */
  label: string;
  tone: Tone;
  sticker: string;
  story: string;
  moments: string[];
};

export const timeline: TimelineMonth[] = [
  {
    month: 1,
    title: "Sleepy Eyes at Assembly",
    label: "[Month 1 — add your own date or note here]",
    tone: "blush",
    sticker: "👀",
    story: "the very first glimpse. you, at assembly, with the sleepiest eyes ever. and somehow that was it for me.",
    moments: ["first time seeing you", "trying (and failing) to act normal", "the first messages"],
  },
  {
    month: 2,
    title: "The Late-Night Era",
    label: "[Month 2 — add your own date or note here]",
    tone: "lavender",
    sticker: "🌙",
    story: "the “ok last message” that was never the last message. talking until our eyes gave up.",
    moments: ["late-night chats", "random deep talks", "saying goodnight 6 times"],
  },
  {
    month: 3,
    title: "Duets & Tea",
    label: "[Month 3 — add your own date or note here]",
    tone: "peach",
    sticker: "🎤",
    story: "singing together (badly, beautifully) and spilling all the tea like best friends who are also in love.",
    moments: ["our little concerts", "gossip sessions ☕", "laughing way too hard"],
  },
  {
    month: 4,
    title: "Husband & Baby",
    label: "[Month 4 — add your own date or note here]",
    tone: "butter",
    sticker: "💍",
    story: "you started calling me husband and i became professionally annoying. the teasing reached legendary levels.",
    moments: ["nicknames everywhere", "BABBBBBYYYYYYYY", "teasing you nonstop"],
  },
  {
    month: 5,
    title: "Far, But Close",
    label: "[Month 5 — add your own date or note here]",
    tone: "mint",
    sticker: "🌍",
    story: "long-distance messages, missing each other like crazy, and still choosing us every single day.",
    moments: ["missing you a lot", "good morning texts", "planning more memories"],
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
  ], satisfies LetterBlock[],
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
  title: "OUR LITTLE PLAYLIST",
  subtitle: "press play when you're ready. nothing plays by itself, promise.",
  /**
   * Songs bundled with the website (work on every device after deploy).
   * Put the files in public/assets/music/ and list them here. Example:
   *   { title: "Our Song", artist: "Someone", src: "/assets/music/our-song.mp3", cover: "/assets/music/our-song.jpg" },
   * Left empty on purpose — Noah picks the songs.
   */
  bundled: [] as BundledTrack[],
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
