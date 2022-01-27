const { remarkMdxFrontmatter } = require("remark-mdx-frontmatter");

// can be an sync / async function or an object
// exports.mdx = async (filename) => {
//   const [rehypeHighlight, remarkToc] = await Promise.all([
//     import("rehype-highlight").then((mod) => mod.default),
//     import("remark-toc").then((mod) => mod.default),
//   ]);

//   return {
//     remarkPlugins: [remarkToc],
//     rehypePlugins: [rehypeHighlight],
//   };
// };

/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "netlify/functions/server/build",
  devServerPort: 8002,
  ignoredRouteFiles: [".*"],
};
