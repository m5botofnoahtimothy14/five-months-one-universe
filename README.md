# Five Months, One Universe ♡

A small anniversary scrapbook that Noah made for Khadija. It is built with React, TanStack Start, TypeScript, Vite and Tailwind CSS.

## Run it on your computer

**Requirements:** Node.js 20+ and npm.

1. Download or clone this repository.
2. Open the project folder in a terminal.
3. Run `npm install` once. This needs internet access.
4. Run `npm run dev`.
5. Open the local address printed in the terminal.

On Windows, you can double-click `START-OFFLINE.bat` after the first install. Keep the terminal open while the site runs.

## Build and checks

```bash
npm run build
npm run lint
npm test
```

## Edit the personal parts

Open `src/content/anniversary.ts`. This is the main content file. It contains the quiz, messages, comfort pods, timeline, letter, and final surprise.

- Keep the real memories. Do not add a date unless it is correct.
- The five timeline labels are placeholders. Replace them when the dates are known.
- The music list is empty on purpose. Add only the songs you choose.
- The letter already ends with the two lines you asked for.

## Music and images

The music player starts empty. Khadija can add her own audio files in the browser. The site does not upload those files to a server. Browser storage support can vary, so keep the original audio files too.

You can add shared images or GIFs under `public/assets/` and update the matching entries in `src/content/anniversary.ts`.

## Offline use

The website has no login, database, analytics, payment flow, or external API. The fonts use local system fallbacks. After `npm install` has completed, the local development server can run without a hosted service.

The first dependency install needs internet. The local server must stay open while the website is in use.

## Deployment

The repository includes Vercel configuration for TanStack Start. Deployment is a separate step. Do not assume a push is private: anyone with access to the public repository or deployed URL may view the site.

## Privacy

There is no login or access control. The noindex metadata is only a search-engine hint. It does not make the URL private. Avoid adding sensitive information.
