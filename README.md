# Six Months, One Universe ♡

A small anniversary scrapbook that Noah made for Khadija. It is built with React, TanStack Start, TypeScript, Vite and Tailwind CSS.

## Run it on your computer

**Requirements:** Node.js 20+ and npm.

1. Download or clone this repository.
2. Extract the contents of `anniversary-music-assets.zip` into the project root. It adds the `public/assets/music/` folder and the four uploaded tracks.
3. Open the project folder in a terminal.
4. Run `npm install` once. This needs internet access.
5. Run `npm run dev`.
6. Open the local address printed in the terminal.

On Windows, double-click `START-OFFLINE.bat` after the first install. Keep the terminal open while the site runs.

## Build and checks

```bash
npm run build
npm run lint
npm test
```

GitHub Actions also runs the test suite and production build on pushes and pull requests.

## Edit the personal parts

Open `src/content/anniversary.ts`. This is the main content file. It contains the quiz, messages, comfort pods, six-month letter, playlist, and final surprise.

- The old five-month memories page has been removed.
- The letter is text only. It has no GIF or sticker blocks.
- The playlist starts with the four unique audio uploads. The duplicate WAV take was not added twice.
- The music files are MP3 copies made from the uploaded WAV files. The originals remain unchanged in your Library.
- Do not add dates or memories unless they are correct.

## Music files

The tracks are in `public/assets/music/`:

- If You'll Let Me (Take 3)
- If You Let Go
- Myfav
- Surprise Element

The audio player does not autoplay. Khadija must press play. The player supports play/pause, next/previous, seek, volume, and a queue.

## Offline use

The site has no login, database, analytics, payment flow, or external API. Fonts use local system fallbacks. After `npm install` has completed and the music archive has been extracted, the local development server can run without a hosted service.

The first dependency install needs internet. Keep the local server open while the website is in use.

## Deployment and privacy

Deployment is separate from code changes. This site has no login or access control. The noindex metadata is only a search-engine hint. It does not make the URL private. Avoid adding sensitive information.
