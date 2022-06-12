# Request Watcher

A simple utility to make repeated requests to a specified endpoint.
This will display
* the time the last response was received
* whether the response has changed since you started running this (and whether it has changed back)
* the full response from the API

## Usage

```bash
$ npx req-watch -u <url to watch>
```

Command line options:
* `-u, --url <url to watch>` - The URL to watch for changes.
* `-h, --header <key=value>` - Additional header(s) to send, like `Accept=application/json`. Repeat to add more headers.
* `-s, --sleep-time <#>` - The time to sleep between requests (in seconds).
* `--help` - Display help
* `-V, --version` - Print version information

## Installation

You don't need to install this, it's best to use the `npx` approach under [usage](#usage) above.

If you want to keep this locally, you can do the following

```bash
$ npm i -g req-watch

$ req-watch -u <url to watch>
```
