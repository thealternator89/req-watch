import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const colors = require("colors/safe");
export const packageJson = require("../package.json");
