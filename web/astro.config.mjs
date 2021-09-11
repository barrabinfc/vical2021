import "module-alias/register.js";
import { readFileSync } from "fs";

const packageFileContent = readFileSync("./package.json", "utf8");
const packageInfo = JSON.parse(packageFileContent);
const astroConfig = packageInfo._astroConfig;

console.log("Using config", astroConfig);
export default /** @type {import('astro').AstroUserConfig} */ ({
  ...astroConfig
});
