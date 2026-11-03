# Six Months, One Universe ♡

A small anniversary scrapbook that Noah made for Khadija. It is built with React, TanStack Start, TypeScript, Vite and Tailwind CSS.

## Run it on your computer

**Requirements:** Node.js 20+ and npm.

1. Download or clone this repository.
2. Open the project folder in a terminal.
3. Run `npm install` once. This needs internet access.
4. Run `npm run dev`.
5. Open the local address printed in the terminal.

On Windows, double-click `START-OFFLINE.bat` after the first install. Keep the terminal open while the site runs.

## Build and checks

```bash
npm run build
npm run lint
npm test
```

GitHub Actions also runs the test suite and production build on pushes and pull requests.

## Edit the personal parts

Open `src/content/anniversary.ts`. This is the main content file. It contains the quiz, messages, comfort pods, six-month letter, soundtrack, and final surprise.

- The old five-month memories page has been removed.
- The letter is text only. It has no GIF or sticker blocks.
- The soundtrack uses the three songs uploaded for this site.
- Do not add dates or memories unless they are correct.

## Music files

The soundtrack uses these uploaded songs:

- My Love Mine All Mine
- Kesariya
- Jo Tum Mere Ho

The site tries to start the first song automatically. If the browser blocks autoplay, tap play once. The player supports play/pause, next/previous, seek, and volume.

## Offline use

The deployed site uses a service worker to cache its routes, app assets, local fonts, and songs. Visit while online once and leave the site open until caching finishes; after that, it should keep working when the network is off. Clearing site data or browser storage settings can remove the cache. Reconnect and visit again after a new deployment to update it.

For local development, install dependencies once while online. After that, `npm run dev` can run without a hosted service. Keep the local server open while using the development site.

## Deployment and privacy

Deployment is separate from code changes. This site has no login or access control. The noindex metadata is only a search-engine hint. It does not make the URL private. Avoid adding sensitive information.
