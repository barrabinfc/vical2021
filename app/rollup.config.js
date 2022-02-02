// rollup.config.js
/** Rollup is used by service-worker */
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";

import pkg from "./package.json";

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "app/sw.js",
  output: {
    dir: "public",
    format: "cjs",
  },
  plugins: [
    nodeResolve({
      moduleDirectories: ["node_modules", "app"],
    }),
    commonjs({
      transformMixedEsModules: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      __buildVersion__: JSON.stringify(pkg.version),
    }),
  ],
};
