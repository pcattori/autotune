import fs from "node:fs";
export const generateTypes = (routes: Record<string, unknown>): void => {
  fs.writeFileSync("./autotune.d.ts", "hello");
};

generateTypes({});
