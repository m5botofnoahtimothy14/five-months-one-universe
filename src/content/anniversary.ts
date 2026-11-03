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
  tagline: "a tiny internet scrapbook for my favourite person (who i miss an illegal amount)",
};

/* ---------------- WELCOME ---------------- */

export const welcome = {
  kicker: "a lil love website from your very annoying boyfriend ♡",
  title: "SIX MONTHSSSS!!",
  subtitle: "six months of us!! late-night chats, off-key duets, too much tea, and me yelling BABYYYY at you",
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
  "YOU FOUND IT!! okay genius girl, your prize is one very proud boyfriend ⭐",
  "secret note: i was smiling like an idiot while making this for you. still am, actually hehe",
  "confession: i replay your voice notes when i miss you. yes, the cute ones. okay, all of them 🤫",
  "SECRET UNLOCKED: unlimited forehead kisses from your Noah. no expiry date ✨",
  "BRO how did you spot that 😭 Khadija detective era is kinda iconic",
  "tiny star reminder: i'm proud of you, even on the days you don't feel all that proud of yourself",
  "hydration check, babyyyy 💧 your boyfriend says take a sip (bossy? me? never)",
  "this star is yours now. i would say no refunds but honestly you can have anything",
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
  title: "SIX MONTHS OF US: THE VERY SERIOUS QUIZ",
  intro: "8 questions about your boyfriend, our lore, and my extremely obvious crush on you. winner gets bragging rights + kisses hehe",
  questions: [
    {
      question: "At assembly, what was the first tiny thing about you that made my brain go “oh no, she's cute”?",
      options: ["Your mysterious superhero cape", "Those sleepy eyes 🥹", "Your very official assembly speech", "The tiny megaphone you definitely did not have"],
      correct: 1,
      rightReply: "YESS those sleepy eyes 🥹 still living rent-free in my heart, btw.",
      wrongReply: "It was your sleepy eyes!! i remember that moment so clearly, babyyy 🥹",
    },
    {
      question: "What happens when Khadija calls Noah “husband”? be honest, this is important research",
      options: ["He asks if there's a customer service line", "He melts into a very happy puddle", "He pretends his phone has no signal", "He starts acting normal (impossible)"],
      correct: 1,
      rightReply: "GUILTY 🥹 one “husband” and i forget how to function. please keep calling me that hehe",
      wrongReply: "nope, i melt IMMEDIATELY. your husband title has dangerous side effects 💗",
    },
    {
      question: "You text “BABE I HAVE TEA ☕”. What does your boyfriend do?",
      options: ["Ask if it comes with biscuits", "Say “i'm listening” and abandon all other tasks", "Schedule a gossip meeting for next Thursday", "Suddenly develop very bad signal"],
      correct: 1,
      rightReply: "Correcttt. the tea can wait for no man. tell me EVERYTHING, my love 🫖",
      wrongReply: "babyyy the correct response is “I'M LISTENING” and then you tell me every single detail 😭",
    },
    {
      question: "What is Noah's very advanced boyfriend love-language combo?",
      options: ["One normal text every other business day", "Teasing you, singing off-key, and yelling BABYYYY", "Sending you a 48-page relationship report", "Pretending he doesn't miss you (badly)"],
      correct: 1,
      rightReply: "EXACTLY. all three at once, probably in a voice note that is way too loud 😭💗",
      wrongReply: "babyyy it's teasing + off-key singing + dramatic BABYYYY. sometimes all in one voice note 😭",
    },
    {
      question: "Who wins the “i miss you more” argument between us?",
      options: ["Noah, who made himself a trophy", "Khadija, undefeated and smug", "Nobody. it's a tie, then we argue again", "The distance (rude of it, honestly)"],
      correct: 2,
      rightReply: "correct!! tie today, rematch tomorrow, and i still miss you more (don't argue) 💗",
      wrongReply: "it's ALWAYS a tie, then we start the whole argument again. our favorite sport fr 😭",
    },
    {
      question: "When i say “five more minutes,” what does that mean in Noah time?",
      options: ["Exactly five minutes. very scientific", "A vibe, a hope, an optimistic little promise", "One entire season of our gossip show", "I'll call you next month"],
      correct: 1,
      rightReply: "you know me too well 😭 my “five minutes” is powered by vibes and wanting to hear your voice",
      wrongReply: "baby, my five minutes is not a real unit. it's just me trying to stay on call longer hehe",
    },
    {
      question: "What happens when Noah tries to flirt with his own girlfriend?",
      options: ["He sends an off-key serenade", "He calls you cute and gets shy", "He forgets his sentence when you smile", "All of the above. smooth operator, obviously"],
      correct: 3,
      rightReply: "ALL OF THE ABOVE. 10/10 boyfriend, 2/10 at acting cool when you smile 😭",
      wrongReply: "it's all of the above babyyy. i forget my whole personality when you smile at me 💗",
    },
    {
      question: "After six months, what is still Noah's favorite thing to hear from Khadija?",
      options: ["“Noah, please submit your paperwork”", "Your voice, even when you're just saying hi 🥹", "A very detailed weather report", "The sound of his own singing (tragic)"],
      correct: 1,
      rightReply: "your voice, always 🥹 even a tiny “hiii” from you makes my whole day better",
      wrongReply: "your voice, babyyy 🥹 any message from you is instantly my favorite notification",
    },
  ] satisfies QuizQuestion[],
  /** results by percentage score (min is inclusive) */
  results: [
    { min: 100, title: "MY KHADIJA KNOWS ME BEST: CERTIFIED MASTERMIND 🏆", message: "PERFECT SCORE?? okay miss soulmate, you know me way too well. come collect your kisses hehe" },
    { min: 75, title: "WIFEY MATERIAL (I KNEW IT) ⭐", message: "almost perfect, babyyy!! your prize is me being even more obsessed with you. sorry not sorry" },
    { min: 50, title: "CUTE LITTLE DETECTIVE 🔍", message: "not bad at all, my love. we can study the boyfriend together over a very long call hehe" },
    { min: 0, title: "MY FAVORITE CHAOTIC GIRL 💗", message: "the score is whatever, you are still my favorite person in every universe. come here for a hug" },
  ],
};

