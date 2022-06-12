#! /usr/bin/env node

import { program } from "commander";
import { RequestManager } from "./request/request-manager.js";
import { Request } from "./request/request.js";
import { packageJson } from "./util.js";

const DEFAULT_SLEEP_SECONDS = '5';

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description('Make requests to a URL repeatedly and watch for changes')
  .requiredOption("-u, --url <url>", "The URL to make requests to (required)")
  .option(
    "-s, --sleep-time <time>",
    "The time to sleep between requests (in seconds)",
    DEFAULT_SLEEP_SECONDS
  )
  .option(
    "-h, --header <header>",
    'Add headers to the request, format. E.g. "Accept=application/json"',
    (value, prev) => [...prev, value],
    []
  );

program.parse();

const opts = program.opts();

if (`${parseInt(opts.sleepTime)}` !== opts.sleepTime) {
    console.warn(`WARNING: Invalid sleep time '${opts.sleepTime}' provided. Using default of '${DEFAULT_SLEEP_SECONDS}'.`);
    opts.sleepTime = DEFAULT_SLEEP_SECONDS;
}

// Convert the array into a dictionary
const headers = (opts.header as string[]).reduce((prev, current) => {
  const [key, value] = current.split('=');

  prev[(key.trim())] = value.trim();
  return prev;
}, {});

const request = new Request(opts.url, headers);
const sleepTime = parseInt(opts.sleepTime);

const requestManager = new RequestManager(request, sleepTime);

const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");

stdin.on("data", (key: string) => {
  // ctrl-c ( end of text )
  if (key === "\u0003") {
    process.exit();
  }
  if (key.toLocaleLowerCase() === "r") {
    requestManager.reset();
  }
});
requestManager.run();