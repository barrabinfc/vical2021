/**
 * Aliases
 */

/**
 * Register css modules in UVU test runner
 */
const hook = require("css-modules-require-hook");

hook({
  extensions: [".css", ".pcss"],
});
