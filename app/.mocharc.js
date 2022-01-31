"use strict";

/**
 * @type {import('@mocha').AppConfig}
 */
module.exports = {
  recursive: false,
  spec: [
    // "tests/**/*.spec.mjs",
    "app/**/*.spec.ts",
    "app/**/*.spec.tsx",
  ], // the positional arguments!
};
