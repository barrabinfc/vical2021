import { dirname } from "node:path";
import { listMarkdown, MarkdownContent } from "../../lib/listMarkdown";

/**
 * Convert from MarkdownContent to MarkdownPage
 */
export const toMarkdownPage = (content: MarkdownContent): MarkdownPage => {
  return {
    slug: content.frontmatter.slug,
    path: content.frontmatter.path,
    layout: content.frontmatter.layout,
    schema: content.frontmatter.schema,
    draft: content.frontmatter.draft,
    avatar: {
      url: content.frontmatter.thumbnail
    },
    content: {
      title: content.frontmatter.title,
      description: content.frontmatter.subtitle,
      headers: content.astro.headers,
      frontmatter: content.frontmatter,
      content: content.content
    }
  };
};

/**
 * Fetch all projects in the folder 'src/pages/projects'.
 * @return {MarkdownPage[]}
 */
export const listProjects = async (): Promise<MarkdownPage[]> => {
  /** @ts-ignore */
  const cwd = dirname(import.meta?.url?.pathname ?? process.cwd());
  if (!/projects$/.test(cwd)) {
    throw new Error(`cwd() should be in pages/projects/ folder`);
  }

  const markdownFiles = [...(await listMarkdown(cwd))];
  return markdownFiles.map(toMarkdownPage);
};
