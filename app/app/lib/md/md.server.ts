import { readFileSync } from "fs";
import path from "path";

import { bundleMDX } from "mdx-bundler";
import { BundleMDXOptions } from "mdx-bundler/dist/types";
import parseFrontMatter from "front-matter";

// import rehypeHighlight from "rehype-highlight";
// import remarkGfm from "remark-gfm";

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

const mdxResolveFolder = path.resolve("app/");
const bundlePath = "build/_assets/";
const bundleOutputFolder = path.resolve(`public/${bundlePath}`);

const options: BundleMDXOptions<Record<string, any>> = {
  xdmOptions(options, frontmatter) {
    options.remarkPlugins = [...(options.remarkPlugins ?? [])];
    return options;
  },
  esbuildOptions(options) {
    console.log("entryPoints", options.entryPoints);
    options.assetNames = "[name]";
    options.loader = {
      ...options.loader,
      ".css": "file",
    };
    return options;
  },
  bundleDirectory: bundleOutputFolder,
  bundlePath: `/${bundlePath}`,
  cwd: mdxResolveFolder,
};

/**
 * Render a markdown file into html, or React components
 */
async function renderMDX({ body, file }: { body?: string; file?: string }) {
  if (body) {
    return await bundleMDX({ source: body, ...options });
  } else if (file) {
    return await bundleMDX({ file: file, ...options });
  } else {
    throw new Error(`Please provide either a body or a file`);
  }
}

export { parse, renderMDX };
