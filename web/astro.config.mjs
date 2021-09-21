import 'module-alias/register.js';
import { readFileSync } from 'fs';

import * as shiki from 'shiki';

const packageFileContent = readFileSync('./package.json', 'utf8');
const packageInfo = JSON.parse(packageFileContent);
const astroConfig = packageInfo._astroConfig;

const highlighter = await shiki.getHighlighter({ theme: 'poimandres' });

export default /** @type {import('astro').AstroUserConfig} */ ({
  ...astroConfig,
  markdownOptions: {
    ...astroConfig.markdownOptions
  }
});
