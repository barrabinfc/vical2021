import "module-alias/register.js";

import package from "./package.json";
const astroConfig = package._astroConfig;

export default {
  ...astroConfig
};
