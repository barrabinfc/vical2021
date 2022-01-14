/**
 * Filesystem helpers
 */
import path from "path";
import fs from "fs/promises";

import { totalist, Caller } from "totalist";

/**
 * Get all files at `where` folder that matches one of criteria.
 * @returns {string[]} absolute file paths
 */
export async function getMatchingFiles(where: string, criteria: RegExp[]) {
  const files: string[] = [];
  await totalist(where, (name, abspath, stats) => {
    for (let crit of criteria) {
      if (crit instanceof RegExp && crit.test(name)) {
        files.push(abspath);
      }
    }
  });
  return files;
}
