import { SEOItem, SEOModules, SEOSchema } from './types';
export type {SEOItem, SEOModules, SEOSchema}

import createDebug from 'debug';
import { errorId } from '../../lib/helpers';
import { CustomError } from '../../lib/errors';

import defaultSettings from '../../lib/settings';

const debug = createDebug('vical:components:seo');

export class SEOModuleNotFound extends CustomError {
  name: 'SEOModuleNotFound';
}

import ldModule from './ld';
import ogModule from './og';
import twModule from './twitter';

export const defaultModule = 'ld';

const availableModules = {
  ld: ldModule,
  og: ogModule,
  twitter: twModule
};

/**
 * Retrieve the appropriate SEO module for rendering `type`
 */
function getSEOSchemaModule(moduleName: SEOModules, schemaName: SEOSchema): Renderable {
  let modules = {};
  const moduleSymbolName = `${schemaName}.tsx`;
  const moduleFullSymbol = `./${moduleSymbolName}`;

  modules = availableModules[moduleName];
  if (!modules[moduleFullSymbol]) {
    const msg = `SEO module ${moduleName}/${moduleSymbolName} not found.`;
    debug(
      errorId('getSEOSchemaModule', SEOModuleNotFound.name),
      msg + ` Do you mean one of [${Object.keys(modules)}] ?'`
    );
    throw new SEOModuleNotFound(msg);
  } else if (!modules[moduleFullSymbol].default) {
    const msg = `SEO module ${moduleName}/${moduleSymbolName} is missing the default export.`;
    debug(errorId('getSEOSchemaModule', SEOModuleNotFound.name), msg);
    throw new SEOModuleNotFound(msg);
  }

  return modules[moduleFullSymbol].default;
}

/**
 * Render SEO tags
 * @param {SEOProps} props The page to be described
 * @returns {JSX.Element}
 */
export default function SEO( props: SEOItem & { module: SEOModules } ) {
  const seoRenderFn = getSEOSchemaModule(props.module, props.schema.toLowerCase() as SEOSchema);
  return seoRenderFn(props);
}
