const CACHE_NAME = __CACHE_NAME__;
const PRECACHE_URLS = __PRECACHE_URLS__;
const ROUTE_URLS = __ROUTE_URLS__;
const AUDIO_URLS = __AUDIO_URLS__;
const AUDIO_PATHS = new Set(AUDIO_URLS.map((url) => new URL(url, self.location.origin).pathname));

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);
      await Promise.allSettled(
        ROUTE_URLS.map(async (url) => {
          const response = await fetch(url, { cache: "reload" });
          if (response.ok) await cache.put(url, response);
        }),
      );
      await Promise.allSettled(
        AUDIO_URLS.map(async (url) => {
          const response = await fetch(url, { cache: "reload" });
          if (response.ok) await cache.put(url, response);
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.startsWith("anniv-offline-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

async function audioResponse(request, cached) {
  const range = request.headers.get("range");
  if (!range) return cached;

  const bytes = await cached.arrayBuffer();
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${bytes.byteLength}` } });

  const start = match[1] ? Number(match[1]) : Math.max(0, bytes.byteLength - Number(match[2]));
  const end = match[2] && match[1] ? Math.min(Number(match[2]), bytes.byteLength - 1) : bytes.byteLength - 1;
  if (start > end || start >= bytes.byteLength) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${bytes.byteLength}` } });
  }

  const headers = new Headers(cached.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Range", `bytes ${start}-${end}/${bytes.byteLength}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
          const response = await fetch(request);
          if (response.ok) await cache.put(request, response.clone());
          return response;
        } catch {
          return (await cache.match(request)) ?? (await cache.match("/")) ?? Response.error();
        }
      })(),
    );
    return;
  }

  if (AUDIO_PATHS.has(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(url.href);
        if (cached) return audioResponse(request, cached);
        try {
          const response = await fetch(request);
          if (response.ok && response.status === 200) await cache.put(url.href, response.clone());
          return response;
        } catch {
          return new Response("This song is not available offline yet.", { status: 503 });
        }
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        return Response.error();
      }
    })(),
  );
});
