import parseFrontMatter from "front-matter";
import { bundleMDX } from "mdx-bundler";

export type MDAttributes = Record<string, unknown>;
export interface MDInput {
  filename: string;
  body: string;
}

export interface MDOutput<T = MDAttributes> extends MDInput {
  attributes: T;
}

/**
 * Parse a markdown file, retrieve its body and frontmatter.
 *
 * @template T Type for the frontmatter object (default=Record<string,unknown>)
 * @param {{filename: string, body: string}} input - The filename and markdown content.
 */
async function parse<T = MDAttributes>({
  filename,
  body,
}: MDInput): Promise<MDOutput<T>> {
  const { attributes, ...rest } = await parseFrontMatter<T>(body);
  return { filename, attributes, body: rest.body };
}

/**
 * Render a markdown file into html, or React components
 */
async function renderMDX(body: string) {
  return await bundleMDX({ source: body });
  // // it's generally a good idea to memoize this function call to
  // // avoid re-creating the component every render.
  // const Component = React.useMemo(() => getMDXComponent(code), [code]);
  // return <Component />;
}

export { parse, renderMDX };
