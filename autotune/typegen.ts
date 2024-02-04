import fs from "node:fs";
import dedent from "dedent";

import { type Route } from "./route";

type RouteTree = {
  [key: string]: Route | RouteTree;
};

const routes = await import("../app/routes");
generateTypes(routes.default as any);

function generateTypes(routes: RouteTree): void {
  const routePaths: string[] = [];

  const routeTypes = traverseMap(routes, (path) => {
    let routePath = path.join("/");
    routePaths.push(routePath);
    // note: this is not the same as `path` since `path` can contain segments that include `/`
    let routeSegments = routePath.split("/");
    let params = routeSegments
      .filter((segment) => segment.startsWith(":"))
      .map((segment) => segment.slice(1));
    let paramsType = params.length
      ? `(${params.map((param) => `"${param}"`).join(" | ")})[]`
      : "string[]";
    return `MaybePromise<{ params?: ${paramsType} }>`;
  });

  let indent = 3;
  let routePathType = [
    "{",
    ...routePaths
      .map((routePath) => `"${routePath}": true`)
      .map((line) => "  ".repeat(indent + 1) + line),
    "  ".repeat(indent) + "}",
  ].join("\n");

  const contents = dedent`
    // This file is generated by autotune

    import "autotune";

    type MaybePromise<T> = T | Promise<T>;

    declare module "autotune" {
      interface Routes ${stringify(routeTypes, { indent })}
      interface RoutePaths ${routePathType}
    }
  `;
  fs.writeFileSync("autotune.d.ts", contents);
}

function isRoute(node: Route | Promise<Route> | RouteTree): node is Route {
  const isPromise = "then" in node && typeof node.then === "function";
  if (isPromise) return true;

  for (const [key, value] of Object.entries(node)) {
    if (key === "params") {
      if (!Array.isArray(value)) return false;
      continue;
    }
    if (key === "loader") {
      if (typeof value !== "function") return false;
      continue;
    }
    if (key === "action") {
      if (typeof value !== "function") return false;
      continue;
    }
    if (key === "component") {
      if (typeof value !== "function") return false;
      continue;
    }
    return false;
  }
  return true;
}

function traverse(
  node: Route | Promise<Route> | RouteTree,
  visit: (path: string[]) => void,
  path: string[] = [],
): void {
  if (isRoute(node)) {
    visit(path);
    return;
  }

  for (const [key, child] of Object.entries(node)) {
    traverse(child, visit, [...path, key]);
  }
}

type Result<T> = {
  [key: string]: T | Result<T>;
};
function traverseMap<T>(
  routes: RouteTree,
  visit: (path: string[]) => T,
): Result<T> {
  const result: Result<T> = {};
  traverse(routes, (path) => {
    let current: Result<T> = result;
    for (const segment of path.slice(0, -1)) {
      current = current[segment] ??= {};
    }
    let key = path.at(-1)!;
    current[key] = visit(path);
  });
  return result;
}

function stringify(node: Result<string> | string, { indent = 0 } = {}): string {
  if (typeof node === "string") return node;
  let entries = Object.entries(node).map(([key, value]) => {
    return `${"  ".repeat(indent + 1)}"${key}": ${stringify(value, { indent: indent + 1 })}`;
  });
  let lines = ["{", entries.join("\n"), "  ".repeat(indent) + "}"];
  return lines.join("\n");
}
