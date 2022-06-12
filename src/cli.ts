import { program } from "commander";

import { packageJson } from "./util.js";

const DEFAULT_SLEEP_SECONDS = "5";

export function parseCli() {
  program
    .name(packageJson.name)
    .version(packageJson.version)
    .description("Make requests to a URL repeatedly and watch for changes")
    .argument("<url>", "The URL to make requests to")
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

  const url = program.args[0];

  if (!url) {
    program.help();
  }

  if (program.args.length > 1) {
    console.warn(
      `WARNING: ${program.args.length} arguments provided. Only using the first one - ${url}`
    );
  }

  if (`${parseInt(opts.sleepTime)}` !== opts.sleepTime) {
    console.warn(
      `WARNING: Invalid sleep time '${opts.sleepTime}' provided. Using default of '${DEFAULT_SLEEP_SECONDS}'.`
    );
    opts.sleepTime = DEFAULT_SLEEP_SECONDS;
  }

  return {
    url: url,
    sleepTime: parseInt(opts.sleepTime),
    headers: opts.header,
  };
}

interface interceptStdInRequest {
  condition: (value: string) => boolean;
  action: () => void;
}

export function interceptStdIn(req: interceptStdInRequest[]) {
  const stdin = process.stdin;

  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding("utf8");

  stdin.on("data", (key: string) =>
    req.find((r) => r.condition(key))?.action()
  );
}
