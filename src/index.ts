#! /usr/bin/env node

import { interceptStdIn, parseCli } from "./cli.js";
import { RequestManager } from "./request/request-manager.js";
import { Request } from "./request/request.js";
import { KeyValuePairsToDictionary } from "./util.js";

const opts = parseCli();

const request = new Request(opts.url, KeyValuePairsToDictionary(opts.headers));

const requestManager = new RequestManager(request, opts.sleepTime);

// Intercept Stdin and set up actions based on input.
interceptStdIn([
  // If SIGINT is received (CTRL+C), exit.
  {
    condition: (key) => key === "\u0003",
    action: () => process.exit(0),
  },
  // If "r" is received, tell the request manager to reset
  {
    condition: (key) => key.toLocaleLowerCase() === "r",
    action: () => requestManager.reset(),
  },
]);


requestManager.run();