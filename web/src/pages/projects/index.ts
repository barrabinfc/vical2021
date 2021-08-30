import { dirname } from "node:path";
import { listMarkdown, MarkdownContent } from "../../lib/listMarkdown";

/**
 * Fetch all projects in the folder 'src/pages/projects'.
 * @return {MarkdownContent[]}
 */
export const listProjects = async (): Promise<MarkdownContent[]> => {
  /** @ts-ignore */
  const cwd = dirname(import.meta?.url?.pathname ?? process.cwd());
  if (!/projects$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/projects/ folder`);
  }

  const markdownFileSet = await listMarkdown(cwd);
  return [...markdownFileSet];
};
