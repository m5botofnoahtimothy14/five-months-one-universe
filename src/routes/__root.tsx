import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { FxProvider } from "@/components/fx/FxProvider";
import { MusicProvider } from "@/components/music/MusicProvider";
import { AppShell } from "@/components/layout/AppShell";
import { Mascot } from "@/components/art/Mascot";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="paper-card max-w-sm p-8 text-center">
        <div className="mx-auto w-28">
          <Mascot animal="bunny" mood="thinking" prop="cloud" />
        </div>
        <h1 className="mt-2 font-display text-5xl font-bold">404</h1>
        <p className="mt-2 font-hand text-xl">bro this page doesn't exist 😭</p>
        <Link
          to="/"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-primary px-5 font-display text-primary-foreground"
        >
          take me home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="paper-card max-w-md p-8 text-center">
        <h1 className="font-display text-2xl font-bold">oops, a page tripped over 🙈</h1>
        <p className="mt-2 font-hand text-lg text-muted-foreground">try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 font-display text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full border-2 border-border bg-paper px-5 font-display"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#fbeff0" },
      // Unlisted link: ask search engines not to index. This is NOT access control.
      { name: "robots", content: "noindex, nofollow" },
      { title: "Six Months, One Universe" },
      { name: "description", content: "A tiny internet scrapbook for a six-month anniversary." },
      { property: "og:title", content: "Six Months, One Universe" },
      { property: "og:description", content: "A tiny internet scrapbook for a six-month anniversary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <FxProvider>
        <MusicProvider>
          <AppShell>
            <Outlet />
          </AppShell>
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "!rounded-2xl !border-2 !border-ink/30 !bg-paper !font-hand !text-lg !text-foreground !shadow-[var(--shadow-sticker)]",
              },
            }}
          />
        </MusicProvider>
      </FxProvider>
    </QueryClientProvider>
  );
}
