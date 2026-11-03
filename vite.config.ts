// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

const projectRoot = process.cwd();

function publicUrls(directory: string, root = directory): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return publicUrls(path, root);
    return [`/${relative(root, path).split(sep).join("/")}`];
  });
}

function offlineServiceWorker(): Plugin {
  return {
    name: "anniversary-offline-service-worker",
    apply: "build",
    applyToEnvironment: (environment) => environment.name === "client",
    generateBundle(_options, bundle) {
      const buildUrls = Object.keys(bundle)
        .filter((fileName) => !fileName.endsWith(".map"))
        .map((fileName) => `/${fileName}`);
      const staticUrls = publicUrls(resolve(projectRoot, "public"));
      const audioUrls = readdirSync(resolve(projectRoot, "src/assets"))
        .filter((fileName) => fileName.endsWith(".mp3.asset.json"))
        .map((fileName) => {
          const asset = JSON.parse(readFileSync(resolve(projectRoot, "src/assets", fileName), "utf8")) as { url?: string };
          return asset.url;
        })
        .filter((url): url is string => typeof url === "string" && url.startsWith("/"));
      const precacheUrls = [...new Set([...buildUrls, ...staticUrls])];
      const routeUrls = ["/", "/quiz", "/machine", "/teddy", "/letter", "/surprise", "/pods", "/music"];
      const revision = createHash("sha256").update([...precacheUrls, ...audioUrls].join("\n")).digest("hex").slice(0, 12);
      const template = readFileSync(resolve(projectRoot, "src/offline/service-worker.js"), "utf8");
      const serviceWorker = template
        .replace("__CACHE_NAME__", JSON.stringify(`anniv-offline-${revision}`))
        .replace("__PRECACHE_URLS__", JSON.stringify(precacheUrls))
        .replace("__ROUTE_URLS__", JSON.stringify(routeUrls))
        .replace("__AUDIO_URLS__", JSON.stringify(audioUrls));

      this.emitFile({ type: "asset", fileName: "sw.js", source: serviceWorker });
    },
  };
}

export default defineConfig({
  plugins: [offlineServiceWorker()],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
