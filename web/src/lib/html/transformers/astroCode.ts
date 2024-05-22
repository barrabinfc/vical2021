/**
 * Fix astro ASTRO_ESCAPED_LEFT_CURLY_BRACKET in code blocks
 */
export const transformAstroEscapeLeft = (content: string): string => {
  return content.replace(/ASTRO_ESCAPED_LEFT_CURLY_BRACKET/g, '{');
};

export default transformAstroEscapeLeft;