/* ---------------- AFFECTION MACHINE ---------------- */

export const affection = {
  title: "NOAH AFFECTION MACHINE",
  subtitle: "press a button, babyyy. your boyfriend has an unreasonable amount of love to deliver.",
  generatorButton: "GIVE ME A COMPLIMENT",
  messages: [
    "BABBBBBYYYYYYYY!! your extremely clingy boyfriend has arrived 💗",
    "you are SO special to me, Khadijaaaa. like, alarmingly much.",
    "your annoying husband is cheering for you from over here. always.",
    "tiny reminder from your Noah: you matter to me more than you know",
    "you're my favorite notification. sorry to every other app on my phone",
    "hi pretty. i love you. okay bye (wait come back)",
    "proud of you for getting through today, even the boring weird bits",
    "you + me = my favorite team. no debate, i've checked the science",
    "noah's heart status: Khadija-owned. password protected. 100% yours.",
    "you make all these miles feel a little less rude, yk",
    "drink some water, eat a lil something, then come back so i can adore you",
    "you're doing better than you think, babyyy. i'm proud of you fr",
  ],
  nicknames: [
    "my sleepy-eyes girl 😴",
    "babyyyy (my favorite word)",
    "my tea-spilling soulmate ☕",
    "Khadijaaaa bear 🧸",
    "my off-key duet queen 🎤",
    "cutie patootie (i said what i said)",
    "my favorite human, easy",
    "tiny troublemaker. very kissable.",
  ],
  compliments: [
    "your laugh could power the whole city, fr. i'd still want front-row seats",
    "you're cute when you're sleepy. okay you're cute literally all the time",
    "elite gossip taste. my favorite tea curator ☕",
    "your singing voice?? i fall in love again, even when we miss every note 🎤",
    "your name on my phone makes my whole day better, no exaggeration",
    "you're kind in that quiet way that makes people feel safe. i love that about you",
    "smart, funny, gorgeous AND you put up with me. Khadija, you're a legend",
    "you're my favorite person to annoy, and my favorite person full stop",
  ],
  kissLines: ["MWAAAAHHHH 💋 boyfriend kiss delivery!!", "mwah mwah mwah, one for each cheek hehe", "kiss delivered across the miles ✅", "*sends the biggest virtual smooch to Khadija*", "smoooch!! come collect the real one soon"],
  missYou: [
    "I MISS YOU TOOOOO 😭 like a chill normal amount (a completely unchill amount)",
    "the distance is so annoying, bro. you are worth every single km though",
    "missing you is my daily cardio. my heart is doing the most",
    "counting down till i get to see your face again. fr fr",
    "i miss you more. no arguments accepted. (you can still argue, obviously)",
  ],
  annoyNoah: [
    "BROOO why 😭 okay come here, i still love you",
    "rude!! i'm filing a complaint directly with my girlfriend",
    "*noah has been annoyed. noah has also fallen more in love. confusing.*",
    "BABYYYY STOPPP (wait no, keep going)",
    "i'm telling on you. to you. because you're the only person i tell things to hehe",
    "annoyance: 2/10. how cute you are while doing it: unfair/10",
  ],
  moreLove: [
    "boyfriend love refill for my babyyyy 💗",
    "more love. and more. and MORE. i have a lot, okay",
    "the Noah-to-Khadija love supply is unlimited, don't worry",
    "extra hugs shipped across the distance. express delivery (me running to you)",
    "love meter overflowing. Khadija caused this. no regrets",
  ],
  husbandCheck: [
    "✅ annoying: yes  ✅ loyal: obviously  ✅ thinking about you: always",
    "status: misses Khadija, forgot his snack, smiling at his phone again",
    "boyfriend is functioning normally (dramatically and with 17 thoughts of you)",
    "scan complete: 0% chill, 100% your Noah",
    "warning: husband is about to yell BABBBBBYYYYYYYY into a voice note",
  ],
  noahExe: [
    ["> booting noah.exe…", "> loading feelings… [██████████] 100%", "> ERROR: too much love detected", "> solution: hug Khadija ✓"],
    ["> starting noah.exe v5.0 (six months edition)", "> checking memory: sleepy eyes at assembly ✓", "> checking memory: late-night chats ✓", "> status: still obsessed"],
    ["> noah.exe running", "> tease_khadija() executed successfully", "> sing_together() queued", "> output: BABBBBBYYYYYYYY"],
    ["> noah.exe update available!", "> new features: more love, more annoying", "> installing… done", "> please restart your smile 😁"],
  ],
  squeezeBear: ["squeak! your boyfriend has been squished", "eeep! okay that tickles, babyyy", "hehe that tickles. one real hug owed", "BEAR HUG ACTIVATED. Khadija, come here 🧸", "*happy bear noises because you're here*", "more squeezes pls, this teddy is very clingy"],
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
    question: "OKAY BE HONEST... DO YOU LOVE YOUR NOAH?",
    yes: "OBVIOUSLYYYY 💗",
    no: "nope",
    yesReply: "I KNEW ITTTT 🥹💗 okay i love you more. no argument. come here hehe",
    noDodges: ["nope, wrong button babyyy", "that button is definitely broken", "hehe nice try, press the cute one", "the “no” button got shy 🏃", "your boyfriend refuses to accept this answer"],
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
    name: "Sad Lil Pod",
    emoji: "🌧️",
    tone: "sky",
    mascot: { animal: "teddy", mood: "sad", prop: "heart" },
    teaser: "open when today is being rude",
    messages: [
      "Hey babyyy. you don't have to fix the whole day right now, okay? breathe a lil. your Noah is right here, no pep talk unless you want one.",
      "who upset my favorite girl? i'm preparing my sternest long-distance glare 😤 but fr, i'm here to listen whenever you want.",
      "sending you the biggest screen hug 🫂 squeeze your pillow for me; the real Noah version is much better, promise.",
      "a hard day doesn't make you any less wonderful, Khadija. you can feel sad and still be my favorite person in every universe.",
    ],
  },
  {
    id: "crying",
    name: "Tears & Teddy Pod",
    emoji: "😢",
    tone: "lavender",
    mascot: { animal: "bunny", mood: "crying", prop: "tissue" },
    teaser: "tissues, cuddles, zero judgment",
    messages: [
      "cry if you need to, baby. you never have to hide your feelings from me. i love your soft heart, even on the soggy days 🥺",
      "one virtual tissue 🧻 and then the whole box. take your time, okay? there's no timer on feeling better.",
      "i wish i could sit next to you and hold your hand rn. imagine me being quiet for once (a rare event, i know).",
      "when you're ready, have some water and text me if company would help. quiet is okay too. i'm still right here, my love.",
    ],
  },
  {
    id: "period",
    name: "Cosy Days Pod",
    emoji: "🌸",
    tone: "blush",
    mascot: { animal: "teddy", mood: "love", prop: "hotWaterBottle" },
    teaser: "blanket, snacks + boyfriend attention",
    messages: [
      "cosy mode ON 🌸 blanket, warm bottle, soft clothes, whatever feels nice. you deserve the deluxe girlfriend treatment (including from yourself).",
      "no productivity points today, babyyy. resting counts. i'm proud of you for looking after yourself.",
      "need a distraction? one text away. i can send memes, gossip, or a very dramatic BABYYYY voice note hehe",
      "snack + warm drink + comfort show = elite plan. and if you need extra help, tell someone you trust too, okay? 💗",
    ],
  },
  {
    id: "overthinking",
    name: "Brain Doing Too Much Pod",
    emoji: "🌀",
    tone: "butter",
    mascot: { animal: "bunny", mood: "thinking", prop: "cloud" },
    teaser: "for the 2am what-if olympics",
    messages: [
      "babyyy pause with me 🌀 a thought can be loud and still not be true. let's give that brain a tiny breather, okay?",
      "name 3 things you can see, then one thing you can hear. i'm doing it too from my side of the screen. look at us, teamwork hehe",
      "if you're overthinking about us, let's talk it through when you're ready. no guessing games, okay? i'm on your team.",
      "write the worry down and let tomorrow-you deal with it. 2am brain is a dramatic screenwriter, not the boss 😭",
    ],
  },
  {
    id: "missing",
    name: "Missing Your Boyfriend Pod",
    emoji: "💌",
    tone: "peach",
    mascot: { animal: "teddy", mood: "love", prop: "letter" },
    teaser: "open when you need a Noah hug",
    messages: [
      "I MISS YOU TOO, BABYYYY 😭 the distance is so rude. you don't have to pretend it's easy, okay? i'm right here with you.",
      "imagine me yelling BABYYYY and saving the biggest real hug for when i see you. official Noah delivery promise 🫂",
      "go reread one of our silly chats if you want. that's me, still here, still annoying, still so so in love with you hehe",
      "we can miss each other and still have a good day. one day closer to the next hello, my favorite girl 💌",
    ],
  },
  {
    id: "sleepy",
    name: "Sleepy Khadija Pod",
    emoji: "🌙",
    tone: "lavender",
    mascot: { animal: "bunny", mood: "sleepy", prop: "pillow" },
    teaser: "open before those sleepy eyes close",
    messages: [
      "those sleepy eyes from assembly need a soft pillow and a full night's rest 🥹 go get cosy, my love.",
      "okay LAST goodnight (this time for real): sleep well and wake up knowing your boyfriend is embarrassingly in love with you.",
      "phone down, blanket up. no solving tomorrow tonight. your very unofficial husband says so 🫡",
      "sleep tight, Khadijaaaa. i'll be here for tomorrow's gossip and your first sleepy “hiii” ☕🌙",
    ],
  },
  {
    id: "angry",
    name: "Grumpy Bear Pod",
    emoji: "😤",
    tone: "mint",
    mascot: { animal: "teddy", mood: "angry", prop: "flower" },
    teaser: "your space is safe here. snacks too.",
    messages: [
      "you're allowed to be mad, my love. take the space you need; i won't rush you into being okay 🌿",
      "grumpy girlfriend detected 😤 flower delivery initiated 🌼 i'll listen when you're ready, no pressure to reply now.",
      "if i hurt you, i'm sorry. i want to understand and make it right, not win. if it's something else, i'm still on your side.",
      "you don't have to stop being mad for me to love you. grumpy Khadija is still my favorite Khadija hehe",
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
  subtitle: "the songs you sent me ♡ press play and watch your boyfriend get emotional hehe",
  bundled: [
    { title: "My Love Mine All Mine", artist: "Mitski", src: myLoveSrc.url },
    { title: "Kesariya", artist: "Arijit Singh", src: kesariyaSrc.url },
    { title: "Jo Tum Mere Ho", artist: "Anuv Jain", src: joTumSrc.url },
  ] as BundledTrack[],
};

/* ---------------- FINAL SURPRISE ---------------- */

export const surprise = {
  title: "OKAY BABE, ONE LAST THING…",
  boxHint: "tap tap tap to shake your present",
  tapsToOpen: 3,
  envelopeHint: "BABE there's a little note in here!! tap to open",
  finalTitle: "Six months, one universe, and my whole heart 🌍💗",
  finalMessage: [
    "out of everybody in this huge universe, i got you. bro, i'm the luckiest guy alive.",
    "six months of late-night “one more thing”s, off-key duets, tea, teasing, and loving you more every day.",
    "thank you for being my Khadija. even from far away, i'm always in your corner, cheering the loudest.",
  ],
  finalSign: "YOUR VERY ANNOYING, VERY IN-LOVE BOYFRIEND, NOAHHHH ♡",
  replay: "make me emotional again",
};
