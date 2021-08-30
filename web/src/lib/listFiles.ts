import { Stats } from "node:fs";

import { totalist } from "totalist/sync";

export interface FileRef {
  name: string;
  abspath: string;
  stats: Stats;
}

/**
 * List files in `path`
 *
 */
export const listFiles = (
  path: string,
  filterFn: (file: FileRef) => boolean = () => true
): Promise<Set<FileRef>> => {
  const fileSet = new Set<FileRef>();

  return new Promise((resolve, reject) => {
    totalist(path, (name, abspath, stats) => {
      const fileReference = { name, abspath, stats };
      if (filterFn(fileReference)) {
        fileSet.add(fileReference);
      }
    });
    resolve(fileSet);
  });
};
