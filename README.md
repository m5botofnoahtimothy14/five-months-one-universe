# Five Months, One Universe

Build a complete, polished, mobile-first Next.js anniversary website called "Five Months, One Universe" for a five-month long-distance anniversary. This is a real working app, not a mockup or landing-page-only concept. Use Next.js App Router, TypeScript, Tailwind and shadcn/ui where useful. Make the visual design custom and memorable: pastel blush pink, cream, lavender, soft peach, scrapbook paper textures, hand-drawn doodles, stickers, tiny stars, rounded cards, subtle grain, soft shadows, cute teddy/bunny mascots, floating hearts, playful motion. Avoid a generic SaaS look. Prioritize excellent phone layout and accessibility, with reduced-motion support and fast loading.

CORE EXPERIENCE:
- Start with a delightful welcome screen: "FIVE MONTHSSSS!!", cute animated teddy holding a heart, floating hearts/stars, and a playful "ARE YOU READY, BABYYYY?" entry button. Make it feel like a personal internet scrapbook.
- Smooth navigation / sections with a progress indicator and a small home/menu control. Add small clickable hidden surprises throughout.
- "HOW WELL DO YOU KNOW YOUR HUSBANDDDD?" interactive quiz. 6-8 funny multiple-choice questions based on known details: he says "BABBBBBYYYYYYYY" dramatically, teases her, has late-night chats, sings with her, shares tea/gossip, and is an annoying husband. Make options editable in content data. Correct/wrong feedback should be playful and affectionate, not shaming. Track score and show a fun result.
- "NOAH AFFECTION MACHINE": button generates a random compliment / silly nickname / caring message. Include messages such as "BABBBBBYYYYYYYY!!", "you are so so special", "your annoying husband is cheering for you", "one tiny reminder: you matter a lot". Add a virtual kiss button with a count and heart burst, plus "I MISS YOU", "ANNOY NOAH", "MORE LOVE PLEASE", "DO YOU LOVE NOAH?", "HUSBAND CHECK", "NOAH.exe", "SQUEEZE THE BEAR", "BABY SPAM", "UNLOCK SECRET". Each must have a real interaction and randomized response or animation, not inert buttons. Keep affection age-appropriate and non-explicit.
- COMFORT PODS replace open-when letters. Seven distinct interactive POD cards, each with its own cute mascot/illustration and several personal-sounding message variants:
  1 Sad Pod
  2 Crying Pod
  3 Period Comfort Pod (gentle support only; suggest rest/comfort if she wants, no diagnosis or medical claims)
  4 Overthinking Pod
  5 Missing Noah Pod
  6 Sleepy Pod
  7 Angry Pod (respect space, light humour, reassure without pressure)
  Write in casual texting style with elongated words, "yk", "hehe", "BRO", caps emphasis and affectionate phrasing. Avoid generic motivational quotes. The tone should be supportive, never guilt-inducing or possessive.
- A visual five-month timeline with five chapters (Month 1 through Month 5). Use memories and moments we know: first seeing her at assembly with sleepy eyes; late-night conversations; singing together; sharing tea/gossip; teasing and nicknames; long-distance messages and missing each other. Do not invent exact dates or specific events. Label each month with editable placeholder text where personal facts are not known. Use illustration and scrapbook cards; do not require couple photos.
- A full letter section, written in Noah's casual texting style, not polished AI prose. Begin with something like "HEYYYYYYYY BABYYYYYYYY!! FIVE MONTHSSSS?????" Include the first assembly glimpse and her sleepy eyes, how he still thinks about that first moment, their late-night conversations, singing, sharing tea/gossip, teasing, her calling him "husband", his most-used nickname "baby", and how she loves the dramatic "BABBBBBYYYYYYYY". Mention the distance and that he wants to keep making memories. Keep it authentic, warm, teen-safe, non-explicit, non-possessive. End with "HAPPY FIVE MONTHSSSS, MY Ridaaaa BABYYYYYYYY!!" and "YOUR ANNOYING HUSBAND, NOAHHHH ♡". Insert cute GIF-like moments BETWEEN paragraphs: use original lightweight animated sticker components / CSS animations / emoji reaction cards / optional GIF slots. Do not rely on third-party hotlinked GIF URLs. Provide optional GIF image upload slots that Noah can replace with his own GIF files. Add a cute animated "MWAAAAHHHH 💋💋" sticker between letter paragraphs (non-explicit virtual kiss).
- MUSIC PLAYER: build a functional custom audio player that starts only after an explicit click (no autoplay). Include play/pause, volume, progress, track title, playlist queue, next/previous, and a clear "Add your songs" flow. Let Noah upload local audio files (mp3, m4a, wav, ogg) and optionally cover art, preview them, reorder/remove tracks. Store selected track metadata and files locally in browser storage where practical (IndexedDB preferred; fallback gracefully). Explain in UI that audio files are local to this browser and must be added on the device where she opens the site if not bundled before deployment. Also support a public/assets/music folder convention and provide README-style instructions for replacing placeholder tracks with files before deployment. Do not select or source any songs.
- FINAL SURPRISE: an envelope / gift box with a mystery reveal and a final personal message. Add confetti/hearts animation and make the reveal user-triggered.
- Include editable content data in a clear file (e.g. src/content/anniversary.ts) so Noah can edit names, quiz questions, timeline entries, POD text, letter paragraphs, and affection messages without hunting through components.
- Provide GIF upload slots or a clear local asset directory convention for custom GIFs and images. Provide an asset guide explaining how to add GIFs and songs.
- Keep it client-side where possible. No login, no database, no payment, no external API. Do not add tracking/analytics. The user wants an unlisted shareable link. Configure the app for deployment, but do not claim that an unlisted URL is private or access-controlled: document that anyone with the link can open it. A front-end passcode is not secure; do not pretend otherwise.
- Include README with local dev instructions, content editing guide, music/GIF asset instructions, and deployment notes.
- Build all functionality. Verify the app compiles and fix errors before finishing. Do not leave TODO-only controls or fake functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60279fe8-45c2-4532-b259-ba2998b1e2df).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
