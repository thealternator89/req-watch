import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const colors = require("colors/safe");
export const packageJson = require("../package.json");

export function KeyValuePairsToDictionary(kvp: string[]): {
  [key: string]: string;
} {
  return kvp.reduce((prev, current) => {
    const [key, value] = current.split("=");
    prev[key.trim()] = value.trim();
    return prev;
  }, {});
}
