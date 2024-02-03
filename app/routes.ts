import Route from "./route";

const routes = {
  products: {
    ":slug/1": Route,
    ":slug/2": import("./route").then((m) => m.default),
  },
} satisfies Routes;

export default routes;

// TODO: typegen --------------------------------------------------------------

type MaybePromise<T> = T | Promise<T>;

type Routes = {
  products: {
    ":slug/1": MaybePromise<{ params?: "slug"[] }>;
    ":slug/2": MaybePromise<{ params?: "slug"[] }>;
  };
};

type RoutePath = ":slug/1" | ":slug/2";
