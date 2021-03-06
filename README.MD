# Request Watcher

A simple utility to make repeated requests to a specified endpoint.
This will display
* the time the last response was received
* whether the response has changed since you started running this (and whether it has changed back)
* the full response from the API

## Usage

```bash
$ npx req-watch <url> [options]
```

Arguments:
* `<url>` - The URL to make requests to and watch for changes.

Options:
* `-h, --header <key=value>` - Additional header(s) to send, like `Accept=application/json`. Repeat to add more headers.
* `-s, --sleep-time <#>` - The time to sleep between requests (in seconds).
* `--help` - Display help.
* `-V, --version` - Print version information.

## Resetting

You can reset the state of the request by pressing **`r`** in your console at any time.

## Installation

You don't need to install this, it's best to use the `npx` approach under [usage](#usage) above.

If you want to keep this locally, you can do the following

```bash
$ npm i -g req-watch

$ req-watch <url> [options]
```
