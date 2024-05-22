/**
 * The h1-h6 headings.
 * It's advised for components to have a props `HeadingLevel`,
 * instead of hard-coding h1-h6, since we do not know were the component
 * will be used in the page, and what is the proper heading level that should
 * be used.
 */
export enum HeadingLevel {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6'
}
