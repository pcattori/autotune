import { Routes } from "autotune";

import routeB from "./route";

const routes = {
  products: {
    ":slug/1": routeB,
    ":slug/2": import("./route").then((m) => m.default),
  },
} satisfies Routes;

export default routes;
