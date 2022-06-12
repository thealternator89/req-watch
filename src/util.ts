import {createRequire} from 'module';

const require = createRequire(import.meta.url);

/**
 * Sleep in an async context.
 * @param timems The time to sleep (in ms)
 * @returns A promise which will resolve after the specified time
 */
export const sleep = (timems: number) => new Promise((res) => {
    setTimeout(res, timems);
});

export const colors = require('colors/safe');

export const packageJson = require("../package.json")