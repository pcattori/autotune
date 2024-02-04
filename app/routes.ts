import { Routes } from "autotune";

import routeB, { routeA } from "./route";

export default {
  products: {
    "slug/1": routeA,
    ":slug/1": routeB,
    ":slug/2": import("./route").then((m) => m.default),
  },
} satisfies Routes;
