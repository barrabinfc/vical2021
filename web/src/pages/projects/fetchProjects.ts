import { AstroMarkdownPage } from "~/lib/Astro";

export const allProjects = (
  fetchContent: (string) => AstroMarkdownPage[]
): AstroMarkdownPage[] => {
  let projects = fetchContent("./**/*.md");
  console.log("projects", projects);
  return projects;
};
