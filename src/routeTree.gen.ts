/* eslint-disable */
// @ts-nocheck
// Generated-compatible TanStack file route tree.
// Keep this file in sync with src/routes. The TanStack Vite plugin may regenerate it.

import { Route as rootRouteImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as QuizRouteImport } from "./routes/quiz";
import { Route as MachineRouteImport } from "./routes/machine";
import { Route as TeddyRouteImport } from "./routes/teddy";
import { Route as PodsRouteImport } from "./routes/pods";
import { Route as LetterRouteImport } from "./routes/letter";
import { Route as SurpriseRouteImport } from "./routes/surprise";

const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport,
} as any);
const QuizRoute = QuizRouteImport.update({
  id: "/quiz",
  path: "/quiz",
  getParentRoute: () => rootRouteImport,
} as any);
const MachineRoute = MachineRouteImport.update({
  id: "/machine",
  path: "/machine",
  getParentRoute: () => rootRouteImport,
} as any);
const TeddyRoute = TeddyRouteImport.update({
  id: "/teddy",
  path: "/teddy",
  getParentRoute: () => rootRouteImport,
} as any);
const PodsRoute = PodsRouteImport.update({
  id: "/pods",
  path: "/pods",
  getParentRoute: () => rootRouteImport,
} as any);
const LetterRoute = LetterRouteImport.update({
  id: "/letter",
  path: "/letter",
  getParentRoute: () => rootRouteImport,
} as any);
const SurpriseRoute = SurpriseRouteImport.update({
  id: "/surprise",
  path: "/surprise",
  getParentRoute: () => rootRouteImport,
} as any);

export const routeTree = rootRouteImport._addFileChildren({
  IndexRoute,
  QuizRoute,
  MachineRoute,
  TeddyRoute,
  PodsRoute,
  LetterRoute,
  SurpriseRoute,
} as any);
