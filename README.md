# Five Months, One Universe

A pastel scrapbook-style five-month anniversary website. Built with React, TanStack Start, Vite, Tailwind CSS, and Nitro.

## Requirements

- Node.js 20 or newer
- npm
- Internet access for the first dependency install and Google Fonts. The app itself has no database, login, payments, tracking, or external API.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build and test

```bash
npm run build
npm run lint
npm test
```

## Offline Windows start

1. Install Node.js 20+ on the Windows computer.
2. Extract the project folder.
3. Run `start-offline.bat`.
4. On first run, the script installs npm dependencies and builds the app. This first run needs internet access.
5. The script starts the local server. Open http://localhost:3000.
6. Keep the terminal window open while using the site.

After the first successful setup, the installed dependencies and built output are local. The site does not need a hosted backend. Browser-selected music and GIFs remain local to that browser session and are not shared with another device.

## Edit the anniversary content

Edit `src/content/anniversary.ts`. This file contains names, welcome copy, quiz questions and replies, affection messages, comfort pods, timeline entries, the letter, music configuration, and the final surprise.

Do not add dates or memories unless they are correct. Replace the editable month labels with real dates only when ready.

## Add music

- Put files in `public/assets/music/`.
- Add entries to the `bundled` array in `src/content/anniversary.ts`.
- Use public paths such as `/assets/music/song-name.mp3`.
- The upload control on the page is a local preview. It does not upload files to a server.

## Add GIFs and images

The letter has local GIF upload slots. To bundle images for every visitor, put them in `public/assets/gifs/` and set the matching `src` values in the letter blocks, for example `/assets/gifs/assembly.gif`.

## Deploy to Vercel

The project includes `vercel.json` with the TanStack Start framework preset. Connect the GitHub repository to the existing Vercel project. Vercel should detect the TanStack Start + Nitro build. Keep the project root set to the repository root. Do not set a static output directory; this app uses server rendering through Nitro.

Deployment is a separate action. A push to the connected production branch can trigger a Vercel deployment automatically, depending on the project's Git settings.

## Privacy

The site has no login or access control. A hard-to-guess URL is not private security. The noindex metadata asks search engines not to index the page, but does not prevent access by anyone with the link. Do not put sensitive information on the site.

## Project structure

- `src/content/anniversary.ts` — editable personal content
- `src/routes/index.tsx` — complete single-page anniversary experience
- `src/styles.css` — pastel scrapbook design system
- `public/assets/music/` — bundled music files
- `public/assets/gifs/` — bundled GIFs and images
- `start-offline.bat` — Windows local build and start helper
